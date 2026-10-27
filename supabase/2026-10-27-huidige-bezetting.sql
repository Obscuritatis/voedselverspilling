-- Huidige bezetting per afdeling, naast de vaste maximale bezetting (27/10/2026).
alter table public.vv_afdelingen add column if not exists huidige_bezetting integer check (huidige_bezetting >= 0);
alter table public.vv_afdelingen add column if not exists huidige_bezetting_op date;
