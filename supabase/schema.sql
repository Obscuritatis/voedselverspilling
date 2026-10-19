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

-- "type": woonafdeling, restaurant of andere.
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

alter table public.vv_sites enable row level security;
alter table public.vv_afdelingen enable row level security;
alter table public.vv_metingen enable row level security;
alter table public.vv_gevoeligheden enable row level security;
alter table public.vv_acties enable row level security;

do $$
declare t text;
begin
  foreach t in array array['vv_sites', 'vv_afdelingen', 'vv_metingen', 'vv_gevoeligheden', 'vv_acties'] loop
    execute format('drop policy if exists %I on public.%I', t || ' voor collega''s', t);
    execute format('create policy %I on public.%I for all to authenticated using (public.heeft_toegang()) with check (public.heeft_toegang())', t || ' voor collega''s', t);
  end loop;
end $$;

-- Live bijwerken wanneer een collega iets wijzigt.
do $$
declare t text;
begin
  foreach t in array array['vv_sites', 'vv_afdelingen', 'vv_metingen', 'vv_gevoeligheden', 'vv_acties'] loop
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
  ('wzc-sint-alexius-dagverzorgingscentrum', 'wzc-sint-alexius', 'Dagverzorgingscentrum', 'andere', 6, null, null, 'Wisselt met wie deelneemt; de afdeling geeft de aanwezigen door aan de keuken.'),
  ('wzc-sint-alexius-buurtrestaurant', 'wzc-sint-alexius', 'Buurtrestaurant', 'restaurant', 7, null, null, 'In het LDC; de verantwoordelijke LDC geeft de aantallen door aan de keuken, de vrijdag voor de nieuwe week begint.')
on conflict (id) do nothing;

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
