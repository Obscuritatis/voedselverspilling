-- Duiding personeelsrestaurant psychiatrisch ziekenhuis (30/10/2026).
update public.vv_afdelingen
set omschrijving = 'Restaurant voor medewerkers. Van maandag tot vrijdag eten hier ook vaste groepen patiënten: Verslavingszorg groep D (15), AP2 groep B, C1 en C2 (34) en Jeugdpsychiatrie Crossroads en Lighthouse (15), samen 64. Daarbovenop komen de inschrijvingen van het personeel. Op zaterdag en zondag eten deze groepen op hun afdeling; daarvoor gaat er een aparte kar naar de afdeling.'
where id = 'psychiatrisch-ziekenhuis-personeelsrestaurant';

select naam, omschrijving from public.vv_afdelingen where id = 'psychiatrisch-ziekenhuis-personeelsrestaurant';
