-- Stoemp-gerechten die in het menu bij zetmeel staan, verplaatsen naar het veld "Samengesteld gerecht" (30/10/2026).
update public.vv_menus m set component = 'Samengesteld gerecht'
where m.component = 'Zetmeel (aardappel, pasta, rijst)' and m.gerecht ilike '%stoemp%'
  and not exists (select 1 from public.vv_menus c where coalesce(c.site_id, '') = coalesce(m.site_id, '') and c.datum = m.datum and c.maaltijd = m.maaltijd and c.component = 'Samengesteld gerecht');
select coalesce(site_id, 'centraal') as voor, datum, component, gerecht from public.vv_menus where gerecht ilike '%stoemp%' order by datum;
