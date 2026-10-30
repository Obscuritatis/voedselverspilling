-- Voedselverspilling: sites, afdelingen, metingen, gevoeligheden en acties.
-- Draait in hetzelfde Supabase-project als de veiligheidsrondes en de staalnamen en raakt die gegevens niet aan.
-- Het gebruikt wel de bestaande toegangslijst "toegang" en de functie heeft_toegang() van de
-- veiligheidsrondes: wie daar toegang heeft, heeft ook toegang tot de voedselverspilling.
-- Plak dit volledig in Supabase > SQL Editor en klik op Run. Opnieuw uitvoeren kan geen kwaad.

-- Veiligheidscheck: de toegangslijst van de veiligheidsrondes moet al bestaan.
do $$ begin
  if to_regprocedure('public.heeft_toegang()') is null then
    raise exception 'Functie public.heeft_toegang() ontbreekt. Voer eerst het schema van de veiligheidsrondes uit.';
  end if;
end $$;

-- Sites en hun afdelingen. De id is een korte tekst (bv. "wzc-huize-nazareth").
create table if not exists public.vv_sites (
  id text primary key,
  naam text not null,
  volgorde integer not null default 0,
  aangemaakt timestamptz not null default now()
);

-- "type": woonafdeling, patientenafdeling, restaurant, dagverzorging of andere.
create table if not exists public.vv_afdelingen (
  id text primary key,
  site_id text not null references public.vv_sites(id),
  naam text not null,
  type text not null default 'woonafdeling',
  volgorde integer not null default 0,
  omschrijving text not null default '',
  aangemaakt timestamptz not null default now()
);
-- Maximale bezetting: vaste plaatsen en kortverblijven (leeg als het aantal eters wisselt),
-- en wie de aantallen aan de keuken doorgeeft.
alter table public.vv_afdelingen add column if not exists capaciteit integer check (capaciteit >= 0);
alter table public.vv_afdelingen add column if not exists kortverblijf integer check (kortverblijf >= 0);
alter table public.vv_afdelingen add column if not exists aantallen_info text not null default '';
alter table public.vv_afdelingen add column if not exists huidige_bezetting integer check (huidige_bezetting >= 0);
alter table public.vv_afdelingen add column if not exists huidige_bezetting_op date;
alter table public.vv_afdelingen add column if not exists bezetting_dag jsonb;
create index if not exists vv_afdelingen_site_idx on public.vv_afdelingen(site_id, volgorde);

-- Gewogen verspilling. "stroom": bordrest, overproductie, bederf of bereiding.
create table if not exists public.vv_metingen (
  id uuid primary key default gen_random_uuid(),
  site_id text not null references public.vv_sites(id),
  afdeling_id text not null references public.vv_afdelingen(id),
  datum date not null,
  maaltijd text not null default '',
  stroom text not null,
  component text not null default '',
  kg numeric(8,2) not null check (kg >= 0),
  opmerking text not null default '',
  aangemaakt timestamptz not null default now(),
  aangemaakt_door uuid default auth.uid()
);
create index if not exists vv_metingen_afdeling_idx on public.vv_metingen(afdeling_id, datum desc);

-- Wat verspilling op een afdeling moeilijk te vermijden maakt. "impact": laag, midden of hoog.
create table if not exists public.vv_gevoeligheden (
  id uuid primary key default gen_random_uuid(),
  site_id text not null references public.vv_sites(id),
  afdeling_id text not null references public.vv_afdelingen(id),
  categorie text not null default '',
  omschrijving text not null,
  impact text not null default 'midden',
  bron text not null default '',
  aangemaakt timestamptz not null default now(),
  aangemaakt_door uuid default auth.uid()
);
create index if not exists vv_gevoeligheden_afdeling_idx on public.vv_gevoeligheden(afdeling_id);

