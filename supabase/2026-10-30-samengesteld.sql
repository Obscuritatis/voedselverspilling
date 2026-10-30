-- Samengestelde gerechten (30/10/2026): één hoeveelheid per persoon; "vervangt" = onderdelen die erin zitten
-- en dan niet apart meetellen (vlees, saus, zetmeel, groenten).
alter table public.vv_producten add column if not exists vervangt text[] not null default '{}';
-- Stoemp en zetmeelsoorten met een samenstelling worden een samengesteld gerecht met zetmeel en groenten.
update public.vv_producten set component = 'Samengesteld gerecht',
  gram = coalesce(gram, (select sum((o->>'gram')::numeric) from jsonb_array_elements(onderdelen) o)),
  vervangt = array['Zetmeel (aardappel, pasta, rijst)', 'Groenten'], onderdelen = '[]'::jsonb
where component = 'Zetmeel (aardappel, pasta, rijst)' and (jsonb_array_length(onderdelen) > 0 or naam ilike '%stoemp%');
insert into public.vv_producten (naam, component, eenheid, vervangt) values
  ('Lasagne', 'Samengesteld gerecht', 'g', array['Vlees, vis of vegetarisch', 'Groenten', 'Zetmeel (aardappel, pasta, rijst)']),
  ('Stoofvlees', 'Samengesteld gerecht', 'g', array['Vlees, vis of vegetarisch', 'Saus']),
  ('Stoemp', 'Samengesteld gerecht', 'g', array['Zetmeel (aardappel, pasta, rijst)', 'Groenten'])
on conflict do nothing;
select component, naam, gram, vervangt from public.vv_producten order by component, naam;
