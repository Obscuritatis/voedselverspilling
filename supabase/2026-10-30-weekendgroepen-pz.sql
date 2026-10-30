-- Psychiatrisch ziekenhuis (30/10/2026): groepen die op weekdagen in het personeelsrestaurant eten,
-- eten op zaterdag en zondag op hun afdeling (aparte kar). Het personeelsrestaurant is in het weekend dicht.
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, capaciteit, huidige_bezetting, huidige_bezetting_op, open_dagen, omschrijving) values
  ('psychiatrisch-ziekenhuis-verslavingszorg-groep-d', 'psychiatrisch-ziekenhuis', 'Verslavingszorg (groep D)', 'patientenafdeling', 13, 15, 15, current_date, array[6, 7]::smallint[], 'Enkel zaterdag en zondag (aparte kar). Op weekdagen eet deze groep in het personeelsrestaurant.'),
  ('psychiatrisch-ziekenhuis-ap2-groep-b-c1-c2', 'psychiatrisch-ziekenhuis', 'AP2 (groep B, C1 en C2)', 'patientenafdeling', 14, 34, 34, current_date, array[6, 7]::smallint[], 'Enkel zaterdag en zondag (aparte kar). Op weekdagen eten deze groepen in het personeelsrestaurant.'),
  ('psychiatrisch-ziekenhuis-jeugdpsychiatrie-crossroads-lighthouse', 'psychiatrisch-ziekenhuis', 'Jeugdpsychiatrie (Crossroads en Lighthouse)', 'patientenafdeling', 15, 15, 15, current_date, array[6, 7]::smallint[], 'Enkel zaterdag en zondag (aparte kar). Op weekdagen eten deze groepen in het personeelsrestaurant.')
on conflict (id) do nothing;

update public.vv_afdelingen
set open_dagen = array[1, 2, 3, 4, 5]::smallint[],
    omschrijving = 'Restaurant voor medewerkers, open van maandag tot vrijdag. Op weekdagen eten hier ook vaste groepen patiënten: Verslavingszorg groep D (15), AP2 groep B, C1 en C2 (34) en Jeugdpsychiatrie Crossroads en Lighthouse (15), samen 64. Daarbovenop komen de inschrijvingen van het personeel. Op zaterdag en zondag is het restaurant dicht en eten deze groepen op hun afdeling (aparte kar); daarvoor staan ze als aparte afdelingen in de lijst.'
where id = 'psychiatrisch-ziekenhuis-personeelsrestaurant';

select naam, capaciteit as max, huidige_bezetting as huidig, open_dagen from public.vv_afdelingen
where site_id = 'psychiatrisch-ziekenhuis' order by volgorde;
