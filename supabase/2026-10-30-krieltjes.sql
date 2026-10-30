-- Krieltjes (kleine aardappeltjes) als zetmeelsoort, met dezelfde norm als aardappelen (30/10/2026).
-- Het menu koppelt op naam: "Krieltjes met peterselie" bevat "Krieltjes".
insert into public.vv_producten (naam, component, eenheid) values ('Krieltjes', 'Zetmeel (aardappel, pasta, rijst)', 'g')
on conflict do nothing;
update public.vv_producten k
set gram = coalesce((select a.gram from public.vv_producten a where lower(a.naam) = 'aardappelen' and a.component = k.component), 175),
    richtlijn = true,
    toelichting = 'Krieltjes zijn kleine aardappeltjes: zelfde norm als aardappelen. Richtlijn 150 à 200 g gekookt gewicht (gerekend: 175 g).'
where lower(k.naam) = 'krieltjes' and k.component = 'Zetmeel (aardappel, pasta, rijst)';

select naam, gram, toelichting from public.vv_producten where lower(naam) in ('krieltjes', 'aardappelen');
