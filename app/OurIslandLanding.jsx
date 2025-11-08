"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Music2, ShieldCheck, Beer, Laugh, Sparkles } from "lucide-react";

/**
 * OurIsland.ie — Dynamic Placeholder Homepage (with dynamic modal data + teams index)
 * - Modal details are now fully dynamic per place (counties & diaspora cities)
 * - Central teams index; each place references up to three teams by slug
 */

const palette = {
  green: "#169B62",
  orange: "#FF883E",
  white: "#FFFFFF",
  ink: "#0A0F1C",
  gray: "#0F172A",
};

const navItems = [
  { label: "Culture", href: "#culture" },
  { label: "Nightlife", href: "#nightlife" },
  { label: "Map", href: "#map" },
  { label: "Volunteer", href: "#volunteer" },
];

const features = [
  { title: "Traditions", icon: Sparkles, color: palette.green, desc: "Stories, crafts, and the keepers of the flame across the island.", tag: "Heritage" },
  { title: "Pubs", icon: Beer, color: palette.orange, desc: "The social heartbeat — music, chat, and community hubs.", tag: "Community" },
  { title: "Comedy", icon: Laugh, color: palette.green, desc: "Gigs, clubs, and the next great Irish voices.", tag: "Venues" },
  { title: "Nightlife", icon: Music2, color: palette.orange, desc: "Late venues, sessions, and festivals that keep the craic alive.", tag: "Events" },
  { title: "Civil Defence", icon: ShieldCheck, color: palette.green, desc: "Volunteers and services that protect and strengthen communities.", tag: "Resilience" },
  { title: "Places", icon: MapPin, color: palette.orange, desc: "A living map of pubs, halls, stages, and hidden gems.", tag: "Directory" },
];

/**
 * TEAMS DIRECTORY (central, linkable)
 * - key: team slug
 * - value: { name, logo, note }
 * Add your own logos; placeholders provided where appropriate.
 */
const teamsIndex = {
  // Rugby
  "munster": {
    name: "Munster Rugby",
    logo: "https://cdn.freebiesupply.com/logos/large/2x/munster-rugby-logo-svg-vector.svg",
    note: "2nd in United Rugby Championship",
  },
  "leinster": {
    name: "Leinster Rugby",
    logo: "https://upload.wikimedia.org/wikipedia/fr/2/2c/Logo_Leinster_Rugby.svg",
    note: "URC contenders",
  },
  "connacht": {
    name: "Connacht Rugby",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/ConnachtRugby_2017logo.svg/1200px-ConnachtRugby_2017logo.svg.png",
    note: "URC",
  },

  // GAA (county)
  "kerry-gaa": {
    name: "Kerry GAA",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/39/Kerry_gaa_crest.png",
    note: "Sam Maguire Winners 2025",
  },
  "dublin-gaa": {
    name: "Dublin GAA",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/03/Dublin_GAA_crest.svg",
    note: "All-Ireland contenders",
  },
  "galway-gaa": {
    name: "Galway GAA",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/82/Galway_GAA_crest.svg",
    note: "Football & Hurling power",
  },

  // Football (soccer)
  "kerry-fc": {
    name: "Kerry FC",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Kerry_FC_Crest.png/170px-Kerry_FC_Crest.png",
    note: "9th League of Ireland First Division",
  },
  "shamrock-rovers": {
    name: "Shamrock Rovers",
    logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Shamrock_Rovers_FC.svg",
    note: "LOI champions",
  },
  "galway-united": {
    name: "Galway United",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/65/Galway_United_FC_logo.png",
    note: "League of Ireland",
  },

  // Diaspora examples
  {
    "boston-gaa": {
      "name": "Boston GAA",
      "logo": "https://lh4.googleusercontent.com/proxy/g5swMco5bD83yxbhoItysnpGwQAxZQ5tahgb6aFphQsIk_tWo-1pElpcEHeauiq2FHuZKGqRk2pag64yp5Kvptd4IbknbCTWO6jSiooXRRyQFvPm4uUpuw",
      "note": "USGAA Northeast champions 2025"
    },
    "celtics": {
      "name": "Boston Celtics",
      "logo": "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
      "note": "2nd in Eastern Conference"
    },
    "red-sox": {
      "name": "Boston Red Sox",
      "logo": "https://upload.wikimedia.org/wikipedia/en/6/6d/RedSoxPrimary_HangingSocks.svg",
      "note": "3rd in AL East"
    },
    "bruins": {
      "name": "Boston Bruins",
      "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Boston_Bruins.svg/2048px-Boston_Bruins.svg.png",
      "note": "8th in Atlantic Division"
    }
  },
  "london-gaa": {
    name: "London GAA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Gaelic_Athletic_Association_logo.svg",
    note: "British GAA county",
  },
  "qpr": {
    name: "Queens Park Rangers",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/Queens_Park_Rangers_crest.svg",
    note: "EFL Championship",
  },
  "harlequins": {
    name: "Harlequins",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/23/Harlequin_F.C._logo.svg",
    note: "Premiership Rugby",
  },
};

