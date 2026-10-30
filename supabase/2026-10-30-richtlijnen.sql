-- Tijdelijke richtlijnen voor hoeveelheden per persoon (30/10/2026), met toelichting.
-- Bron: richtlijnen van Johan (groenten, koolhydraten, eiwitten, saus). We rekenen met het midden van de vork.
alter table public.vv_producten add column if not exists toelichting text not null default '';
alter table public.vv_producten add column if not exists richtlijn boolean not null default false;

update public.vv_producten p set gram = v.gram, eenheid = v.eenheid, toelichting = v.toelichting, richtlijn = true
from (values
  ('Groenten', 225, 'g', 'Richtlijn 200 à 250 g (gerekend: 225 g). Dit vult de helft van het bord. De dagelijkse aanbeveling in België is minstens 300 g groenten.'),
  ('Vlees, vis of vegetarisch', 90, 'g', 'Richtlijn 75 à 100 g (gerekend: 90 g). Dit vult het resterende kwart van het bord. Vis of een vegetarisch alternatief heeft de voorkeur. Rood vlees wordt best beperkt tot max. 300 g per week.'),
  ('Saus', 75, 'ml', 'Richtlijn 50 à 100 ml (gerekend: 75 ml). Gebruik sauzen met mate en kies bij voorkeur voor sauzen op basis van plantaardige oliën of tomaten.')
) as v(naam, gram, eenheid, toelichting)
where p.naam = v.naam and p.component = v.naam;

-- Koolhydraten: elke zetmeelsoort (aardappelen, puree, pasta, rijst …), gekookt gewicht.
update public.vv_producten set gram = 175, eenheid = 'g', richtlijn = true,
  toelichting = 'Richtlijn 150 à 200 g gekookt gewicht (gerekend: 175 g). Dit vult een kwart van het bord. Volkoren varianten hebben altijd de voorkeur. Droog gewicht (pasta/rijst): ca. 60 à 75 g.'
where component = 'Zetmeel (aardappel, pasta, rijst)';

-- Samengestelde gerechten: som van de richtlijnen van de onderdelen die erin zitten.
update public.vv_producten s set gram = t.gram, eenheid = 'g', richtlijn = true,
  toelichting = 'Som van de richtlijnen voor ' || t.delen || '.'
from (
  select s2.id, sum(case c when 'Groenten' then 225 when 'Vlees, vis of vegetarisch' then 90 when 'Saus' then 75 when 'Zetmeel (aardappel, pasta, rijst)' then 175 else 0 end) as gram,
    string_agg(case c when 'Groenten' then 'groenten (225 g)' when 'Vlees, vis of vegetarisch' then 'vlees, vis of vegetarisch (90 g)' when 'Saus' then 'saus (75 ml)' when 'Zetmeel (aardappel, pasta, rijst)' then 'koolhydraten (175 g)' end, ', ') as delen
  from public.vv_producten s2, unnest(s2.vervangt) as c
  where s2.component = 'Samengesteld gerecht'
  group by s2.id
) t
where s.id = t.id and t.gram > 0;

select component, naam, gram, eenheid, toelichting from public.vv_producten order by component, naam;
