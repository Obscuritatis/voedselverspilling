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
  # Volgens de namenlijst in het controledoc (stonden onder een notitie "50/50" en werden eerst niet ingelezen).
  "Ter Dennen  OBS": "psychiatrisch-ziekenhuis-verslavingszorg-observatie", "Ter Dennen OBS": "psychiatrisch-ziekenhuis-verslavingszorg-observatie",
  "D2B": "psychiatrisch-ziekenhuis-verslavingszorg-groep-2-b", "TD2AC-KW": "psychiatrisch-ziekenhuis-verslavingszorg-groep-2-ac-kw",
  "Motivatie (L2)": "psychiatrisch-ziekenhuis-ap1-motivatiegroep", "Prisma 2A": "psychiatrisch-ziekenhuis-ap2-groep-a",
  "Prima 2 B": "psychiatrisch-ziekenhuis-ap2-groep-b-c1-c2", "Prisma 2 B": "psychiatrisch-ziekenhuis-ap2-groep-b-c1-c2",
  "Prisma 2 C1": "psychiatrisch-ziekenhuis-ap2-groep-b-c1-c2", "Prisma 2 C2": "psychiatrisch-ziekenhuis-ap2-groep-b-c1-c2",
  "Cafetaria": "psychiatrisch-ziekenhuis-personeelsrestaurant", "Prisma 2": "psychiatrisch-ziekenhuis-ap2-groep-b-c1-c2",
}
# Aantallen die niet kloppen (Ter berken 4: 120 en 60 personen bij 0 kg bordrest) tellen niet mee.
GEEN_AANTAL = {"Ter berken 4", "Cafetaria"}  # cafetaria: het aantal is niet het aantal eters (7 tot 18 personen bij tot 35 kg zetmeel)
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
        if "Afdeling" in r: hdr = {str(h).strip(): j for j, h in reversed(list(enumerate(r))) if h is not None}; acols = [j for j, h in enumerate(r) if h == "Afdeling"]; continue
        # Een rij met een afdeling hoort bij de tabel, ook als er links een notitie staat (bv. "50/50" in PZ+SA).
        # Productiebladen hebben twee afdelingskolommen; sommige rijen (PZ+SA 21-22/09) staan enkel in de rechtse.
        naam = next((r[j] for j in (acols if hdr else []) if r[j] not in (None, "")), None)
        if naam is not None:
            yield datum, str(naam).strip(), {k: r[j] for k, j in hdr.items()}
        elif isinstance(a, str) and a.strip(): hdr = None

site = lambda afd: next(s for s in ("wzc-huize-nazareth", "wzc-sint-alexius", "wzc-passionisten", "psychiatrisch-ziekenhuis", "dieetkeuken") if afd.startswith(s))
# Diëten (rij "Dieet" in het productieblad PZ+SA): op naam bereid in de dieetkeuken, voor alle sites (Johan, 2/11/2026).
# Eigen site Dieetkeuken met één afdeling; de resten zitten in de wegingen van de afdelingen waar gegeten werd.
AFD["Dieet"] = "dieetkeuken-dieten"
ruw_aanw = collections.defaultdict(dict); ruw_prod = collections.defaultdict(dict)
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
        # Gewogen = minstens één gewicht ingevuld; 0 kg betekent "geen resten" (Johan, 2/11/2026), een lege rij = niet gewogen.
        gewogen = any(num(v) is not None for k, v in rij.items() if k.startswith("Gewicht"))
        if naam not in GEEN_AANTAL and gewogen: ruw_aanw[(naam, afd)][datum] = int(n) if n else None
for blad in ("HuizeNazarethProductie", "PZ+SA-ProductieMaaltijd", "ParkPassionistenProdMaaltijden"):
    for datum, naam, rij in blokken(blad):
        afd = AFD.get(naam); n = num(rij.get("Totaal personen afdeling"))
        if not afd: onbekend.add(naam)
        if afd and naam not in GEEN_AANTAL: ruw_prod[(naam, afd)][datum] = int(n) if n else None
        if afd:
            for k, v in rij.items():
                if k.startswith("Gewicht TOTAAL") and num(v): gepr[(afd, datum, next(COMP[x] for x in COMP if x.split()[-1] in k))] += v
# Ontbrekend aantal (leeg of 0): overnemen van de vorige dag van die afdeling waar het wel ingevuld is (Johan, 2/11/2026);
# is er geen vorige dag, dan de eerstvolgende.
aangevuld = 0
def aanvullen(ruw, doel):
    global aangevuld
    for (naam, afd), dagen in ruw.items():
        gekend = sorted((d, n) for d, n in dagen.items() if n)
        for d, n in sorted(dagen.items()):
            if not n:
                vorige = [x for x in gekend if x[0] < d]
                n = (vorige[-1] if vorige else gekend[0] if gekend else (None, None))[1]
                if n and doel is aanw: aangevuld += 1
            if n: doel[(afd, d)] += n
aanvullen(ruw_aanw, aanw); aanvullen(ruw_prod, prod)
q = lambda x: "'" + str(x).replace("'", "''") + "'"
met = [f"  ({q(site(a))}, {q(a)}, {q(d)}, 'Middagmaal', {q(s)}, {q(c)}, {round(v, 3)}, {q(OPM)})" for (a, d, s, c), v in sorted(kg.items()) if round(v, 3) > 0]
pr = [f"  ({q(site(a))}, {q(a)}, {q(d)}, 'Middagmaal', {q(c)}, {round(v, 3)}, {q(OPM)})" for (a, d, c), v in sorted(gepr.items()) if round(v, 3) > 0]
sleutels = sorted(set(aanw) | set(prod))
maal = [f"  ({q(site(a))}, {q(a)}, {q(d)}, 'Middagmaal', {prod.get((a, d), 'null')}, {aanw.get((a, d), 'null')}, {q(OPM)})" for a, d in sleutels]
open(sys.argv[2], "w").write(f"""-- Nulmeting 6 tot 22 september 2024 (warme maaltijd), geïmporteerd op 2/11/2026 met tools/nulmeting.py.
-- Buffetrest = Overproductie per component, bordrest = Bordrest (Gemengd of onbekend), geproduceerde kg per component in vv_productie.
-- Ontbrekende aantallen aanwezigen en klaargemaakt zijn overgenomen van de vorige dag van die afdeling.
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
insert into public.vv_sites (id, naam, volgorde) values ('dieetkeuken', 'Dieetkeuken', 90) on conflict (id) do nothing;
insert into public.vv_afdelingen (id, site_id, naam, type, volgorde, omschrijving) values
  ('dieetkeuken-dieten', 'dieetkeuken', 'Diëten (alle sites)', 'andere', 1, 'Maaltijden op naam voor bewoners en patiënten met een aangepast dieet, voor alle sites bereid in de dieetkeuken. De resten zitten in de wegingen van de afdelingen waar gegeten wordt.')
on conflict (id) do nothing;
delete from public.vv_productie where opmerking = {q(OPM)} and maaltijd = 'Middagmaal';
-- Niet ingelezen (geen afdeling in de app): {', '.join(sorted(onbekend)) or 'geen'}.
delete from public.vv_metingen where opmerking = {q(OPM)} and maaltijd = 'Middagmaal';
delete from public.vv_maaltijden where opmerking = {q(OPM)} and maaltijd = 'Middagmaal';
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
print(aangevuld, "aantallen aanwezigen aangevuld;", len(met), "wegingen,", len(pr), "productieregels,", len(maal), "maaltijden; niet ingelezen:", sorted(onbekend))
