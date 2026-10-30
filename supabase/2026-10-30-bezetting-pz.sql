-- Max. bezetting psychiatrisch ziekenhuis (30/10/2026). Zonder huidige bezetting wordt de max. bezetting overgenomen.
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde) values
  ('psychiatrisch-ziekenhuis-jeugdpsychiatrie-pathways', 'psychiatrisch-ziekenhuis', 'Jeugdpsychiatrie (Pathways)', 'patientenafdeling', 11)
on conflict (id) do nothing;
update public.vv_afdelingen set volgorde = 12 where id = 'psychiatrisch-ziekenhuis-personeelsrestaurant';

update public.vv_afdelingen a set capaciteit = v.max,
  huidige_bezetting = coalesce(a.huidige_bezetting, v.max),
  huidige_bezetting_op = case when a.huidige_bezetting is null then current_date else a.huidige_bezetting_op end
from (values
  ('psychiatrisch-ziekenhuis-ouderenpsychiatrie-1', 22),
  ('psychiatrisch-ziekenhuis-ouderenpsychiatrie-2', 23),
  ('psychiatrisch-ziekenhuis-jeugdpsychiatrie-pathways', 7),
  ('psychiatrisch-ziekenhuis-ap1-living-1', 13),
  ('psychiatrisch-ziekenhuis-ap1-living-2', 17),
  ('psychiatrisch-ziekenhuis-ap1-motivatiegroep', 10),
  ('psychiatrisch-ziekenhuis-ap2-groep-a', 15),
  ('psychiatrisch-ziekenhuis-verslavingszorg-observatie', 30),
  ('psychiatrisch-ziekenhuis-verslavingszorg-groep-2-b', 14),
  ('psychiatrisch-ziekenhuis-verslavingszorg-groep-2-ac-kw', 34),
  ('psychiatrisch-ziekenhuis-eetherstel-leefgroep-1', 13),
  ('psychiatrisch-ziekenhuis-personeelsrestaurant', 64)
) as v(id, max)
where a.id = v.id;

update public.vv_afdelingen
set omschrijving = 'Restaurant voor medewerkers. Vaste aantallen van afdelingen: Verslavingszorg groep D 15, AP2 groep B, C1 en C2 34, Jeugdpsychiatrie Crossroads en Lighthouse 15 (samen 64). Dit aantal is enkel dat van deze afdelingen; daarna komen nog de inschrijvingen van het personeel bij.'
where id = 'psychiatrisch-ziekenhuis-personeelsrestaurant';

select naam, capaciteit as max, huidige_bezetting as huidig, omschrijving
from public.vv_afdelingen where site_id = 'psychiatrisch-ziekenhuis' order by volgorde;
