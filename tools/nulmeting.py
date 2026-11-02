# Maakt het importscript voor de nulmeting van september 2024 (Excel van de Alexianen Zorggroep).
# Gebruik: python3 tools/nulmeting.py <nulmeting.xlsx> supabase/JJJJ-MM-DD-nulmeting-2024.sql
# Buffetrest per component = Overproductie, bordrest = Bordrest (Gemengd of onbekend), aantal residenten = aanwezigen,
# totaal personen uit het productieblad = klaargemaakt. Wegingen van 0 kg vallen weg. Opmerking: "Nulmeting 2024".
import openpyxl, datetime, sys, collections
wb = openpyxl.load_workbook(sys.argv[1], data_only=True)
OPM = "Nulmeting 2024"
# Oude namen (2024) -> afdeling in de app, zoals Johan ze bevestigde (2/11/2026); Ter berken en Pathways worden samengeteld.
AFD = {
  "Elisabeth 1": "wzc-huize-nazareth-sint-elisabeth", "Elisabeth 2": "wzc-huize-nazareth-sint-elisabeth-2",
  "Franciscus": "wzc-huize-nazareth-sint-franciscus", "H.Hart": "wzc-huize-nazareth-heilig-hart",
  "St. Jozef 2": "wzc-huize-nazareth-sint-jozef", "St. Jozef 3": "wzc-huize-nazareth-sint-jozef-3",
  "Band": "wzc-huize-nazareth-gozewijn", "Senioren HN": "wzc-huize-nazareth-prieeltje",
  "Daalborn": "wzc-sint-alexius-daalborn", "Veldborn": "wzc-sint-alexius-veldborn", "Germanusborn": "wzc-sint-alexius-germanusborn",
  "Minneborn": "wzc-sint-alexius-minneborn", "Varen": "wzc-sint-alexius-de-varen", "wzc Daghospitaal": "wzc-sint-alexius-dagverzorgingscentrum",
  "SENIOREN S.A.": "wzc-sint-alexius-buurtrestaurant",
  "Reus Janneke": "wzc-passionisten-janneke", "Reus Nieke": "wzc-passionisten-nieke", "Reus Tiske": "wzc-passionisten-tiske",
  "Reus Mieken": "wzc-passionisten-mieken", "Senioren PP": "wzc-passionisten-buurtrestaurant",
  "Ter linden 1": "psychiatrisch-ziekenhuis-ouderenpsychiatrie-1", "Ter linden 2": "psychiatrisch-ziekenhuis-ouderenpsychiatrie-2",
  "Pathways 1": "psychiatrisch-ziekenhuis-jeugdpsychiatrie-pathways", "Pathways 2": "psychiatrisch-ziekenhuis-jeugdpsychiatrie-pathways",
  "Pathways c": "psychiatrisch-ziekenhuis-jeugdpsychiatrie-pathways",
  "Prisma1 living1": "psychiatrisch-ziekenhuis-ap1-living-1", "Prisma1 living 2": "psychiatrisch-ziekenhuis-ap1-living-2",
  "Ter berken 1": "psychiatrisch-ziekenhuis-eetherstel-leefgroep-1", "Terberken 1": "psychiatrisch-ziekenhuis-eetherstel-leefgroep-1",
  "Ter berken 2": "psychiatrisch-ziekenhuis-eetherstel-leefgroep-1", "Ter berken 3": "psychiatrisch-ziekenhuis-eetherstel-leefgroep-1",
  "Terberken 3": "psychiatrisch-ziekenhuis-eetherstel-leefgroep-1", "Ter berken 4": "psychiatrisch-ziekenhuis-eetherstel-leefgroep-1",
}
# Aantallen die niet kloppen (Ter berken 4: 120 en 60 personen bij 0 kg bordrest) tellen niet mee.
GEEN_AANTAL = {"Ter berken 4"}
# Tikfouten: (blad, datum, afdeling, kolom) -> juiste waarde.
FIX = {("Huize Nazareth", "2024-09-12", "Elisabeth 1", "Gewicht buffetrest zetmeel (kg)"): 1.48}
COMP = {"eiwit": "Vlees, vis of vegetarisch", "zetmeel": "Zetmeel (aardappel, pasta, rijst)", "warme groenten": "Groenten",
        "samengesteld": "Samengesteld gerecht", "soep": "Soep", "saus": "Saus"}
num = lambda v: v if isinstance(v, (int, float)) else None

def blokken(naam):
    ws = wb[naam]; datum = hdr = None
    for r in ws.iter_rows(max_col=25, values_only=True):
        a = r[0]
        if isinstance(a, datetime.datetime): datum = a.date().isoformat(); hdr = None; continue
        if "Afdeling" in r: hdr = {str(h).strip(): j for j, h in reversed(list(enumerate(r))) if h is not None}; hdr["Afdeling"] = r.index("Afdeling"); continue
        if isinstance(a, str) and a.strip(): hdr = None; continue
        if hdr and r[hdr["Afdeling"]] not in (None, ""):
            yield datum, str(r[hdr["Afdeling"]]).strip(), {k: r[j] for k, j in hdr.items()}

