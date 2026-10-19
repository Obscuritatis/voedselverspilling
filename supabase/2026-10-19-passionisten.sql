-- Eenmalig (19/10/2026): site WZC Passionisten met haar afdelingen.
-- Plak in Supabase > SQL Editor en klik op Run. Opnieuw uitvoeren kan geen kwaad.

-- Site WZC Passionisten (19/10/2026).
insert into public.vv_sites (id, naam, volgorde) values
  ('wzc-passionisten', 'WZC Passionisten', 3)
on conflict (id) do nothing;
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde) values
  ('wzc-passionisten-janneke', 'wzc-passionisten', 'Janneke', 'woonafdeling', 1),
  ('wzc-passionisten-mieken', 'wzc-passionisten', 'Mieken', 'woonafdeling', 2),
  ('wzc-passionisten-nieke', 'wzc-passionisten', 'Nieke', 'woonafdeling', 3),
  ('wzc-passionisten-tiske', 'wzc-passionisten', 'Tiske', 'woonafdeling', 4),
  ('wzc-passionisten-buurtrestaurant', 'wzc-passionisten', 'Buurtrestaurant', 'restaurant', 5)
on conflict (id) do nothing;