-- Acties per afdeling, optioneel gekoppeld aan een gevoeligheid.
-- "status": Idee, Gepland, Lopend of Afgerond.
create table if not exists public.vv_acties (
  id uuid primary key default gen_random_uuid(),
  site_id text not null references public.vv_sites(id),
  afdeling_id text not null references public.vv_afdelingen(id),
  gevoeligheid_id uuid references public.vv_gevoeligheden(id) on delete set null,
  titel text not null,
  omschrijving text not null default '',
  impact text not null default 'midden',
  inspanning text not null default 'midden',
  status text not null default 'Idee',
  eigenaar text not null default '',
  aangemaakt timestamptz not null default now(),
  gewijzigd timestamptz not null default now(),
  aangemaakt_door uuid default auth.uid()
);
create index if not exists vv_acties_afdeling_idx on public.vv_acties(afdeling_id);

-- Geleverde porties en aanwezigen per afdeling, datum en maaltijd (één keer, los van de wegingen).
create table if not exists public.vv_maaltijden (
  id uuid primary key default gen_random_uuid(),
  site_id text not null references public.vv_sites(id),
  afdeling_id text not null references public.vv_afdelingen(id),
  datum date not null default current_date,
  maaltijd text not null default 'Middagmaal',
  porties integer check (porties >= 0),
  aanwezig integer check (aanwezig >= 0),
  opmerking text not null default '',
  aangemaakt timestamptz not null default now(),
  aangemaakt_door uuid default auth.uid(),
  unique (afdeling_id, datum, maaltijd)
);

-- Menu per site, dag en maaltijd: één gerecht per component.
create table if not exists public.vv_menus (
  id uuid primary key default gen_random_uuid(),
  site_id text not null references public.vv_sites(id),
  datum date not null,
  maaltijd text not null default 'Middagmaal',
  component text not null,
  gerecht text not null check (length(gerecht) between 1 and 200),
  aangemaakt timestamptz not null default now(),
  aangemaakt_door uuid default auth.uid(),
  unique (site_id, datum, maaltijd, component)
);
alter table public.vv_sites enable row level security;
alter table public.vv_afdelingen enable row level security;
alter table public.vv_metingen enable row level security;
alter table public.vv_gevoeligheden enable row level security;
alter table public.vv_acties enable row level security;
alter table public.vv_maaltijden enable row level security;
alter table public.vv_menus enable row level security;

do $$
declare t text;
begin
  foreach t in array array['vv_sites', 'vv_afdelingen', 'vv_metingen', 'vv_gevoeligheden', 'vv_acties', 'vv_maaltijden', 'vv_menus'] loop
    execute format('drop policy if exists %I on public.%I', t || ' voor collega''s', t);
    execute format('create policy %I on public.%I for all to authenticated using (public.heeft_toegang()) with check (public.heeft_toegang())', t || ' voor collega''s', t);
  end loop;
end $$;

-- Live bijwerken wanneer een collega iets wijzigt.
do $$
declare t text;
begin
  foreach t in array array['vv_sites', 'vv_afdelingen', 'vv_metingen', 'vv_gevoeligheden', 'vv_acties', 'vv_maaltijden', 'vv_menus'] loop
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;

-- Eerste site met haar afdelingen. Bestaande rijen worden niet overschreven.
insert into public.vv_sites (id, naam, volgorde) values
  ('wzc-huize-nazareth', 'WZC-Huize Nazareth', 1)
on conflict (id) do nothing;
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, omschrijving) values
  ('wzc-huize-nazareth-heilig-hart', 'wzc-huize-nazareth', 'Heilig Hart', 'woonafdeling', 1, ''),
  ('wzc-huize-nazareth-sint-jozef', 'wzc-huize-nazareth', 'Sint-Jozef verdiep 2', 'woonafdeling', 2, ''),
  ('wzc-huize-nazareth-sint-jozef-3', 'wzc-huize-nazareth', 'Sint-Jozef verdiep 3', 'woonafdeling', 3, ''),
  ('wzc-huize-nazareth-sint-elisabeth', 'wzc-huize-nazareth', 'Sint-Elisabeth verdiep 1', 'woonafdeling', 4, ''),
  ('wzc-huize-nazareth-sint-elisabeth-2', 'wzc-huize-nazareth', 'Sint-Elisabeth verdiep 2', 'woonafdeling', 5, ''),
  ('wzc-huize-nazareth-sint-franciscus', 'wzc-huize-nazareth', 'Sint-Franciscus', 'woonafdeling', 6, ''),
  ('wzc-huize-nazareth-gozewijn', 'wzc-huize-nazareth', 'Restaurant Gozewijn', 'restaurant', 7, 'Restaurant voor medewerkers'),
  ('wzc-huize-nazareth-prieeltje', 'wzc-huize-nazareth', 'Het Prieeltje', 'restaurant', 8, 'Buurtrestaurant')
