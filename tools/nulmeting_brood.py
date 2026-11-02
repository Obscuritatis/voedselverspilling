# Maakt het importscript voor de nulmeting van de broodmaaltijd (14 tot 20 oktober 2024), vier invulformulieren per site.
# Gebruik: python3 tools/nulmeting_brood.py <map met de vier *_Invulformulier.xlsx> supabase/JJJJ-MM-DD-nulmeting-2024-brood.sql
# Broodmaaltijd = ontbijt en avond samen. Buffetrest brood en beleg = Overproductie "Brood en beleg", dessert = Overproductie "Dessert",
# bordrest = Bordrest (Gemengd of onbekend). Aantal residenten = aanwezigen. Totaal personen (productieblad) = klaargemaakt,
# anders het aantal residenten van die dag (Johan, 2/11/2026).
# Productie: brood telt op de dag van levering (ochtend); beleg (kaas, charcuterie, smeerbaar) wordt 's avonds geleverd
# en telt voor de volgende meetdag (13/10 avond -> 14/10; de levering van 20/10 is voor 21/10 en valt weg).
import openpyxl, datetime, sys, glob, os, collections
sys.path.insert(0, os.path.dirname(__file__))
OPM, MAAL = "Nulmeting 2024", "Broodmaaltijd"
src = open(os.path.join(os.path.dirname(__file__), "nulmeting.py")).read()
AFD = eval(src[src.index("AFD = {") + 6: src.index("\n}\n", src.index("AFD = {")) + 2])
num = lambda v: v if isinstance(v, (int, float)) else None
EERSTE, LAATSTE = datetime.date(2024, 10, 14), datetime.date(2024, 10, 20)
site = lambda afd: next(s for s in ("wzc-huize-nazareth", "wzc-sint-alexius", "wzc-passionisten", "psychiatrisch-ziekenhuis") if afd.startswith(s))
kg = collections.defaultdict(float); gepr = collections.defaultdict(float); aanw = {}; prod = {}; onbekend = set()
for f in sorted(glob.glob(os.path.join(sys.argv[1], "*Invulformulier.xlsx"))):
    wb = openpyxl.load_workbook(f, data_only=True)
    datum = hdr = None
    for r in wb["Verspilling"].iter_rows(max_col=8, values_only=True):
        a = r[0]
        if isinstance(a, datetime.datetime): datum = a.date(); hdr = None; continue
        if a == "Afdeling": hdr = [str(h or "").lower() for h in r]; continue
        if not (hdr and isinstance(a, str) and a.strip()): continue
        naam = a.strip(); afd = AFD.get(naam)
        if not afd: onbekend.add(naam); continue
        for j, h in enumerate(hdr):
            v = num(r[j])
            if not v: continue
            if h.startswith("bordrest"): kg[(afd, datum, "bordrest", "Gemengd of onbekend")] += v
            elif "brood" in h or "beleg" in h or "charcuterie" in h: kg[(afd, datum, "overproductie", "Brood en beleg")] += v
            elif "dessert" in h: kg[(afd, datum, "overproductie", "Dessert")] += v
        n = num(r[1])
        if n: aanw[(afd, datum)] = aanw.get((afd, datum), 0) + int(n)
    datum = None
    for r in wb["Productie"].iter_rows(max_col=16, values_only=True):
        a = r[0]
        if isinstance(a, datetime.datetime): datum = a.date(); continue
        if isinstance(a, str) and "okt" in a: datum = datetime.date(2024, 10, 13); continue
        naam = r[10].strip() if isinstance(r[10], str) else ""
        if not naam or naam == "Afdeling" or not datum: continue
        afd = AFD.get(naam)
        if not afd: onbekend.add(naam); continue
        brood, beleg = num(r[12]) or 0, sum(num(r[k]) or 0 for k in (13, 14, 15))
        if EERSTE <= datum <= LAATSTE: gepr[(afd, datum)] += brood
        if EERSTE <= datum + datetime.timedelta(days=1) <= LAATSTE: gepr[(afd, datum + datetime.timedelta(days=1))] += beleg
        n = num(r[11])
        if n and EERSTE <= datum <= LAATSTE: prod[(afd, datum)] = prod.get((afd, datum), 0) + int(n)
