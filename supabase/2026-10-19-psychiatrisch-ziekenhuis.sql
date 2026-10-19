-- Eenmalig (19/10/2026): patiëntenafdelingen van het psychiatrisch ziekenhuis.
-- Plak in Supabase > SQL Editor en klik op Run. Opnieuw uitvoeren kan geen kwaad.

insert into public.vv_afdelingen (id, site_id, naam, type, volgorde) values
  ('psychiatrisch-ziekenhuis-ouderenpsychiatrie-1', 'psychiatrisch-ziekenhuis', 'Ouderenpsychiatrie 1', 'patientenafdeling', 1),
  ('psychiatrisch-ziekenhuis-ouderenpsychiatrie-2', 'psychiatrisch-ziekenhuis', 'Ouderenpsychiatrie 2', 'patientenafdeling', 2),
  ('psychiatrisch-ziekenhuis-ap1-living-1', 'psychiatrisch-ziekenhuis', 'AP1 (living 1)', 'patientenafdeling', 3),
  ('psychiatrisch-ziekenhuis-ap1-living-2', 'psychiatrisch-ziekenhuis', 'AP1 (living 2)', 'patientenafdeling', 4),
  ('psychiatrisch-ziekenhuis-ap1-motivatiegroep', 'psychiatrisch-ziekenhuis', 'AP1 (motivatiegroep)', 'patientenafdeling', 5),
  ('psychiatrisch-ziekenhuis-ap2-groep-a', 'psychiatrisch-ziekenhuis', 'AP2 (groep A)', 'patientenafdeling', 6),
  ('psychiatrisch-ziekenhuis-verslavingszorg-observatie', 'psychiatrisch-ziekenhuis', 'Verslavingszorg (observatie)', 'patientenafdeling', 7),
  ('psychiatrisch-ziekenhuis-verslavingszorg-groep-2-b', 'psychiatrisch-ziekenhuis', 'Verslavingszorg (groep 2 – B)', 'patientenafdeling', 8),
  ('psychiatrisch-ziekenhuis-verslavingszorg-groep-2-ac-kw', 'psychiatrisch-ziekenhuis', 'Verslavingszorg (groep 2 – AC-KW)', 'patientenafdeling', 9),
  ('psychiatrisch-ziekenhuis-eetherstel-leefgroep-1', 'psychiatrisch-ziekenhuis', 'Eetherstel (leefgroep 1)', 'patientenafdeling', 10)
on conflict (id) do update set type = excluded.type, volgorde = excluded.volgorde;
