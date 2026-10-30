-- Component "Gemixt (alles samen)" heet voortaan "Gemixt en diëten" (30/10/2026); bestaande wegingen mee hernoemen.
update public.vv_metingen set component = 'Gemixt en diëten' where component = 'Gemixt (alles samen)';
select component, count(*) from public.vv_metingen where component like 'Gemixt%' group by component;
