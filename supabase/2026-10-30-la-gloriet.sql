-- La Gloriet (30/10/2026): feest voor de jarigen in Het Prieeltje, elke laatste vrijdag van de maand.
-- open_laatste: de afdeling is (ook) open op de laatste <dag> van de maand (1 = maandag … 7 = zondag).
alter table public.vv_afdelingen add column if not exists open_laatste smallint check (open_laatste between 1 and 7);
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, omschrijving, open_laatste) values
  ('wzc-huize-nazareth-la-gloriet', 'wzc-huize-nazareth', 'La Gloriet', 'restaurant', 9, 'Feest voor de jarigen in Het Prieeltje, elke laatste vrijdag van de maand', 5)
on conflict (id) do nothing;
-- Vandaag: 8 standaard maaltijden klaargemaakt.
insert into public.vv_maaltijden (site_id, afdeling_id, datum, maaltijd, porties, porties_dieet) values
  ('wzc-huize-nazareth', 'wzc-huize-nazareth-la-gloriet', '2026-10-30', 'Middagmaal', 8, 0)
on conflict (afdeling_id, datum, maaltijd) do update set porties = 8, porties_dieet = 0;
select naam, open_dagen, open_laatste from public.vv_afdelingen where site_id = 'wzc-huize-nazareth' order by volgorde;