site = lambda afd: afd.rsplit("-", 0)[0] and next(s for s in ("wzc-huize-nazareth", "wzc-sint-alexius", "wzc-passionisten", "psychiatrisch-ziekenhuis") if afd.startswith(s))
kg = collections.defaultdict(float); gepr = collections.defaultdict(float); aanw = collections.defaultdict(int); prod = collections.defaultdict(int); onbekend = set()
for blad in ("Huize Nazareth", "PZ+SA", "Park Passionisten"):
    for datum, naam, rij in blokken(blad):
        afd = AFD.get(naam)
        if not afd: onbekend.add(naam); continue
        for k, v in rij.items():
            v = FIX.get((blad, datum, naam, k), v)
            if k.startswith("Gewicht buffetrest") and num(v):
                c = next(COMP[x] for x in COMP if x in k)
                kg[(afd, datum, "overproductie", c)] += v
            elif k == "Gewicht bordrest (kg)" and num(v):
                kg[(afd, datum, "bordrest", "Gemengd of onbekend")] += v
        n = num(rij.get("Aantal \nresidenten"))
        if n and naam not in GEEN_AANTAL: aanw[(afd, datum)] += int(n)
for blad in ("HuizeNazarethProductie", "PZ+SA-ProductieMaaltijd", "ParkPassionistenProdMaaltijden"):
    for datum, naam, rij in blokken(blad):
        afd = AFD.get(naam); n = num(rij.get("Totaal personen afdeling"))
        if afd and n and naam not in GEEN_AANTAL: prod[(afd, datum)] += int(n)
        if afd:
            for k, v in rij.items():
                if k.startswith("Gewicht TOTAAL") and num(v): gepr[(afd, datum, next(COMP[x] for x in COMP if x.split()[-1] in k))] += v
q = lambda x: "'" + str(x).replace("'", "''") + "'"
met = [f"  ({q(site(a))}, {q(a)}, {q(d)}, 'Middagmaal', {q(s)}, {q(c)}, {round(v, 3)}, {q(OPM)})" for (a, d, s, c), v in sorted(kg.items()) if round(v, 3) > 0]
pr = [f"  ({q(site(a))}, {q(a)}, {q(d)}, 'Middagmaal', {q(c)}, {round(v, 3)}, {q(OPM)})" for (a, d, c), v in sorted(gepr.items()) if round(v, 3) > 0]
sleutels = sorted(set(aanw) | set(prod))
maal = [f"  ({q(site(a))}, {q(a)}, {q(d)}, 'Middagmaal', {prod.get((a, d), 'null')}, {aanw.get((a, d), 'null')}, {q(OPM)})" for a, d in sleutels]
open(sys.argv[2], "w").write(f"""-- Nulmeting 6 tot 22 september 2024 (warme maaltijd), geïmporteerd op 2/11/2026 met tools/nulmeting.py.
-- Buffetrest = Overproductie per component, bordrest = Bordrest (Gemengd of onbekend), geproduceerde kg per component in vv_productie.
-- Opnieuw uitvoeren vervangt de vorige import.
create table if not exists public.vv_productie (
  id uuid primary key default gen_random_uuid(),
  site_id text not null references public.vv_sites(id),
  afdeling_id text not null references public.vv_afdelingen(id),
  datum date not null,
  maaltijd text not null default 'Middagmaal',
  component text not null default '',
  kg numeric(9,3) not null check (kg >= 0),
  opmerking text not null default '',
  aangemaakt timestamptz not null default now()
);
alter table public.vv_productie enable row level security;
drop policy if exists "vv_productie voor collega's" on public.vv_productie;
create policy "vv_productie voor collega's" on public.vv_productie for all to authenticated using (public.heeft_toegang()) with check (public.heeft_toegang());
delete from public.vv_productie where opmerking = {q(OPM)};
-- Niet ingelezen (geen afdeling in de app): {', '.join(sorted(onbekend)) or 'geen'}.
delete from public.vv_metingen where opmerking = {q(OPM)};
delete from public.vv_maaltijden where opmerking = {q(OPM)};
insert into public.vv_metingen (site_id, afdeling_id, datum, maaltijd, stroom, component, kg, opmerking) values
{(','+chr(10)).join(met)};
insert into public.vv_maaltijden (site_id, afdeling_id, datum, maaltijd, porties, aanwezig, opmerking) values
{(','+chr(10)).join(maal)}
on conflict (afdeling_id, datum, maaltijd) do update set porties = excluded.porties, aanwezig = excluded.aanwezig, opmerking = excluded.opmerking;
insert into public.vv_productie (site_id, afdeling_id, datum, maaltijd, component, kg, opmerking) values
{(','+chr(10)).join(pr)};
select s.naam as site, count(*) as wegingen, round(sum(m.kg), 1) as kg from public.vv_metingen m join public.vv_sites s on s.id = m.site_id
where m.opmerking = {q(OPM)} group by s.naam order by s.naam;
""")
print(len(met), "wegingen,", len(pr), "productieregels,", len(maal), "maaltijden; niet ingelezen:", sorted(onbekend))
