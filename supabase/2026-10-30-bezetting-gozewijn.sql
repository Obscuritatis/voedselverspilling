-- Restaurant Gozewijn (Huize Nazareth): max. bezetting 30 (30/10/2026). Zonder huidige bezetting wordt 30 overgenomen.
update public.vv_afdelingen
set capaciteit = 30,
    huidige_bezetting_op = case when huidige_bezetting is null then current_date else huidige_bezetting_op end,
    huidige_bezetting = coalesce(huidige_bezetting, 30)
where id = 'wzc-huize-nazareth-gozewijn';

select naam, capaciteit as max, huidige_bezetting as huidig from public.vv_afdelingen where id = 'wzc-huize-nazareth-gozewijn';
