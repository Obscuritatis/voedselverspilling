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
alter table public.vv_maaltijden enable row level security;
drop policy if exists "vv_maaltijden voor collega's" on public.vv_maaltijden;
create policy "vv_maaltijden voor collega's" on public.vv_maaltijden for all to authenticated
  using (public.heeft_toegang()) with check (public.heeft_toegang());
do $$
begin
  alter publication supabase_realtime add table public.vv_maaltijden;
exception when duplicate_object then null;
end $$;
