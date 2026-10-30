const STROMEN = {
  bordrest: "Bordresten",
  overproductie: "Overproductie (niet uitgeserveerd)",
  bederf: "Bederf of vervallen voorraad",
  bereiding: "Bereidingsverlies",
};
// Lijn-iconen (24x24, kleur via currentColor).
const ICON = {
  bordrest: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M2.5 4v5M1 4v3.2a1.5 1.5 0 0 0 3 0V4"/>',
  overproductie: '<path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z"/><path d="M2 10h20M9 6.5c0-1 1-1.5 1-2.5M13 6.5c0-1 1-1.5 1-2.5"/>',
  bederf: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M9.5 13.5l5 4M14.5 13.5l-5 4"/>',
  bereiding: '<path d="M14 4 4 14l3 3 10-10Z"/><path d="m17 7 3-3M10 20l2-2"/>',
  weegschaal: '<path d="M5 20h14l-1.5-11h-11Z"/><circle cx="12" cy="6" r="2.5"/><path d="M12 12v2.5"/>',
  mensen: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.5A5 5 0 0 1 21 19.5"/>',
  kalender: '<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  vlag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  lamp: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  blad: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/>',
  huis: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/>',
  ziekenhuis: '<rect x="4" y="3.5" width="16" height="17" rx="2.5"/><path d="M12 8v6M9 11h6M9 20.5v-3h6v3"/>',
  raster: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  pijl: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  tandwiel: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  excel: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
};
const icon = (n, cls = "ic") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n] || ""}</svg>`;
const kort = (k) => (STROMEN[k] || k).split(" (")[0];
const COMPONENTEN = ["Soep", "Zetmeel (aardappel, pasta, rijst)", "Groenten", "Vlees, vis of vegetarisch", "Saus", "Samengesteld gerecht", "Samengesteld gerecht 2", "Samengesteld gerecht 3", "Gemixt en diëten", "Dessert", "Brood en beleg", "Zuivel", "Fruit", "Gemengd of onbekend"];
const MAALTIJDEN = ["Ontbijt", "Middagmaal", "Avondmaal", "Tussendoortje", "Hele dag"];
const CATEGORIEEN = ["Zorgprofiel en dieet", "Textuur en slikken (IDDSI)", "Eetlust en gezondheid", "Smaak en gewoontes", "Porties en bestelling", "Timing en organisatie", "Personeel en communicatie", "Bezoekers en vraag", "Voedselveiligheid en regels"];
const STATUS = ["Idee", "Gepland", "Lopend", "Afgerond"];
const NIVEAU = ["laag", "midden", "hoog"];

// Vertrekpunten, geen geregistreerde gegevens: klik om een formulier voor te vullen.
// Soorten afdelingen: [label, meervoud voor de navigatie, "een ..." voor de vertrekpunten].
const TYPES = {
  woonafdeling: ["Woonafdeling", "Woonafdelingen", "een woonafdeling"],
  patientenafdeling: ["Patiëntenafdeling", "Patiëntenafdelingen", "een patiëntenafdeling"],
  restaurant: ["Restaurant", "Restaurants", "een restaurant"],
  dagverzorging: ["Dagverzorgingscentrum", "Dagverzorgingscentra", "een dagverzorgingscentrum"],
  andere: ["Andere", "Andere", "een afdeling"],
};
const typeNaam = (t) => (TYPES[t] || TYPES.andere)[0];
const typeOpties = (sel) => Object.entries(TYPES).map(([k, [l]]) => `<option value="${k}"${k === sel ? " selected" : ""}>${l}</option>`).join("");

const SUG_GEV = {
  woonafdeling: [
    ["Textuur en slikken (IDDSI)", "Veel bewoners krijgen gemalen of gemixte maaltijden; overschotten daarvan zijn niet herbruikbaar."],
    ["Eetlust en gezondheid", "Wisselende eetlust door ziekte, medicatie of palliatieve zorg; porties blijven vaak half op."],
    ["Smaak en gewoontes", "Bewoners met dementie herkennen gemixte gerechten minder goed, waardoor ze minder eten."],
    ["Porties en bestelling", "Bestelling bij de centrale keuken volgt vaste aantallen, niet de actuele bezetting (ziekenhuisopname, afwezigheid, overlijden)."],
    ["Timing en organisatie", "Maaltijden staan lang warm tot iedereen geholpen is; kwaliteit en appetijt dalen."],
    ["Personeel en communicatie", "Dieetwijzigingen of afwezigheden komen niet altijd tijdig bij de keuken terecht."],
    ["Voedselveiligheid en regels", "Uitgeserveerd voedsel mag niet opnieuw aangeboden worden (HACCP, FAVV)."],
  ],
  patientenafdeling: [
    ["Zorgprofiel en dieet", "Medicatie (bv. antipsychotica) beïnvloedt eetlust en gewicht; porties sluiten niet altijd aan."],
    ["Eetlust en gezondheid", "Wisselende eetlust door psychische toestand; maaltijden worden soms overgeslagen of half gegeten."],
    ["Porties en bestelling", "Opnames, ontslagen en verloven wisselen snel; de bestelling volgt de bezetting niet tijdig."],
    ["Timing en organisatie", "Therapieën en activiteiten lopen over maaltijdtijden, waardoor patiënten later of niet eten."],
    ["Smaak en gewoontes", "Patiënten eten buiten de maaltijden eigen voeding of snacks en laten de maaltijd staan."],
    ["Personeel en communicatie", "Verlof, ontslag of afwezigheid op therapie wordt niet altijd aan de keuken doorgegeven."],
    ["Voedselveiligheid en regels", "Uitgeserveerd voedsel mag niet opnieuw aangeboden worden (HACCP, FAVV)."],
  ],
  restaurant: [
    ["Bezoekers en vraag", "Het aantal eters schommelt sterk per dag (diensten, vakanties, weer, activiteiten)."],
    ["Porties en bestelling", "Eén vaste portiegrootte past niet bij elke gast."],
    ["Bezoekers en vraag", "Gasten verwachten keuze tot sluitingstijd, wat aan het einde van de service tot overschot leidt."],
    ["Voedselveiligheid en regels", "Warm buffet: resten na de service mogen niet terug in de koeling."],
    ["Smaak en gewoontes", "Bepaalde componenten (groenten, saus) komen telkens terug op de borden."],
  ],
};
const SUG_ACT = [
  ["Bestelling dagelijks afstemmen op de bezetting", "Afwezigheden en dieetwijzigingen vóór 10 uur doorgeven aan de keuken.", "hoog", "laag"],
  ["Kleinere basisportie met bijschep", "Standaard een kleinere portie opscheppen en actief een tweede portie aanbieden.", "hoog", "laag"],
  ["Gemixt herkenbaar aanbieden", "Componenten apart en in vorm presenteren zodat bewoners het gerecht herkennen.", "midden", "midden"],
  ["Wekelijks bordresten wegen", "Vaste weegmoment per week en de resultaten bespreken met keuken en team.", "midden", "laag"],
  ["Voorkeuren per bewoner vastleggen", "Smaak, portiegrootte en gewoontes noteren in het zorgdossier of op de maaltijdkaart.", "midden", "midden"],
  ["Inschrijven of reserveren op drukke dagen", "Gasten vragen zich vooraf aan te melden zodat de keuken juister kan plannen.", "hoog", "midden"],
  ["Restaanbod aan het einde van de service", "Overschot aan een lagere prijs aanbieden of via een sociale partner verdelen.", "midden", "midden"],
  ["Overschot verwerken in een volgende maaltijd", "Niet-uitgeserveerde componenten binnen de HACCP-regels verwerken in soep of dagschotel.", "midden", "laag"],
];

const S = { sites: [], afdelingen: [], gevoeligheden: [], metingen: [], acties: [], maaltijden: [], menus: [], producten: [], loaded: {} };
let sb = null, sessie = null, ready = false, canWrite = true;
const ui = { site: null, view: "start", tab: "metingen", periode: 30, prefillAct: null };
try { const s = JSON.parse(localStorage.getItem("voedselverspilling-ui") || "{}"); if (s.site) ui.site = s.site; if (s.periode) ui.periode = s.periode; } catch (e) {}
// De huidige pagina staat in het adres (#/site/pagina/tab): vernieuwen blijft op dezelfde pagina,
// de knop terug werkt, en de app zelf opstarten (zonder #) begint op het beginscherm.
// Enkel adressen die met "#/" beginnen zijn van ons; de aanmeldlink van Supabase gebruikt ook de #.
function leesAdres() {
  const m = location.hash.match(/^#\/(.*)$/);
  if (!m) return false;
  const [site, view, tab] = m[1].split("/").map((x) => { try { return decodeURIComponent(x); } catch { return ""; } });
  if (site) ui.site = site;
  ui.view = view || "start";
  if (tab) ui.tab = tab;
  return true;
}
leesAdres();
function schrijfAdres() {
  if (location.hash && !location.hash.startsWith("#/")) return;
  const h = ui.view === "start" ? "#/" : `#/${encodeURIComponent(ui.site || "")}/${encodeURIComponent(ui.view)}${ui.view !== "overzicht" && ui.view !== "kies" && ui.view !== "beheer" && ui.view !== "productie" ? "/" + encodeURIComponent(ui.tab) : ""}`;
  if (location.hash === h) return;
  if (location.hash) history.pushState(null, "", h); else history.replaceState(null, "", h);
}
window.addEventListener("popstate", () => { if (leesAdres()) { ui.prefillAct = null; ui.wisAfd = null; render(); } });
function saveUi() { try { localStorage.setItem("voedselverspilling-ui", JSON.stringify({ site: ui.site, periode: ui.periode })); } catch (e) {} }

const $ = (s) => document.querySelector(s);
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const kg = (n) => (Math.round(n * 10) / 10).toLocaleString("nl-BE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + " kg";
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => { try { return new Date(d + "T12:00:00").toLocaleDateString("nl-BE", { day: "numeric", month: "short" }); } catch (e) { return d; } };
const slug = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "x";

function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (t.hidden = true), 2400); }

async function write(fn, okMsg) {
  try {
    const { error } = await fn();
    if (error) throw error;
    if (okMsg) toast(okMsg);
    laadAlles();
    return true;
  } catch (e) {
    console.error(e);
    toast(e && (e.code === "42501" || /row-level security/i.test(e.message || "")) ? "Je hebt geen toegang om dit op te slaan."
      : e && e.code === "23503" ? "Dit kan niet: er hangen nog gegevens aan vast."
      : e && e.code === "23505" ? "Dit bestaat al."
      : "Opslaan mislukt. Controleer je verbinding en probeer opnieuw.");
    return false;
  }
}

