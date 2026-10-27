-- Maximale bezetting WZC Passionisten (27/10/2026).
update public.vv_afdelingen set capaciteit = 18 where id = 'wzc-passionisten-janneke';
update public.vv_afdelingen set capaciteit = 14 where id in ('wzc-passionisten-mieken', 'wzc-passionisten-nieke', 'wzc-passionisten-tiske');
select naam, capaciteit from public.vv_afdelingen where site_id = 'wzc-passionisten' order by volgorde;
