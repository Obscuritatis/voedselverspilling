-- Eenmalig (19/10/2026): bezetting per afdeling en de site WZC Sint-Alexius.
-- Plak in Supabase > SQL Editor en klik op Run. Opnieuw uitvoeren kan geen kwaad.

-- Maximale bezetting: vaste plaatsen en kortverblijven (leeg als het aantal eters wisselt),
-- en wie de aantallen aan de keuken doorgeeft.
alter table public.vv_afdelingen add column if not exists capaciteit integer check (capaciteit >= 0);
alter table public.vv_afdelingen add column if not exists kortverblijf integer check (kortverblijf >= 0);
alter table public.vv_afdelingen add column if not exists aantallen_info text not null default '';

-- Site WZC Sint-Alexius (19/10/2026).
insert into public.vv_sites (id, naam, volgorde) values
  ('wzc-sint-alexius', 'WZC Sint-Alexius', 2)
on conflict (id) do nothing;
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, capaciteit, kortverblijf, aantallen_info) values
  ('wzc-sint-alexius-daalborn', 'wzc-sint-alexius', 'Daalborn', 'woonafdeling', 1, 8, null, ''),
  ('wzc-sint-alexius-veldborn', 'wzc-sint-alexius', 'Veldborn', 'woonafdeling', 2, 14, 3, ''),
  ('wzc-sint-alexius-minneborn', 'wzc-sint-alexius', 'Minneborn', 'woonafdeling', 3, 15, 2, ''),
  ('wzc-sint-alexius-germanusborn', 'wzc-sint-alexius', 'Germanusborn', 'woonafdeling', 4, 16, null, ''),
  ('wzc-sint-alexius-de-varen', 'wzc-sint-alexius', 'De Varen', 'woonafdeling', 5, 8, null, ''),
  ('wzc-sint-alexius-dagverzorgingscentrum', 'wzc-sint-alexius', 'Dagverzorgingscentrum', 'andere', 6, null, null, 'Wisselt met wie deelneemt; de afdeling geeft de aanwezigen door aan de keuken.'),
  ('wzc-sint-alexius-buurtrestaurant', 'wzc-sint-alexius', 'Buurtrestaurant', 'restaurant', 7, null, null, 'In het LDC; Désirée Gerlofsma geeft de aantallen door aan de keuken.')
on conflict (id) do nothing;