// ---------- afgeleide cijfers ----------
function inPeriode(m) {
  if (!ui.periode) return true;
  const grens = new Date(); grens.setDate(grens.getDate() - ui.periode);
  return m.datum >= grens.toISOString().slice(0, 10);
}
const siteAfd = () => S.afdelingen.filter((a) => a.siteId === ui.site).sort((a, b) => (a.volgorde ?? 99) - (b.volgorde ?? 99) || a.naam.localeCompare(b.naam));
const ofAfd = (list, id) => list.filter((x) => x.afdelingId === id);
// Openingsdagen: 1 = maandag … 7 = zondag; geen dagen ingesteld = elke dag open.
const DAGEN = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];
const isoDag = (datum) => ((new Date(datum + "T12:00:00").getDay() + 6) % 7) + 1;
const openDagen = (a) => (a.openDagen || []).map(Number).filter((d) => d >= 1 && d <= 7).sort();
// open_laatste: (ook) open op de laatste die weekdag van de maand, bv. 5 = laatste vrijdag.
const laatsteDag = (a) => { const d = Number(a.openLaatste); return d >= 1 && d <= 7 ? d : null; };
const isLaatste = (datum) => { const d = new Date(datum + "T12:00:00"); d.setDate(d.getDate() + 7); return d.toISOString().slice(5, 7) !== datum.slice(5, 7); };
const heeftDagen = (a) => openDagen(a).length > 0 || laatsteDag(a) != null;
const openOp = (a, datum) => !heeftDagen(a) || openDagen(a).includes(isoDag(datum)) || (laatsteDag(a) === isoDag(datum) && isLaatste(datum));
// Vaste bezetting per weekdag (bv. buurtrestaurant: maandag 8, donderdag 14) gaat voor op de huidige bezetting.
const dagBezetting = (a, datum) => { const v = a.bezettingDag?.[isoDag(datum)]; return v == null ? null : Number(v); };
const dagBezettingTekst = (a) => Object.entries(a.bezettingDag || {}).sort(([x], [y]) => x - y).map(([d, n]) => `${DAGEN[d - 1]} ${n}`).join(", ");
const openTekst = (a) => { const d = openDagen(a).map((x) => DAGEN[x - 1]); if (laatsteDag(a)) d.push(`de laatste ${DAGEN[laatsteDag(a) - 1]} van de maand`); return d.length > 1 ? d.slice(0, -1).join(", ") + " en " + d[d.length - 1] : d[0] || ""; };
// Menu per site, dag en maaltijd: één gerecht per component, voor alle afdelingen van de site.
const MENU_COMP = ["Soep", "Samengesteld gerecht", "Samengesteld gerecht 2", "Samengesteld gerecht 3", "Vlees, vis of vegetarisch", "Saus", "Zetmeel (aardappel, pasta, rijst)", "Groenten", "Dessert", "Brood en beleg"];
const kortComp = (c) => c.split(/[,(]/)[0].trim();
// Het centrale menu van de hoofdkeuken (zonder site) geldt overal; een gerecht dat voor een site apart ingevuld is, gaat voor.
const menuVan = (siteId, datum, maaltijd) => {
  const alle = S.menus.filter((x) => x.datum === datum && x.maaltijd === maaltijd), eigen = siteId ? alle.filter((x) => x.siteId === siteId) : [];
  return [...eigen, ...alle.filter((x) => !x.siteId && !eigen.some((e) => e.component === x.component))];
};
const siteVanAfd = (afdId) => S.afdelingen.find((a) => a.id === afdId)?.siteId;
const gerechtVan = (m) => menuVan(m.siteId || siteVanAfd(m.afdelingId), m.datum, m.maaltijd).find((x) => x.component === m.component)?.gerecht || "";
// Productienormen van de hoofdkeuken: gram (of ml, gerekend als gram) per bewoner. Een samengestelde maaltijd telt haar onderdelen op.
// Exacte naam, of anders de langste zetmeelsoort of samengesteld gerecht die in de naam zit ("Preistoemp" → Stoemp).
const productVan = (naam) => {
  const n = String(naam || "").trim().toLowerCase(), lc = (x) => String(x.naam).trim().toLowerCase();
  if (!n) return null;
  return S.producten.find((x) => lc(x) === n) || S.producten.filter((x) => (x.component === ZETMEEL || x.component === SAMEN) && lc(x).length > 2 && n.includes(lc(x))).sort((x, y) => lc(y).length - lc(x).length)[0] || null;
};
const onderdelenVan = (p) => (Array.isArray(p?.onderdelen) ? p.onderdelen : []).filter((o) => o && o.naam);
const normVan = (p) => { if (!p) return null; const o = onderdelenVan(p); if (o.length) return o.reduce((t, x) => t + (Number(x.gram) || 0), 0) || null; return p.gram == null || p.gram === "" ? null : Number(p.gram); };
// Eén norm per onderdeel (groenten, vlees/vis/vegetarisch, saus, soep, dessert); enkel zetmeel heeft soorten (puree, frietjes …), gekoppeld op naam.
const ZETMEEL = "Zetmeel (aardappel, pasta, rijst)";
const normProduct = (component, gerecht) => { if (component !== ZETMEEL) return S.producten.find((p) => p.component === component && p.naam === component) || null; const p = productVan(gerecht); return p && p.component === ZETMEEL ? p : null; };
// Samengesteld gerecht (lasagne, stoemp …): één hoeveelheid per persoon; de onderdelen die het vervangt, tellen dan niet apart.
// Meerdere samengestelde gerechten per maaltijd: elk krijgt een eigen plaats (onderdeel) in het menu.
const SAMEN = "Samengesteld gerecht", SAMEN_PLAATSEN = [SAMEN, "Samengesteld gerecht 2", "Samengesteld gerecht 3"];
const isSamen = (c) => SAMEN_PLAATSEN.includes(c);
const VERVANGBAAR = ["Vlees, vis of vegetarisch", "Saus", ZETMEEL, "Groenten"];
const samenVan = (gerecht) => { const p = productVan(gerecht); return p && p.component === SAMEN ? p : null; };
const vervangtVan = (p) => (Array.isArray(p?.vervangt) ? p.vervangt : []).filter((c) => VERVANGBAAR.includes(c));
// Norm voor een menuregel: een samengesteld gerecht wint, in welk veld het ook staat.
const menuProduct = (component, gerecht) => samenVan(gerecht) || (isSamen(component) ? null : normProduct(component, gerecht));
const normTekst = (p) => { const n = normVan(p); return n == null ? "" : `${Math.round(n)} ${p.eenheid === "ml" ? "ml" : "g"} per persoon`; };
// Wat de keuken voorzag voor één maaltijd van een afdeling, naast wat er gewogen werd.
// Het menu geldt (voorlopig) enkel voor standaardmaaltijden: gram per persoon × standaardporties.
// Dieet/gemixte porties en wegingen van "Gemixt en diëten" (vroeger "Gemixt (alles samen)") blijven buiten de vergelijking.
const GEMIXT = ["Gemixt en diëten", "Gemixt (alles samen)"];
function vergelijking(afdId, datum, maaltijd, ms) {
  const mt = S.maaltijden.find((x) => x.afdelingId === afdId && x.datum === datum && x.maaltijd === maaltijd);
  const menu = menuVan(siteVanAfd(afdId), datum, maaltijd);
  if (!mt || mt.porties == null || !menu.length) return null;
  const dieet = Number(mt.portiesDieet) || 0, standaard = Math.max(0, Number(mt.porties) - dieet);
  const gew = ms.filter((m) => m.afdelingId === afdId && m.datum === datum && m.maaltijd === maaltijd && !GEMIXT.includes(m.component));
  // Onderdelen die in een samengesteld gerecht zitten, vallen weg; hun wegingen tellen bij het samengestelde gerecht.
  const samen = menu.filter((x) => samenVan(x.gerecht)), gedekt = new Set(samen.flatMap((x) => [x.component, ...vervangtVan(samenVan(x.gerecht))]));
  // Er kunnen meerdere samengestelde gerechten op het menu staan (bv. waterzooi en stoemp). Elke weging telt maar bij één ervan:
  // eerst het onderdeel waarin het gerecht staat, daarna wat het bevat, in menuvolgorde. "Samengesteld gerecht" gaat naar het gerecht in dat veld.
  const eersteSamen = samen.find((x) => x.component === SAMEN) || samen[0], geclaimd = new Set();
  const claim = (cs) => new Set(cs.filter((c) => !geclaimd.has(c) && geclaimd.add(c)));
  const volgorde = [...samen].sort((x, y) => (y === eersteSamen) - (x === eersteSamen));
  const compsVan = new Map(volgorde.map((x) => [x, claim([x.component, ...(x === eersteSamen ? [SAMEN] : [])])]));
  volgorde.forEach((x) => vervangtVan(samenVan(x.gerecht)).forEach((c) => { if (!geclaimd.has(c)) { geclaimd.add(c); compsVan.get(x).add(c); } }));
  const rijen = menu.filter((x) => samenVan(x.gerecht) || !gedekt.has(x.component)).map((x) => {
    const sp = samenVan(x.gerecht), p = menuProduct(x.component, x.gerecht), n = normVan(p);
    const comps = sp ? compsVan.get(x) : new Set([x.component]);
    return { component: x.component, gerecht: x.gerecht, norm: n, eenheid: p?.eenheid || "g", voorzien: n == null ? null : (n * standaard) / 1000, gewogen: sum(gew.filter((m) => comps.has(m.component))), samengesteld: !!sp };
  });
  const somNorm = rijen.reduce((t, x) => t + (x.norm || 0), 0);
  const voorzien = somNorm ? (somNorm * standaard) / 1000 : null;
  return { rijen, voorzien, gewogen: sum(gew), dieet, ontbreekt: rijen.filter((x) => x.norm == null).map((x) => (x.component === ZETMEEL || isSamen(x.component) ? x.gerecht : kortComp(x.component).toLowerCase())) };
}
// Bewaart een menu voor één site, of centraal (siteId null). Een site bewaart enkel wat afwijkt van het centrale menu.
function bewaarMenuRijen(siteId, datum, maaltijd, waarden, okMsg = "Menu bewaard") {
  const eigen = S.menus.filter((x) => (x.siteId || null) === siteId && x.datum === datum && x.maaltijd === maaltijd);
  const centraal = siteId ? menuVan(null, datum, maaltijd) : [], ops = [];
  Object.entries(waarden).forEach(([c, v]) => {
    const g = String(v || "").trim().slice(0, 200), h = eigen.find((x) => x.component === c);
    if (h && g && g !== h.gerecht) ops.push(() => sb.from("vv_menus").update({ gerecht: g }).eq("id", h.id));
    else if (h && (!g || (siteId && g === centraal.find((x) => x.component === c)?.gerecht))) ops.push(() => sb.from("vv_menus").delete().eq("id", h.id));
    else if (!h && g && g !== centraal.find((x) => x.component === c)?.gerecht) ops.push(() => sb.from("vv_menus").insert(naarDb({ siteId, datum, maaltijd, component: c, gerecht: g })));
  });
  if (!ops.length) return Promise.resolve(true);
  return write(async () => (await Promise.all(ops.map((f) => f()))).find((x) => x.error) || { error: null }, okMsg);
}
// Eén veld voor samengestelde gerechten: kies er één, voeg toe (meteen bewaard), en daarna eventueel een volgende.
function samenBlok(menu) {
  const lijst = SAMEN_PLAATSEN.map((c) => [c, menu.find((x) => x.component === c)?.gerecht || ""]).filter(([, g]) => g);
  const info = (g) => { const p = samenVan(g); return !p ? "nog niet bij de samengestelde gerechten" : normTekst(p) || "nog geen gram per persoon"; };
  return `<div class="full samen-veld"><span class="samen-lbl">Samengesteld gerecht</span>
    ${lijst.length ? `<div class="samen-chips">${lijst.map(([c, g]) => `<span class="samen-chip"><b>${esc(g)}</b><small>${esc(info(g))}</small>${canWrite ? `<button type="button" class="ghost" data-samenweg="${esc(c)}" aria-label="Verwijder ${esc(g)}">✕</button>` : ""}</span>`).join("")}</div>` : ""}
    ${lijst.length < SAMEN_PLAATSEN.length ? `<div class="samen-rij"><input data-samennieuw list="dlSamen" maxlength="200" placeholder="${lijst.length ? "Nog een samengesteld gerecht toevoegen" : "Kies een samengesteld gerecht"}"${dis()}><button type="button" data-samenadd${dis()}>Toevoegen</button></div>` : ""}</div>`;
}
const vrijePlaats = (menu) => SAMEN_PLAATSEN.find((c) => !menu.some((x) => x.component === c));
function bindSamen(root, siteId, datum, maaltijd, menu) {
  const inp = root.querySelector("[data-samennieuw]"), add = root.querySelector("[data-samenadd]");
  const voegToe = () => { const g = inp.value.trim(), c = vrijePlaats(menu); if (g && c) bewaarMenuRijen(siteId, datum, maaltijd, { [c]: g }, `${g} toegevoegd`); };
  if (add) { add.onclick = voegToe; inp.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); voegToe(); } }; }
  root.querySelectorAll("[data-samenweg]").forEach((b) => (b.onclick = () => bewaarMenuRijen(siteId, datum, maaltijd, { [b.dataset.samenweg]: "" }, "Verwijderd")));
}
// Wat er nog in het toevoegveld staat, gaat mee met "Menu bewaren".
const metNieuwSamen = (root, menu, waarden) => { const g = root.querySelector("[data-samennieuw]")?.value.trim(), c = vrijePlaats(menu); if (g && c) waarden[c] = g; return waarden; };
const lijstVoor = (c) => (c === ZETMEEL ? ' list="dlProducten"' : isSamen(c) ? ' list="dlSamen"' : "");
const productLijst = () => `<datalist id="dlSamen">${S.producten.filter((x) => x.component === SAMEN).sort((x, y) => x.naam.localeCompare(y.naam)).map((x) => `<option value="${esc(x.naam)}">`).join("")}</datalist><datalist id="dlProducten">${S.producten.filter((x) => x.component === ZETMEEL).sort((x, y) => x.naam.localeCompare(y.naam)).map((x) => `<option value="${esc(x.naam)}">`).join("")}</datalist>`;
function vergelijkHtml(a, datum, maaltijd, ms) {
  const v = vergelijking(a.id, datum, maaltijd, ms);
  if (!v) return `<p class="hint" style="margin-top:8px">Vul "Klaargemaakt" in om te vergelijken met wat de keuken voorzag.</p>`;
  return `<div class="vergelijk"><b>Voorzien en gewogen (standaardmaaltijden)</b><table><thead><tr><th></th><th class="num">Voorzien</th><th class="num">Gewogen</th><th class="num">Terug</th></tr></thead><tbody>${v.rijen.map((x) => `<tr><td>${esc(x.gerecht)}</td><td class="num">${x.voorzien == null ? `<span class="hint">geen norm</span>` : kg(x.voorzien)}</td><td class="num">${kg(x.gewogen)}</td><td class="num">${x.voorzien == null ? "–" : pct(x.gewogen, x.voorzien)}</td></tr>`).join("")}
    <tr class="tot"><td>Totaal</td><td class="num">${v.voorzien == null ? "–" : kg(v.voorzien)}</td><td class="num">${kg(v.gewogen)}</td><td class="num">${pct(v.gewogen, v.voorzien)}</td></tr></tbody></table>
    ${v.dieet ? `<p class="hint">De ${v.dieet} dieet/gemixte maaltijden en de wegingen van "Gemixt en diëten" tellen hier nog niet mee.</p>` : ""}
    ${v.ontbreekt.length ? `<p class="hint">Nog geen gram per persoon voor ${esc(v.ontbreekt.join(", "))}: vul dat in bij Productie.</p>` : ""}</div>`;
}
const pct = (gew, voorz) => (voorz ? Math.round((gew / voorz) * 100) + "%" : "–");
const sum = (arr) => arr.reduce((s, m) => s + (Number(m.kg) || 0), 0);
function groupKg(ms, key) { const g = {}; ms.forEach((m) => (g[m[key]] = (g[m[key]] || 0) + (Number(m.kg) || 0))); return Object.entries(g).sort((a, b) => b[1] - a[1]); }

// Maximale bezetting: vaste plaatsen + kortverblijven. Leeg als de afdeling geen vaste bezetting heeft.
const plaatsen = (a) => (Number(a.capaciteit) || 0) + (Number(a.kortverblijf) || 0);
const bezettingTekst = (a) => a.capaciteit ? `${a.capaciteit}${a.kortverblijf ? ` + ${a.kortverblijf} kortverblijf` : ""}` : "";
// Huidige bezetting: vul je zelf in en verandert; zonder huidige bezetting rekenen we met de maximale.
// Huidige bezetting = standaardmaaltijden; gemixt/diëten staan apart (kolom huidige_dieet). Samen = alle bewoners.
const huidig = (a) => (a.huidigeBezetting == null ? null : Number(a.huidigeBezetting));
const dieetNu = (a) => (a.huidigeDieet == null ? null : Number(a.huidigeDieet));
const totaalNu = (a) => (huidig(a) == null && dieetNu(a) == null ? null : (huidig(a) || 0) + (dieetNu(a) || 0));
const dieetVeld = (a, cls = "huidig-veld") => canWrite
  ? `<input type="number" min="0" step="1" inputmode="numeric" class="${cls}" data-dieet="${esc(a.id)}" value="${esc(a.huidigeDieet ?? "")}" placeholder="–" aria-label="Gemixt/diëten ${esc(a.naam)}">`
  : `${dieetNu(a) ?? `<span class="hint">–</span>`}`;
const huidigVeld = (a, cls = "huidig-veld") => canWrite
  ? `<input type="number" min="0" step="1" inputmode="numeric" class="${cls}" data-huidig="${esc(a.id)}" value="${esc(a.huidigeBezetting ?? "")}" placeholder="${plaatsen(a) || "–"}" aria-label="Huidige bezetting ${esc(a.naam)}"${a.huidigeBezettingOp ? ` title="Bijgewerkt op ${esc(fmtDate(a.huidigeBezettingOp))}"` : ""}>`
  : `${huidig(a) ?? `<span class="hint">–</span>`}`;
function bindHuidig(root) {
  root.querySelectorAll("[data-huidig]").forEach((inp) => {
    inp.onclick = (e) => e.stopPropagation(); inp.onkeydown = (e) => e.stopPropagation();
    inp.onchange = () => {
      const v = inp.value === "" ? null : Math.max(0, Math.round(Number(inp.value)) || 0);
      write(() => sb.from("vv_afdelingen").update({ huidige_bezetting: v, huidige_bezetting_op: v == null ? null : today() }).eq("id", inp.dataset.huidig), "Huidige bezetting bewaard");
    };
  });
  root.querySelectorAll("[data-dieet]").forEach((inp) => {
    inp.onclick = (e) => e.stopPropagation(); inp.onkeydown = (e) => e.stopPropagation();
    inp.onchange = () => {
      const v = inp.value === "" ? null : Math.max(0, Math.round(Number(inp.value)) || 0);
      write(() => sb.from("vv_afdelingen").update({ huidige_dieet: v, huidige_bezetting_op: today() }).eq("id", inp.dataset.dieet), "Gemixt/diëten bewaard");
    };
  });
}
// Gemiddelde verspilling per bewoner (huidige bezetting, anders maximale) per meetdag, in gram.
function gramPerPlaats(a, ms) {
  const n = totaalNu(a) || plaatsen(a), dagen = new Set(ms.map((m) => m.datum)).size;
  return n && dagen ? (sum(ms) * 1000) / dagen / n : null;
}
const gram = (g) => Math.round(g).toLocaleString("nl-BE") + " g";
// Aantallen per maaltijd (geleverde porties, aanwezigen): één rij per afdeling, datum en maaltijd.
const maalKey = (x) => `${x.afdelingId}|${x.datum}|${x.maaltijd}`;
function aantallenVan(afdId) { return S.maaltijden.filter((x) => x.afdelingId === afdId && inPeriode(x)); }
// Verspilling per aanwezige (gram), enkel over maaltijden waarvoor de aanwezigen ingevuld zijn.
function perAanwezige(afdId, ms) {
  const mt = aantallenVan(afdId).filter((x) => Number(x.aanwezig) > 0);
  if (!mt.length) return null;
  const keys = new Set(mt.map(maalKey));
  const k = sum(ms.filter((m) => keys.has(maalKey(m))));
  const n = mt.reduce((t, x) => t + Number(x.aanwezig), 0);
  return n ? (k * 1000) / n : null;
}
function portiesSaldo(afdId) {
  const mt = aantallenVan(afdId).filter((x) => x.porties != null && x.aanwezig != null);
  return mt.length ? { porties: mt.reduce((t, x) => t + Number(x.porties), 0), aanwezig: mt.reduce((t, x) => t + Number(x.aanwezig), 0) } : null;
}

function focusInfo(a) {
  const ms = ofAfd(S.metingen, a.id).filter(inPeriode);
  const gev = ofAfd(S.gevoeligheden, a.id);
  const act = ofAfd(S.acties, a.id);
  const zonder = gev.filter((g) => g.impact === "hoog" && !act.some((x) => x.gevoeligheidId === g.id && x.status !== "Afgerond"));
  if (zonder.length) return ["hoog", `${zonder.length} hoge gevoeligheid${zonder.length > 1 ? "heden" : ""} zonder actie`];
  if (!ms.length) return ["mute", "Start met meten"];
  const top = groupKg(ms, "stroom")[0];
  if (!act.some((x) => x.status === "Lopend" || x.status === "Gepland")) return ["midden", "Nog geen actie gepland"];
  return ["ok", `Grootste stroom: ${(STROMEN[top[0]] || top[0]).split(" (")[0].toLowerCase()}`];
}
function focusFor(a) { const [cls, tekst] = focusInfo(a); return `<span class="pill p-${cls}">${esc(tekst)}</span>`; }

// ---------- render ----------
function render() {
  const sites = [...S.sites].sort((a, b) => (a.volgorde ?? 99) - (b.volgorde ?? 99));
  // Op een afdeling hoort de site bij die afdeling (ook meteen na vernieuwen, vóór de sitekeuze getekend wordt).
  const huidigeAfd = S.afdelingen.find((x) => x.id === ui.view);
  if (huidigeAfd) ui.site = huidigeAfd.siteId;
  // Zolang de gegevens nog laden, de gekozen site niet vervangen door de eerste.
  if (sites.length && (!ui.site || !sites.some((s) => s.id === ui.site))) ui.site = sites[0].id;
  $("#siteWrap").hidden = !sessie || !sites.length;
  $("#siteSel").innerHTML = `<option value=""${ui.view === "start" || ui.view === "productie" ? " selected" : ""}>Alle sites</option>` + sites.map((s) => `<option value="${esc(s.id)}"${ui.view !== "start" && ui.view !== "productie" && s.id === ui.site ? " selected" : ""}>${esc(s.naam)}</option>`).join("");
  renderNav();
  const main = $("#main");
  document.body.classList.toggle("uit", !sessie);
  document.body.classList.toggle("start", !!sessie && ready && (ui.view === "start" || ui.view === "kies" || ui.view === "productie") && sites.length > 0);
  if (!sessie) { $("#nav").innerHTML = ""; main.innerHTML = viewLogin(); return; }
  if (!ready) { main.innerHTML = `<div class="empty">Gegevens laden…</div>`; return; }
  if (!sites.length) { main.innerHTML = `<div class="empty">Nog geen site. Voeg er een toe via Beheer.</div>` + beheerHtml(); bindBeheer(); return; }
  if (ui.view === "start") renderStart(main, sites);
  else if (ui.view === "kies") renderKies(main);
  else if (ui.view === "overzicht") renderOverzicht(main);
  else if (ui.view === "beheer") { main.innerHTML = beheerHtml(); bindBeheer(); }
  else if (ui.view === "productie") renderProductie(main, sites);
  else { const a = S.afdelingen.find((x) => x.id === ui.view); if (a) { ui.site = a.siteId; renderAfdeling(main, a); } else { ui.view = "overzicht"; renderOverzicht(main); } }
  schrijfAdres();
}

// Totaal van alle sites per kalenderjaar (los van de periodekeuze). Testmetingen van vóór 2027 tellen niet mee.
const EERSTE_JAAR = "2027";
function totaalHtml(sites) {
  const jaren = [...new Set(S.metingen.map((m) => (m.datum || "").slice(0, 4)).filter((j) => j >= EERSTE_JAAR))].sort();
  if (!jaren.length) return `<section class="totaal"><div class="eyebrow">Totaal alle sites</div><p>Nog geen wegingen. De eerste metingen starten in 2027.</p></section>`;
  if (!ui.jaar || !jaren.includes(ui.jaar)) ui.jaar = jaren[jaren.length - 1];
  const ms = S.metingen.filter((m) => (m.datum || "").startsWith(ui.jaar));
  const vorig = S.metingen.filter((m) => (m.datum || "").startsWith(String(Number(ui.jaar) - 1)));
  const tot = sum(ms), vtot = sum(vorig), dagen = new Set(ms.map((m) => m.datum)).size;
  const perSite = sites.map((st) => { const ids = new Set(S.afdelingen.filter((a) => a.siteId === st.id).map((a) => a.id)); return [st.naam, sum(ms.filter((m) => ids.has(m.afdelingId)))]; }).sort((a, b) => b[1] - a[1]);
  const max = Math.max(0.1, ...perSite.map(([, v]) => v));
  const verschil = vtot ? Math.round(((tot - vtot) / vtot) * 100) : null;
  return `<section class="totaal">
    <div class="totaal-kop"><div class="eyebrow">Totaal alle sites</div><div class="seg">${jaren.map((j) => `<button data-jaar="${j}" aria-pressed="${j === ui.jaar}">${j}</button>`).join("")}</div></div>
    <div class="totaal-grid">
      <div class="totaal-cijfer"><b>${kg(tot)}</b><span>verspild in ${ui.jaar}</span>${verschil == null ? "" : `<span class="trend ${verschil <= 0 ? "goed" : "slecht"}">${verschil <= 0 ? "▼" : "▲"} ${Math.abs(verschil)}% t.o.v. ${Number(ui.jaar) - 1}</span>`}
        <div class="totaal-mini"><span><b>${ms.length}</b>wegingen</span><span><b>${dagen}</b>meetdagen</span></div></div>
      <div class="totaal-sites">${perSite.map(([n, v]) => `<div class="b"><span class="lbl">${esc(n)}</span><span class="num">${kg(v)}</span><div class="bar"><i style="width:${Math.max(2, (v / max) * 100)}%"></i></div></div>`).join("")}</div>
    </div>
  </section>`;
}

