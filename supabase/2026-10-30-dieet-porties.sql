-- Klaargemaakt: aantal dieet- of gemixte maaltijden apart (30/10/2026).
-- porties blijft het totaal; porties_dieet is het deel daarvan dat dieet of gemixt is.
alter table public.vv_maaltijden add column if not exists porties_dieet integer check (porties_dieet >= 0);