on conflict (id) do nothing;

-- Update 16/10/2026: Sint-Jozef en Sint-Elisabeth zijn per verdiep opgesplitst. Bestaande metingen van
-- "Sint-Jozef" horen voortaan bij verdiep 2 en die van "Sint-Elisabeth" bij verdiep 1.
update public.vv_afdelingen set naam = 'Sint-Jozef verdiep 2' where id = 'wzc-huize-nazareth-sint-jozef' and naam = 'Sint-Jozef';
update public.vv_afdelingen set naam = 'Sint-Elisabeth verdiep 1' where id = 'wzc-huize-nazareth-sint-elisabeth' and naam = 'Sint-Elisabeth';
-- De volgorde van bestaande afdelingen pas je aan in de app (Beheer) of met supabase/2026-10-16-verdiepen.sql.

-- Site WZC Sint-Alexius (19/10/2026).
insert into public.vv_sites (id, naam, volgorde) values
  ('wzc-sint-alexius', 'WZC Sint-Alexius', 2)
on conflict (id) do nothing;
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, capaciteit, kortverblijf, aantallen_info) values
  ('wzc-sint-alexius-daalborn', 'wzc-sint-alexius', 'Daalborn', 'woonafdeling', 1, 8, null, ''),
  ('wzc-sint-alexius-veldborn', 'wzc-sint-alexius', 'Veldborn', 'woonafdeling', 2, 14, 3, ''),
  ('wzc-sint-alexius-minneborn', 'wzc-sint-alexius', 'Minneborn', 'woonafdeling', 3, 15, 2, ''),
  ('wzc-sint-alexius-germanusborn', 'wzc-sint-alexius', 'Germanusborn', 'woonafdeling', 4, 16, null, ''),
  ('wzc-sint-alexius-de-varen', 'wzc-sint-alexius', 'De Varen', 'woonafdeling', 5, 8, null, ''),
  ('wzc-sint-alexius-dagverzorgingscentrum', 'wzc-sint-alexius', 'Dagverzorgingscentrum', 'dagverzorging', 6, null, null, 'Wisselt met wie deelneemt; de afdeling geeft de aanwezigen door aan de keuken.'),
  ('wzc-sint-alexius-buurtrestaurant', 'wzc-sint-alexius', 'Buurtrestaurant', 'restaurant', 7, null, null, 'In het LDC; de verantwoordelijke LDC geeft de aantallen door aan de keuken, de vrijdag voor de nieuwe week begint.')
on conflict (id) do nothing;
-- Dagverzorgingscentrum is een eigen type (27/10/2026).
update public.vv_afdelingen set type = 'dagverzorging' where id = 'wzc-sint-alexius-dagverzorgingscentrum' and type = 'andere';

-- Site WZC Passionisten (19/10/2026).
insert into public.vv_sites (id, naam, volgorde) values
  ('wzc-passionisten', 'WZC Passionisten', 3)
on conflict (id) do nothing;
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde) values
  ('wzc-passionisten-janneke', 'wzc-passionisten', 'Janneke', 'woonafdeling', 1),
  ('wzc-passionisten-mieken', 'wzc-passionisten', 'Mieken', 'woonafdeling', 2),
  ('wzc-passionisten-nieke', 'wzc-passionisten', 'Nieke', 'woonafdeling', 3),
  ('wzc-passionisten-tiske', 'wzc-passionisten', 'Tiske', 'woonafdeling', 4),
  ('wzc-passionisten-buurtrestaurant', 'wzc-passionisten', 'Buurtrestaurant', 'restaurant', 5)
