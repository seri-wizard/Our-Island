"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Music2, ShieldCheck, Beer, Laugh, Sparkles } from "lucide-react";

/**
 * OurIsland.ie — Dynamic Placeholder Homepage
 * Single-file React component with Tailwind + Framer Motion.
 * Inspired by Stripe's clean layout & motion, recolored with Irish tricolor.
 */

const palette = {
  green: "#169B62", // Irish green
  orange: "#FF883E", // Irish orange
  white: "#FFFFFF",
  ink: "#0A0F1C", // deep navy for contrast
  gray: "#0F172A", // slate-900 style
};

const navItems = [
  { label: "Culture", href: "#culture" },
  { label: "Nightlife", href: "#nightlife" },
  { label: "Map", href: "#map" },
  { label: "Volunteer", href: "#volunteer" },
];

const features = [
  {
    title: "Traditions",
    icon: Sparkles,
    color: palette.green,
    desc: "Stories, crafts, and the keepers of the flame across the island.",
    tag: "Heritage",
  },
  {
    title: "Pubs",
    icon: Beer,
    color: palette.orange,
    desc: "The social heartbeat — music, chat, and community hubs.",
    tag: "Community",
  },
  {
    title: "Comedy",
    icon: Laugh,
    color: palette.green,
    desc: "Gigs, clubs, and the next great Irish voices.",
    tag: "Venues",
  },
  {
    title: "Nightlife",
    icon: Music2,
    color: palette.orange,
    desc: "Late venues, sessions, and festivals that keep the craic alive.",
    tag: "Events",
  },
  {
    title: "Civil Defence",
    icon: ShieldCheck,
    color: palette.green,
    desc: "Volunteers and services that protect and strengthen communities.",
    tag: "Resilience",
  },
  {
    title: "Places",
    icon: MapPin,
    color: palette.orange,
    desc: "A living map of pubs, halls, stages, and hidden gems.",
    tag: "Directory",
  },
];