# Klaargemaakt ontbreekt: aantal residenten van die dag (Johan, 2/11/2026).
gewogen = {(a, d) for a, d, _, _ in kg}
for k in gewogen:
    if k not in prod and k in aanw: prod[k] = aanw[k]
q = lambda x: "'" + str(x).replace("'", "''") + "'"
met = [f"  ({q(site(a))}, {q(a)}, {q(d)}, {q(MAAL)}, {q(s)}, {q(c)}, {round(v, 3)}, {q(OPM)})" for (a, d, s, c), v in sorted(kg.items()) if round(v, 3) > 0]
pr = [f"  ({q(site(a))}, {q(a)}, {q(d)}, {q(MAAL)}, 'Brood en beleg', {round(v, 3)}, {q(OPM)})" for (a, d), v in sorted(gepr.items()) if round(v, 3) > 0 and (a, d) in gewogen]
maal = [f"  ({q(site(a))}, {q(a)}, {q(d)}, {q(MAAL)}, {prod.get((a, d), 'null')}, {aanw.get((a, d), 'null')}, {q(OPM)})" for a, d in sorted(gewogen)]
open(sys.argv[2], "w").write(f"""-- Nulmeting broodmaaltijd 14 tot 20 oktober 2024 (ontbijt en avond samen), geïmporteerd op 2/11/2026 met tools/nulmeting_brood.py.
-- Buffetrest brood en beleg = Overproductie (Brood en beleg), dessert = Overproductie (Dessert), bordrest = Bordrest (Gemengd of onbekend).
-- Productie in vv_productie: brood op de dag van levering, beleg van de avond ervoor. Voer eerst 2026-11-02-nulmeting-2024.sql uit (maakt vv_productie).
-- Opnieuw uitvoeren vervangt de vorige import van de broodmaaltijd; het middagmaal blijft staan.
delete from public.vv_productie where opmerking = {q(OPM)} and maaltijd = {q(MAAL)};
delete from public.vv_metingen where opmerking = {q(OPM)} and maaltijd = {q(MAAL)};
delete from public.vv_maaltijden where opmerking = {q(OPM)} and maaltijd = {q(MAAL)};
insert into public.vv_metingen (site_id, afdeling_id, datum, maaltijd, stroom, component, kg, opmerking) values
{(','+chr(10)).join(met)};
insert into public.vv_maaltijden (site_id, afdeling_id, datum, maaltijd, porties, aanwezig, opmerking) values
{(','+chr(10)).join(maal)}
on conflict (afdeling_id, datum, maaltijd) do update set porties = excluded.porties, aanwezig = excluded.aanwezig, opmerking = excluded.opmerking;
insert into public.vv_productie (site_id, afdeling_id, datum, maaltijd, component, kg, opmerking) values
{(','+chr(10)).join(pr)};
select s.naam as site, count(*) as wegingen, round(sum(m.kg), 1) as kg from public.vv_metingen m join public.vv_sites s on s.id = m.site_id
where m.opmerking = {q(OPM)} and m.maaltijd = {q(MAAL)} group by s.naam order by s.naam;
""")
tot = collections.defaultdict(lambda: [0, 0])
for (a, d, s, c), v in kg.items(): tot[site(a)][0] += v
for (a, d), v in gepr.items():
    if (a, d) in gewogen: tot[site(a)][1] += v
for k, (v, p) in sorted(tot.items()): print(f"{k}: verspild {v:.1f} kg, geproduceerd {p:.1f} kg, {v / p * 100 if p else 0:.0f} %")
print(len(met), "wegingen,", len(pr), "productieregels,", len(maal), "maaltijden; niet ingelezen:", sorted(onbekend))
