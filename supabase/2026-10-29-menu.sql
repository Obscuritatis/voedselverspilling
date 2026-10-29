-- Menu per site, dag en maaltijd: één gerecht per component (29/10/2026).
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
alter table public.vv_menus enable row level security;
drop policy if exists "vv_menus voor collega's" on public.vv_menus;
create policy "vv_menus voor collega's" on public.vv_menus for all to authenticated
  using (public.heeft_toegang()) with check (public.heeft_toegang());
do $$
begin
  alter publication supabase_realtime add table public.vv_menus;
exception when duplicate_object then null;
end $$;

-- Testmenu WZC-Huize Nazareth, middagmaal vrijdag 30/10/2026.
insert into public.vv_menus (site_id, datum, maaltijd, component, gerecht) values
  ('wzc-huize-nazareth', '2026-10-30', 'Middagmaal', 'Soep', 'Pompoensoep'),
  ('wzc-huize-nazareth', '2026-10-30', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Mignonette'),
  ('wzc-huize-nazareth', '2026-10-30', 'Middagmaal', 'Saus', 'Picklessaus'),
  ('wzc-huize-nazareth', '2026-10-30', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Ajuin stoemp'),
  ('wzc-huize-nazareth', '2026-10-30', 'Middagmaal', 'Dessert', 'Pudding van de bomma')
on conflict (site_id, datum, maaltijd, component) do update set gerecht = excluded.gerecht;
select component, gerecht from public.vv_menus where site_id = 'wzc-huize-nazareth' and datum = '2026-10-30';
