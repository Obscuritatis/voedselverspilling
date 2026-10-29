-- Bezetting WZC-Huize Nazareth voor de testmeting (29/10/2026).
update public.vv_afdelingen set capaciteit = 26, huidige_bezetting = 23, huidige_bezetting_op = '2026-10-29' where id = 'wzc-huize-nazareth-sint-franciscus';
update public.vv_afdelingen set capaciteit = 36, huidige_bezetting = 33, huidige_bezetting_op = '2026-10-29' where id = 'wzc-huize-nazareth-heilig-hart';
select naam, capaciteit, huidige_bezetting from public.vv_afdelingen where site_id = 'wzc-huize-nazareth' order by volgorde;
