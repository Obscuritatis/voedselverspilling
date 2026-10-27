-- Dagverzorgingscentrum van Sint-Alexius wordt een eigen type in plaats van "andere" (27/10/2026).
update public.vv_afdelingen set type = 'dagverzorging' where id = 'wzc-sint-alexius-dagverzorgingscentrum';
select naam, type from public.vv_afdelingen where site_id = 'wzc-sint-alexius' order by volgorde;
