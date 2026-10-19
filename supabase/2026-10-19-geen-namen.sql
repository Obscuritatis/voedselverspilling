-- Eenmalig (19/10/2026): geen persoonsnamen in de app, enkel functies.
-- Plak in Supabase > SQL Editor en klik op Run.
update public.vv_afdelingen
set aantallen_info = 'In het LDC; de verantwoordelijke LDC geeft de aantallen door aan de keuken.'
where id = 'wzc-sint-alexius-buurtrestaurant';