/**
 * Place details schema per item (county or city):
 * {
 *   name, colors[], banner, blurb,
 *   details: {
 *     bestFor: string[],
 *     signatureDrink: string,
 *     traditions: string[],
 *     notableVenues: string[],
 *   },
 *   teams: string[]   // up to three slugs from teamsIndex
 * }
 */

// --- Counties (examples fully filled; others use defaults) ---
const counties = [
  {
    name: "Kerry",
    colors: ["#169B62", "#F6C324"],
    banner: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop",
    blurb: "Killarney & Dingle nights; fireside trad.",
    details: {
      bestFor: ["Trad trail", "Coastal pubs", "Road-trip vibes"],
      signatureDrink: "Creamy pint by the fire",
      traditions: ["Set dancing", "Match nights"],
      notableVenues: ["Dick Mack's (Dingle)", "Courtney's (Killarney)", "O'Connor's (Doolin)"]
    },
    teams: ["munster", "kerry-gaa", "kerry-fc"],
  },
  {
    name: "Dublin",
    colors: ["#6EC1E4", "#0C2D48"],
    banner: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    blurb: "Temple Bar to Portobello; Whelan’s & Workman’s.",
    details: {
      bestFor: ["Live gigs", "Nightlife", "Museums"],
      signatureDrink: "A pint near Grafton",
      traditions: ["Trad sessions", "Storytelling"],
      notableVenues: ["Whelan's", "The Cobblestone", "Workman's Club"],
    },
    teams: ["leinster", "dublin-gaa", "shamrock-rovers"],
  },
  {
    name: "Galway",
    colors: ["#7A1F5C", "#FFFFFF"],
    banner: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop",
    blurb: "Latin Quarter buskers; Tig Chóilí & Róisín Dubh.",
    details: {
      bestFor: ["Buskers", "Trad", "Nightlife"],
      signatureDrink: "A hot whiskey on Quay St.",
      traditions: ["Sessions", "Rugby days"],
      notableVenues: ["Tig Chóilí", "Róisín Dubh", "The Crane Bar"],
    },
    teams: ["connacht", "galway-gaa", "galway-united"],
  },
  // ... keep the rest of your counties here (they will fall back to defaults if details/teams omitted)
];

