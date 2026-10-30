-- Huidige bezetting gesplitst (30/10/2026): huidige_bezetting = standaardmaaltijden, huidige_dieet = gemixt/diëten.
alter table public.vv_afdelingen add column if not exists huidige_dieet integer check (huidige_dieet >= 0);

-- Huize Nazareth: gemixt/diëten overnemen van de laatst ingevulde aantallen (klaargemaakt dieet/gemixt)
-- en aftrekken van de huidige bezetting. Enkel waar gemixt/diëten nog leeg is, zodat opnieuw uitvoeren niets dubbel aftrekt.
with laatste as (
  select distinct on (m.afdeling_id) m.afdeling_id, m.porties_dieet
  from public.vv_maaltijden m
  join public.vv_afdelingen a on a.id = m.afdeling_id
  where a.site_id = 'wzc-huize-nazareth' and m.porties_dieet is not null
  order by m.afdeling_id, m.datum desc, m.porties_dieet desc
)
update public.vv_afdelingen a
set huidige_dieet = l.porties_dieet,
    huidige_bezetting = case when a.huidige_bezetting is null then null else greatest(a.huidige_bezetting - l.porties_dieet, 0) end,
    huidige_bezetting_op = current_date
from laatste l
where a.id = l.afdeling_id and a.huidige_dieet is null;

select naam, capaciteit as max, huidige_bezetting as standaard, huidige_dieet as gemixt_dieten
from public.vv_afdelingen where site_id = 'wzc-huize-nazareth' order by volgorde;