// Beginscherm: de app opent altijd hier, met een tegel per site (naam en afdelingen per soort).
function renderStart(main, sites) {
  const u = new Date().getHours(), groet = u < 12 ? "Goedemorgen" : u < 18 ? "Goedemiddag" : "Goedenavond";
  main.innerHTML = `
    <div class="start-kop"><div class="eyebrow">${groet}</div><h2>Kies een site</h2></div>
    <div class="site-tegels">${sites.map((st, i) => `<button type="button" class="site-tegel k${i % 4}" data-site="${esc(st.id)}">
        <span class="site-ic">${icon(/ziekenhuis/i.test(st.naam) ? "ziekenhuis" : "huis")}</span>
        <span class="site-naam">${esc(st.naam)}</span>
        <span class="site-sub">${(() => {
          const afd = S.afdelingen.filter((a) => a.siteId === st.id);
          const per = Object.entries(TYPES).map(([k, [ev, mv]]) => { const c = afd.filter((a) => (TYPES[a.type] ? a.type : "andere") === k).length; return c ? `${c} ${(c === 1 ? ev : mv).toLowerCase()}` : ""; }).filter(Boolean);
          return per.length ? per.map(esc).join("<br>") : "Nog geen afdelingen";
        })()}</span>
        <span class="site-pijl">${icon("pijl")}</span>
      </button>`).join("")}
      <button type="button" class="site-tegel keuken" data-productie>
        <span class="site-ic">${icon("weegschaal")}</span>
        <span class="site-naam">Hoofdkeuken</span>
        <span class="site-sub">Productie: menu en gram per persoon<br>voor alle sites</span>
        <span class="site-pijl">${icon("pijl")}</span>
      </button></div>
    ${totaalHtml(sites)}`;
  main.querySelector("[data-productie]").onclick = () => { ui.view = "productie"; render(); window.scrollTo({ top: 0 }); };
  main.querySelectorAll("[data-jaar]").forEach((b) => (b.onclick = () => { ui.jaar = b.dataset.jaar; render(); }));
  main.querySelectorAll("[data-site]").forEach((b) => (b.onclick = () => { ui.site = b.dataset.site; ui.view = naSite(); saveUi(); render(); window.scrollTo({ top: 0 }); }));
}

// ---------- productie (hoofdkeuken, voor alle sites) ----------
// Wat er per site geproduceerd moet worden voor één maaltijd: hoeveelheid per persoon × gekende aantallen.
// Aantallen per afdeling: bezetting van die weekdag, anders huidige bezetting, anders max. bezetting; afdelingen die die dag dicht zijn, tellen niet mee.
function productieItems(menu) {
  const samen = menu.filter((x) => samenVan(x.gerecht)), gedekt = new Set(samen.flatMap((x) => [x.component, ...vervangtVan(samenVan(x.gerecht))]));
  return menu.filter((x) => samenVan(x.gerecht) || !gedekt.has(x.component))
    .sort((x, y) => MENU_COMP.indexOf(x.component) - MENU_COMP.indexOf(y.component))
    .map((x) => { const p = menuProduct(x.component, x.gerecht); return { gerecht: x.gerecht, norm: normVan(p), eenheid: p?.eenheid || "g" }; });
}
function personenVoor(siteId, datum) {
  const afd = S.afdelingen.filter((a) => a.siteId === siteId && openOp(a, datum));
  const n = (a) => dagBezetting(a, datum) ?? (a.huidigeBezetting != null ? Number(a.huidigeBezetting) : a.capaciteit != null ? Math.max(0, Number(a.capaciteit) - (dieetNu(a) || 0)) : null);
  return { personen: afd.reduce((t, a) => t + (n(a) || 0), 0), dieet: afd.reduce((t, a) => t + (dagBezetting(a, datum) == null ? dieetNu(a) || 0 : 0), 0), onbekend: afd.filter((a) => n(a) == null).map((a) => a.naam) };
}
const hoeveel = (gram, eenheid) => (eenheid === "ml" ? (Math.round(gram / 100) / 10).toLocaleString("nl-BE", { minimumFractionDigits: 1 }) + " l" : kg(gram / 1000));
function teProducerenHtml(sites, datum, maaltijd) {
  const perSite = sites.map((st) => ({ st, ...personenVoor(st.id, datum), items: productieItems(menuVan(st.id, datum, maaltijd)) }));
  const rijen = [];
  perSite.forEach(({ items }) => items.forEach((it) => { if (!rijen.some((r) => r.gerecht === it.gerecht)) rijen.push(it); }));
  if (!rijen.length) return `<section class="panel" style="margin-top:24px"><h3>Te produceren</h3><p class="hint">Nog geen menu voor deze maaltijd.</p></section>`;
  const cel = (ps, gerecht) => { const it = ps.items.find((x) => x.gerecht === gerecht); return !it ? "–" : it.norm == null ? `<span class="hint">geen norm</span>` : hoeveel(it.norm * ps.personen, it.eenheid); };
  const totaal = (gerecht) => { const it = rijen.find((x) => x.gerecht === gerecht); if (it.norm == null) return "–"; return hoeveel(perSite.reduce((t, ps) => { const i = ps.items.find((x) => x.gerecht === gerecht); return t + (i?.norm ? i.norm * ps.personen : 0); }, 0), it.eenheid); };
  const onbekend = perSite.filter((ps) => ps.onbekend.length);
  return `<section class="panel" style="margin-top:24px">
    <div class="form-kop"><span class="kop-ic">${icon("mensen")}</span><div><h3>Te produceren: ${esc(maaltijd.toLowerCase())} ${esc(fmtDate(datum))}</h3><p class="hint">Hoeveelheid per persoon × gekende aantallen per site (huidig standaard, anders max. bezetting). Gemixt/diëten staan apart vermeld en zijn nog niet berekend.</p></div></div>
    <div class="tablewrap"><table class="productie"><thead><tr><th>Gerecht</th><th class="num">Per persoon</th>${perSite.map((ps) => `<th class="num">${esc(ps.st.naam)}<br><span class="hint">${ps.personen} pers.</span>${ps.dieet ? `<br><span class="hint">+ ${ps.dieet} gemixt/diëten</span>` : ""}</th>`).join("")}<th class="num">Totaal<br><span class="hint">${perSite.reduce((t, ps) => t + ps.personen, 0)} pers.</span></th></tr></thead><tbody>
    ${rijen.map((it) => `<tr><td>${esc(it.gerecht)}</td><td class="num">${it.norm == null ? "–" : `${Math.round(it.norm)} ${it.eenheid}`}</td>${perSite.map((ps) => `<td class="num">${cel(ps, it.gerecht)}</td>`).join("")}<td class="num"><b>${totaal(it.gerecht)}</b></td></tr>`).join("")}
    </tbody></table></div>
    ${onbekend.length ? `<p class="hint" style="margin-top:8px">Zonder gekend aantal (telt niet mee): ${onbekend.map((ps) => `${esc(ps.st.naam)}: ${esc(ps.onbekend.join(", "))}`).join("; ")}. Vul de bezetting in bij Beheer.</p>` : ""}
  </section>`;
}
function renderProductie(main, sites) {
  const datum = ui.pDatum || today(), maaltijd = ui.pMaaltijd || "Middagmaal", scope = sites.some((x) => x.id === ui.pSite) ? ui.pSite : "";
  const menu = menuVan(scope || null, datum, maaltijd), van = (c) => menu.find((x) => x.component === c)?.gerecht || "";
  const afwijk = [...new Set(S.menus.filter((x) => x.siteId && x.datum === datum && x.maaltijd === maaltijd).map((x) => x.siteId))].map((id) => S.sites.find((x) => x.id === id)?.naam).filter(Boolean);
  const prods = S.producten.filter((x) => x.component === ZETMEEL).sort((x, y) => x.naam.localeCompare(y.naam));
  const samens = S.producten.filter((x) => x.component === SAMEN).sort((x, y) => x.naam.localeCompare(y.naam));
  const normHint = (c, g) => { const p = menuProduct(c, g); return !g ? "" : !p ? (c === ZETMEEL ? "nog niet bij de zetmeelsoorten" : isSamen(c) ? "nog niet bij de samengestelde gerechten" : "nog geen gram per persoon") : (normTekst(p) || "nog geen gram per persoon") + (samenVan(g) && vervangtVan(p).length ? ` (vervangt ${vervangtVan(p).map((x) => kortComp(x).toLowerCase()).join(", ")})` : ""); };
  main.innerHTML = `
    <button type="button" class="terug" data-naar="start">‹ Startscherm</button>
    <div><div class="eyebrow">Hoofdkeuken</div><h2>Productie</h2><p class="hint">Eén keuken kookt voor alle sites. Vul per onderdeel in hoeveel er per persoon klaargemaakt wordt; bij het wegen vergelijkt de app dat met wat terugkomt.</p></div>
    <section class="panel">
      <div class="form-kop"><span class="kop-ic">${icon("kalender")}</span><div><h3>Menu</h3><p class="hint">Het centrale menu geldt voor alle sites. Wijkt een site af, kies ze bij "Voor" en vul enkel in wat anders is.</p></div></div>
      <form class="f" id="pMenu">
        <label>Datum<input type="date" id="pDatum" value="${esc(datum)}"></label>
        <label>Maaltijd<select id="pMaaltijd">${opts(MAALTIJDEN, maaltijd)}</select></label>
        <label class="full">Voor<select id="pSite"><option value="">Alle sites (centraal menu)</option>${sites.map((st) => `<option value="${esc(st.id)}"${st.id === scope ? " selected" : ""}>Afwijkend voor ${esc(st.naam)}</option>`).join("")}</select></label>
        ${samenBlok(menu)}
        ${MENU_COMP.filter((c) => !isSamen(c)).map((c) => `<label class="menu-veld">${esc(kortComp(c))}<input data-pmenu="${esc(c)}"${lijstVoor(c)} maxlength="200" value="${esc(van(c))}"><span class="hint" data-pnorm="${esc(c)}">${esc(normHint(c, van(c)))}</span></label>`).join("")}
        <div class="full" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button type="submit" class="primary"${dis()}>Menu bewaren</button><span class="hint">${afwijk.length ? "Afwijkend menu op deze dag voor: " + esc(afwijk.join(", ")) + "." : scope ? "Wat gelijk is aan het centrale menu, wordt niet apart bewaard." : ""}</span></div>
      </form>${productLijst()}
    </section>
    ${teProducerenHtml(sites, datum, maaltijd)}
    <section class="panel" style="margin-top:24px">
      <div class="form-kop"><span class="kop-ic">${icon("weegschaal")}</span><div><h3>Gram per persoon per onderdeel</h3><p class="hint">Eén hoeveelheid per onderdeel, welk gerecht het ook is. Wordt bewaard zodra je het veld verlaat.</p></div></div>
      <div class="onderdelen">${MENU_COMP.filter((c) => c !== ZETMEEL && !isSamen(c)).map((c) => { const p = normProduct(c); return `<label><span>${esc(kortComp(c) === "Vlees" ? "Vlees, vis of vegetarisch" : kortComp(c))}</span><span class="per"><input type="number" min="0" step="1" inputmode="numeric" data-ogram="${esc(c)}" value="${esc(p?.gram ?? "")}" aria-label="Per persoon ${esc(c)}"${dis()}><select data-oeenh="${esc(c)}" aria-label="Eenheid ${esc(c)}"${dis()}>${opts(["g", "ml"], p?.eenheid || (c === "Soep" ? "ml" : "g"))}</select></span>${p?.toelichting ? `<small class="toel">${esc(p.toelichting)}</small>` : ""}</label>`; }).join("")}</div>
    </section>
    <section class="panel" style="margin-top:24px">
      <div class="form-kop"><span class="kop-ic">${icon("weegschaal")}</span><div><h3>Zetmeel per soort</h3><p class="hint">Bij zetmeel verschilt de hoeveelheid per soort. In het menu kies je de soort uit deze lijst.</p></div></div>
      ${prods.length ? `<div class="tablewrap"><table class="producten"><thead><tr><th>Soort</th><th>Per persoon</th><th></th></tr></thead><tbody>
      ${prods.map((p) => { const sam = onderdelenVan(p).length; return `<tr>
        <td><input data-pnaam="${esc(p.id)}" value="${esc(p.naam)}" maxlength="120" aria-label="Naam"${dis()}>${p.toelichting ? `<small class="toel">${esc(p.toelichting)}</small>` : ""}</td>
        <td><span class="per"><input type="number" min="0" step="1" inputmode="numeric" data-pgram="${esc(p.id)}" aria-label="Per persoon ${esc(p.naam)}" value="${sam ? esc(Math.round(normVan(p) || 0)) : esc(p.gram ?? "")}"${sam ? " disabled title=\"Opgeteld uit de samenstelling\"" : dis()}><select data-peenh="${esc(p.id)}" aria-label="Eenheid ${esc(p.naam)}"${dis()}>${opts(["g", "ml"], p.eenheid || "g")}</select></span></td>
        <td>${canWrite ? `<button class="ghost" data-del="producten/${esc(p.id)}" aria-label="Verwijder ${esc(p.naam)}">✕</button>` : ""}</td></tr>`; }).join("")}
      </tbody></table></div>` : `<div class="empty">Nog geen zetmeelsoorten. Voeg er hieronder een toe.</div>`}
      <form class="f" id="pNieuw" style="margin-top:16px">
        <label>Nieuwe soort<input id="pnNaam" maxlength="120" required placeholder="bv. Kroketten"></label>
        <label>Per persoon (g)<input type="number" id="pnGram" min="0" step="1" inputmode="numeric"></label>
        <div class="full"><button type="submit"${dis()}>Soort toevoegen</button></div>
      </form>
    </section>
    <section class="panel" style="margin-top:24px">
      <div class="form-kop"><span class="kop-ic">${icon("weegschaal")}</span><div><h3>Samengestelde gerechten</h3><p class="hint">Lasagne, stoofvlees, stoemp … Geef één hoeveelheid per persoon en duid aan wat erin zit. Staat het gerecht op het menu, dan tellen die onderdelen niet meer apart.</p></div></div>
      ${samens.length ? `<div class="tablewrap"><table class="producten"><thead><tr><th>Gerecht</th><th>Per persoon</th><th>Bevat</th><th></th></tr></thead><tbody>
      ${samens.map((p) => `<tr>
        <td><input data-pnaam="${esc(p.id)}" value="${esc(p.naam)}" maxlength="120" aria-label="Naam"${dis()}>${p.toelichting ? `<small class="toel">${esc(p.toelichting)}</small>` : ""}</td>
        <td><span class="per"><input type="number" min="0" step="1" inputmode="numeric" data-pgram="${esc(p.id)}" aria-label="Per persoon ${esc(p.naam)}" value="${esc(p.gram ?? "")}"${dis()}><select data-peenh="${esc(p.id)}" aria-label="Eenheid ${esc(p.naam)}"${dis()}>${opts(["g", "ml"], p.eenheid || "g")}</select></span></td>
        <td><span class="bevat" data-pverv="${esc(p.id)}">${VERVANGBAAR.map((c) => `<label><input type="checkbox" value="${esc(c)}"${vervangtVan(p).includes(c) ? " checked" : ""}${dis()}><span>${esc(kortComp(c))}</span></label>`).join("")}</span></td>
        <td>${canWrite ? `<button class="ghost" data-del="producten/${esc(p.id)}" aria-label="Verwijder ${esc(p.naam)}">✕</button>` : ""}</td></tr>`).join("")}
      </tbody></table></div>` : `<div class="empty">Nog geen samengestelde gerechten. Voeg er hieronder een toe.</div>`}
      <form class="f" id="sNieuw" style="margin-top:16px">
        <label>Nieuw gerecht<input id="snNaam" maxlength="120" required placeholder="bv. Lasagne"></label>
        <label>Per persoon (g)<input type="number" id="snGram" min="0" step="1" inputmode="numeric"></label>
        <div class="full bevat" id="snVerv"><span class="hint">Bevat:</span>${VERVANGBAAR.map((c) => `<label><input type="checkbox" value="${esc(c)}"><span>${esc(kortComp(c))}</span></label>`).join("")}</div>
        <div class="full"><button type="submit"${dis()}>Gerecht toevoegen</button></div>
      </form>
    </section>`;
  main.querySelector("[data-naar]").onclick = () => { ui.view = "start"; render(); window.scrollTo({ top: 0 }); };
  $("#pDatum").onchange = () => { ui.pDatum = $("#pDatum").value || today(); render(); };
  $("#pMaaltijd").onchange = () => { ui.pMaaltijd = $("#pMaaltijd").value; render(); };
  $("#pSite").onchange = () => { ui.pSite = $("#pSite").value; render(); };
  bindSamen(main, scope || null, datum, maaltijd, menu);
  main.querySelectorAll("[data-pmenu]").forEach((i) => (i.oninput = () => (main.querySelector(`[data-pnorm="${CSS.escape(i.dataset.pmenu)}"]`).textContent = normHint(i.dataset.pmenu, i.value.trim()))));
  $("#pMenu").onsubmit = (e) => {
    e.preventDefault();
    const waarden = {};
    main.querySelectorAll("[data-pmenu]").forEach((i) => (waarden[i.dataset.pmenu] = i.value));
    metNieuwSamen(main, menu, waarden);
    bewaarMenuRijen(scope || null, datum, maaltijd, waarden);
  };
  const upd = (id, v, msg) => write(() => sb.from("vv_producten").update(v).eq("id", id), msg);
  const getal = (v) => (v === "" || v == null ? null : Math.max(0, Math.round(Number(String(v).replace(",", "."))) || 0));
  main.querySelectorAll("[data-pnaam]").forEach((i) => (i.onchange = () => { const v = i.value.trim(); if (!v) { toast("Een product heeft een naam nodig."); return; } upd(i.dataset.pnaam, { naam: v }, "Naam bewaard"); }));
  // Norm per onderdeel: één rij per onderdeel (naam = onderdeel); bestaat ze nog niet, dan maken we ze aan.
  const bewaarOnderdeel = (c, v) => { const p = normProduct(c); return p ? upd(p.id, v, "Bewaard") : write(() => sb.from("vv_producten").insert({ naam: c, component: c, eenheid: c === "Soep" ? "ml" : "g", ...v }), "Bewaard"); };
  main.querySelectorAll("[data-ogram]").forEach((i) => (i.onchange = () => bewaarOnderdeel(i.dataset.ogram, { gram: getal(i.value) })));
  main.querySelectorAll("[data-oeenh]").forEach((i) => (i.onchange = () => bewaarOnderdeel(i.dataset.oeenh, { eenheid: i.value })));
  main.querySelectorAll("[data-pgram]").forEach((i) => (i.onchange = () => upd(i.dataset.pgram, { gram: getal(i.value) }, "Bewaard")));
  main.querySelectorAll("[data-peenh]").forEach((i) => (i.onchange = () => upd(i.dataset.peenh, { eenheid: i.value }, "Bewaard")));
  const aangevinkt = (box) => [...box.querySelectorAll("input:checked")].map((x) => x.value);
  main.querySelectorAll("[data-pverv]").forEach((box) => box.querySelectorAll("input").forEach((i) => (i.onchange = () => upd(box.dataset.pverv, { vervangt: aangevinkt(box) }, "Bewaard"))));
  $("#sNieuw").onsubmit = async (e) => {
    e.preventDefault();
    const rec = { naam: $("#snNaam").value.trim().slice(0, 120), component: SAMEN, gram: getal($("#snGram").value), eenheid: "g", vervangt: aangevinkt($("#snVerv")) };
    if (!rec.naam) return;
    if (await write(() => sb.from("vv_producten").insert(rec), `${rec.naam} toegevoegd`)) $("#sNieuw").reset();
  };
  $("#pNieuw").onsubmit = async (e) => {
    e.preventDefault();
    const rec = { naam: $("#pnNaam").value.trim().slice(0, 120), component: ZETMEEL, gram: getal($("#pnGram").value), eenheid: "g" };
    if (!rec.naam) return;
    if (await write(() => sb.from("vv_producten").insert(rec), `${rec.naam} toegevoegd`)) $("#pNieuw").reset();
  };
  bindDeletes(main);
}

