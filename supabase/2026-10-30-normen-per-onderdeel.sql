-- Normen per onderdeel (30/10/2026): één hoeveelheid per onderdeel, enkel zetmeel per soort.
-- Een onderdeel-norm is de rij waarvan naam = component.
insert into public.vv_producten (naam, component, eenheid) values
  ('Soep', 'Soep', 'ml'),
  ('Vlees, vis of vegetarisch', 'Vlees, vis of vegetarisch', 'g'),
  ('Saus', 'Saus', 'g'),
  ('Groenten', 'Groenten', 'g'),
  ('Dessert', 'Dessert', 'g')
on conflict do nothing;
-- Grammen die al bij een gerecht ingevuld werden (bv. Pompoensoep), overnemen naar het onderdeel als dat nog leeg is.
update public.vv_producten o set gram = g.gram, eenheid = g.eenheid
from public.vv_producten g
where o.naam = o.component and o.gram is null
  and g.component = o.component and g.naam <> g.component and g.gram is not null
  and o.component <> 'Zetmeel (aardappel, pasta, rijst)';
-- Losse gerechten buiten zetmeel zijn niet meer nodig.
delete from public.vv_producten where component <> 'Zetmeel (aardappel, pasta, rijst)' and naam <> component;
select component, naam, gram, eenheid from public.vv_producten order by component, naam;
