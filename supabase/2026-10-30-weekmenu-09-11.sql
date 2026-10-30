-- Centraal weekmenu van de hoofdkeuken, 09/11/2026 tot 15/11/2026.
-- Bij ontbijt en avondmaal: standaard keuze wit, grijs of meergranen brood en standaard beleg (afwisselend).
insert into public.vv_producten (naam, component, eenheid, vervangt) values ('Spaghetti bolognaise', 'Samengesteld gerecht', 'g', array['Vlees, vis of vegetarisch', 'Saus', 'Zetmeel (aardappel, pasta, rijst)', 'Groenten']::text[]) on conflict do nothing;
update public.vv_producten set gram = 565, richtlijn = true, toelichting = 'Som van de richtlijnen voor vlees, vis of vegetarisch (90 g), saus (75 ml), koolhydraten (175 g), groenten (225 g).' where naam = 'Spaghetti bolognaise' and gram is null;
insert into public.vv_menus (site_id, datum, maaltijd, component, gerecht)
select null, v.datum::date, v.maaltijd, v.component, v.gerecht from (values
  ('2026-11-09', 'Ontbijt', 'Brood en beleg', 'Petit Suisse kaasje · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-09', 'Middagmaal', 'Soep', 'Pastinaaksoep'),
  ('2026-11-09', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Groenteburger'),
  ('2026-11-09', 'Middagmaal', 'Saus', 'Champignonsaus'),
  ('2026-11-09', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Gebakken aardappelen'),
  ('2026-11-09', 'Middagmaal', 'Dessert', 'Fruit'),
  ('2026-11-09', 'Avondmaal', 'Brood en beleg', 'Ardeense hesp / gekookte ham (dieet: filet de Saxe) · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-10', 'Ontbijt', 'Brood en beleg', 'Ontbijtgranen · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-10', 'Middagmaal', 'Soep', 'Pompoensoep'),
  ('2026-11-10', 'Middagmaal', 'Samengesteld gerecht', 'Spaghetti bolognaise'),
  ('2026-11-10', 'Middagmaal', 'Dessert', 'Chocomousse'),
  ('2026-11-10', 'Avondmaal', 'Brood en beleg', 'Houmous / groentensalade · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-11', 'Ontbijt', 'Brood en beleg', 'Chocoladereep · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-11', 'Middagmaal', 'Soep', 'Courgettesoep'),
  ('2026-11-11', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Kippenbil/filet'),
  ('2026-11-11', 'Middagmaal', 'Groenten', 'Appelmoes'),
  ('2026-11-11', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Frietjes'),
  ('2026-11-11', 'Middagmaal', 'Dessert', 'Fruix yoghurt'),
  ('2026-11-11', 'Avondmaal', 'Brood en beleg', 'Charcuterieschotel (dieet: komkommerslaatje) · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-12', 'Ontbijt', 'Brood en beleg', 'Smeerkaas · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-12', 'Middagmaal', 'Soep', 'Soupe du jour'),
  ('2026-11-12', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Vis'),
  ('2026-11-12', 'Middagmaal', 'Saus', 'Americainesaus'),
  ('2026-11-12', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Venkelpuree'),
  ('2026-11-12', 'Middagmaal', 'Dessert', 'Fruitsalade'),
  ('2026-11-12', 'Avondmaal', 'Brood en beleg', 'Hollandse kaas / hesp (dieet: brie light) · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-13', 'Ontbijt', 'Brood en beleg', 'Sneetje kaas · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-13', 'Middagmaal', 'Soep', 'Knolseldersoep'),
  ('2026-11-13', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Braadworst (dieet: mignonette)'),
  ('2026-11-13', 'Middagmaal', 'Groenten', 'Bloemkool'),
  ('2026-11-13', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Aardappelen'),
  ('2026-11-13', 'Middagmaal', 'Dessert', 'Fruit'),
  ('2026-11-13', 'Avondmaal', 'Brood en beleg', 'Hespenworst / Strasbourg (dieet: kipfilet) · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-14', 'Ontbijt', 'Brood en beleg', 'Chocoladekorreltjes · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-14', 'Middagmaal', 'Soep', 'Tomatensoep'),
  ('2026-11-14', 'Middagmaal', 'Samengesteld gerecht', 'Winters stoofvlees'),
  ('2026-11-14', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Krieltjes met peterselie'),
  ('2026-11-14', 'Middagmaal', 'Dessert', 'Dessert van de dag'),
  ('2026-11-14', 'Avondmaal', 'Brood en beleg', 'Kipsalade / kip curry · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-15', 'Ontbijt', 'Brood en beleg', 'Pistolets met hesp · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-15', 'Middagmaal', 'Soep', 'Aspergesoep'),
  ('2026-11-15', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Slavink'),
  ('2026-11-15', 'Middagmaal', 'Groenten', 'Rode kool'),
  ('2026-11-15', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Aardappelen'),
  ('2026-11-15', 'Middagmaal', 'Dessert', 'Tarte maison'),
  ('2026-11-15', 'Avondmaal', 'Brood en beleg', 'Americain / eiersalade (dieet: platte kaas met fijne kruiden) · wit, grijs of meergranen brood · standaard beleg (afwisselend)')
) as v(datum, maaltijd, component, gerecht)
on conflict (coalesce(site_id, ''), datum, maaltijd, component) do update set gerecht = excluded.gerecht;
-- Gerechten waarin een samengesteld gerecht uit de lijst bij Productie zit (zoals Johan ze daar ingaf), naar een vrije plaats
-- "Samengesteld gerecht" (… 2, … 3) verplaatsen. Zo worden ook nieuwe samengestelde gerechten herkend.
with bestaand as (
  select datum, maaltijd, count(*) as n from public.vv_menus
  where site_id is null and datum between '2026-11-09' and '2026-11-15' and component like 'Samengesteld gerecht%' group by datum, maaltijd
), kand as (
  select m.id, row_number() over (partition by m.datum, m.maaltijd order by m.component) + coalesce(b.n, 0) as plaats
  from public.vv_menus m left join bestaand b on b.datum = m.datum and b.maaltijd = m.maaltijd
  where m.site_id is null and m.datum between '2026-11-09' and '2026-11-15' and m.component not like 'Samengesteld gerecht%'
    and exists (select 1 from public.vv_producten p where p.component = 'Samengesteld gerecht' and length(p.naam) > 2 and position(lower(p.naam) in lower(m.gerecht)) > 0)
)
update public.vv_menus m set component = case k.plaats when 1 then 'Samengesteld gerecht' else 'Samengesteld gerecht ' || k.plaats end
from kand k where m.id = k.id and k.plaats <= 3;
select datum, maaltijd, component, gerecht from public.vv_menus where site_id is null and datum between '2026-11-09' and '2026-11-15' order by datum, maaltijd, component;