// Op gsm kies je na de site eerst een afdeling uit een eenvoudige lijst (view "kies").
const isGsm = () => window.matchMedia("(max-width: 760px)").matches;
const naSite = () => (isGsm() ? "kies" : "overzicht");
function renderKies(main) {
  const site = S.sites.find((x) => x.id === ui.site), afd = siteAfd();
  const rij = (a) => `<button type="button" class="kies-rij" data-kies="${esc(a.id)}"><i class="ndot d-${focusInfo(a)[0]}"></i><span>${esc(a.naam)}</span>${icon("pijl")}</button>`;
  const groepen = Object.entries(TYPES).map(([k, [, mv]]) => { const l = afd.filter((a) => (TYPES[a.type] ? a.type : "andere") === k); return l.length ? `<div class="eyebrow grp">${mv}</div><div class="kies-lijst">${l.map(rij).join("")}</div>` : ""; }).join("");
  main.innerHTML = `
    <button type="button" class="terug" data-kies="start">‹ Alle sites</button>
    <div><div class="eyebrow">Kies een afdeling</div><h2>${esc(site?.naam || "")}</h2></div>
    <div class="kies">${groepen || `<div class="empty">Nog geen afdelingen. Voeg ze toe via Beheer.</div>`}</div>
    <div class="kies-extra"><button type="button" class="soft" data-kies="overzicht">${icon("huis")}Overzicht van de site</button><button type="button" class="soft" data-kies="beheer">${icon("tandwiel")}Beheer</button></div>`;
  main.querySelectorAll("[data-kies]").forEach((b) => (b.onclick = () => { ui.view = b.dataset.kies; ui.tab = "metingen"; ui.prefillAct = null; ui.wisAfd = null; render(); window.scrollTo({ top: 0 }); }));
}

function renderNav() {
  if (!sessie) return;
  const afd = siteAfd();
  // Het gewicht staat onder de naam, zodat lange namen (Personeelsrestaurant) er niet over lopen.
  const btn = (id, label, extra = "", voor = "") => `<button data-view="${esc(id)}" aria-current="${ui.view === id}"><span class="nl">${voor}<span class="nm"><span>${esc(label)}</span>${extra}</span></span></button>`;
  const groep = (type, titel) => {
    const l = afd.filter((a) => a.type === type);
    if (!l.length) return "";
    return `<div class="eyebrow grp">${titel}</div>` + l.map((a) => btn(a.id, a.naam, `<span class="count">${kg(sum(ofAfd(S.metingen, a.id).filter(inPeriode)))}</span>`, `<i class="ndot d-${focusInfo(a)[0]}" title="${esc(focusInfo(a)[1])}"></i>`)).join("");
  };
  const huidigeNaam = ui.view === "overzicht" ? "Overzicht site" : ui.view === "beheer" ? "Beheer" : afd.find((a) => a.id === ui.view)?.naam || "";
  const gsmBalk = `<div class="nav-gsm"><button type="button" data-view="kies" class="terug">‹ Afdelingen</button><span>${esc(huidigeNaam)}</span></div>`;
  $("#nav").innerHTML = gsmBalk + btn("start", "Alle sites", "", icon("raster")) + btn("overzicht", "Overzicht site", "", icon("huis")) + Object.entries(TYPES).map(([k, [, mv]]) => groep(k, mv)).join("") + afd.filter((a) => !TYPES[a.type]).map((a) => btn(a.id, a.naam)).join("") + `<div class="eyebrow grp">Instellingen</div>` + btn("beheer", "Beheer", "", icon("tandwiel"));
  $("#nav").querySelectorAll("button[data-view]").forEach((b) => (b.onclick = () => { ui.view = b.dataset.view; ui.prefillAct = null; ui.wisAfd = null; render(); window.scrollTo({ top: 0 }); }));
}

function periodeSeg() {
  return `<div class="seg" role="group" aria-label="Periode">${[[7, "7 dagen"], [30, "30 dagen"], [90, "90 dagen"], [0, "Alles"]].map(([v, l]) => `<button data-per="${v}" aria-pressed="${ui.periode === v}">${l}</button>`).join("")}</div>`;
}
function bindPeriode(root) { root.querySelectorAll("[data-excel]").forEach((b) => (b.onclick = async () => { b.disabled = true; try { await exporteerVerslag(b.dataset.excel === "site" ? null : b.dataset.excel); } finally { b.disabled = false; } })); root.querySelectorAll("[data-per]").forEach((b) => (b.onclick = () => { ui.periode = Number(b.dataset.per); saveUi(); render(); })); }

function barsHtml(entries, labelMap) {
  if (!entries.length) return `<div class="leeg-mini">${icon("weegschaal")}<span>Nog geen wegingen in deze periode.</span></div>`;
  const max = entries[0][1] || 1, st = labelMap === STROMEN;
  return `<div class="bars">${entries.map(([k, v]) => `<div class="b${st ? ` s-${esc(k)}` : ""}"><span class="lbl">${st ? `<span class="dot-ic">${icon(k)}</span>` : ""}${esc(st ? kort(k) : labelMap ? labelMap[k] || k : k)}</span><div class="bar"><i style="width:${Math.max(3, (v / max) * 100)}%"></i></div><span class="num">${kg(v)}</span></div>`).join("")}</div>`;
}
// Ring met de verdeling per soort verlies; kleuren komen uit de CSS (--s-bordrest, ...).
function donutHtml(entries) {
  const tot = entries.reduce((t, [, v]) => t + v, 0);
  if (!tot) return "";
  let acc = 0;
  const stops = entries.map(([k, v]) => { const a = (acc / tot) * 100; acc += v; return `var(--s-${k}, var(--accent)) ${a}% ${(acc / tot) * 100}%`; }).join(", ");
  return `<div class="donut" style="background:conic-gradient(${stops})" role="img" aria-label="Verdeling per soort verlies"><div><b>${kg(tot)}</b><span>totaal</span></div></div>`;
}
const stat = (ic, waarde, label, cls = "") => `<div class="stat ${cls}"><span class="stat-ic">${icon(ic)}</span><div><b>${waarde}</b><span>${label}</span></div></div>`;

function renderOverzicht(main) {
  const site = S.sites.find((s) => s.id === ui.site);
  const afd = siteAfd();
  const ids = new Set(afd.map((a) => a.id));
  const ms = S.metingen.filter((m) => ids.has(m.afdelingId) && inPeriode(m));
  const gev = S.gevoeligheden.filter((g) => ids.has(g.afdelingId));
  const act = S.acties.filter((a) => ids.has(a.afdelingId));
  const maxKg = Math.max(1, ...afd.map((a) => sum(ofAfd(ms, a.id))));
  main.innerHTML = `
    <div class="row-head"><div><div class="eyebrow">Overzicht</div><h2>${esc(site?.naam || "")}</h2></div><div class="kop-acties">${periodeSeg()}<button type="button" class="soft" data-excel="site">${icon("excel")}Excel-verslag</button></div></div>
    <div class="stats">
      ${stat("weegschaal", kg(sum(ms)), `verspild in ${ui.periode ? ui.periode + " dagen" : "totaal"}`, "hero")}
      ${stat("kalender", ms.length, `wegingen op ${new Set(ms.map((m) => m.datum)).size} meetdagen`, "t-blue")}
      ${stat("lamp", gev.length, `gevoeligheden, ${gev.filter((g) => g.impact === "hoog").length} hoog`, "t-amber")}
      ${stat("vlag", act.filter((a) => a.status === "Lopend" || a.status === "Gepland").length, "acties gepland of lopend", "t-green")}
    </div>
    <section class="panel">
      <div class="row-head"><h3>Waar lokaal inzetten</h3><p class="hint">Klik op een afdeling om te meten en acties vast te leggen.</p></div>
      <div class="tablewrap"><table class="afd-tabel">
        <thead><tr><th>Afdeling</th><th style="text-align:right">Max. bezetting</th><th style="text-align:right" title="Vul in hoeveel bewoners of patiënten nu een standaardmaaltijd krijgen">Huidig standaard</th><th style="text-align:right" title="Bewoners of patiënten met een gemixte maaltijd of een dieet">Gemixt/diëten</th><th style="text-align:right">Verspilling</th><th style="width:18%"></th><th style="text-align:right" title="Verspilling per aanwezige bewoner of patiënt (of per plaats per meetdag als er geen aanwezigen zijn ingevuld)">Per aanwezige</th><th>Gevoeligheden</th><th>Acties</th><th>Focus</th></tr></thead>
        <tbody>${afd.map((a) => { const k = sum(ofAfd(ms, a.id)); const g = ofAfd(gev, a.id); const ac = ofAfd(act, a.id); return `
          <tr class="click" data-open="${esc(a.id)}" tabindex="0">
            <td><div class="afd-cel"><i class="ndot d-${focusInfo(a)[0]}"></i><div><b>${esc(a.naam)}</b><br><span class="hint">${typeNaam(a.type)}</span></div></div></td>
            <td class="num">${bezettingTekst(a) || `<span class="hint">wisselend</span>`}</td>
            <td class="num">${huidigVeld(a)}</td>
            <td class="num">${dieetVeld(a)}</td>
            <td class="num">${kg(k)}</td>
            <td><div class="bar"><i style="width:${(k / maxKg) * 100}%"></i></div></td>
            <td class="num">${(() => { const pa = perAanwezige(a.id, ofAfd(ms, a.id)); if (pa != null) return gram(pa); const g = gramPerPlaats(a, ofAfd(ms, a.id)); return g == null ? `<span class="hint">–</span>` : `<span class="hint" title="per bewoner per meetdag">${gram(g)}/bewoner</span>`; })()}</td>
            <td>${g.length ? `${g.length} <span class="hint">(${g.filter((x) => x.impact === "hoog").length} hoog)</span>` : `<span class="hint">geen</span>`}</td>
            <td class="nowrap">${ac.length ? `${ac.filter((x) => x.status !== "Afgerond").length} open, ${ac.filter((x) => x.status === "Afgerond").length} af` : `<span class="hint">geen</span>`}</td>
            <td class="focus">${focusFor(a)}</td>
          </tr>`; }).join("") || `<tr><td colspan="10" class="hint">Nog geen afdelingen voor deze site.</td></tr>`}</tbody>
      </table></div>
    </section>
    <div class="two">
      <section class="panel"><h3 style="margin-bottom:12px">Per soort verlies</h3><div class="verdeling">${donutHtml(groupKg(ms, "stroom"))}${barsHtml(groupKg(ms, "stroom"), STROMEN)}</div></section>
      <section class="panel"><h3 style="margin-bottom:12px">Per component</h3>${barsHtml(groupKg(ms, "component").slice(0, 6))}</section>
    </div>`;
  bindPeriode(main); bindHuidig(main);
  main.querySelectorAll("[data-open]").forEach((tr) => {
    const go = () => { ui.view = tr.dataset.open; ui.tab = "metingen"; render(); window.scrollTo({ top: 0 }); };
    tr.onclick = go; tr.onkeydown = (e) => { if (e.key === "Enter") go(); };
  });
}

function opts(list, sel) { return list.map((v) => `<option${v === sel ? " selected" : ""}>${esc(v)}</option>`).join(""); }
function optsMap(map, sel) { return Object.entries(map).map(([k, v]) => `<option value="${k}"${k === sel ? " selected" : ""}>${esc(v)}</option>`).join(""); }
const dis = () => (canWrite ? "" : " disabled");