// --- Diaspora cities (examples) ---
const diasporaCities = [
  {
    name: "Boston, USA",
    colors: ["#169B62", "#FF883E", "#FFFFFF"],
    banner: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c8/60/0f/caption.jpg?w=800&h=500&s=1",
    blurb: "Home to The Tam, JJ Foley’s; Southie & Seaport nights.",
    details: {
      bestFor: ["Irish bars", "Sports nights", "Live music"],
      signatureDrink: "A stout on State St.",
      traditions: ["Parade day", "GAA weekends"],
      notableVenues: ["The Burren", "The Black Rose", "Mr. Dooley's"],
    },
    teams: ["boston-gaa", "celtics", "bruins", "red-sox],
  },
  {
    name: "London, UK",
    colors: ["#FF883E", "#169B62", "#FFFFFF"],
    banner: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    blurb: "Kilburn to Clapham; trad sessions and mega clubs.",
    details: {
      bestFor: ["Big nights", "Irish clubs", "Theatre"],
      signatureDrink: "A porter in Kilburn",
      traditions: ["London GAA", "St. Patrick's week"],
      notableVenues: ["Tynecastle Arms (Irish-owned)", "Tommy Flynn's", "Auld Shillelagh"],
    },
    teams: ["london-gaa", "harlequins", "qpr"],
  },
    {
    name: "Beirut, Lebanon",
    colors: ["#169B62", "#FF883E", "#FFFFFF"],
    banner: "https://libshop.fr/wp-content/uploads/2019/07/mar-mikhael-gr97894.jpg",
    blurb: "Mar Mikhael to Gemmayze; lively pubs, coastal nights, and Irish charm in the Med.",
    details: {
      bestFor: ["Big nights", "Irish clubs", "Theatre"],
      signatureDrink: "A porter in Kilburn",
      traditions: ["London GAA", "St. Patrick's week"],
      notableVenues: ["Tynecastle Arms (Irish-owned)", "Tommy Flynn's", "Auld Shillelagh"],
    },
    teams: ["london-gaa", "harlequins", "qpr"],
  },
    {
    name: "London, UK",
    colors: ["#FF883E", "#169B62", "#FFFFFF"],
    banner: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    blurb: "Kilburn to Clapham; trad sessions and mega clubs.",
    details: {
      bestFor: ["Big nights", "Irish clubs", "Theatre"],
      signatureDrink: "A porter in Kilburn",
      traditions: ["London GAA", "St. Patrick's week"],
      notableVenues: ["Tynecastle Arms (Irish-owned)", "Tommy Flynn's", "Auld Shillelagh"],
    },
    teams: ["london-gaa", "harlequins", "qpr"],
  },
];

// ---------- COMPONENT ----------
export default function OurIslandLanding() {
  // Modal state & helpers
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalKind, setModalKind] = useState(null); // 'county' | 'city'
  const [modalData, setModalData] = useState(null);

  // default fillers for missing details / teams
  const withDefaults = (item, kind) => {
    const name = item?.name || (kind === "county" ? "Somewhere in Ireland" : "Irish abroad");
    return {
      ...item,
      details: {
        bestFor: item?.details?.bestFor || ["Live music", "Great company"],
        signatureDrink: item?.details?.signatureDrink || (kind === "county" ? "A perfect creamy pint" : "A familiar stout abroad"),
        traditions: item?.details?.traditions || ["Trad sessions", "Match nights"],
        notableVenues: item?.details?.notableVenues || ["Beloved locals", "Great music rooms"],
      },
      teams: Array.isArray(item?.teams) && item.teams.length ? item.teams.slice(0, 3) : [],
      motto: item?.motto || (kind === "county" ? "Small island, giant heart." : "Far from home, close to heart."),
      prideQuote: item?.prideQuote || (kind === "county" ? `I'm from ${name}, what an awesome place.` : `${name} — the island extended.`),
    };
  };

  const openModal = (item, kind) => {
    setModalOpen(true);
    setModalKind(kind);
    setModalData(withDefaults(item, kind));
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalKind(null);
    setModalData(null);
    if (typeof document !== "undefined") document.body.style.overflow = "";
  };
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, []);

  // helper: team card
  const TeamBadge = ({ slug }) => {
    const t = teamsIndex[slug];
    if (!t) return null;
    return (
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
        {t.logo ? (
          <img src={t.logo} alt={`${t.name} logo`} className="h-8 w-8 rounded-md object-contain bg-white p-1" />
        ) : (
          <div className="grid h-8 w-8 place-items-center rounded-md bg-white text-xs font-semibold text-black">{t.name?.[0] || "?"}</div>
        )}
        <div className="min-w-0">
          <div className="truncate text-sm font-medium">{t.name}</div>
          {t.note && <div className="truncate text-xs text-white/70">{t.note}</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#060913] text-white selection:bg-emerald-300/40 selection:text-emerald-950">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -inset-[10%]">
          <div className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]">
            <div className="absolute -left-1/3 top-[-10%] h-[140%] w-[80%] rotate-12 opacity-30 blur-3xl mix-blend-screen" style={{ background: `linear-gradient(180deg, ${palette.green}, transparent 70%)`, animation: "floatA 16s ease-in-out infinite" }} />
            <div className="absolute left-1/3 top-[-10%] h-[140%] w-[80%] -rotate-12 opacity-25 blur-3xl mix-blend-screen" style={{ background: `linear-gradient(180deg, ${palette.white}, transparent 70%)`, animation: "floatB 18s ease-in-out infinite" }} />
            <div className="absolute left-[60%] top-[-10%] h-[140%] w-[80%] rotate-6 opacity-30 blur-3xl mix-blend-screen" style={{ background: `linear-gradient(180deg, ${palette.orange}, transparent 70%)`, animation: "floatC 22s ease-in-out infinite" }} />
          </div>
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        </div>
      </div>

      {/* Nav */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="group inline-flex items-center gap-3">
            <div className="relative h-8 w-8 rounded-xl ring-1 ring-white/15">
              <span className="absolute inset-0 rounded-xl" style={{ background: `conic-gradient(from 45deg, ${palette.green}, ${palette.white}, ${palette.orange}, ${palette.green})` }} />
              <span className="absolute inset-0 rounded-xl bg-white/5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">OurIsland<span className="text-white/60">.ie</span></span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((n) => (
              <a key={n.label} href={n.href} className="text-sm text-white/80 transition hover:text-white">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#submit" className="hidden rounded-xl px-4 py-2 text-sm font-medium text-black md:inline-flex" style={{ background: palette.white }}>Submit a place</a>
            <a className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10" href="#newsletter">Join newsletter</a>
          </div>
        </div>
      </header>

      {/* Hero (unchanged) */}
      <section className="relative z-10 px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 md:py-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
              <span className="h-2 w-2 rounded-full" style={{ background: palette.green }}></span>
              Building a living, breathing guide to the island of Ireland
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Keep the <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${palette.green}, ${palette.white}, ${palette.orange})` }}>craic</span> alive.
            </h1>
            <p className="mt-5 max-w-xl text-white/80">OurIsland.ie celebrates the heartbeat of Ireland — from the small-town pubs and festival fields to the people who keep the light burning abroad. Built by the island, for the island — a living map of who we are, and what we can become.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#notify" className="rounded-xl px-5 py-3 text-sm font-semibold text-black" style={{ background: palette.white }}>Get launch updates</a>
              <a href="#map" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10">Explore preview</a>
            </div>
            <div className="mt-4 text-xs text-white/60">Proud of our past. Building our future.</div>
            <div className="mt-6 flex items-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full" style={{ background: palette.orange }} /> Live beta</div>
              <div>Made on the island • est. 2025</div>
            </div>
          </motion.div>

          {/* Hero Card (trimmed for brevity) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1222] p-6 shadow-2xl">
              <div className="absolute right-[-10%] top-[-10%] h-56 w-56 rounded-full opacity-40 blur-2xl" style={{ background: palette.green }} />
              <div className="absolute bottom-[-20%] left-[-10%] h-64 w-64 rounded-full opacity-30 blur-2xl" style={{ background: palette.orange }} />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white/80"><span className="h-2 w-2 rounded-full" style={{ background: palette.green }} /> Preview Map</div>
                <div className="rounded-2xl border border-white/10 bg-[#0B1222] p-4">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    {["Dublin", "Galway", "Belfast", "Cork", "Derry", "Limerick"].map((city, i) => (
                      <motion.div key={city} className="absolute" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }} style={{ left: `${10 + i * 14}%`, top: `${20 + (i % 3) * 22}%` }}>
                        <div className="flex items-center gap-2">
                          <span className="relative inline-flex h-2 w-2"><span className="absolute inline-flex h-2 w-2 rounded-full" style={{ background: palette.orange }}></span><span className="absolute inline-flex h-2 w-2 animate-ping rounded-full opacity-75" style={{ background: palette.orange }}></span></span>
                          <span className="text-[11px] text-white/80">{city}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/70">A real, filterable map of venues and traditions is coming soon. Want your place featured at launch?</p>
                <div className="mt-3 flex gap-3">
                  <a href="#submit" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10">Submit a place</a>
                  <a href="#volunteer" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10">Volunteer</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="relative z-10 border-y border-white/10 bg-white/5 py-3">
        <div className="overflow-hidden"><div className="animate-marquee whitespace-nowrap">{["Trad Sessions", "Festival Nights", "Civil Defence", "Pub Culture", "Local Heroes", "Irish Language", "Coastal Rescues"].map((t, idx) => (<span key={idx} className="mx-6 inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.green }} /> {t}<span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.orange }} /></span>))}{["Trad Sessions", "Festival Nights", "Civil Defence", "Pub Culture", "Local Heroes", "Irish Language", "Coastal Rescues"].map((t, idx) => (<span key={`d-${idx}`} className="mx-6 inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.green }} /> {t}<span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.orange }} /></span>))}</div></div>
      </section>

      {/* Counties */}
      <section id="counties" className="relative z-10 px-6">
        <div className="mx-auto max-w-7xl py-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Explore the Island</h2>
            <a href="#map" className="text-sm text-white/70 hover:text-white">View full map →</a>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {counties.map((item, i) => (
              <motion.a key={item.name} href={`#county-${item.name.toLowerCase()}`} onClick={(e) => { e.preventDefault(); openModal(item, "county"); }} role="button" tabIndex={0} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 8) * 0.05 }} style={{ boxShadow: `${item.colors[0]}55 0px 0px 40px inset, ${item.colors[0]}44 0 0 0 1px` }}>
                <div className="relative h-32 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.banner})` }} />
                  <div className="absolute inset-0 opacity-70 mix-blend-screen" style={{ background: `linear-gradient(90deg, ${item.colors[0]}, ${item.colors[1] || item.colors[0]}${item.colors[2] ? ", " + item.colors[2] : ""})` }} />
                </div>
                <div className="relative p-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70"><span className="h-1.5 w-1.5 rounded-full" style={{ background: item.colors[0] }} /> County</div>
                  <h3 className="text-lg font-medium tracking-tight">{item.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">{item.blurb}</p>
                  <div className="mt-4 flex items-center justify-between text-sm"><span className="text-white/70">Open →</span><div className="flex items-center gap-1">{item.colors.slice(0, 3).map((c, idx) => (<span key={idx} className="h-3 w-3 rounded-full" style={{ background: c }} />))}</div></div>
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-white/20 transition group-hover:opacity-100" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora */}
      <section id="diaspora" className="relative z-10 px-6">
        <div className="mx-auto max-w-7xl py-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">The Island Abroad — the Irish worldwide</h2>
            <a href="#map" className="text-sm text-white/70 hover:text-white">View global map →</a>
          </div>
          <p className="mb-6 max-w-3xl text-sm text-white/70">Our island stretches far beyond its shores. From Sydney to Chicago, the spirit of Ireland lives wherever the craic carries us.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {diasporaCities.map((item, i) => (
              <motion.a key={item.name} href={`#city-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} onClick={(e) => { e.preventDefault(); openModal(item, "city"); }} role="button" tabIndex={0} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 8) * 0.05 }} style={{ boxShadow: `${item.colors[0]}55 0px 0px 40px inset, ${item.colors[0]}44 0 0 0 1px` }}>
                <div className="relative h-32 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.banner})` }} />
                  <div className="absolute inset-0 opacity-70 mix-blend-screen" style={{ background: `linear-gradient(90deg, ${item.colors[0]}, ${item.colors[1] || item.colors[0]}${item.colors[2] ? ", " + item.colors[2] : ""})` }} />
                </div>
                <div className="relative p-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70"><span className="h-1.5 w-1.5 rounded-full" style={{ background: item.colors[0] }} /> City</div>
                  <h3 className="text-lg font-medium tracking-tight">{item.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">{item.blurb}</p>
                  <div className="mt-4 flex items-center justify-between text-sm"><span className="text-white/70">Open →</span><div className="flex items-center gap-1">{item.colors.slice(0, 3).map((c, idx) => (<span key={idx} className="h-3 w-3 rounded-full" style={{ background: c }} />))}</div></div>
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-white/20 transition group-hover:opacity-100" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ----- CENTERED MODAL ----- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
            <motion.div
              className="absolute left-1/2 top-1/2 z-50 w-[min(92vw,720px)] overflow-hidden rounded-3xl border border-white/10 bg-[#0B1222] text-white shadow-2xl"
              style={{ translateX: "-50%", translateY: "-50%", boxShadow: `${(modalData?.colors?.[0] || "#fff")}55 0px 0px 80px inset` }}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              role="dialog" aria-modal="true" aria-label={`${modalKind === "county" ? "County" : "City"} spotlight`}
            >
              {/* Banner */}
              <div className="relative h-40 w-full">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${modalData?.banner})` }} />
                <div className="absolute inset-0 mix-blend-screen opacity-70" style={{ background: `linear-gradient(90deg, ${modalData?.colors?.[0]}, ${modalData?.colors?.[1] || modalData?.colors?.[0]}${modalData?.colors?.[2] ? ", " + modalData?.colors?.[2] : ""})` }} />
              </div>

              <div className="p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70"><span className="h-1.5 w-1.5 rounded-full" style={{ background: modalData?.colors?.[0] }} /> {modalKind === "county" ? "County" : "City"} spotlight</div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{modalData?.name}</h3>
                    <p className="mt-2 max-w-prose text-sm text-white/80">{modalData?.blurb || "Pubs, music, and community at the heart of the scene."}</p>
                    {modalData?.motto && <p className="mt-2 text-sm italic text-white/70">“{modalData.motto}”</p>}
                    {modalData?.prideQuote && <p className="mt-2 text-sm text-emerald-300/90">{modalData.prideQuote}</p>}
                  </div>
                  <button onClick={closeModal} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">Close</button>
                </div>

                {/* Dynamic details */}
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="mb-1 text-xs text-white/60">Best for</div><div className="text-sm text-white/80">{(modalData?.details?.bestFor || []).join(" • ")}</div></div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="mb-1 text-xs text-white/60">Signature</div><div className="text-sm text-white/80">{modalData?.details?.signatureDrink}</div></div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="mb-1 text-xs text-white/60">Traditions</div><div className="text-sm text-white/80">{(modalData?.details?.traditions || []).join(" • ")}</div></div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4"><div className="mb-1 text-xs text-white/60">Notable venues</div><div className="text-sm text-white/80">{(modalData?.details?.notableVenues || []).join(" • ")}</div></div>

                {/* Linked teams */}
                {modalData?.teams?.length ? (
                  <div className="mt-6">
                    <div className="mb-2 text-xs text-white/60">Sports teams</div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {modalData.teams.map((slug) => <TeamBadge key={slug} slug={slug} />)}
                    </div>
                    <div className="mt-3 text-xs text-white/60">Editing teams? Update <code>teamsIndex</code> and reference by slug in each place.</div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-10 text-sm text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div>© {new Date().getFullYear()} OurIsland.ie — All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#submit" className="hover:text-white">Submit a place</a>
            <a href="#contact" className="hover:text-white">Contact</a>
            <a href="#privacy" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </footer>

      {/* Local styles for animations */}
      <style>{`
        @keyframes floatA { 0%,100% { transform: translateY(-4%) translateX(-2%); } 50% { transform: translateY(6%) translateX(2%); } }
        @keyframes floatB { 0%,100% { transform: translateY(2%) translateX(1%); } 50% { transform: translateY(-6%) translateX(-3%); } }
        @keyframes floatC { 0%,100% { transform: translateY(-2%) translateX(1%); } 50% { transform: translateY(8%) translateX(-2%); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