on conflict (id) do nothing;
-- Maximale bezetting (27/10/2026); enkel invullen waar nog niets staat, zodat wijzigingen in Beheer blijven.
update public.vv_afdelingen set capaciteit = 18 where id = 'wzc-passionisten-janneke' and capaciteit is null;
update public.vv_afdelingen set capaciteit = 14 where id in ('wzc-passionisten-mieken', 'wzc-passionisten-nieke', 'wzc-passionisten-tiske') and capaciteit is null;

-- Site Psychiatrisch ziekenhuis (19/10/2026) met haar patiëntenafdelingen.
insert into public.vv_sites (id, naam, volgorde) values
  ('psychiatrisch-ziekenhuis', 'Psychiatrisch ziekenhuis', 4)
on conflict (id) do nothing;

insert into public.vv_afdelingen (id, site_id, naam, type, volgorde) values
  ('psychiatrisch-ziekenhuis-ouderenpsychiatrie-1', 'psychiatrisch-ziekenhuis', 'Ouderenpsychiatrie 1', 'patientenafdeling', 1),
  ('psychiatrisch-ziekenhuis-ouderenpsychiatrie-2', 'psychiatrisch-ziekenhuis', 'Ouderenpsychiatrie 2', 'patientenafdeling', 2),
  ('psychiatrisch-ziekenhuis-ap1-living-1', 'psychiatrisch-ziekenhuis', 'AP1 (living 1)', 'patientenafdeling', 3),
  ('psychiatrisch-ziekenhuis-ap1-living-2', 'psychiatrisch-ziekenhuis', 'AP1 (living 2)', 'patientenafdeling', 4),
  ('psychiatrisch-ziekenhuis-ap1-motivatiegroep', 'psychiatrisch-ziekenhuis', 'AP1 (motivatiegroep)', 'patientenafdeling', 5),
  ('psychiatrisch-ziekenhuis-ap2-groep-a', 'psychiatrisch-ziekenhuis', 'AP2 (groep A)', 'patientenafdeling', 6),
  ('psychiatrisch-ziekenhuis-verslavingszorg-observatie', 'psychiatrisch-ziekenhuis', 'Verslavingszorg (observatie)', 'patientenafdeling', 7),
  ('psychiatrisch-ziekenhuis-verslavingszorg-groep-2-b', 'psychiatrisch-ziekenhuis', 'Verslavingszorg (groep 2 – B)', 'patientenafdeling', 8),
  ('psychiatrisch-ziekenhuis-verslavingszorg-groep-2-ac-kw', 'psychiatrisch-ziekenhuis', 'Verslavingszorg (groep 2 – AC-KW)', 'patientenafdeling', 9),
  ('psychiatrisch-ziekenhuis-eetherstel-leefgroep-1', 'psychiatrisch-ziekenhuis', 'Eetherstel (leefgroep 1)', 'patientenafdeling', 10)
on conflict (id) do nothing;
-- Personeelsrestaurant (27/10/2026).
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, omschrijving) values
  ('psychiatrisch-ziekenhuis-personeelsrestaurant', 'psychiatrisch-ziekenhuis', 'Personeelsrestaurant', 'restaurant', 11, 'Restaurant voor medewerkers')
on conflict (id) do nothing;

