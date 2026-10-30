-- Menu van 30/10/2026 (middagmaal) van Huize Nazareth overnemen als centraal menu van de hoofdkeuken.
-- Bestaat er voor een onderdeel al een centraal gerecht, dan blijft de rij van Huize Nazareth gewoon staan.
update public.vv_menus m set site_id = null
where m.site_id = 'wzc-huize-nazareth' and m.datum = '2026-10-30' and m.maaltijd = 'Middagmaal'
  and not exists (select 1 from public.vv_menus c where c.site_id is null and c.datum = m.datum and c.maaltijd = m.maaltijd and c.component = m.component);
select coalesce(site_id, 'centraal') as voor, component, gerecht from public.vv_menus where datum = '2026-10-30' order by 1, 2;