// 32 Counties of the island of Ireland
// Colors roughly follow GAA county palettes; feel free to tweak.
const counties = [
  { name: "Antrim", colors: ["#F6C324", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1521292270410-a8c07e2f4ad5?q=80&w=1200&auto=format&fit=crop", blurb: "Belfast’s Cathedral Quarter bars and trad along the coast." },
  { name: "Armagh", colors: ["#FF8C00", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", blurb: "Orchard county pubs with lively town sessions." },
  { name: "Carlow", colors: ["#D7263D", "#169B62", "#F6C324"], banner: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1200&auto=format&fit=crop", blurb: "Cosy town bars and summer festival gigs." },
  { name: "Cavan", colors: ["#0046AD", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop", blurb: "Lakeside pubs with trad; late bars in Cavan town." },
  { name: "Clare", colors: ["#F6C324", "#1E3A8A"], banner: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop", blurb: "Doolin sessions and the Ennis trad trail." },
  { name: "Cork", colors: ["#D7263D", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1453743327117-664e2bf4e951?q=80&w=1200&auto=format&fit=crop", blurb: "Oliver Plunkett & Crane Lane; Washington St. late." },
  { name: "Derry", colors: ["#D7263D", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", blurb: "Walled city pubs; Peadar O’Donnell’s sessions." },
  { name: "Donegal", colors: ["#169B62", "#F6C324"], banner: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", blurb: "Rustic pubs, Bundoran gigs, Letterkenny clubs." },
  { name: "Down", colors: ["#D7263D", "#111111"], banner: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", blurb: "Bangor seafront bars and Newcastle weekends." },
  { name: "Dublin", colors: ["#6EC1E4", "#0C2D48"], banner: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", blurb: "Temple Bar to Portobello; Whelan’s & Workman’s." },
  { name: "Fermanagh", colors: ["#169B62", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", blurb: "Lakeside inns and Enniskillen late spots." },
  { name: "Galway", colors: ["#7A1F5C", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop", blurb: "Latin Quarter buskers; Tig Chóilí & Róisín Dubh." },
  { name: "Kerry", colors: ["#169B62", "#F6C324"], banner: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", blurb: "Killarney & Dingle nights; fireside trad." },
  { name: "Kildare", colors: ["#FFFFFF", "#0A0F1C"], banner: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop", blurb: "Naas & Maynooth bars; race‑day buzz." },
  { name: "Kilkenny", colors: ["#111111", "#F6C324"], banner: "https://images.unsplash.com/photo-1495231916356-a86217efff12?q=80&w=1200&auto=format&fit=crop", blurb: "Medieval Mile pubs with nightly live music." },
  { name: "Laois", colors: ["#0046AD", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=1200&auto=format&fit=crop", blurb: "Portlaoise bars and festival afters." },
  { name: "Leitrim", colors: ["#169B62", "#F6C324"], banner: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", blurb: "Carrick‑on‑Shannon buzz; Shannon‑side pubs." },
  { name: "Limerick", colors: ["#169B62", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", blurb: "Dolan’s Warehouse anchoring a lively scene." },
  { name: "Longford", colors: ["#0046AD", "#F6C324"], banner: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop", blurb: "Town‑centre bars with weekend DJs." },
  { name: "Louth", colors: ["#D7263D", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", blurb: "Dundalk venues and Drogheda cosy pubs." },
  { name: "Mayo", colors: ["#169B62", "#D7263D"], banner: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", blurb: "Westport music trail; Achill fireside nights." },
  { name: "Meath", colors: ["#169B62", "#F6C324"], banner: "https://images.unsplash.com/photo-1495231916356-a86217efff12?q=80&w=1200&auto=format&fit=crop", blurb: "Navan nights; Trim’s cosy spots after castle walks." },
  { name: "Monaghan", colors: ["#0046AD", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop", blurb: "Carrickmacross trad; Monaghan town late bars." },
  { name: "Offaly", colors: ["#169B62", "#FFFFFF", "#F6C324"], banner: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop", blurb: "Tullamore pints and canal‑side sessions." },
  { name: "Roscommon", colors: ["#F6C324", "#0046AD"], banner: "https://images.unsplash.com/photo-1453743327117-664e2bf4e951?q=80&w=1200&auto=format&fit=crop", blurb: "Traditional pubs; town late spots on weekends." },
  { name: "Sligo", colors: ["#111111", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop", blurb: "Surf‑town vibes; Thomas Connolly trad; late DJs." },
  { name: "Tipperary", colors: ["#0046AD", "#F6C324"], banner: "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=1200&auto=format&fit=crop", blurb: "Clonmel venues; Nenagh & Thurles pub crawls." },
  { name: "Tyrone", colors: ["#FFFFFF", "#D7263D"], banner: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1200&auto=format&fit=crop", blurb: "Omagh live rooms and Cookstown weekends." },
  { name: "Waterford", colors: ["#FFFFFF", "#0046AD"], banner: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop", blurb: "Quayside pubs and lively city venues." },
  { name: "Westmeath", colors: ["#7A1F5C", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop", blurb: "Athlone river pubs; Mullingar music scene." },
  { name: "Wexford", colors: ["#6B21A8", "#F6C324"], banner: "https://images.unsplash.com/photo-1495231916356-a86217efff12?q=80&w=1200&auto=format&fit=crop", blurb: "Quay‑front bars; theatres and trad sessions." },
  { name: "Wicklow", colors: ["#0046AD", "#F6C324"], banner: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop", blurb: "Bray seafront bars; Greystones cosy nights." },
];

// --- Global Irish Cities (diaspora preview data) ---
const diasporaCities = [
  { name: "Boston, USA", colors: ["#169B62", "#FF883E", "#FFFFFF"], banner: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/c8/60/0f/caption.jpg?w=800&h=500&s=1", blurb: "Home to The Tam, JJ Foley’s; Southie & Seaport nights." },
  { name: "Beirut, Lebanon", colors: ["#169B62", "#FF883E", "#FFFFFF"], banner: "https://libshop.fr/wp-content/uploads/2019/07/mar-mikhael-gr97894.jpg", blurb: "Mar Mikhael to Gemmayze; lively pubs, coastal nights, and Irish charm in the Med." },  
  { name: "Athens, Greece", colors: ["#169B62", "#FF883E", "#FFFFFF"], banner: "https://athenscabs.com/wp-content/uploads/2025/01/Athens-Greece-Nightlife.webp", blurb: "Plaka lanes to Gazi rooftops; pints, live trad, and warm Athenian buzz." },
  { name: "Berlin, Germany", colors: ["#169B62", "#FFFFFF", "#FF883E"], banner: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/ce/79/51/coole-70er-mobel.jpg?w=900&h=500&s=1", blurb: "Irish sessions and indie clubs from Kreuzberg to Prenzlauer Berg." },
  { name: "Seoul, South Korea", colors: ["#169B62", "#FFFFFF", "#FF883E"], banner: "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/07/02/514aba4a6e7e64bc37dd23c90762c1be_1000x1000.jpg", blurb: "Itaewon and Hongdae nights; Irish pubs and K-fusion sessions." },
  { name: "Tokyo, Japan", colors: ["#FF883E", "#169B62", "#FFFFFF"], banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2AL17Gmw6qtcAp9kSZJy9vhg4hFfRLSUAUQ&s", blurb: "Shinjuku pints, Shibuya rhythm; Irish heart in neon lights." },
  { name: "New York, USA", colors: ["#169B62", "#FFFFFF", "#FF883E"], banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop", blurb: "From McSorley’s to The Dead Rabbit; sessions & late clubs." },
  { name: "Chicago, USA", colors: ["#FF883E", "#169B62", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop", blurb: "Northwest Side pubs; Celtic gigs and River North nights." },
  { name: "Philadelphia, USA", colors: ["#169B62", "#FFFFFF", "#FF883E"], banner: "https://images.unsplash.com/photo-1543573852-1a741367b8bf?q=80&w=1600&auto=format&fit=crop", blurb: "Fishtown venues; McGillin’s and trad spots." },
  { name: "San Francisco, USA", colors: ["#FF883E", "#169B62", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop", blurb: "Irish Bank & Plough and Stars; live sessions." },
  { name: "Toronto, Canada", colors: ["#169B62", "#FF883E", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1508261301417-4d1b19b98ea5?q=80&w=1600&auto=format&fit=crop", blurb: "The Harp & Dora Keogh; Danforth sessions." },
  { name: "Montreal, Canada", colors: ["#169B62", "#FFFFFF", "#FF883E"], banner: "https://images.unsplash.com/photo-1540944750469-0af808871cc0?q=80&w=1600&auto=format&fit=crop", blurb: "Crescent Street bars; Irish Embassy vibes." },
  { name: "London, UK", colors: ["#FF883E", "#169B62", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop", blurb: "Kilburn to Clapham; trad sessions and mega clubs." },
  { name: "Manchester, UK", colors: ["#169B62", "#FF883E", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop", blurb: "Northern Quarter bars; Irish gigs and match nights." },
  { name: "Liverpool, UK", colors: ["#FF883E", "#FFFFFF", "#169B62"], banner: "https://images.unsplash.com/photo-1539186607619-df476afe6ff2?q=80&w=1600&auto=format&fit=crop", blurb: "Mathew Street singalongs; lively waterfront pubs." },
  { name: "Glasgow, Scotland", colors: ["#169B62", "#FFFFFF", "#FF883E"], banner: "https://images.unsplash.com/photo-1516815231560-8f41ecb5b0b5?q=80&w=1600&auto=format&fit=crop", blurb: "Merchant City venues; trad and big gigs." },
  { name: "Edinburgh, Scotland", colors: ["#169B62", "#FF883E", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop", blurb: "Old Town pubs; Sandy Bell’s sessions, festival buzz." },
  { name: "Sydney, Australia", colors: ["#169B62", "#FFFFFF", "#FF883E"], banner: "https://images.unsplash.com/photo-1506898665110-19d9d7c85efc?q=80&w=1600&auto=format&fit=crop", blurb: "The Mercantile & Scruffy Murphy’s; The Rocks to CBD." },
  { name: "Melbourne, Australia", colors: ["#FF883E", "#169B62", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1508261301417-4d1b19b98ea5?q=80&w=1600&auto=format&fit=crop", blurb: "Southbank nights; Celtic Club lineage; great gigs." },
  { name: "Auckland, New Zealand", colors: ["#169B62", "#FF883E", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1561542320-ead5f55f467d?q=80&w=1600&auto=format&fit=crop", blurb: "Viaduct bars and Kingsland sessions." },
  { name: "Buenos Aires, Argentina", colors: ["#169B62", "#FFFFFF", "#FF883E"], banner: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1600&auto=format&fit=crop", blurb: "San Telmo bars with lively expat sessions." },
  { name: "Newfoundland, Canada", colors: ["#FF883E", "#FFFFFF", "#169B62"], banner: "https://images.unsplash.com/photo-1530265670502-17439e6c8f73?q=80&w=1600&auto=format&fit=crop", blurb: "George Street, St. John’s—trad and late nights." },
  { name: "Paris, France", colors: ["#169B62", "#FF883E", "#FFFFFF"], banner: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop", blurb: "Left Bank pubs; lively sessions and big nights." },
];

export default function OurIslandLanding() {
  // Modal state & helpers
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalKind, setModalKind] = useState(null); // 'county' | 'city'
  const [modalData, setModalData] = useState(null);

  const withDefaults = (item, kind) => {
    const name = item?.name || (kind === "county" ? "Somewhere in Ireland" : "Irish abroad");
    return {
      ...item,
      motto: item?.motto || (kind === "county" ? "Small island, giant heart." : "Far from home, close to heart."),
      prideQuote:
        item?.prideQuote || (kind === "county" ? `I'm from ${name}, what an awesome place.` : `${name} — the island extended.`),
      signatureDrink: item?.signatureDrink || (kind === "county" ? "A perfect creamy pint" : "A familiar stout abroad"),
      bestFor: item?.bestFor || ["Live music", "Great company"],
      traditions: item?.traditions || ["Trad sessions", "Match nights"],
      notableVenues: item?.notableVenues || ["Beloved locals", "Great music rooms"],
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
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#060913] text-white selection:bg-emerald-300/40 selection:text-emerald-950">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -inset-[10%]">
          {/* Tricolor moving beams */}
          <div className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]">
            <div
              className="absolute -left-1/3 top-[-10%] h-[140%] w-[80%] rotate-12 opacity-30 blur-3xl mix-blend-screen"
              style={{ background: `linear-gradient(180deg, ${palette.green}, transparent 70%)`, animation: "floatA 16s ease-in-out infinite" }}
            />
            <div
              className="absolute left-1/3 top-[-10%] h-[140%] w-[80%] -rotate-12 opacity-25 blur-3xl mix-blend-screen"
              style={{ background: `linear-gradient(180deg, ${palette.white}, transparent 70%)`, animation: "floatB 18s ease-in-out infinite" }}
            />
            <div
              className="absolute left-[60%] top-[-10%] h-[140%] w-[80%] rotate-6 opacity-30 blur-3xl mix-blend-screen"
              style={{ background: `linear-gradient(180deg, ${palette.orange}, transparent 70%)`, animation: "floatC 22s ease-in-out infinite" }}
            />
          </div>
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
      </div>

      {/* Nav */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="group inline-flex items-center gap-3">
            <div className="relative h-8 w-8 rounded-xl ring-1 ring-white/15">
              <span
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `conic-gradient(from 45deg, ${palette.green}, ${palette.white}, ${palette.orange}, ${palette.green})`,
                }}
              />
              <span className="absolute inset-0 rounded-xl bg-white/5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              OurIsland<span className="text-white/60">.ie</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((n) => (
              <a key={n.label} href={n.href} className="text-sm text-white/80 transition hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#submit"
              className="hidden rounded-xl px-4 py-2 text-sm font-medium text-black md:inline-flex"
              style={{ background: palette.white }}
            >
              Submit a place
            </a>
            <a className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10" href="#newsletter">
              Join newsletter
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
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
            <p className="mt-5 max-w-xl text-white/80">
              OurIsland.ie celebrates the heartbeat of Ireland — from the small-town pubs and festival fields to the people who keep the light burning abroad. Built by the island, for the island — a living map of who we are, and what we can become.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#notify" className="rounded-xl px-5 py-3 text-sm font-semibold text-black" style={{ background: palette.white }}>
                Get launch updates
              </a>
              <a href="#map" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                Explore preview
              </a>
            </div>
            <div className="mt-4 text-xs text-white/60">Proud of our past. Building our future.</div>
            <div className="mt-6 flex items-center gap-4 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: palette.orange }} /> Live beta
              </div>
              <div>Made on the island • est. 2025</div>
            </div>
          </motion.div>

          {/* Hero Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1222] p-6 shadow-2xl">
              <div className="absolute right-[-10%] top-[-10%] h-56 w-56 rounded-full opacity-40 blur-2xl" style={{ background: palette.green }} />
              <div className="absolute bottom-[-20%] left-[-10%] h-64 w-64 rounded-full opacity-30 blur-2xl" style={{ background: palette.orange }} />

              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-white/80">
                  <span className="h-2 w-2 rounded-full" style={{ background: palette.green }} /> Preview Map
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#0B1222] p-4">
                  {/* Faux map grid with pulsing pins */}
                  <div className="relative h-64 w-full overflow-hidden rounded-xl">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                    />

                    {["Dublin", "Galway", "Belfast", "Cork", "Derry", "Limerick"].map((city, i) => (
                      <motion.div
                        key={city}
                        className="absolute"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        style={{ left: `${10 + i * 14}%`, top: `${20 + (i % 3) * 22}%` }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="relative inline-flex h-2 w-2">
                            <span className="absolute inline-flex h-2 w-2 rounded-full" style={{ background: palette.orange }}></span>
                            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full opacity-75" style={{ background: palette.orange }}></span>
                          </span>
                          <span className="text-[11px] text-white/80">{city}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/70">A real, filterable map of venues and traditions is coming soon. Want your place featured at launch?</p>
                <div className="mt-3 flex gap-3">
                  <a href="#submit" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10">
                    Submit a place
                  </a>
                  <a href="#volunteer" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10">
                    Volunteer
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="relative z-10 border-y border-white/10 bg-white/5 py-3">
        <div className="overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {["Trad Sessions", "Festival Nights", "Civil Defence", "Pub Culture", "Local Heroes", "Irish Language", "Coastal Rescues"].map((t, idx) => (
              <span key={idx} className="mx-6 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.green }} /> {t}
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.orange }} />
              </span>
            ))}
            {/* duplicate for seamless loop */}
            {["Trad Sessions", "Festival Nights", "Civil Defence", "Pub Culture", "Local Heroes", "Irish Language", "Coastal Rescues"].map((t, idx) => (
              <span key={`d-${idx}`} className="mx-6 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.green }} /> {t}
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.orange }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="culture" className="relative z-10 px-6">
        <div className="mx-auto max-w-7xl py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What you'll find on launch</h2>
            <a href="#notify" className="text-sm text-white/70 hover:text-white">
              Get notified →
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, icon: Icon, desc, tag, color }, i) => (
              <motion.div
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-10 blur-2xl" style={{ background: color }} />
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium">{title}</h3>
                </div>
                <p className="text-sm text-white/80">{desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} /> {tag}
                </div>
                <div className="absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100" style={{ boxShadow: `inset 0 0 0 1px ${color}33` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Counties */}
      <section id="counties" className="relative z-10 px-6">
        <div className="mx-auto max-w-7xl py-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Explore the Island</h2>
            <a href="#map" className="text-sm text-white/70 hover:text-white">
              View full map →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {counties.map(({ name, colors, banner, blurb, motto, prideQuote, notableVenues, traditions, signatureDrink, bestFor }, i) => (
              <motion.a
                key={name}
                href={`#county-${name.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  openModal({ name, colors, banner, blurb, motto, prideQuote, notableVenues, traditions, signatureDrink, bestFor }, "county");
                }}
                role="button"
                tabIndex={0}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.05 }}
                style={{ boxShadow: `${colors[0]}55 0px 0px 40px inset, ${colors[0]}44 0 0 0 1px` }}
              >
                {/* Banner image */}
                <div className="relative h-32 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }} />
                  {/* Neon overlay from county colors */}
                  <div
                    className="absolute inset-0 opacity-70 mix-blend-screen"
                    style={{
                      background: `linear-gradient(90deg, ${colors[0]}, ${colors[1] || colors[0]}${colors[2] ? ", " + colors[2] : ""})`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative p-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: colors[0] }} /> County
                  </div>
                  <h3 className="text-lg font-medium tracking-tight">{name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">
                    {blurb}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-white/70">Open →</span>
                    <div className="flex items-center gap-1">
                      {colors.slice(0, 3).map((c, idx) => (
                        <span key={idx} className="h-3 w-3 rounded-full" style={{ background: c }} />
                      ))}
                    </div>
                  </div>

                  {/* Glow ring on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-white/20 transition group-hover:opacity-100" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Islands Abroad (Diaspora) */}
      <section id="diaspora" className="relative z-10 px-6">
        <div className="mx-auto max-w-7xl py-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">The Island Abroad — the Irish worldwide</h2>
            <a href="#map" className="text-sm text-white/70 hover:text-white">View global map →</a>
          </div>
          <p className="mb-6 max-w-3xl text-sm text-white/70">Our island stretches far beyond its shores. From Sydney to Chicago, the spirit of Ireland lives wherever the craic carries us.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {diasporaCities.map(({ name, colors, banner, blurb, motto, prideQuote, notableVenues, traditions, signatureDrink, bestFor }, i) => (
              <motion.a
                key={name}
                href={`#city-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                onClick={(e) => {
                  e.preventDefault();
                  openModal({ name, colors, banner, blurb, motto, prideQuote, notableVenues, traditions, signatureDrink, bestFor }, "city");
                }}
                role="button"
                tabIndex={0}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.05 }}
                style={{ boxShadow: `${colors[0]}55 0px 0px 40px inset, ${colors[0]}44 0 0 0 1px` }}
              >
                <div className="relative h-32 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }} />
                  <div className="absolute inset-0 opacity-70 mix-blend-screen" style={{ background: `linear-gradient(90deg, ${colors[0]}, ${colors[1] || colors[0]}${colors[2] ? ", " + colors[2] : ""})` }} />
                </div>
                <div className="relative p-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: colors[0] }} /> City
                  </div>
                  <h3 className="text-lg font-medium tracking-tight">{name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/70">{blurb}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-white/70">Open →</span>
                    <div className="flex items-center gap-1">
                      {colors.slice(0, 3).map((c, idx) => (
                        <span key={idx} className="h-3 w-3 rounded-full" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
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
              style={{
                translateX: "-50%",
                translateY: "-50%",
                boxShadow: `${(modalData?.colors?.[0] || "#fff")}55 0px 0px 80px inset`,
              }}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              role="dialog"
              aria-modal="true"
              aria-label={`${modalKind === "county" ? "County" : "City"} spotlight`}
            >
              {/* Banner */}
              <div className="relative h-40 w-full">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${modalData?.banner})` }} />
                <div
                  className="absolute inset-0 mix-blend-screen opacity-70"
                  style={{
                    background: `linear-gradient(90deg, ${modalData?.colors?.[0]}, ${modalData?.colors?.[1] || modalData?.colors?.[0]}${
                      modalData?.colors?.[2] ? ", " + modalData?.colors?.[2] : ""
                    })`,
                  }}
                />
              </div>

              <div className="p-6">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: modalData?.colors?.[0] }} />{" "}
                  {modalKind === "county" ? "County" : "City"} spotlight
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{modalData?.name}</h3>
                    <p className="mt-2 max-w-prose text-sm text-white/80">
                      {modalData?.blurb || "Pubs, music, and community at the heart of the scene."}
                    </p>
                    {modalData?.motto && <p className="mt-2 text-sm italic text-white/70">“{modalData.motto}”</p>}
                    {modalData?.prideQuote && <p className="mt-2 text-sm text-emerald-300/90">{modalData.prideQuote}</p>}
                  </div>
                  <button
                    onClick={closeModal}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-1 text-xs text-white/60">Best for</div>
                    <div className="text-sm text-white/80">{(modalData?.bestFor || ["Live music", "Great company"]).join(" • ")}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-1 text-xs text-white/60">Signature</div>
                    <div className="text-sm text-white/80">{modalData?.signatureDrink || "A great pint & a tune"}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-1 text-xs text-white/60">Traditions</div>
                    <div className="text-sm text-white/80">{(modalData?.traditions || ["Trad sessions", "Match nights"]).join(" • ")}</div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-1 text-xs text-white/60">Notable venues</div>
                  <div className="text-sm text-white/80">{(modalData?.notableVenues || ["Beloved locals", "Great music rooms"]).join(" • ")}</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section id="future" className="relative z-10 px-6">
        <div className="mx-auto max-w-7xl py-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Our Future</h2>
            <a href="#getinvolved" className="text-sm text-white/70 hover:text-white">Get involved →</a>
          </div>
          <p className="mb-8 max-w-3xl text-white/80">
            The island is changing — through creativity, care, and community action. Here we’ll spotlight the projects, people, and places shaping a better Ireland.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Clean Coasts", desc: "Volunteers keeping our beaches and harbours beautiful." },
              { title: "Local Legends", desc: "Community leaders turning small towns into bright spots." },
              { title: "New Traditions", desc: "Artists and activists reimagining Irish culture for tomorrow." },
            ].map(({ title, desc }, i) => (
              <motion.div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5" initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05}}>
                <h3 className="mb-2 text-lg font-medium">{title}</h3>
                <p className="text-sm text-white/70">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="newsletter" className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 md:p-12">
            <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">Be first to know when we launch</h3>
                <p className="mt-2 max-w-prose text-sm text-white/80">
                  Monthly updates, zero spam. We'll share progress, call-outs for venues, and ways to get involved.
                </p>
                <form className="mt-6 flex max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40"
                  />
                  <button type="button" className="rounded-xl px-4 py-3 text-sm font-semibold text-black" style={{ background: palette.white }}>
                    Notify me
                  </button>
                </form>
                <p className="mt-2 text-xs text-white/60">By subscribing you agree to our placeholder terms.</p>
              </div>
              <div className="relative">
                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-40 blur-2xl" style={{ background: palette.green }} />
                <div className="absolute -bottom-10 -left-8 h-48 w-48 rounded-full opacity-30 blur-2xl" style={{ background: palette.orange }} />
                <div className="relative rounded-2xl border border-white/10 bg-[#0B1222] p-5">
                  <div className="mb-3 text-sm text-white/70">Roadmap (preview)</div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ background: palette.green }}></span>Interactive map of venues & traditions
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ background: palette.white }}></span>Venue & community submissions
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ background: palette.orange }}></span>Stories, podcasts, and local heroes
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ background: palette.green }}></span>Volunteer & Civil Defence hub
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-10 text-sm text-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div>© {new Date().getFullYear()} OurIsland.ie — All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#submit" className="hover:text-white">
              Submit a place
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
            <a href="#privacy" className="hover:text-white">
              Privacy
            </a>
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
