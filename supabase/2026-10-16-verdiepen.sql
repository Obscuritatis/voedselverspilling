-- Eenmalig (16/10/2026): Sint-Jozef en Sint-Elisabeth opsplitsen per verdiep.
-- Plak in Supabase > SQL Editor en klik op Run. Opnieuw uitvoeren kan geen kwaad.
-- Bestaande metingen, gevoeligheden en acties van "Sint-Jozef" horen voortaan bij verdiep 2,
-- die van "Sint-Elisabeth" bij verdiep 1.

update public.vv_afdelingen set naam = 'Sint-Jozef verdiep 2' where id = 'wzc-huize-nazareth-sint-jozef';
update public.vv_afdelingen set naam = 'Sint-Elisabeth verdiep 1' where id = 'wzc-huize-nazareth-sint-elisabeth';

insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, omschrijving) values
  ('wzc-huize-nazareth-sint-jozef-3', 'wzc-huize-nazareth', 'Sint-Jozef verdiep 3', 'woonafdeling', 3, ''),
  ('wzc-huize-nazareth-sint-elisabeth-2', 'wzc-huize-nazareth', 'Sint-Elisabeth verdiep 2', 'woonafdeling', 5, '')
on conflict (id) do nothing;

update public.vv_afdelingen set volgorde = v.volgorde
from (values ('wzc-huize-nazareth-heilig-hart', 1), ('wzc-huize-nazareth-sint-jozef', 2), ('wzc-huize-nazareth-sint-jozef-3', 3),
             ('wzc-huize-nazareth-sint-elisabeth', 4), ('wzc-huize-nazareth-sint-elisabeth-2', 5), ('wzc-huize-nazareth-sint-franciscus', 6),
             ('wzc-huize-nazareth-gozewijn', 7), ('wzc-huize-nazareth-prieeltje', 8)) as v(id, volgorde)
where public.vv_afdelingen.id = v.id;
