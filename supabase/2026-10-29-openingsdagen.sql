-- Openingsdagen per afdeling (29/10/2026): 1 = maandag … 7 = zondag, leeg = elke dag.
alter table public.vv_afdelingen add column if not exists open_dagen smallint[];
alter table public.vv_afdelingen drop constraint if exists vv_afdelingen_open_dagen_check;
alter table public.vv_afdelingen add constraint vv_afdelingen_open_dagen_check check (open_dagen <@ array[1, 2, 3, 4, 5, 6, 7]::smallint[]);
-- Buurtrestaurant Het Prieeltje (Huize Nazareth) is enkel open op maandag en donderdag.
update public.vv_afdelingen set open_dagen = array[1, 4]::smallint[] where id = 'wzc-huize-nazareth-prieeltje';
select naam, open_dagen from public.vv_afdelingen where site_id = 'wzc-huize-nazareth' order by volgorde;
