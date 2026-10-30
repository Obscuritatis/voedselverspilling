-- Richtlijn soep (30/10/2026): 200 à 250 ml per persoon, gerekend met het midden.
update public.vv_producten
set gram = 225, eenheid = 'ml', richtlijn = true,
    toelichting = 'Richtlijn 200 à 250 ml (gerekend: 225 ml). Als voorgerecht bij een warme maaltijd of als extraatje bij een broodmaaltijd: ongeveer één soepkom of een flinke mok per persoon.'
where component = 'Soep';

select naam, gram, eenheid, toelichting from public.vv_producten where component = 'Soep';
