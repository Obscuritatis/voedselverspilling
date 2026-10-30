-- Buurtrestaurant WZC Passionisten: max. bezetting 60 (30/10/2026). Zonder huidige bezetting wordt 60 overgenomen.
update public.vv_afdelingen
set capaciteit = 60,
    huidige_bezetting_op = case when huidige_bezetting is null then current_date else huidige_bezetting_op end,
    huidige_bezetting = coalesce(huidige_bezetting, 60)
where id = 'wzc-passionisten-buurtrestaurant';

select naam, capaciteit as max, huidige_bezetting as huidig from public.vv_afdelingen where id = 'wzc-passionisten-buurtrestaurant';
