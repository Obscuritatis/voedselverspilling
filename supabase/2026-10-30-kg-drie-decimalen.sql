-- Wegingen tot 3 cijfers na de komma (op de gram), 30/10/2026. Bestaande wegingen blijven ongewijzigd.
alter table public.vv_metingen alter column kg type numeric(9,3);
select column_name, numeric_precision, numeric_scale from information_schema.columns
where table_schema = 'public' and table_name = 'vv_metingen' and column_name = 'kg';
