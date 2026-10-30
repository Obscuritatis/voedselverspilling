-- Centraal weekmenu van de hoofdkeuken, 26/10/2026 tot 01/11/2026.
-- Bij ontbijt en avondmaal is er standaard de keuze tussen wit, grijs en meergranen brood.
insert into public.vv_producten (naam, component, eenheid) values ('Brood en beleg', 'Brood en beleg', 'g') on conflict do nothing;
insert into public.vv_producten (naam, component, eenheid) values ('Spaghetti', 'Zetmeel (aardappel, pasta, rijst)', 'g') on conflict do nothing;
insert into public.vv_menus (site_id, datum, maaltijd, component, gerecht)
select null, v.datum::date, v.maaltijd, v.component, v.gerecht from (values
  ('2026-10-26', 'Ontbijt', 'Brood en beleg', 'Smeerkaas · wit, grijs of meergranen brood'),
  ('2026-10-26', 'Middagmaal', 'Soep', 'Tomatensoep'),
  ('2026-10-26', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Gebakken vis'),
  ('2026-10-26', 'Middagmaal', 'Saus', 'Mousseline saus'),
  ('2026-10-26', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Preistoemp'),
  ('2026-10-26', 'Middagmaal', 'Dessert', 'Dessert van de dag'),
  ('2026-10-26', 'Avondmaal', 'Brood en beleg', 'Surimi-salade / Gebraad · wit, grijs of meergranen brood'),
  ('2026-10-27', 'Ontbijt', 'Brood en beleg', 'Kaassneetje · wit, grijs of meergranen brood'),
  ('2026-10-27', 'Middagmaal', 'Soep', 'Soupe du jour'),
  ('2026-10-27', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Ardeense burger'),
  ('2026-10-27', 'Middagmaal', 'Groenten', 'Rode kool'),
  ('2026-10-27', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Aardappelen'),
  ('2026-10-27', 'Middagmaal', 'Saus', 'Graanmosterdsaus'),
  ('2026-10-27', 'Middagmaal', 'Dessert', 'Fruit'),
  ('2026-10-27', 'Avondmaal', 'Brood en beleg', 'Charcuterieschotel · wit, grijs of meergranen brood'),
  ('2026-10-28', 'Ontbijt', 'Brood en beleg', 'Chocoladereep · wit, grijs of meergranen brood'),
  ('2026-10-28', 'Middagmaal', 'Soep', 'Heldere groentesoep'),
  ('2026-10-28', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Veggie balletjes'),
  ('2026-10-28', 'Middagmaal', 'Saus', 'Arrabiata saus'),
  ('2026-10-28', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Spaghetti'),
  ('2026-10-28', 'Middagmaal', 'Dessert', 'Fruit yoghurt'),
  ('2026-10-28', 'Avondmaal', 'Brood en beleg', 'Kip curry / Hespenslaatje · wit, grijs of meergranen brood'),
  ('2026-10-29', 'Ontbijt', 'Brood en beleg', 'Banaan · wit, grijs of meergranen brood'),
  ('2026-10-29', 'Middagmaal', 'Soep', 'Ajuinsoep'),
  ('2026-10-29', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Kipfilet'),
  ('2026-10-29', 'Middagmaal', 'Groenten', 'Boontjes met peterselie'),
  ('2026-10-29', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Aardappelen'),
  ('2026-10-29', 'Middagmaal', 'Dessert', 'Fruit'),
  ('2026-10-29', 'Avondmaal', 'Brood en beleg', 'Worstenbroodjes · wit, grijs of meergranen brood'),
  ('2026-10-30', 'Ontbijt', 'Brood en beleg', 'Ontbijtgranen · wit, grijs of meergranen brood'),
  ('2026-10-30', 'Middagmaal', 'Soep', 'Pompoensoep'),
  ('2026-10-30', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Mignonette'),
  ('2026-10-30', 'Middagmaal', 'Saus', 'Picklessaus'),
  ('2026-10-30', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Ajuin stoemp'),
  ('2026-10-30', 'Middagmaal', 'Dessert', 'Pudding van de bomma'),
  ('2026-10-30', 'Avondmaal', 'Brood en beleg', 'Maredsous / Lentesalade · wit, grijs of meergranen brood'),
  ('2026-10-31', 'Ontbijt', 'Brood en beleg', 'Babybel · wit, grijs of meergranen brood'),
  ('2026-10-31', 'Middagmaal', 'Soep', 'Komkommer-courgettesoep'),
  ('2026-10-31', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Kaashamburger'),
  ('2026-10-31', 'Middagmaal', 'Groenten', 'Bloemkool'),
  ('2026-10-31', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Aardappelen'),
  ('2026-10-31', 'Middagmaal', 'Dessert', 'Fruit'),
  ('2026-10-31', 'Avondmaal', 'Brood en beleg', 'Tonijnsalade / Hollandse kaas · wit, grijs of meergranen brood'),
  ('2026-11-01', 'Ontbijt', 'Brood en beleg', 'Sandwiches met hesp · wit, grijs of meergranen brood'),
  ('2026-11-01', 'Middagmaal', 'Soep', 'Bloemkoolroomsoep'),
  ('2026-11-01', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Vol au vent'),
  ('2026-11-01', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Frietjes'),
  ('2026-11-01', 'Middagmaal', 'Dessert', 'Sachertorte'),
  ('2026-11-01', 'Avondmaal', 'Brood en beleg', 'Kipsalade / Brie · wit, grijs of meergranen brood')
) as v(datum, maaltijd, component, gerecht)
on conflict (coalesce(site_id, ''), datum, maaltijd, component) do update set gerecht = excluded.gerecht;
-- Het menu van 30/10 stond eerst bij Huize Nazareth; die rijen zijn nu overbodig.
delete from public.vv_menus m where m.site_id = 'wzc-huize-nazareth' and m.datum = '2026-10-30' and m.maaltijd = 'Middagmaal'
  and exists (select 1 from public.vv_menus c where c.site_id is null and c.datum = m.datum and c.maaltijd = m.maaltijd and c.component = m.component and c.gerecht = m.gerecht);
select datum, maaltijd, component, gerecht from public.vv_menus where site_id is null and datum between '2026-10-26' and '2026-11-01' order by datum, maaltijd, component;
