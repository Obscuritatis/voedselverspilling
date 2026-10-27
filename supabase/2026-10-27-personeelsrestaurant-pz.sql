-- Personeelsrestaurant bij het psychiatrisch ziekenhuis (27/10/2026).
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, omschrijving) values
  ('psychiatrisch-ziekenhuis-personeelsrestaurant', 'psychiatrisch-ziekenhuis', 'Personeelsrestaurant', 'restaurant', 11, 'Restaurant voor medewerkers')
on conflict (id) do nothing;
