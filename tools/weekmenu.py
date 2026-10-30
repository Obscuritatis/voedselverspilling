# Maakt een SQL-script voor een centraal weekmenu van de hoofdkeuken.
# Gebruik: python3 tools/weekmenu.py <invoer.json> supabase/JJJJ-MM-DD-weekmenu-DD-MM.sql
# Invoer: {"titel": "...", "producten": [[naam, "samen"|"zetmeel", [onderdelen die het bevat]]],
#          "dagen": {"JJJJ-MM-DD": {"ochtend": "...", "middag": {"soep": "...", "samen": ["Lasagne", ...], "vlees": ...}, "avond": "..."}}}
# Samengestelde gerechten gaan altijd in "samen" (een lijst, max. 3); nieuwe staan ook in "producten".
import json, sys
d = json.load(open(sys.argv[1]))
B = " · wit, grijs of meergranen brood · standaard beleg (afwisselend)"
K = {"soep": "Soep", "vlees": "Vlees, vis of vegetarisch", "saus": "Saus", "zetmeel": "Zetmeel (aardappel, pasta, rijst)", "groenten": "Groenten", "dessert": "Dessert", "samen": "Samengesteld gerecht"}
q = lambda x: "'" + x.replace("'", "''") + "'"
rows = []
for datum, dag in d["dagen"].items():
    rows.append(f"  ({q(datum)}, 'Ontbijt', 'Brood en beleg', {q(dag['ochtend'] + B)})")
    for k, g in dag["middag"].items():
        if k == "samen":
            for i, x in enumerate([g] if isinstance(g, str) else g):
                rows.append(f"  ({q(datum)}, 'Middagmaal', {q(K['samen'] + ('' if i == 0 else f' {i + 1}'))}, {q(x)})")
        else:
            rows.append(f"  ({q(datum)}, 'Middagmaal', {q(K[k])}, {q(g)})")
    rows.append(f"  ({q(datum)}, 'Avondmaal', 'Brood en beleg', {q(dag['avond'] + B)})")
prods = "".join(f"insert into public.vv_producten (naam, component, eenheid, vervangt) values ({q(n)}, {q(K[c])}, 'g', array[{', '.join(q(K[v]) for v in vv)}]::text[]) on conflict do nothing;\n" for n, c, vv in d.get("producten", []))
dagen = list(d["dagen"])
open(sys.argv[2], "w").write(f"""-- Centraal weekmenu van de hoofdkeuken, {d['titel']}.
-- Bij ontbijt en avondmaal: standaard keuze wit, grijs of meergranen brood en standaard beleg (afwisselend).
{prods}insert into public.vv_menus (site_id, datum, maaltijd, component, gerecht)
select null, v.datum::date, v.maaltijd, v.component, v.gerecht from (values
{("," + chr(10)).join(rows)}
) as v(datum, maaltijd, component, gerecht)
on conflict (coalesce(site_id, ''), datum, maaltijd, component) do update set gerecht = excluded.gerecht;
select datum, maaltijd, component, gerecht from public.vv_menus where site_id is null and datum between {q(dagen[0])} and {q(dagen[-1])} order by datum, maaltijd, component;
""")