function renderAfdeling(main, a) {
  const ms = ofAfd(S.metingen, a.id).sort((x, y) => (y.datum || "").localeCompare(x.datum || "") || (y.aangemaakt || "").localeCompare(x.aangemaakt || ""));
  const msP = ms.filter(inPeriode);
  const gev = ofAfd(S.gevoeligheden, a.id).sort((x, y) => NIVEAU.indexOf(y.impact) - NIVEAU.indexOf(x.impact));
  const act = ofAfd(S.acties, a.id).sort((x, y) => STATUS.indexOf(x.status) - STATUS.indexOf(y.status));
  const tabs = [["metingen", `Metingen (${ms.length})`], ["gevoeligheden", `Gevoeligheden (${gev.length})`], ["acties", `Acties (${act.length})`]];
  main.innerHTML = `
    <div class="row-head"><div><div class="eyebrow">${typeNaam(a.type)} · ${esc(S.sites.find((s) => s.id === a.siteId)?.naam || "")}</div><h2>${esc(a.naam)}</h2><div class="bezet-rij">${bezettingTekst(a) ? `<span class="hint">Maximale bezetting: <b>${esc(bezettingTekst(a))}</b></span>` : ""}<label class="hint">Huidig standaard ${huidigVeld(a)}</label><label class="hint">Gemixt/diëten ${dieetVeld(a)}</label>${a.huidigeBezettingOp ? `<span class="hint">bijgewerkt ${esc(fmtDate(a.huidigeBezettingOp))}</span>` : ""}</div>${heeftDagen(a) ? `<p class="hint">Enkel open op ${esc(openTekst(a))}.</p>` : ""}${dagBezettingTekst(a) ? `<p class="hint">Bezetting per dag: ${esc(dagBezettingTekst(a))}.</p>` : ""}${a.aantallenInfo ? `<p class="hint">Aantallen: ${esc(a.aantallenInfo)}</p>` : ""}${a.omschrijving ? `<p class="hint">${esc(a.omschrijving)}</p>` : ""}</div><div class="kop-acties">${periodeSeg()}<button type="button" class="soft" data-excel="${esc(a.id)}">${icon("excel")}Excel-verslag</button></div></div>
    <div class="stats">
      ${stat("weegschaal", kg(sum(msP)), `verspild in ${ui.periode ? ui.periode + " dagen" : "totaal"}`, "hero")}
      ${stat("kalender", msP.length ? kg(sum(msP) / new Set(msP.map((m) => m.datum)).size) : "–", `gemiddeld per meetdag${(() => { const g = gramPerPlaats(a, msP); return g == null ? "" : `, ${gram(g)} per bewoner`; })()}`, "t-blue")}
      ${stat("mensen", (() => { const pa = perAanwezige(a.id, msP); return pa == null ? "–" : gram(pa); })(), `per aanwezige${(() => { const ps = portiesSaldo(a.id); return ps ? ` · klaargemaakt voor ${ps.porties}, ${ps.aanwezig} aanwezigen` : ", vul de aanwezigen in"; })()}`, "t-amber")}
      ${stat("vlag", act.filter((x) => x.status !== "Afgerond").length, `open acties, ${gev.filter((g) => g.impact === "hoog").length} hoge gevoeligheden`, "t-green")}
    </div>
    <div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" data-tab="${k}" aria-selected="${ui.tab === k}">${icon({ metingen: "weegschaal", gevoeligheden: "lamp", acties: "vlag" }[k])}${l}</button>`).join("")}</div>
    <div id="tabbody"></div>`;
  bindPeriode(main); bindHuidig(main);
  main.querySelectorAll("[data-tab]").forEach((b) => (b.onclick = () => { ui.tab = b.dataset.tab; render(); }));
  const body = $("#tabbody");
  if (ui.tab === "metingen") tabMetingen(body, a, ms, msP);
  else if (ui.tab === "gevoeligheden") tabGevoeligheden(body, a, gev, act);
  else tabActies(body, a, gev, act);
}

function tabMetingen(body, a, ms, msP) {
  body.innerHTML = `<div class="two">
    <section class="panel">
      <div class="form-kop"><span class="kop-ic">${icon("weegschaal")}</span><div><h3>Nieuwe weging</h3><p class="hint">Netto gewicht, zonder bak of emmer.</p></div></div>
      <form class="f" id="fMeting">
        <label>Datum<input type="date" id="mDatum" value="${esc(ui.mDatum || today())}" required></label>
        <label>Maaltijd<select id="mMaaltijd">${opts(MAALTIJDEN, ui.mMaaltijd || "Middagmaal")}</select></label>
        <p class="full dicht-melding" id="mDicht" hidden></p>
        <div class="full stap"><span>1</span>Aantallen voor deze maaltijd, één keer</div>
        <label>Klaargemaakt: standaard<input type="number" id="mPorties" min="0" step="1" inputmode="numeric"></label>
        <label>Klaargemaakt: dieet/gemixt<input type="number" id="mDieet" min="0" step="1" inputmode="numeric"></label>
        <label>Aanwezig${a.type === "patientenafdeling" ? "e patiënten" : a.type === "restaurant" ? "e eters" : a.type === "dagverzorging" ? "e gasten" : "e bewoners"}<input type="number" id="mAanwezig" min="0" step="1" inputmode="numeric"></label>
        <div class="full" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><button type="button" id="mAantBewaar"${dis()}>Aantallen bewaren</button><span class="hint" id="mAantInfo"></span></div>
        <div class="full stap"><span>2</span>Wat weeg je?</div>
        <div class="full menu-blok" id="mMenu"></div>
        <fieldset class="full tegels" aria-label="Soort verlies">${Object.keys(STROMEN).map((k) => `<label class="tegel s-${k}"><input type="radio" name="mStroom" value="${k}"${k === (ui.mStroom || (a.type === "restaurant" ? "overproductie" : "bordrest")) ? " checked" : ""}><span class="tegel-ic">${icon(k)}</span><span>${esc(kort(k))}</span></label>`).join("")}</fieldset>
        <fieldset class="full chipkeuze" aria-label="Component">${COMPONENTEN.map((c) => `<label><input type="radio" name="mComp" value="${esc(c)}"${c === (ui.mComp || "Gemengd of onbekend") ? " checked" : ""}><span>${esc(c)}<i class="gerecht" data-gerecht="${esc(c)}"></i></span></label>`).join("")}</fieldset>
        <div class="full stap"><span>3</span>Gewicht</div>
        <label class="full kg-veld"><span class="sr">Gewicht in kg</span><input type="number" id="mKg" min="0" step="0.1" inputmode="decimal" required placeholder="0,0"><span class="eenheid">kg</span></label>
        <label class="full">Opmerking<input id="mOpm" placeholder="bv. stoofvlees te taai, 3 bewoners in ziekenhuis"></label>
        <div class="full"><button class="primary groot" type="submit"${dis()}>${icon("weegschaal")}Weging opslaan</button></div>
      </form>
    </section>
    <section class="panel"><h3 style="margin-bottom:12px">Verdeling in deze periode</h3><div class="verdeling">${donutHtml(groupKg(msP, "stroom"))}${barsHtml(groupKg(msP, "stroom"), STROMEN)}</div><div style="height:16px"></div>${barsHtml(groupKg(msP, "component").slice(0, 5))}</section>
  </div>
  ${(() => {
    const mt = ofAfd(S.maaltijden, a.id).sort((x, y) => (y.datum || "").localeCompare(x.datum || "") || MAALTIJDEN.indexOf(x.maaltijd) - MAALTIJDEN.indexOf(y.maaltijd));
    if (!mt.length) return "";
    return `<section class="panel" style="margin-top:24px"><h3 style="margin-bottom:6px">Maaltijden</h3><div class="tablewrap"><table><thead><tr><th>Datum</th><th>Maaltijd</th><th style="text-align:right">Klaargemaakt</th><th style="text-align:right">Aanwezig</th><th style="text-align:right">Verschil</th><th style="text-align:right">Voorzien</th><th style="text-align:right">Gewogen</th><th style="text-align:right">Terug</th><th style="text-align:right">Per aanwezige</th><th></th></tr></thead><tbody>
    ${mt.slice(0, 40).map((x) => { const k = sum(ms.filter((m) => maalKey(m) === maalKey(x))); const v = x.porties != null && x.aanwezig != null ? x.porties - x.aanwezig : null; return `<tr><td>${fmtDate(x.datum)}</td><td>${esc(x.maaltijd)}</td><td class="num">${x.porties ?? "–"}${x.portiesDieet ? `<br><span class="hint">waarvan ${x.portiesDieet} dieet/gemixt</span>` : ""}</td><td class="num">${x.aanwezig ?? "–"}</td><td class="num">${v == null ? "–" : v > 0 ? `+${v}` : v}</td>${(() => { const vg = vergelijking(x.afdelingId, x.datum, x.maaltijd, ms), vz = vg?.voorzien; return `<td class="num">${vz == null ? "–" : kg(vz)}</td><td class="num">${kg(k)}</td><td class="num">${vz == null ? "–" : pct(vg.gewogen, vz)}</td>`; })()}<td class="num">${x.aanwezig ? gram((k * 1000) / x.aanwezig) : "–"}</td><td>${canWrite ? `<button class="ghost" data-del="maaltijden/${esc(x.id)}" aria-label="Verwijder aantallen">✕</button>` : ""}</td></tr>`; }).join("")}
    </tbody></table></div><p class="hint" style="margin-top:8px">Verschil = klaargemaakt min aanwezigen. Een plus betekent dat er te veel klaargemaakt werd.</p></section>`;
  })()}
  <section class="panel" style="margin-top:24px"><div class="row-head" style="margin-bottom:6px"><h3>Recente wegingen</h3>${ms.length && canWrite ? `<button type="button" class="ghost" data-wis-afd="${esc(a.id)}">Alle metingen van ${esc(a.naam)} wissen</button>` : ""}</div>
    ${ms.length ? `<div class="tablewrap"><table><thead><tr><th>Datum</th><th>Maaltijd</th><th>Soort</th><th>Component</th><th style="text-align:right">Gewicht</th><th>Opmerking</th><th></th></tr></thead><tbody>
    ${ms.slice(0, 40).map((m) => `<tr><td>${fmtDate(m.datum)}</td><td>${esc(m.maaltijd)}</td><td><span class="stroom-tag s-${esc(m.stroom)}">${icon(m.stroom)}${esc(kort(m.stroom))}</span></td><td>${esc(m.component)}${(() => { const g = gerechtVan(m); return g ? `<br><span class="hint">${esc(g)}</span>` : ""; })()}</td><td class="num">${kg(Number(m.kg) || 0)}</td><td>${esc(m.opmerking)}</td><td>${canWrite ? `<button class="ghost" data-del="metingen/${esc(m.id)}" aria-label="Verwijder meting">Verwijder</button>` : ""}</td></tr>`).join("")}
    </tbody></table></div>` : `<div class="empty">${icon("weegschaal", "ic groot")}<b>Nog geen wegingen</b><span>Voeg hierboven de eerste weging voor ${esc(a.naam)} toe.</span></div>`}
  </section>`;
  const wb = body.querySelector("[data-wis-afd]");
  if (wb) wb.onclick = () => { ui.wisAfd = wb.dataset.wisAfd; ui.view = "beheer"; render(); window.scrollTo({ top: document.body.scrollHeight }); setTimeout(() => $("#wBev")?.focus(), 50); };
  const huidig = () => S.maaltijden.find((x) => x.afdelingId === a.id && x.datum === ($("#mDatum").value || today()) && x.maaltijd === $("#mMaaltijd").value);
  // Bewaarde aantallen staan vast; met "Wijzigen" zet je ze terug open om een fout te verbeteren.
  let aantVast = false;
  const AANT = ["#mPorties", "#mDieet", "#mAanwezig"];
  const vulAantallen = () => {
    const h = huidig();
    // porties is het totaal; standaard = totaal min dieet/gemixt.
    $("#mPorties").value = h?.porties != null ? h.porties - (h.portiesDieet || 0) : ""; $("#mDieet").value = h?.portiesDieet ?? "";
    // Zonder bewaarde aantallen nemen we de huidige bezetting van de afdeling over als aanwezigen.
    const bezet = dagBezetting(a, $("#mDatum").value || today()) ?? totaalNu(a);
    const vanBezetting = h?.aanwezig == null && bezet != null;
    $("#mAanwezig").value = h?.aanwezig ?? bezet ?? "";
    aantVast = !!h;
    $("#mAantInfo").textContent = h ? "Bewaard voor deze maaltijd. Klik op Wijzigen als er een fout in staat." : vanBezetting ? "Aanwezigen overgenomen van de huidige bezetting; pas aan indien nodig." : "Nog niet ingevuld voor deze maaltijd.";
  };
  const getalOfNull = (v) => (v === "" || v == null ? null : Math.max(0, Math.round(Number(v)) || 0));
  // Bewaart porties en aanwezigen als ze ingevuld en gewijzigd zijn. Geeft false bij een fout.
  const bewaarAantallen = async (melding) => {
    const standaard = getalOfNull($("#mPorties").value), dieet = getalOfNull($("#mDieet").value), aanwezig = getalOfNull($("#mAanwezig").value), h = huidig();
    const porties = standaard == null && dieet == null ? null : (standaard || 0) + (dieet || 0);
    if (porties == null && aanwezig == null) { if (melding) toast("Vul in voor hoeveel personen er klaargemaakt werd, of de aanwezigen."); return true; }
    if (h && h.porties === porties && h.aanwezig === aanwezig && (h.portiesDieet ?? null) === dieet) { if (melding) toast("Aantallen zijn al bewaard."); return true; }
    const rec = { siteId: a.siteId, afdelingId: a.id, datum: $("#mDatum").value || today(), maaltijd: $("#mMaaltijd").value, porties, aanwezig };
    // Alleen meesturen als het gebruikt wordt, zodat bewaren blijft werken zolang het SQL-script niet gelopen heeft.
    if (dieet != null || h?.portiesDieet != null) rec.portiesDieet = dieet;
    const rij = naarDb(rec);
    return write(() => sb.from("vv_maaltijden").upsert(rij, { onConflict: "afdeling_id,datum,maaltijd" }), melding ? "Aantallen bewaard" : null);
  };
  const site = S.sites.find((x) => x.id === a.siteId);
  const tekenMenu = () => {
    const menu = menuVan(a.siteId, $("#mDatum").value || today(), $("#mMaaltijd").value), van = (c) => menu.find((x) => x.component === c)?.gerecht || "";
    body.querySelectorAll("[data-gerecht]").forEach((el) => {
      const c = el.dataset.gerecht;
      el.textContent = van(c) ? " · " + van(c) : "";
      if (isSamen(c) && c !== SAMEN) el.closest("label").hidden = !van(c);
    });
    const box = $("#mMenu");
    if (ui.menuOpen) {
      box.innerHTML = `<div class="menu-kop"><b>Menu van ${esc($("#mMaaltijd").value.toLowerCase())}</b><span class="hint">wat je hier wijzigt, geldt enkel voor ${esc(site?.naam || "deze site")}; het centrale menu pas je aan bij Productie</span></div>
        <div class="menu-velden">${samenBlok(menu)}${MENU_COMP.filter((c) => !isSamen(c)).map((c) => `<label>${esc(kortComp(c))}<input data-menu="${esc(c)}"${lijstVoor(c)} maxlength="200" value="${esc(van(c))}"></label>`).join("")}</div>${productLijst()}
        <div style="display:flex;gap:8px;margin-top:10px"><button type="button" id="mMenuBewaar"${dis()}>Menu bewaren</button><button type="button" class="ghost" id="mMenuSluit">Annuleren</button></div>`;
      $("#mMenuSluit").onclick = () => { ui.menuOpen = false; tekenMenu(); };
      $("#mMenuBewaar").onclick = bewaarMenu;
      bindSamen(box, a.siteId, $("#mDatum").value || today(), $("#mMaaltijd").value, menu);
      box.querySelectorAll("[data-menu]").forEach((i) => (i.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); bewaarMenu(); } }));
    } else {
      box.innerHTML = `<div class="menu-kop"><b>Menu</b>${canWrite ? `<button type="button" class="ghost" id="mMenuOpen">${menu.length ? "Aanpassen" : "Menu invullen"}</button>` : ""}</div>
        ${menu.length ? `<ul class="menu-lijst">${MENU_COMP.filter(van).map((c) => `<li><span>${esc(kortComp(c))}</span>${esc(van(c))}${(() => { const in_ = !samenVan(van(c)) && menu.find((x) => samenVan(x.gerecht) && x.component !== c && vervangtVan(samenVan(x.gerecht)).includes(c)); const t = in_ ? `zit in ${in_.gerecht}` : normTekst(menuProduct(c, van(c))); return t ? ` <em class="hint">· ${esc(t)}</em>` : ""; })()}</li>`).join("")}</ul>${vergelijkHtml(a, $("#mDatum").value || today(), $("#mMaaltijd").value, ms)}` : `<span class="hint">Nog geen menu voor deze maaltijd.</span>`}`;
      const k = $("#mMenuOpen"); if (k) k.onclick = () => { ui.menuOpen = true; tekenMenu(); box.querySelector("input")?.focus(); };
    }
  };
  const bewaarMenu = async () => {
    const waarden = {};
    $("#mMenu").querySelectorAll("[data-menu]").forEach((i) => (waarden[i.dataset.menu] = i.value));
    metNieuwSamen($("#mMenu"), menuVan(a.siteId, $("#mDatum").value || today(), $("#mMaaltijd").value), waarden);
    ui.menuOpen = false;
    await bewaarMenuRijen(a.siteId, $("#mDatum").value || today(), $("#mMaaltijd").value, waarden);
    tekenMenu();
  };
  // Op een dag dat de afdeling gesloten is, kan je niets invullen behalve een andere datum.
  const zetOpen = () => {
    const datum = $("#mDatum").value || today(), dicht = !openOp(a, datum), m = $("#mDicht");
    m.hidden = !dicht;
    m.textContent = dicht ? `${a.naam} is enkel open op ${openTekst(a)}. Op ${DAGEN[isoDag(datum) - 1]} ${fmtDate(datum)} kan je niets invullen; kies een andere datum.` : "";
    $("#fMeting").querySelectorAll("input, select, button").forEach((el) => { if (el.id !== "mDatum" && !el.closest("#mMenu")) el.disabled = dicht || !canWrite || (aantVast && AANT.includes("#" + el.id)); });
    $("#mAantBewaar").textContent = aantVast ? "Wijzigen" : "Aantallen bewaren";
  };
  vulAantallen(); tekenMenu(); zetOpen();
  $("#mDatum").onchange = () => { ui.mDatum = $("#mDatum").value; vulAantallen(); tekenMenu(); zetOpen(); };
  $("#mMaaltijd").onchange = () => { ui.mMaaltijd = $("#mMaaltijd").value; vulAantallen(); tekenMenu(); zetOpen(); };
  $("#mAantBewaar").onclick = () => {
    if (!openOp(a, $("#mDatum").value || today())) { toast(`${a.naam} is enkel open op ${openTekst(a)}.`); return; }
    if (!aantVast) { bewaarAantallen(true); return; }
    aantVast = false; zetOpen();
    $("#mAantInfo").textContent = "Pas de aantallen aan en klik op Aantallen bewaren.";
    $("#mPorties").focus();
  };
  $("#fMeting").onsubmit = async (e) => {
    e.preventDefault();
    if (!openOp(a, $("#mDatum").value || today())) { toast(`${a.naam} is enkel open op ${openTekst(a)}.`); return; }
    const val = Number(String($("#mKg").value).replace(",", "."));
    if (!(val > 0)) { toast("Vul een gewicht in groter dan 0 kg."); return; }
    const rec = { siteId: a.siteId, afdelingId: a.id, datum: $("#mDatum").value || today(), maaltijd: $("#mMaaltijd").value, stroom: body.querySelector("input[name=mStroom]:checked")?.value || "bordrest", component: body.querySelector("input[name=mComp]:checked")?.value || "Gemengd of onbekend", kg: val, opmerking: $("#mOpm").value.trim() };
    ui.mDatum = rec.datum; ui.mMaaltijd = rec.maaltijd; ui.mStroom = rec.stroom; ui.mComp = rec.component;
    if (!(await bewaarAantallen(false))) return;
    if (await write(() => sb.from("vv_metingen").insert(naarDb(rec)), `Weging van ${kg(val)} opgeslagen`)) { $("#mKg").value = ""; $("#mOpm").value = ""; }
  };
  bindDeletes(body);
}

function tabGevoeligheden(body, a, gev, act) {
  const sug = SUG_GEV[a.type] || [...SUG_GEV.woonafdeling, ...SUG_GEV.restaurant];
  body.innerHTML = `<div class="two">
    <section class="panel">
      <h3 style="margin-bottom:6px">Gevoeligheid vastleggen</h3>
      <p class="hint" style="margin-bottom:10px">Wat maakt verspilling op deze afdeling moeilijk te vermijden? Denk aan bewoners, organisatie en regels.</p>
      <form class="f" id="fGev">
        <label class="full">Categorie<select id="gCat">${opts(CATEGORIEEN)}</select></label>
        <label class="full">Omschrijving<textarea id="gOms" required placeholder="bv. 8 van de 28 bewoners krijgen gemixte voeding"></textarea></label>
        <label>Impact op verspilling<select id="gImp">${opts(NIVEAU, "midden")}</select></label>
        <label>Bron<input id="gBron" placeholder="functie, geen naam (bv. hoofdverpleegkundige)"></label>
        <div class="full"><button class="primary" type="submit"${dis()}>Gevoeligheid opslaan</button></div>
      </form>
      <div style="margin-top:14px"><div class="eyebrow" style="margin-bottom:6px">Vertrekpunten voor ${(TYPES[a.type] || TYPES.andere)[2]}</div>
      <div class="chips">${sug.map((s, i) => `<button type="button" data-sug="${i}">${esc(s[1])}</button>`).join("")}</div></div>
    </section>
    <section class="panel"><h3 style="margin-bottom:4px">Vastgelegde gevoeligheden</h3>
      ${gev.length ? `<div class="list">${gev.map((g) => { const gekoppeld = act.filter((x) => x.gevoeligheidId === g.id); return `<div class="item">
        <div><div class="meta"><span class="pill p-${esc(g.impact)}">${esc(g.impact)}</span><span>${esc(g.categorie)}</span>${g.bron ? `<span>· ${esc(g.bron)}</span>` : ""}</div><p>${esc(g.omschrijving)}</p>
        <div class="meta" style="margin-top:4px">${gekoppeld.length ? gekoppeld.map((x) => `<span class="pill p-mute">${esc(x.status)}: ${esc(x.titel)}</span>`).join("") : `<span>Nog geen actie</span>`}</div></div>
        <div class="side">${canWrite ? `<button data-act="${esc(g.id)}">Actie</button><button class="ghost" data-del="gevoeligheden/${esc(g.id)}" aria-label="Verwijder gevoeligheid">✕</button>` : ""}</div></div>`; }).join("")}</div>`
      : `<div class="empty">${icon("lamp", "ic groot")}<b>Nog geen gevoeligheden</b><span>Kies een vertrekpunt of schrijf er zelf een.</span></div>`}
    </section></div>`;
  body.querySelectorAll("[data-sug]").forEach((b) => (b.onclick = () => { const s = sug[Number(b.dataset.sug)]; $("#gCat").value = s[0]; $("#gOms").value = s[1]; $("#gOms").focus(); }));
  body.querySelectorAll("[data-act]").forEach((b) => (b.onclick = () => { ui.prefillAct = b.dataset.act; ui.tab = "acties"; render(); }));
  $("#fGev").onsubmit = async (e) => {
    e.preventDefault();
    const oms = $("#gOms").value.trim();
    if (!oms) { toast("Schrijf kort wat de gevoeligheid is."); return; }
    const rec = { siteId: a.siteId, afdelingId: a.id, categorie: $("#gCat").value, omschrijving: oms, impact: $("#gImp").value, bron: $("#gBron").value.trim() };
    if (await write(() => sb.from("vv_gevoeligheden").insert(naarDb(rec)), "Gevoeligheid opgeslagen")) { $("#gOms").value = ""; $("#gBron").value = ""; }
  };
  bindDeletes(body);
}

function tabActies(body, a, gev, act) {
  const pre = ui.prefillAct;
  const cell = (imp, insp) => act.filter((x) => x.status !== "Afgerond" && (x.impact === "hoog") === imp && (x.inspanning === "laag") === insp);
  const mx = (t, l) => `<div><h4>${t}</h4>${l.length ? `<ul>${l.map((x) => `<li>${esc(x.titel)}</li>`).join("")}</ul>` : `<p class="hint">Geen</p>`}</div>`;
  body.innerHTML = `<div class="two">
    <section class="panel">
      <h3 style="margin-bottom:10px">Actie toevoegen</h3>
      <form class="f" id="fAct">
        <label class="full">Titel<input id="aTit" required placeholder="bv. Kleinere basisportie met bijschep"></label>
        <label class="full">Wat houdt het in<textarea id="aOms"></textarea></label>
        <label class="full">Pakt deze gevoeligheid aan<select id="aGev"><option value="">Geen specifieke</option>${gev.map((g) => `<option value="${esc(g.id)}"${g.id === pre ? " selected" : ""}>${esc(g.omschrijving.slice(0, 70))}</option>`).join("")}</select></label>
        <label>Verwachte impact<select id="aImp">${opts(NIVEAU, "midden")}</select></label>
        <label>Inspanning<select id="aInsp">${opts(NIVEAU, "midden")}</select></label>
        <label>Status<select id="aStat">${opts(STATUS, "Idee")}</select></label>
        <label>Trekker<input id="aEig" placeholder="functie, geen naam (bv. teamleider)"></label>
        <div class="full"><button class="primary" type="submit"${dis()}>Actie opslaan</button></div>
      </form>
      <div style="margin-top:14px"><div class="eyebrow" style="margin-bottom:6px">Bewezen acties om mee te starten</div>
      <div class="chips">${SUG_ACT.map((s, i) => `<button type="button" data-sa="${i}">${esc(s[0])}</button>`).join("")}</div></div>
    </section>
    <section class="panel"><h3 style="margin-bottom:10px">Prioriteren</h3>
      <div class="matrix">${mx("Snel resultaat: hoge impact, lage inspanning", cell(true, true))}${mx("Project: hoge impact, meer inspanning", cell(true, false))}${mx("Meenemen: lagere impact, lage inspanning", cell(false, true))}${mx("Herbekijken: lagere impact, meer inspanning", cell(false, false))}</div>
    </section></div>
  <section class="panel" style="margin-top:24px"><h3 style="margin-bottom:4px">Acties op ${esc(a.naam)}</h3>
    ${act.length ? `<div class="list">${act.map((x) => { const g = gev.find((y) => y.id === x.gevoeligheidId); return `<div class="item">
      <div><div class="meta"><span class="pill p-${x.status === "Afgerond" ? "ok" : x.status === "Lopend" ? "midden" : "mute"}">${esc(x.status)}</span><span>impact ${esc(x.impact)} · inspanning ${esc(x.inspanning)}</span>${x.eigenaar ? `<span>· ${esc(x.eigenaar)}</span>` : ""}</div>
      <p><b>${esc(x.titel)}</b></p>${x.omschrijving ? `<p class="hint">${esc(x.omschrijving)}</p>` : ""}${g ? `<p class="hint">Voor: ${esc(g.omschrijving)}</p>` : ""}</div>
      <div class="side">${canWrite ? `<select data-stat="${esc(x.id)}" aria-label="Status">${opts(STATUS, x.status)}</select><button class="ghost" data-del="acties/${esc(x.id)}" aria-label="Verwijder actie">✕</button>` : ""}</div></div>`; }).join("")}</div>`
    : `<div class="empty">${icon("vlag", "ic groot")}<b>Nog geen acties</b><span>Start met een bewezen actie of koppel er een aan een gevoeligheid.</span></div>`}
  </section>`;
  if (pre) { const g = gev.find((y) => y.id === pre); if (g) $("#aTit").focus(); }
  body.querySelectorAll("[data-sa]").forEach((b) => (b.onclick = () => { const s = SUG_ACT[Number(b.dataset.sa)]; $("#aTit").value = s[0]; $("#aOms").value = s[1]; $("#aImp").value = s[2]; $("#aInsp").value = s[3]; $("#aTit").focus(); }));
  body.querySelectorAll("[data-stat]").forEach((s) => (s.onchange = () => write(() => sb.from("vv_acties").update({ status: s.value, gewijzigd: new Date().toISOString() }).eq("id", s.dataset.stat), "Status bijgewerkt")));
  $("#fAct").onsubmit = async (e) => {
    e.preventDefault();
    const tit = $("#aTit").value.trim();
    if (!tit) { toast("Geef de actie een titel."); return; }
    const rec = { siteId: a.siteId, afdelingId: a.id, titel: tit, omschrijving: $("#aOms").value.trim(), gevoeligheidId: $("#aGev").value || null, impact: $("#aImp").value, inspanning: $("#aInsp").value, status: $("#aStat").value, eigenaar: $("#aEig").value.trim() };
    if (await write(() => sb.from("vv_acties").insert(naarDb(rec)), "Actie opgeslagen")) { ui.prefillAct = null; }
  };
  bindDeletes(body);
}

const pendingDel = new Set();
function bindDeletes(root) {
  root.querySelectorAll("[data-del]").forEach((b) => (b.onclick = () => {
    const p = b.dataset.del;
    if (!pendingDel.has(p)) { pendingDel.add(p); b.textContent = "Zeker?"; b.style.color = "var(--red)"; setTimeout(() => { pendingDel.delete(p); if (b.isConnected) { b.textContent = b.getAttribute("aria-label").startsWith("Verwijder meting") ? "Verwijder" : "✕"; b.style.color = ""; } }, 3000); return; }
    pendingDel.delete(p);
    const [tabel, id] = p.split("/");
    write(() => sb.from("vv_" + tabel).delete().eq("id", id), "Verwijderd");
  }));
}

function beheerHtml() {
  const afd = siteAfd();
  return `<div class="row-head"><div><div class="eyebrow">Beheer</div><h2>Sites en afdelingen</h2></div></div>
  <div class="two">
    <section class="panel"><h3 style="margin-bottom:10px">Afdeling toevoegen aan ${esc(S.sites.find((s) => s.id === ui.site)?.naam || "deze site")}</h3>
      <form class="f" id="fAfd">
        <label class="full">Naam<input id="bNaam" required placeholder="bv. Sint-Vincentius"></label>
        <label>Type<select id="bType">${typeOpties(S.afdelingen.some((a) => a.siteId === ui.site && a.type === "patientenafdeling") ? "patientenafdeling" : "woonafdeling")}</select></label>
        <label>Volgorde<input type="number" id="bVolg" value="${afd.length + 1}"></label>
        <label>Plaatsen<input type="number" min="0" id="bCap" placeholder="leeg = wisselend"></label>
        <label>Kortverblijf<input type="number" min="0" id="bKv"></label>
        <label class="full">Wie geeft de aantallen door<input id="bInfo" placeholder="functie, geen naam (bv. de afdeling zelf)"></label>
        <label class="full">Omschrijving<input id="bOms" placeholder="bv. 30 bewoners, maaltijden uit centrale keuken"></label>
        <div class="full"><button class="primary" type="submit"${dis()}${S.sites.length ? "" : " disabled"}>Afdeling toevoegen</button></div>
      </form>
    </section>
    <section class="panel"><h3 style="margin-bottom:10px">Nieuwe site</h3>
      <p class="hint" style="margin-bottom:10px">Elke site krijgt dezelfde structuur: afdelingen, metingen, gevoeligheden en acties.</p>
      <form class="f" id="fSite">
        <label class="full">Naam van de site<input id="sNaam" required placeholder="bv. WZC De Linde"></label>
        <div class="full"><button class="primary" type="submit"${dis()}>Site toevoegen</button></div>
      </form>
    </section>
  </div>
  <section class="panel"><h3 style="margin-bottom:4px">Afdelingen van deze site</h3><p class="hint">Pas naam, volgorde, type, bezetting of omschrijving aan; het wordt bewaard zodra je het veld verlaat. Laat de plaatsen leeg als het aantal eters wisselt.</p>
    ${afd.length ? `<div class="list">${afd.map((a) => `<div class="item"><div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><input data-naam="${esc(a.id)}" value="${esc(a.naam)}" aria-label="Naam ${esc(a.naam)}"${dis()} style="flex:1 1 12rem;font-weight:700"><input type="number" data-volg="${esc(a.id)}" value="${esc(a.volgorde ?? "")}" aria-label="Volgorde ${esc(a.naam)}" title="Volgorde"${dis()} style="width:5rem"><select data-type="${esc(a.id)}" aria-label="Type ${esc(a.naam)}"${dis()} style="width:auto">${typeOpties(a.type)}</select></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">
        <label class="hint" style="display:flex;gap:6px;align-items:center">Max. plaatsen<input type="number" min="0" data-cap="${esc(a.id)}" value="${esc(a.capaciteit ?? "")}" aria-label="Plaatsen ${esc(a.naam)}"${dis()} style="width:5rem"></label>
        <label class="hint" style="display:flex;gap:6px;align-items:center">Kortverblijf<input type="number" min="0" data-kv="${esc(a.id)}" value="${esc(a.kortverblijf ?? "")}" aria-label="Kortverblijven ${esc(a.naam)}"${dis()} style="width:5rem"></label>
        <label class="hint" style="display:flex;gap:6px;align-items:center">Huidig standaard${huidigVeld(a, "")}</label>
        <label class="hint" style="display:flex;gap:6px;align-items:center">Gemixt/diëten${dieetVeld(a, "")}</label>
        <input data-info="${esc(a.id)}" value="${esc(a.aantallenInfo || "")}" placeholder="Wie geeft de aantallen door? (functie, geen naam)" aria-label="Aantallen ${esc(a.naam)}"${dis()} style="flex:1 1 14rem">
      </div>
      <div class="open-dagen hint" data-open="${esc(a.id)}"><span>Open op</span>${DAGEN.map((d, i) => `<label><input type="checkbox" value="${i + 1}"${openDagen(a).includes(i + 1) ? " checked" : ""}${dis()}><span>${d.slice(0, 2)}</span></label>`).join("")}<label>en de laatste<select data-laatste="${esc(a.id)}"${dis()}><option value="">–</option>${DAGEN.map((d, i) => `<option value="${i + 1}"${laatsteDag(a) === i + 1 ? " selected" : ""}>${d}</option>`).join("")}</select>van de maand</label><span>${heeftDagen(a) ? "" : "(niets aangeduid = elke dag)"}</span></div>
      <input data-oms="${esc(a.id)}" value="${esc(a.omschrijving || "")}" placeholder="Omschrijving (bv. aantal bewoners, keukenorganisatie)" aria-label="Omschrijving ${esc(a.naam)}"${dis()} style="margin-top:6px"></div>
      <div class="side">${canWrite ? `<button class="ghost" data-del="afdelingen/${esc(a.id)}" aria-label="Verwijder afdeling">✕</button>` : ""}</div></div>`).join("")}</div>` : `<div class="empty">Nog geen afdelingen.</div>`}
    <p class="hint" style="margin-top:10px">Een afdeling met metingen, gevoeligheden of acties kan je niet verwijderen. Wis die eerst.</p>
  </section>
  <section class="panel"><h3 style="margin-bottom:6px">Gegevens wissen</h3>
    <p class="hint" style="margin-bottom:10px">Handig na een test: wist in één keer de gegevens van één afdeling of van heel ${esc(S.sites.find((s) => s.id === ui.site)?.naam || "deze site")}. De afdelingen zelf blijven staan. Dit kan je niet ongedaan maken.</p>
    <form class="f" id="fWis">
      <label>Van<select id="wVan"><option value="">Heel de site</option>${afd.map((a) => `<option value="${esc(a.id)}"${ui.wisAfd === a.id ? " selected" : ""}>${esc(a.naam)}</option>`).join("")}</select></label>
      <label>Wat wissen<select id="wWat"><option value="alles">Metingen, gevoeligheden en acties</option><option value="metingen"${ui.wisAfd ? " selected" : ""}>Enkel metingen (wegingen en aantallen)</option></select></label>
      <label class="full">Typ WISSEN om te bevestigen<input id="wBev" autocomplete="off"></label>
      <div class="full"><button type="submit" style="color:var(--red);border-color:var(--red)"${dis()}>Gegevens wissen</button></div>
    </form>
  </section>`;
}
function bindBeheer() {
  bindHuidig(document);
  const fa = $("#fAfd"), fs = $("#fSite");
  if (fa) fa.onsubmit = async (e) => {
    e.preventDefault();
    const naam = $("#bNaam").value.trim(); if (!naam) return;
    const id = slug(ui.site + "-" + naam);
    const rec = { siteId: ui.site, naam, type: $("#bType").value, volgorde: Number($("#bVolg").value) || 99, omschrijving: $("#bOms").value.trim(),
      capaciteit: $("#bCap").value === "" ? null : Number($("#bCap").value), kortverblijf: $("#bKv").value === "" ? null : Number($("#bKv").value), aantallenInfo: $("#bInfo").value.trim() };
    if (await write(() => sb.from("vv_afdelingen").insert({ id, ...naarDb(rec) }), `${naam} toegevoegd`)) { ["#bNaam", "#bOms", "#bCap", "#bKv", "#bInfo"].forEach((k) => ($(k).value = "")); }
  };
  if (fs) fs.onsubmit = async (e) => {
    e.preventDefault();
    const naam = $("#sNaam").value.trim(); if (!naam) return;
    const id = slug(naam);
    if (await write(() => sb.from("vv_sites").insert({ id, naam, volgorde: S.sites.length + 1 }), `${naam} toegevoegd`)) { ui.site = id; saveUi(); ui.view = "beheer"; }
  };
  const fw = $("#fWis");
  if (fw) fw.onsubmit = async (e) => {
    e.preventDefault();
    if ($("#wBev").value.trim().toUpperCase() !== "WISSEN") { toast("Typ WISSEN om te bevestigen."); return; }
    const tabellen = $("#wWat").value === "metingen" ? ["vv_metingen", "vv_maaltijden"] : ["vv_acties", "vv_gevoeligheden", "vv_metingen", "vv_maaltijden"];
    const ok = await write(async () => {
      const van = $("#wVan").value;
      for (const t of tabellen) { const r = await (van ? sb.from(t).delete().eq("afdeling_id", van) : sb.from(t).delete().eq("site_id", ui.site)); if (r.error) return r; }
      return { error: null };
    }, "Gegevens gewist");
    if (ok) $("#wBev").value = "";
  };
  document.querySelectorAll("[data-type]").forEach((sel) => (sel.onchange = () => write(() => sb.from("vv_afdelingen").update({ type: sel.value }).eq("id", sel.dataset.type), "Type bewaard")));
  document.querySelectorAll("[data-naam]").forEach((inp) => (inp.onchange = () => { const v = inp.value.trim(); if (!v) { toast("Een afdeling heeft een naam nodig."); return; } write(() => sb.from("vv_afdelingen").update({ naam: v }).eq("id", inp.dataset.naam), "Naam bewaard"); }));
  document.querySelectorAll("[data-volg]").forEach((inp) => (inp.onchange = () => write(() => sb.from("vv_afdelingen").update({ volgorde: Number(inp.value) || 0 }).eq("id", inp.dataset.volg), "Volgorde bewaard")));
  const getal = (v) => (v === "" ? null : Math.max(0, Math.round(Number(v)) || 0));
  document.querySelectorAll("[data-cap]").forEach((inp) => (inp.onchange = () => write(() => sb.from("vv_afdelingen").update({ capaciteit: getal(inp.value) }).eq("id", inp.dataset.cap), "Bezetting bewaard")));
  document.querySelectorAll("[data-kv]").forEach((inp) => (inp.onchange = () => write(() => sb.from("vv_afdelingen").update({ kortverblijf: getal(inp.value) }).eq("id", inp.dataset.kv), "Kortverblijven bewaard")));
  document.querySelectorAll("[data-info]").forEach((inp) => (inp.onchange = () => write(() => sb.from("vv_afdelingen").update({ aantallen_info: inp.value.trim() }).eq("id", inp.dataset.info), "Bewaard")));
  document.querySelectorAll("[data-open]").forEach((box) => box.querySelectorAll("input").forEach((inp) => (inp.onchange = () => {
    const d = [...box.querySelectorAll("input:checked")].map((x) => Number(x.value));
    write(() => sb.from("vv_afdelingen").update({ open_dagen: d.length && d.length < 7 ? d : null }).eq("id", box.dataset.open), "Openingsdagen bewaard");
  })));
  document.querySelectorAll("[data-laatste]").forEach((sel) => (sel.onchange = () => write(() => sb.from("vv_afdelingen").update({ open_laatste: sel.value ? Number(sel.value) : null }).eq("id", sel.dataset.laatste), "Openingsdagen bewaard")));
  document.querySelectorAll("[data-oms]").forEach((inp) => (inp.onchange = () => write(() => sb.from("vv_afdelingen").update({ omschrijving: inp.value.trim() }).eq("id", inp.dataset.oms), "Omschrijving bewaard")));
  bindDeletes(document);
}

$("#siteSel").onchange = (e) => { if (e.target.value) { ui.site = e.target.value; ui.view = naSite(); saveUi(); } else ui.view = "start"; render(); window.scrollTo({ top: 0 }); };
// Klik op het logo of de naam: terug naar het beginscherm.
$("#home").onclick = () => { ui.view = "start"; ui.prefillAct = null; ui.wisAfd = null; render(); window.scrollTo({ top: 0 }); };

// ---------- Excel-verslag ----------
const EXCELJS_URL = "vendor/exceljs-4.4.0.min.js";
function laadExcelJS() {
  if (window.ExcelJS) return Promise.resolve(window.ExcelJS);
  return new Promise((ok, nok) => {
    const sc = document.createElement("script");
    sc.src = EXCELJS_URL; sc.onload = () => ok(window.ExcelJS); sc.onerror = nok;
    document.head.appendChild(sc);
  });
}
const XL = {
  kop: "FF1F6B4E", donker: "FF17533C", zebra: "FFFAF8F3", info: "FF627066", rand: { style: "thin", color: { argb: "FFE6E1D6" } },
  // Zelfde kleuren als in de app: [lichte tint, volle kleur].
  stroom: { bordrest: ["FFFBE4DB", "FFE0673F"], overproductie: ["FFFCF0D6", "FFC98A12"], bederf: ["FFEDE3F3", "FF8B5FAE"], bereiding: ["FFDDF0F2", "FF2B8F9C"] },
  tegel: { groen: ["FFE1F0E7", "FF1F6B4E"], blauw: ["FFE2EDF7", "FF2F6596"], amber: ["FFFBEED6", "FFA86A12"], rood: ["FFFBE3DC", "FFC2452F"] },
  impact: { hoog: ["FFF7E3DF", "FFB23B2E"], midden: ["FFF6ECD8", "FFA8741F"], laag: ["FFE3EBF4", "FF3B6390"] },
  focus: { hoog: ["FFF7E3DF", "FFB23B2E"], midden: ["FFF6ECD8", "FFA8741F"], ok: ["FFE2EFE8", "FF2F6B55"], mute: ["FFF5F6F4", "FF5D6B62"] },
  status: { Afgerond: ["FFE2EFE8", "FF2F6B55"], Lopend: ["FFF6ECD8", "FFA8741F"], Gepland: ["FFE3EBF4", "FF3B6390"], Idee: ["FFF5F6F4", "FF5D6B62"] },
};
const vul = (cel, argb) => { cel.fill = { type: "pattern", pattern: "solid", fgColor: { argb } }; };
const kleur = (cel, [bg, fg]) => { vul(cel, bg); cel.font = { bold: true, color: { argb: fg } }; };
const STROOM_HEX = { bordrest: "#e0673f", overproductie: "#e9a42b", bederf: "#8b5fae", bereiding: "#2b8f9c" };

// Grafiek als afbeelding (ExcelJS kan geen echte Excel-grafieken maken): ring per soort verlies en balken per afdeling.
async function grafiekPng(stromen, perAfd) {
  try { await document.fonts.ready; } catch {}
  const W = 960, H = 340, r = 2, c = document.createElement("canvas");
  c.width = W * r; c.height = H * r;
  const x = c.getContext("2d"); x.scale(r, r);
  const body = "IBM Plex Sans, Segoe UI, sans-serif", disp = "Barlow Condensed, Arial Narrow, sans-serif";
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, W, H);
  x.fillStyle = "#1c2a22"; x.font = `700 20px ${disp}`; x.fillText("Per soort verlies", 20, 32); x.fillText("Per afdeling (kg)", 420, 32);
  const tot = stromen.reduce((t, [, v]) => t + v, 0);
  const cx = 110, cy = 185, ro = 90, ri = 58;
  if (tot) {
    let a = -Math.PI / 2;
    stromen.forEach(([k, v]) => { const b = a + (v / tot) * Math.PI * 2; x.beginPath(); x.arc(cx, cy, ro, a, b); x.arc(cx, cy, ri, b, a, true); x.closePath(); x.fillStyle = STROOM_HEX[k] || "#2f8f66"; x.fill(); a = b; });
    x.textAlign = "center"; x.fillStyle = "#1c2a22"; x.font = `700 24px ${disp}`; x.fillText(kg(tot), cx, cy + 4); x.font = `12px ${body}`; x.fillStyle = "#627066"; x.fillText("totaal", cx, cy + 22); x.textAlign = "left";
    stromen.forEach(([k, v], i) => { const y = 120 + i * 36; x.fillStyle = STROOM_HEX[k] || "#2f8f66"; x.beginPath(); x.roundRect(225, y - 11, 14, 14, 4); x.fill(); x.fillStyle = "#1c2a22"; x.font = `600 13px ${body}`; x.fillText(kort(k), 247, y); x.fillStyle = "#627066"; x.font = `12px ${body}`; x.fillText(`${kg(v)} · ${Math.round((v / tot) * 100)}%`, 247, y + 16); });
  } else { x.fillStyle = "#627066"; x.font = `14px ${body}`; x.fillText("Nog geen wegingen in deze periode.", 20, 70); }
  const rij = perAfd.filter(([, v]) => v > 0).sort((p, q) => q[1] - p[1]).slice(0, 9), max = Math.max(0.1, ...rij.map(([, v]) => v));
  const bx = 580, bw = W - bx - 70, bh = 18, gap = Math.min(30, 280 / Math.max(1, rij.length));
  rij.forEach(([naam, v], i) => {
    const y = 58 + i * gap;
    x.fillStyle = "#1c2a22"; x.font = `13px ${body}`; x.textAlign = "right";
    let n = naam; while (x.measureText(n).width > bx - 430 && n.length > 3) n = n.slice(0, -2); if (n !== naam) n = n.trimEnd() + "…";
    x.fillText(n, bx - 10, y + 13); x.textAlign = "left";
    x.fillStyle = "#f3f0e8"; x.beginPath(); x.roundRect(bx, y, bw, bh, 9); x.fill();
    const g = x.createLinearGradient(bx, 0, bx + bw, 0); g.addColorStop(0, "#1f6b4e"); g.addColorStop(1, "#2f8f66");
    x.fillStyle = g; x.beginPath(); x.roundRect(bx, y, Math.max(bh, (v / max) * bw), bh, 9); x.fill();
    x.fillStyle = "#1c2a22"; x.font = `600 12px ${body}`; x.fillText(kg(v), bx + bw + 8, y + 13);
  });
  if (!rij.length) { x.fillStyle = "#627066"; x.font = `14px ${body}`; x.fillText("Nog geen wegingen in deze periode.", 420, 70); }
  return c.toDataURL("image/png").split(",")[1];
}
const kgNum = (n) => Math.round(n * 100) / 100;
const fmtD = (iso) => { if (!iso) return ""; const [y, m, d] = iso.slice(0, 10).split("-"); return `${d}/${m}/${y}`; };
const prioriteit = (x) => (x.impact === "hoog" ? (x.inspanning === "laag" ? "Snel resultaat" : "Project") : (x.inspanning === "laag" ? "Meenemen" : "Herbekijken"));

// Excel past de rijhoogte niet zelf aan bij afgebroken tekst; schat het aantal regels per cel.
function rijHoogte(ws, rij, n) {
  let regels = 1;
  for (let i = 1; i <= n; i++) {
    const v = rij.getCell(i).value, w = ws.getColumn(i).width || 10;
    if (v == null || v === "" || typeof v === "number" || rij.getCell(i).alignment?.wrapText === false) continue;
    const r = String(v).split("\n").reduce((t, l) => t + Math.max(1, Math.ceil((l.length * 1.15) / w)), 0);
    regels = Math.max(regels, r);
  }
  return Math.min(120, 6 + regels * 15);
}
// Eén blad met titel, info-regels en een tabel. Geeft het rijnummer na de tabel terug.
function tabel(ws, startRij, kolommen, rijen, opmaak) {
  const kop = ws.getRow(startRij);
  kolommen.forEach(([titel], i) => {
    const c = kop.getCell(i + 1); c.value = titel;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    vul(c, XL.kop); c.border = { bottom: { style: "medium", color: { argb: XL.donker } } };
    c.alignment = { vertical: "middle", wrapText: true };
  });
  kop.height = Math.max(28, rijHoogte(ws, kop, kolommen.length));
  rijen.forEach((waarden, k) => {
    const rij = ws.getRow(startRij + 1 + k);
    rij.values = waarden;
    rij.eachCell({ includeEmpty: true }, (c, nr) => {
      if (nr > kolommen.length) return;
      c.alignment = { vertical: "top", wrapText: true }; c.border = { bottom: XL.rand };
      if (k % 2) vul(c, XL.zebra);
      if (kolommen[nr - 1][2]) c.numFmt = kolommen[nr - 1][2];
    });
    if (opmaak) opmaak(rij, k);
    rij.height = rijHoogte(ws, rij, kolommen.length);
  });
  if (!rijen.length) ws.getRow(startRij + 1).getCell(1).value = "Geen gegevens.";
  return startRij + 1 + Math.max(1, rijen.length);
}
function blad(wb, naam, titel, info, breedtes, kleurTab = XL.kop) {
  const ws = wb.addWorksheet(naam, { pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0, paperSize: 9 } });
  ws.columns = breedtes.map((w) => ({ width: w }));
  ws.properties.tabColor = { argb: kleurTab };
  ws.views = [{ showGridLines: false }];
  // Groene titelbalk over de volle breedte, zoals de appbalk.
  ws.mergeCells(1, 1, 1, breedtes.length);
  const t = ws.getCell("A1"); t.value = titel; t.font = { bold: true, size: 18, color: { argb: "FFFFFFFF" } }; vul(t, XL.donker); t.alignment = { vertical: "middle", indent: 1 };
  ws.getRow(1).height = 38;
  ws.mergeCells(2, 1, 2, breedtes.length);
  const s2 = ws.getCell("A2"); s2.value = "Bord & Beleving · voedselverspilling en maaltijdbeleving"; s2.font = { italic: true, size: 10, color: { argb: "FFE1F0E7" } }; vul(s2, XL.kop); s2.alignment = { vertical: "middle", indent: 1 };
  ws.getRow(2).height = 18;
  info.forEach(([k, v], i) => { const r = ws.getRow(4 + i); r.getCell(1).value = k; r.getCell(1).font = { bold: true, color: { argb: XL.info } }; r.getCell(2).value = v; });
  return { ws, start: 4 + info.length + 1 };
}

async function exporteerVerslag(afdId) {
  let ExcelJS;
  try { ExcelJS = await laadExcelJS(); } catch { toast("Excel-export kon niet geladen worden. Controleer je internetverbinding."); return; }
  const site = S.sites.find((x) => x.id === ui.site);
  const afd = siteAfd().filter((a) => !afdId || a.id === afdId);
  const ids = new Set(afd.map((a) => a.id));
  const naamVan = (id) => (S.afdelingen.find((a) => a.id === id) || { naam: id }).naam;
  const ms = S.metingen.filter((m) => ids.has(m.afdelingId) && inPeriode(m)).sort((x, y) => (x.datum || "").localeCompare(y.datum || ""));
  const gev = S.gevoeligheden.filter((g) => ids.has(g.afdelingId));
  const act = S.acties.filter((x) => ids.has(x.afdelingId));
  const onderwerp = afdId ? `${afd[0]?.naam || ""} (${site?.naam || ""})` : site?.naam || "";
  const periodeTekst = ui.periode ? `Laatste ${ui.periode} dagen (vanaf ${fmtD(new Date(Date.now() - ui.periode * 864e5).toISOString())})` : "Alle metingen";
  const info = [["Site", site?.naam || ""], ...(afdId ? [["Afdeling", afd[0]?.naam || ""]] : []), ["Periode", periodeTekst], ["Geëxporteerd op", new Date().toLocaleString("nl-BE")]];

  const wb = new ExcelJS.Workbook();
  wb.creator = "Bord & Beleving"; wb.created = new Date();

  // Overzicht
  const o = blad(wb, "Overzicht", `Verslag voedselverspilling ${onderwerp}`, info, [24, 14, 16, 12, 12, 12, 14, 14, 12, 12, 14, 26, 14, 14, 14, 36]);
  const totKg = sum(ms);
  // Kerncijfers als gekleurde tegels.
  const mtAanw = S.maaltijden.filter((x) => ids.has(x.afdelingId) && inPeriode(x) && Number(x.aanwezig) > 0), mtKeys = new Set(mtAanw.map(maalKey));
  const nAanw = mtAanw.reduce((t, x) => t + Number(x.aanwezig), 0), gAanw = nAanw ? (sum(ms.filter((m) => mtKeys.has(maalKey(m)))) * 1000) / nAanw : null;
  const tegels = [
    [1, 1, "Totaal verspild", kgNum(totKg), '0.0 "kg"', XL.tegel.groen],
    [2, 3, "Per aanwezige", gAanw == null ? "–" : Math.round(gAanw), '0 "g"', XL.tegel.amber],
    [4, 6, `Wegingen op ${new Set(ms.map((x) => x.datum)).size} meetdagen`, ms.length, "0", XL.tegel.blauw],
    [7, 10, `Open acties (${gev.filter((g) => g.impact === "hoog").length} hoge gevoeligheden)`, act.filter((x) => x.status !== "Afgerond").length, "0", XL.tegel.rood],
  ];
  const tl = o.start, tv = o.start + 1;
  tegels.forEach(([van, tot, label, waarde, fmt, [bg, fg]]) => {
    if (tot > van) { o.ws.mergeCells(tl, van, tl, tot); o.ws.mergeCells(tv, van, tv, tot); }
    const l = o.ws.getCell(tl, van), w = o.ws.getCell(tv, van);
    l.value = label; l.font = { bold: true, size: 9, color: { argb: fg } }; l.alignment = { vertical: "bottom", indent: 1, wrapText: true };
    w.value = waarde; w.numFmt = fmt; w.font = { bold: true, size: 22, color: { argb: fg } }; w.alignment = { horizontal: "left", vertical: "middle", indent: 1 };
    for (let c = van; c <= tot; c++) { vul(o.ws.getCell(tl, c), bg); vul(o.ws.getCell(tv, c), bg); }
  });
  o.ws.getRow(tl).height = 26; o.ws.getRow(tv).height = 40;
  // Grafiek
  const gStart = tv + 2, gRijen = 15;
  for (let i = 0; i < gRijen; i++) o.ws.getRow(gStart + i).height = 18;
  try {
    const img = wb.addImage({ base64: await grafiekPng(groupKg(ms, "stroom"), afd.map((a) => [a.naam, sum(ofAfd(ms, a.id))])), extension: "png" });
    o.ws.addImage(img, { tl: { col: 0, row: gStart - 1 }, ext: { width: 960, height: 340 } });
  } catch (e) { console.warn("Grafiek niet gelukt", e); }
  let rij = gStart + gRijen + 1;
  o.ws.getRow(rij).getCell(1).value = "Per afdeling"; o.ws.getRow(rij).getCell(1).font = { bold: true, size: 14, color: { argb: XL.donker } };
  const perAfd = afd.map((a) => {
    const m = ofAfd(ms, a.id), dagen = new Set(m.map((x) => x.datum)).size, top = groupKg(m, "stroom")[0];
    const g = ofAfd(gev, a.id), x = ofAfd(act, a.id);
    const gp = gramPerPlaats(a, m), pa = perAanwezige(a.id, m), ps = portiesSaldo(a.id);
    return [a.naam, typeNaam(a.type), bezettingTekst(a) || "wisselend", huidig(a) ?? "", kgNum(sum(m)), m.length, dagen ? kgNum(sum(m) / dagen) : "", gp == null ? "" : Math.round(gp), ps ? ps.porties : "", ps ? ps.aanwezig : "", pa == null ? "" : Math.round(pa), top ? (STROMEN[top[0]] || top[0]).split(" (")[0] : "", g.length, g.filter((y) => y.impact === "hoog").length, x.filter((y) => y.status !== "Afgerond").length, focusInfo(a)[1]];
  });
  const afdKol = [["Afdeling"], ["Type"], ["Max. bezetting"], ["Huidige bezetting"], ["Verspild (kg)", , "0.0"], ["Metingen"], ["Gem. per meetdag (kg)", , "0.0"], ["Per bewoner per meetdag (g)", , "0"], ["Klaargemaakt voor"], ["Aanwezigen"], ["Per aanwezige (g)", , "0"], ["Grootste soort verlies"], ["Gevoeligheden"], ["Waarvan hoog"], ["Open acties"], ["Focus"]];
  rij = tabel(o.ws, rij + 1, afdKol, perAfd, (r, k) => kleur(r.getCell(16), XL.focus[focusInfo(afd[k])[0]]));
  if (perAfd.length > 1) { const t = o.ws.getRow(rij); t.getCell(1).value = "Totaal"; t.getCell(4).value = afd.reduce((n, x) => n + (huidig(x) || 0), 0) || ""; t.getCell(5).value = kgNum(totKg); t.getCell(5).numFmt = "0.0"; t.getCell(6).value = ms.length; for (let c = 1; c <= afdKol.length; c++) { const cel = t.getCell(c); vul(cel, XL.tegel.groen[0]); cel.font = { bold: true, color: { argb: XL.donker } }; cel.border = { top: { style: "medium", color: { argb: XL.kop } } }; } rij++; }
  const verdeling = (titel, key, labels, lijst = ms) => {
    rij += 1; o.ws.getRow(rij).getCell(1).value = titel; o.ws.getRow(rij).getCell(1).font = { bold: true, size: 14, color: { argb: XL.donker } };
    const g = groupKg(lijst, key), max = g.length ? g[0][1] : 1;
    rij = tabel(o.ws, rij + 1, [[key === "stroom" ? "Soort verlies" : key === "gerecht" ? "Gerecht" : "Component"], ["kg", , "0.0"], ["Aandeel", , "0%"], [""]], g.map(([k, v]) => [labels ? kort(k) : k, kgNum(v), totKg ? v / totKg : 0, "█".repeat(Math.max(1, Math.round((v / max) * 28)))]),
      (r, k) => {
        const kl = key === "stroom" ? XL.stroom[g[k][0]] : null, bar = r.getCell(4);
        bar.font = { color: { argb: kl ? kl[1] : XL.kop } }; bar.alignment = { vertical: "middle", wrapText: false };
        if (kl) { vul(r.getCell(1), kl[0]); r.getCell(1).font = { bold: true, color: { argb: kl[1] } }; }
      });
  };
  verdeling("Per soort verlies", "stroom", STROMEN);
  verdeling("Per component", "component");
  const msG = ms.map((x) => ({ ...x, gerecht: gerechtVan(x) })).filter((x) => x.gerecht);
  if (msG.length) verdeling("Per gerecht (volgens het menu)", "gerecht", null, msG);

  // Metingen
  const m = blad(wb, "Metingen", "Metingen", info, [12, 20, 14, 30, 28, 26, 12, 40], XL.stroom.bordrest[1]);
  tabel(m.ws, m.start, [["Datum"], ["Afdeling"], ["Maaltijd"], ["Soort verlies"], ["Component"], ["Gerecht"], ["kg", , "0.0"], ["Opmerking"]],
    ms.map((x) => [fmtD(x.datum), naamVan(x.afdelingId), x.maaltijd, kort(x.stroom), x.component, gerechtVan(x), kgNum(Number(x.kg) || 0), x.opmerking]),
    (r, k) => { const kl = XL.stroom[ms[k].stroom]; if (kl) { r.getCell(4).font = { bold: true, color: { argb: kl[1] } }; } r.getCell(7).font = { bold: true }; });
  if (ms.length) m.ws.autoFilter = { from: { row: m.start, column: 1 }, to: { row: m.start + ms.length, column: 8 } };
  m.ws.views = [{ state: "frozen", ySplit: m.start, showGridLines: false }];

  // Maaltijden (porties en aanwezigen)
  const mts = S.maaltijden.filter((x) => ids.has(x.afdelingId) && inPeriode(x)).sort((x, y) => (x.datum || "").localeCompare(y.datum || "") || naamVan(x.afdelingId).localeCompare(naamVan(y.afdelingId)) || MAALTIJDEN.indexOf(x.maaltijd) - MAALTIJDEN.indexOf(y.maaltijd));
  const mb = blad(wb, "Maaltijden", "Maaltijden: klaargemaakt en aanwezig", info, [12, 20, 14, 12, 14, 14, 12, 12, 13, 13, 10, 16], XL.stroom.overproductie[1]);
  tabel(mb.ws, mb.start, [["Datum"], ["Afdeling"], ["Maaltijd"], ["Standaard"], ["Dieet/gemixt"], ["Klaargemaakt totaal"], ["Aanwezig"], ["Verschil"], ["Voorzien standaard (kg)", , "0.0"], ["Gewogen (kg)", , "0.0"], ["Terug standaard", , "0%"], ["Per aanwezige (g)", , "0"]],
    mts.map((x) => { const k = sum(ms.filter((m) => maalKey(m) === maalKey(x))); return [fmtD(x.datum), naamVan(x.afdelingId), x.maaltijd, x.porties != null ? x.porties - (x.portiesDieet || 0) : "", x.portiesDieet ?? "", x.porties ?? "", x.aanwezig ?? "", x.porties != null && x.aanwezig != null ? x.porties - x.aanwezig : "", ...(() => { const vg = vergelijking(x.afdelingId, x.datum, x.maaltijd, ms), vz = vg?.voorzien; return [vz == null ? "" : kgNum(vz), kgNum(k), vz ? vg.gewogen / vz : ""]; })(), x.aanwezig ? Math.round((k * 1000) / x.aanwezig) : ""]; }),
    (r, k) => { const x = mts[k]; if (x.porties != null && x.aanwezig != null && x.porties !== x.aanwezig) kleur(r.getCell(8), x.porties > x.aanwezig ? XL.tegel.amber : XL.tegel.blauw); });
  mb.ws.views = [{ state: "frozen", ySplit: mb.start, showGridLines: false }];

  // Menu's van de site, met wat er per gerecht gewogen werd
  const mnKeys = [...new Set(S.menus.filter((x) => (!x.siteId || x.siteId === ui.site) && inPeriode(x)).map((x) => x.datum + "|" + x.maaltijd))];
  const mns = mnKeys.flatMap((k) => { const [d, mt] = k.split("|"); return menuVan(ui.site, d, mt); }).sort((x, y) => (x.datum || "").localeCompare(y.datum || "") || MAALTIJDEN.indexOf(x.maaltijd) - MAALTIJDEN.indexOf(y.maaltijd) || COMPONENTEN.indexOf(x.component) - COMPONENTEN.indexOf(y.component));
  if (mns.length) {
    const mn = blad(wb, "Menu", "Menu en gewogen per gerecht", info, [12, 14, 30, 30, 16, 14, 14], XL.kop);
    tabel(mn.ws, mn.start, [["Datum"], ["Maaltijd"], ["Component"], ["Gerecht"], ["Per persoon (g of ml)", , "0"], ["Menu"], ["Gewogen (kg)", , "0.0"]],
      mns.map((x) => [fmtD(x.datum), x.maaltijd, x.component, x.gerecht, normVan(menuProduct(x.component, x.gerecht)) ?? "", x.siteId ? "Afwijkend voor de site" : "Centraal", kgNum(sum(ms.filter((y) => y.datum === x.datum && y.maaltijd === x.maaltijd && y.component === x.component)))]));
    mn.ws.views = [{ state: "frozen", ySplit: mn.start, showGridLines: false }];
  }

  // Gevoeligheden
  const gs = [...gev].sort((x, y) => naamVan(x.afdelingId).localeCompare(naamVan(y.afdelingId)) || NIVEAU.indexOf(y.impact) - NIVEAU.indexOf(x.impact));
  const g = blad(wb, "Gevoeligheden", "Gevoeligheden", info.filter(([k]) => k !== "Periode"), [20, 26, 10, 50, 18, 40], XL.stroom.bederf[1]);
  tabel(g.ws, g.start, [["Afdeling"], ["Categorie"], ["Impact"], ["Omschrijving"], ["Bron"], ["Acties"]],
    gs.map((x) => [naamVan(x.afdelingId), x.categorie, x.impact, x.omschrijving, x.bron, act.filter((y) => y.gevoeligheidId === x.id).map((y) => `${y.titel} (${y.status})`).join("\n") || "Nog geen actie"]),
    (r, k) => kleur(r.getCell(3), XL.impact[gs[k].impact] || XL.impact.laag));
  g.ws.views = [{ state: "frozen", ySplit: g.start, showGridLines: false }];

  // Acties
  const as = [...act].sort((x, y) => naamVan(x.afdelingId).localeCompare(naamVan(y.afdelingId)) || STATUS.indexOf(x.status) - STATUS.indexOf(y.status));
  const a = blad(wb, "Acties", "Acties", info.filter(([k]) => k !== "Periode"), [20, 34, 11, 10, 11, 16, 18, 40, 40], XL.stroom.bereiding[1]);
  tabel(a.ws, a.start, [["Afdeling"], ["Actie"], ["Status"], ["Impact"], ["Inspanning"], ["Prioriteit"], ["Trekker"], ["Wat houdt het in"], ["Voor gevoeligheid"]],
    as.map((x) => [naamVan(x.afdelingId), x.titel, x.status, x.impact, x.inspanning, prioriteit(x), x.eigenaar, x.omschrijving, (gev.find((y) => y.id === x.gevoeligheidId) || {}).omschrijving || ""]),
    (r, k) => { kleur(r.getCell(3), XL.status[as[k].status] || XL.status.Idee); kleur(r.getCell(4), XL.impact[as[k].impact] || XL.impact.laag); });
  a.ws.views = [{ state: "frozen", ySplit: a.start, showGridLines: false }];

  // Opmaak hierboven vervangt het hele lettertype; zet overal hetzelfde lettertype terug.
  wb.eachSheet((ws) => ws.eachRow({ includeEmpty: true }, (r) => r.eachCell({ includeEmpty: true }, (c) => { if (!c.font?.name) c.font = { ...(c.font || {}), name: "Calibri" }; })));
  const buf = await wb.xlsx.writeBuffer();
  const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const naam = `Bord & Beleving ${onderwerp} ${today()}.xlsx`.replace(/[\\/:*?"<>|]/g, "-");
  const el = document.createElement("a");
  el.href = URL.createObjectURL(blob); el.download = naam;
  document.body.appendChild(el); el.click(); el.remove();
  setTimeout(() => URL.revokeObjectURL(el.href), 10000);
  toast("Excel-verslag gedownload");
}

// ---------- opslag ----------
const TABELLEN = { sites: "vv_sites", afdelingen: "vv_afdelingen", gevoeligheden: "vv_gevoeligheden", metingen: "vv_metingen", acties: "vv_acties", maaltijden: "vv_maaltijden", menus: "vv_menus", producten: "vv_producten" };
// Database gebruikt snake_case (site_id), de app camelCase (siteId).
const vanDb = (r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()), v]));
const naarDb = (r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase()), v]));

async function selectAlles(tabel) {
  const uit = [];
  for (let van = 0; ; van += 1000) {
    const { data, error } = await sb.from(tabel).select("*").order("id").range(van, van + 999);
    if (error) return { error };
    uit.push(...data);
    if (data.length < 1000) return { data: uit, error: null };
  }
}
const OPTIONEEL = { maaltijden: ["Porties en aanwezigen", "supabase/2026-10-20-maaltijden.sql"], menus: ["Menu's", "supabase/2026-10-29-menu.sql"], producten: ["Producten van de hoofdkeuken", "supabase/2026-10-30-productie.sql"] };
async function laadAlles() {
  const keys = Object.keys(TABELLEN);
  const res = await Promise.all(keys.map((k) => selectAlles(TABELLEN[k])));
  // Zolang het SQL-script voor een nieuwere tabel niet gelopen heeft, werkt de rest van de app gewoon verder.
  const ontbreekt = keys.filter((k, i) => res[i].error && OPTIONEEL[k]);
  if (res.filter((r) => r.error).length === ontbreekt.length) ontbreekt.forEach((k) => (res[keys.indexOf(k)] = { data: [], error: null }));
  if (res.some((r) => r.error)) { banner("De gegevens konden niet geladen worden. Heb je toegang gekregen? Vraag het aan de beheerder."); return; }
  banner(ontbreekt.length ? `${ontbreekt.map((k) => OPTIONEEL[k][0]).join(" en ")} kunnen nog niet bewaard worden: voer eerst ${ontbreekt.map((k) => OPTIONEEL[k][1]).join(" en ")} uit in Supabase.` : "");
  keys.forEach((k, i) => (S[k] = (res[i].data || []).map(vanDb).map((r) => (r.kg != null ? { ...r, kg: Number(r.kg) } : r))));
  ready = true;
  renderSafe();
}
function banner(msg) { const b = $("#banner"); b.textContent = msg || ""; b.hidden = !msg; }

// Niet opnieuw tekenen terwijl iemand een formulier invult; dat zou getypte tekst wissen.
function renderSafe() {
  const a = document.activeElement;
  const typing = a && a.closest && a.closest("form") && a.matches("input, textarea") && a.value;
  if (typing) { clearTimeout(renderSafe.t); renderSafe.t = setTimeout(renderSafe, 1500); return; }
  render();
}

function viewLogin() {
  if (!sb) return '<div class="empty">Laden…</div>';
  return `<div class="login-hero"><div class="login-beeld">${icon("blad", "ic")}</div><h2>Minder weggooien begint met meten</h2><p>Weeg wat terugkomt, zie waar het misloopt en zet per afdeling gericht acties op.</p></div>
  <form class="panel login" id="fLogin">
    <h2>Aanmelden</h2>
    <p class="hint">Vul je e-mailadres in. Je krijgt een mail met een link om je aan te melden.</p>
    <label>E-mailadres<input type="text" inputmode="email" autocomplete="email" id="lMail" required></label>
    <div><button class="primary" type="submit">Stuur aanmeldlink</button></div>
  </form>`;
}
document.addEventListener("submit", async (e) => {
  if (e.target.id !== "fLogin") return;
  e.preventDefault();
  const f = e.target, knop = f.querySelector("button[type=submit]");
  const email = $("#lMail").value.trim();
  if (!email) return;
  knop.disabled = true;
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname, shouldCreateUser: true } });
  knop.disabled = false;
  if (error) toast("Versturen mislukt: " + error.message);
  else f.innerHTML = `<h2>Kijk in je mailbox</h2><p style="margin:0">We stuurden een aanmeldlink naar <strong>${esc(email)}</strong>. Open die link op dit toestel.</p>`;
});
$("#logout").onclick = () => sb.auth.signOut();

let kanaal = null;
function zetSessie(s) {
  const was = !!sessie;
  sessie = s;
  $("#who").hidden = !s;
  $("#who-mail").textContent = s ? s.user.email : "";
  if (s && !was) {
    laadAlles();
    kanaal = sb.channel("voedselverspilling-wijzigingen");
    Object.values(TABELLEN).forEach((table) => kanaal.on("postgres_changes", { event: "*", schema: "public", table }, () => laadAlles()));
    kanaal.subscribe();
  }
  if (!s) { Object.keys(TABELLEN).forEach((k) => (S[k] = [])); ready = false; if (kanaal) { sb.removeChannel(kanaal); kanaal = null; } }
  render();
}

render();
(async () => {
  const cfg = window.VOEDSELVERSPILLING_CONFIG || {};
  if (!window.supabase || !cfg.supabaseUrl || !cfg.supabaseAnonKey) { banner("De app kon niet starten: de koppeling met de database ontbreekt (config.js)."); return; }
  sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
  const { data } = await sb.auth.getSession();
  zetSessie(data.session);
  sb.auth.onAuthStateChange((_ev, s) => { if (!!s !== !!sessie) zetSessie(s); else sessie = s; });
  // Bij terugkeer naar de app (gsm) gegevens verversen.
  document.addEventListener("visibilitychange", () => { if (!document.hidden && sessie) laadAlles(); });
})();
// Altijd de laatste versie: bij openen en bij terugkeren naar de app kijken we in version.json
// (nooit uit een cache) of er een nieuwere versie online staat, en laden we die dan één keer opnieuw.
const APP_VERSIE = "20261030q";
async function controleerVersie() {
  try {
    const r = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
    if (!r.ok) return;
    const { versie } = await r.json();
    if (!versie || versie === APP_VERSIE) return;
    const al = sessionStorage.getItem("vv-herladen");
    if (al === versie) return; // niet blijven herladen als de nieuwe versie nog niet overal klaarstaat
    sessionStorage.setItem("vv-herladen", versie);
    location.reload();
  } catch (e) {}
}
controleerVersie();
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") controleerVersie(); });
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then((r) => r.update()).catch(() => {});
// Eigen installatieknop (Chrome/Edge/Samsung Internet): verschijnt zodra de browser de app installeerbaar vindt.
let installVraag = null;
window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installVraag = e; $("#installeer").hidden = false; });
window.addEventListener("appinstalled", () => { installVraag = null; $("#installeer").hidden = true; toast("App geïnstalleerd"); });
$("#installeer").addEventListener("click", async () => {
  if (!installVraag) return;
  installVraag.prompt();
  await installVraag.userChoice.catch(() => {});
  installVraag = null; $("#installeer").hidden = true;
});
// iPhone en iPad kennen geen installatieknop: toon één keer hoe het via Safari moet.
(() => {
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const standalone = window.navigator.standalone || matchMedia("(display-mode: standalone)").matches;
  let gezien = false; try { gezien = localStorage.getItem("voedselverspilling-ios-tip") === "1"; } catch (e) {}
  if (ios && !standalone && !gezien) $("#ios-tip").hidden = false;
  $("#ios-tip-weg").onclick = () => { $("#ios-tip").hidden = true; try { localStorage.setItem("voedselverspilling-ios-tip", "1"); } catch (e) {} };
})();
