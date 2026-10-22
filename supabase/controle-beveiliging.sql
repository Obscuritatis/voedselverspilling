-- Alleen lezen: controleert de beveiliging van de tabellen van deze app. Wijzigt niets.
-- Verwacht: elke rij heeft rls_aan = true en precies één regel "voor collega's" voor authenticated met heeft_toegang().
select c.relname as tabel,
       c.relrowsecurity as rls_aan,
       coalesce(string_agg(p.polname || ' (' || array_to_string(array(select rolname from pg_roles where oid = any(p.polroles)), ',') || '): '
                || pg_get_expr(p.polqual, p.polrelid), E'\n'), 'GEEN REGELS') as regels
from pg_class c
join pg_namespace n on n.oid = c.relnamespace and n.nspname = 'public'
left join pg_policy p on p.polrelid = c.oid
where c.relkind = 'r' and (c.relname like 'vv\_%' or c.relname = 'toegang')
group by c.relname, c.relrowsecurity
order by c.relname;
