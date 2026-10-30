-- Huidige bezetting gesplitst (30/10/2026): huidige_bezetting = standaardmaaltijden, huidige_dieet = gemixt/diëten.
alter table public.vv_afdelingen add column if not exists huidige_dieet integer check (huidige_dieet >= 0);

-- Huize Nazareth, gekende aantallen van 30/10/2026 (standaard + gemixt/diëten).
update public.vv_afdelingen a
set huidige_bezetting = v.standaard, huidige_dieet = v.dieet, huidige_bezetting_op = current_date
from (values
  ('wzc-huize-nazareth-sint-elisabeth', 18, 6),     -- 5 gemalen + 1 volmix
  ('wzc-huize-nazareth-sint-elisabeth-2', 10, 3),
  ('wzc-huize-nazareth-sint-franciscus', 17, 10),   -- 9 gemalen + 1 drinkbaar volmix
  ('wzc-huize-nazareth-heilig-hart', 22, 11),
  ('wzc-huize-nazareth-sint-jozef', 16, 9),
  ('wzc-huize-nazareth-sint-jozef-3', 10, 5),
  ('wzc-huize-nazareth-gozewijn', 30, 0)
) as v(id, standaard, dieet)
where a.id = v.id;

select naam, capaciteit as max, huidige_bezetting as standaard, huidige_dieet as gemixt_dieten
from public.vv_afdelingen where site_id = 'wzc-huize-nazareth' order by volgorde;