-- Maximale bezetting WZC-Huize Nazareth (29/10/2026).
update public.vv_afdelingen set capaciteit = 26 where id = 'wzc-huize-nazareth-sint-franciscus' and capaciteit is null;
update public.vv_afdelingen set capaciteit = 36 where id = 'wzc-huize-nazareth-heilig-hart' and capaciteit is null;
-- Openingsdagen per afdeling (29/10/2026): 1 = maandag … 7 = zondag, leeg = elke dag.
alter table public.vv_afdelingen add column if not exists open_dagen smallint[];
alter table public.vv_afdelingen drop constraint if exists vv_afdelingen_open_dagen_check;
alter table public.vv_afdelingen add constraint vv_afdelingen_open_dagen_check check (open_dagen <@ array[1, 2, 3, 4, 5, 6, 7]::smallint[]);
update public.vv_afdelingen set open_dagen = array[1, 4]::smallint[] where id = 'wzc-huize-nazareth-prieeltje' and open_dagen is null;
-- Maximale bezetting Sint-Jozef en Sint-Elisabeth, totaal verdeeld over de verdiepen (29/10/2026).
update public.vv_afdelingen set capaciteit = 21 where id in ('wzc-huize-nazareth-sint-jozef', 'wzc-huize-nazareth-sint-jozef-3') and capaciteit is null;
update public.vv_afdelingen set capaciteit = 23 where id = 'wzc-huize-nazareth-sint-elisabeth' and capaciteit is null;
update public.vv_afdelingen set capaciteit = 22 where id = 'wzc-huize-nazareth-sint-elisabeth-2' and capaciteit is null;
-- Klaargemaakt: dieet- of gemixte maaltijden apart, als deel van porties (30/10/2026).
alter table public.vv_maaltijden add column if not exists porties_dieet integer check (porties_dieet >= 0);
-- La Gloriet (30/10/2026): open op de laatste vrijdag van de maand.
alter table public.vv_afdelingen add column if not exists open_laatste smallint check (open_laatste between 1 and 7);
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, omschrijving, open_laatste) values
  ('wzc-huize-nazareth-la-gloriet', 'wzc-huize-nazareth', 'La Gloriet', 'restaurant', 9, 'Feest voor de jarigen in Het Prieeltje, elke laatste vrijdag van de maand', 5)
on conflict (id) do nothing;

-- Productie van de hoofdkeuken (30/10/2026): gram (of ml) per bewoner per product, voor alle sites samen,
-- en een centraal menu (site_id leeg) dat per site kan afwijken.
create table if not exists public.vv_producten (
  id uuid primary key default gen_random_uuid(),
  naam text not null check (length(naam) between 1 and 120),
  component text not null default 'Gemengd of onbekend',
  gram numeric check (gram >= 0 and gram <= 5000),
  eenheid text not null default 'g' check (eenheid in ('g', 'ml')),
  onderdelen jsonb not null default '[]'::jsonb check (jsonb_typeof(onderdelen) = 'array'),
  aangemaakt timestamptz not null default now(),
  aangemaakt_door uuid default auth.uid()
);
create unique index if not exists vv_producten_naam_idx on public.vv_producten (lower(naam));
alter table public.vv_producten enable row level security;
drop policy if exists "vv_producten voor collega's" on public.vv_producten;
create policy "vv_producten voor collega's" on public.vv_producten for all to authenticated
  using (public.heeft_toegang()) with check (public.heeft_toegang());
do $$
begin
  alter publication supabase_realtime add table public.vv_producten;
exception when duplicate_object then null;
end $$;

-- Centraal menu: site_id leeg = voor alle sites; een rij met site_id gaat voor op het centrale menu.
alter table public.vv_menus alter column site_id drop not null;
alter table public.vv_menus drop constraint if exists vv_menus_site_id_datum_maaltijd_component_key;
create unique index if not exists vv_menus_uniek_idx on public.vv_menus (coalesce(site_id, ''), datum, maaltijd, component);

-- Normen per onderdeel (30/10/2026): rij met naam = component; enkel zetmeel per soort.
insert into public.vv_producten (naam, component, eenheid) values
  ('Soep', 'Soep', 'ml'), ('Vlees, vis of vegetarisch', 'Vlees, vis of vegetarisch', 'g'), ('Saus', 'Saus', 'g'), ('Groenten', 'Groenten', 'g'), ('Dessert', 'Dessert', 'g')
on conflict do nothing;

-- Samengestelde gerechten (30/10/2026).
alter table public.vv_producten add column if not exists vervangt text[] not null default '{}';

-- Richtlijnen (30/10/2026).
alter table public.vv_producten add column if not exists toelichting text not null default '';
alter table public.vv_producten add column if not exists richtlijn boolean not null default false;
-- Jeugdpsychiatrie (Pathways) (30/10/2026).
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, capaciteit) values
  ('psychiatrisch-ziekenhuis-jeugdpsychiatrie-pathways', 'psychiatrisch-ziekenhuis', 'Jeugdpsychiatrie (Pathways)', 'patientenafdeling', 11, 7)
on conflict (id) do nothing;
