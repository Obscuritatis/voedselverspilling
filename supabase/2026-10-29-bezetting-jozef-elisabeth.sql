-- Bezetting Sint-Jozef en Sint-Elisabeth (Huize Nazareth), totaal gelijk verdeeld over de twee verdiepen (29/10/2026).
-- Sint-Jozef: max 42, aanwezig 41. Sint-Elisabeth: max 45, aanwezig 43.
update public.vv_afdelingen set capaciteit = 21, huidige_bezetting = 21, huidige_bezetting_op = '2026-10-29' where id = 'wzc-huize-nazareth-sint-jozef';
update public.vv_afdelingen set capaciteit = 21, huidige_bezetting = 20, huidige_bezetting_op = '2026-10-29' where id = 'wzc-huize-nazareth-sint-jozef-3';
update public.vv_afdelingen set capaciteit = 23, huidige_bezetting = 22, huidige_bezetting_op = '2026-10-29' where id = 'wzc-huize-nazareth-sint-elisabeth';
update public.vv_afdelingen set capaciteit = 22, huidige_bezetting = 21, huidige_bezetting_op = '2026-10-29' where id = 'wzc-huize-nazareth-sint-elisabeth-2';
select naam, capaciteit, huidige_bezetting from public.vv_afdelingen where site_id = 'wzc-huize-nazareth' order by volgorde;
