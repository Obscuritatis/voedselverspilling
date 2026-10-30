-- Centraal weekmenu van de hoofdkeuken, 02/11/2026 tot 08/11/2026.
-- Bij ontbijt en avondmaal: standaard keuze wit, grijs of meergranen brood en standaard beleg (afwisselend).
insert into public.vv_producten (naam, component, eenheid, vervangt) values ('Penne met balletjes', 'Samengesteld gerecht', 'g', array['Vlees, vis of vegetarisch', 'Saus', 'Zetmeel (aardappel, pasta, rijst)', 'Groenten']::text[]) on conflict do nothing;
insert into public.vv_producten (naam, component, eenheid, vervangt) values ('Gentse waterzooi', 'Samengesteld gerecht', 'g', array['Vlees, vis of vegetarisch', 'Groenten', 'Saus']::text[]) on conflict do nothing;
insert into public.vv_menus (site_id, datum, maaltijd, component, gerecht)
select null, v.datum::date, v.maaltijd, v.component, v.gerecht from (values
  ('2026-11-02', 'Ontbijt', 'Brood en beleg', 'Kaas bel paesa · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-02', 'Middagmaal', 'Soep', 'Knolseldersoep'),
  ('2026-11-02', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Vogelnestje'),
  ('2026-11-02', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Winterse puree'),
  ('2026-11-02', 'Middagmaal', 'Dessert', 'Chocomousse'),
  ('2026-11-02', 'Avondmaal', 'Brood en beleg', 'Mosterdspek / Gebraad (dieet: gebraad natuur) · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-03', 'Ontbijt', 'Brood en beleg', 'Maredsous smeerkaas · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-03', 'Middagmaal', 'Soep', 'Soep van de dag'),
  ('2026-11-03', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Veggie loempia''s'),
  ('2026-11-03', 'Middagmaal', 'Groenten', 'Wokgroenten in lichte curry'),
  ('2026-11-03', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Gebakken rijst'),
  ('2026-11-03', 'Middagmaal', 'Dessert', 'Fruit'),
  ('2026-11-03', 'Avondmaal', 'Brood en beleg', 'Hesp / kaas · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-04', 'Ontbijt', 'Brood en beleg', 'Speculaaspasta · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-04', 'Middagmaal', 'Soep', 'Preisoep'),
  ('2026-11-04', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Chipolata'),
  ('2026-11-04', 'Middagmaal', 'Groenten', 'Witte kool'),
  ('2026-11-04', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Aardappelen'),
  ('2026-11-04', 'Middagmaal', 'Dessert', 'Yoghurt met fruit'),
  ('2026-11-04', 'Avondmaal', 'Brood en beleg', 'Franse salade / Eiersalade (dieet: dieetkaas) · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-05', 'Ontbijt', 'Brood en beleg', 'Ontbijtgranen · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-05', 'Middagmaal', 'Soep', 'Maïssoep'),
  ('2026-11-05', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Gebraad'),
  ('2026-11-05', 'Middagmaal', 'Groenten', 'Snijboontjes'),
  ('2026-11-05', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Aardappelen'),
  ('2026-11-05', 'Middagmaal', 'Dessert', 'Fruit'),
  ('2026-11-05', 'Avondmaal', 'Brood en beleg', 'Farmersalade / Americain · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-06', 'Ontbijt', 'Brood en beleg', 'Petit suisse fruit · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-06', 'Middagmaal', 'Soep', 'Herfstsoep'),
  ('2026-11-06', 'Middagmaal', 'Samengesteld gerecht', 'Penne met balletjes in tomatensaus, fijne groentjes en mascarpone'),
  ('2026-11-06', 'Middagmaal', 'Dessert', 'Pudding'),
  ('2026-11-06', 'Avondmaal', 'Brood en beleg', 'Charcuterieschotel · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-07', 'Ontbijt', 'Brood en beleg', 'Chocoladereep · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-07', 'Middagmaal', 'Soep', 'Juliennesoep'),
  ('2026-11-07', 'Middagmaal', 'Vlees, vis of vegetarisch', 'Hamburger'),
  ('2026-11-07', 'Middagmaal', 'Groenten', 'Parijse worteltjes'),
  ('2026-11-07', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Aardappelen'),
  ('2026-11-07', 'Middagmaal', 'Dessert', 'Dessert van de dag'),
  ('2026-11-07', 'Avondmaal', 'Brood en beleg', 'Kipham natuur / Salami · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-08', 'Ontbijt', 'Brood en beleg', 'Chocoladebroodjes · wit, grijs of meergranen brood · standaard beleg (afwisselend)'),
  ('2026-11-08', 'Middagmaal', 'Soep', 'Tomatensoep met balletjes'),
  ('2026-11-08', 'Middagmaal', 'Samengesteld gerecht', 'Gentse waterzooi'),
  ('2026-11-08', 'Middagmaal', 'Zetmeel (aardappel, pasta, rijst)', 'Gekookte aardappelen'),
  ('2026-11-08', 'Middagmaal', 'Dessert', 'Kaastaart'),
  ('2026-11-08', 'Avondmaal', 'Brood en beleg', 'Tonijnsalade / Surimisalade (dieet: dieetslaatje) · wit, grijs of meergranen brood · standaard beleg (afwisselend)')
) as v(datum, maaltijd, component, gerecht)
on conflict (coalesce(site_id, ''), datum, maaltijd, component) do update set gerecht = excluded.gerecht;
select datum, maaltijd, component, gerecht from public.vv_menus where site_id is null and datum between '2026-11-02' and '2026-11-08' order by datum, maaltijd, component;
