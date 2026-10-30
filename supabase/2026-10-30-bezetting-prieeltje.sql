-- Vaste bezetting per weekdag (30/10/2026): Het Prieeltje maandag 8, donderdag 14 (1 = maandag … 7 = zondag).
alter table public.vv_afdelingen add column if not exists bezetting_dag jsonb;
update public.vv_afdelingen set bezetting_dag = '{"1": 8, "4": 14}'::jsonb, capaciteit = 14
where id = 'wzc-huize-nazareth-prieeltje';

select naam, capaciteit as max, bezetting_dag from public.vv_afdelingen where id = 'wzc-huize-nazareth-prieeltje';
