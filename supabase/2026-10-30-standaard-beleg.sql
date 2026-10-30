-- Bij ontbijt en avondmaal komt er naast het vermelde gerecht standaard ook beleg mee, afwisselend geleverd op de afdeling.
update public.vv_menus set gerecht = gerecht || ' · standaard beleg (afwisselend)'
where component = 'Brood en beleg' and maaltijd in ('Ontbijt', 'Avondmaal') and gerecht not like '%standaard beleg%';
select datum, maaltijd, gerecht from public.vv_menus where component = 'Brood en beleg' order by datum, maaltijd;
