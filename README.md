# Bord & Beleving

Webapp (vroeger "Voedselverspilling") om voedselverspilling in kaart te brengen per site en per afdeling. Per afdeling leg je vast:

- **Metingen**: gewogen verspilling in kg per datum, maaltijd, soort verlies (bordresten, overproductie,
  bederf of vervallen voorraad, bereidingsverlies) en component (soep, groenten, ...).
- **Gevoeligheden**: wat verspilling op die afdeling moeilijk te vermijden maakt (textuur en slikken,
  eetlust, bestelling, HACCP, ...), met een impact laag, midden of hoog.
- **Acties**: wat de afdeling eraan doet, optioneel gekoppeld aan een gevoeligheid, met status, trekker,
  verwachte impact en inspanning.

Het overzicht van een site zet de afdelingen naast elkaar en toont waar je lokaal kan inzetten, bv. een
hoge gevoeligheid zonder actie of een afdeling die nog niet meet.

Met *Excel-verslag* (op het overzicht van een site of op een afdeling) download je een verslag voor de gekozen
periode: een overzichtsblad per afdeling, verdeling per soort verlies en component, en aparte bladen met alle
metingen, gevoeligheden en acties. Onder *Beheer* kan je na een test alle gegevens van een site wissen.

Eerste site: WZC-Huize Nazareth, met de woonafdelingen Heilig Hart, Sint-Jozef verdiep 2 en 3, Sint-Elisabeth verdiep 1 en 2 en
Sint-Franciscus, restaurant Gozewijn (medewerkers) en het Prieeltje (buurtrestaurant).
Tweede site: WZC Sint-Alexius, met Daalborn, Veldborn, Minneborn, Germanusborn, De Varen, het
dagverzorgingscentrum en het buurtrestaurant (in het LDC).

Derde site: WZC Passionisten, met Janneke, Mieken, Nieke, Tiske en het buurtrestaurant.

Per afdeling staat de maximale bezetting (plaatsen + kortverblijven) en wie de aantallen aan de keuken doorgeeft.
Met de bezetting rekent de app de verspilling per plaats per meetdag uit (in gram), zodat je afdelingen van
verschillende grootte kan vergelijken. Bij afdelingen met een wisselend aantal eters blijft dat leeg.

Andere sites en afdelingen voeg je toe in de app onder *Beheer*. De vertrekpunten voor gevoeligheden en acties
staan bovenaan in [`index.html`](index.html) (`SUG_GEV`, `SUG_ACT`).

De app is een statische pagina (GitHub Pages), gebouwd op dezelfde basis als
[veiligheidsrondes](https://github.com/Obscuritatis/veiligheidsrondes) en
[staalnamen](https://github.com/Obscuritatis/staalnamen). Ze gebruikt hetzelfde Supabase-project
en dezelfde aanmelding met een link per e-mail, maar eigen tabellen (`vv_sites`, `vv_afdelingen`,
`vv_metingen`, `vv_maaltijden`, `vv_gevoeligheden`, `vv_acties`). De gegevens van de andere apps worden niet aangeraakt.

## Eenmalige opzet

1. **Database**: open in het bestaande Supabase-project *SQL Editor*, plak de inhoud van
   [`supabase/schema.sql`](supabase/schema.sql) en klik *Run*. Het script maakt enkel nieuwe onderdelen aan,
   zet Huize Nazareth, Sint-Alexius en Passionisten met hun afdelingen klaar en mag opnieuw uitgevoerd worden (bv. na een update van de app).
2. **Toegang**: de app gebruikt dezelfde toegangslijst (`toegang`) als de veiligheidsrondes.
   Wie daar staat, kan ook de voedselverspilling zien en invullen. Iemand toevoegen:
   ```sql
   insert into public.toegang (email) values ('naam@voorbeeld.be');
   ```
3. **Aanmeldlink**: voeg onder *Authentication > URL Configuration* een extra *Redirect URL* toe voor het adres
   van deze app: `https://obscuritatis.github.io/voedselverspilling/`. Laat de bestaande staan.
4. **GitHub Pages**: repository > *Settings > Pages* > *Deploy from a branch* > `main` / `(root)`.

De koppeling met Supabase staat in [`config.js`](config.js) (zelfde project als de veiligheidsrondes).

## Opmerkingen

- Vul geen namen van personen in (trekker, bron, wie de aantallen doorgeeft): enkel functies, bv. *teamleider* of *verantwoordelijke LDC*.

- Metingen, gevoeligheden en acties wis je één voor één (twee keer klikken) of in één keer per afdeling of per site (knop bij de metingen van een afdeling, of onder *Beheer*).
- Een afdeling met metingen, gevoeligheden of acties kan je niet verwijderen; zo gaan er geen gegevens verloren.
- De gratis aanmeldmails van Supabase zijn beperkt in aantal per uur. Voor een grotere groep stel je
  een eigen mailserver in onder *Authentication > SMTP*.
- Een gratis Supabase-project wordt gepauzeerd na een week zonder gebruik; je zet het terug aan in het dashboard.

## Beveiliging

- De app laadt niets van andere sites: lettertypes (`fonts/`), de Supabase-bibliotheek en ExcelJS (`vendor/`) staan in de repo zelf.
- Een Content Security Policy in `index.html` laat enkel code van de site zelf toe en enkel verbindingen met het eigen Supabase-project.
  Verandert het Supabase-adres in `config.js`, pas dan ook `connect-src` in die regel aan.
- Wie gegevens mag zien of wijzigen, regelt de database (RLS met `heeft_toegang()`). De publishable sleutel in `config.js` geeft op zich geen toegang.
- [`supabase/controle-beveiliging.sql`](supabase/controle-beveiliging.sql) toont, zonder iets te wijzigen, of RLS aan staat op elke tabel.
