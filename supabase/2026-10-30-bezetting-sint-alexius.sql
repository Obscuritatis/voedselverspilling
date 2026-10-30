-- Sint-Alexius (30/10/2026): dagverzorgingscentrum max 15 (huidig 15 als nog leeg), buurtrestaurant max 40 en huidig 20.
update public.vv_afdelingen
set capaciteit = 15,
    huidige_bezetting_op = case when huidige_bezetting is null then current_date else huidige_bezetting_op end,
    huidige_bezetting = coalesce(huidige_bezetting, 15)
where id = 'wzc-sint-alexius-dagverzorgingscentrum';

update public.vv_afdelingen set capaciteit = 40, huidige_bezetting = 20, huidige_bezetting_op = current_date
where id = 'wzc-sint-alexius-buurtrestaurant';

select naam, capaciteit as max, huidige_bezetting as huidig from public.vv_afdelingen
where id in ('wzc-sint-alexius-dagverzorgingscentrum', 'wzc-sint-alexius-buurtrestaurant');
