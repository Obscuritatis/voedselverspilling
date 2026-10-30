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

-- Startlijst zonder grammen: vul de grammen per bewoner in op de pagina Productie.
insert into public.vv_producten (naam, component, eenheid) values
  ('Aardappelen', 'Zetmeel (aardappel, pasta, rijst)', 'g'),
  ('Puree', 'Zetmeel (aardappel, pasta, rijst)', 'g'),
  ('Frietjes', 'Zetmeel (aardappel, pasta, rijst)', 'g'),
  ('Kroketten', 'Zetmeel (aardappel, pasta, rijst)', 'g'),
  ('Rijst', 'Zetmeel (aardappel, pasta, rijst)', 'g'),
  ('Pasta', 'Zetmeel (aardappel, pasta, rijst)', 'g'),
  ('Groenten', 'Groenten', 'g'),
  ('Soep', 'Soep', 'ml'),
  ('Saus', 'Saus', 'g'),
  ('Dessert', 'Dessert', 'g'),
  ('Pompoensoep', 'Soep', 'ml'),
  ('Mignonette', 'Vlees, vis of vegetarisch', 'g'),
  ('Picklessaus', 'Saus', 'g'),
  ('Ajuin stoemp', 'Zetmeel (aardappel, pasta, rijst)', 'g'),
  ('Pudding van de bomma', 'Dessert', 'g')
on conflict do nothing;
select naam, component, gram, eenheid from public.vv_producten order by component, naam;
