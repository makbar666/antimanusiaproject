"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  MessageCircle,
  PenLine,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  businessConfig,
  demoMeta,
  whatsappUrl,
  type DemoSlug,
} from "@/lib/config";
import {
  demoCategories,
  type InteractiveDemoSlug,
} from "@/lib/interactive-demos";

const navItems = [
  { label: "Contoh", href: "#contoh" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Cara kerja", href: "#cara-kerja" },
  { label: "FAQ", href: "#faq" },
];
const interactiveCatalogItems: { slug: InteractiveDemoSlug; number: string }[] = [
  { slug: "fotografer", number: "01" },
  { slug: "desainer", number: "02" },
  { slug: "programmer", number: "03" },
  { slug: "videografer", number: "04" },
  { slug: "uiux-designer", number: "05" },
  { slug: "content-creator", number: "06" },
  { slug: "digital-marketer", number: "07" },
  { slug: "arsitek", number: "08" },
  { slug: "sales-marketing", number: "09" },
];
const faqItems = [
  [
    "Apakah desainnya bisa disesuaikan?",
    "Bisa. Warna, susunan section, gaya bahasa, dan kebutuhan konten dapat dibicarakan sesuai tujuan website kamu.",
  ],
  [
    "Apakah bisa dibuka di HP?",
    "Bisa. Setiap contoh di halaman ini dirancang responsif agar tetap nyaman dilihat di HP, tablet, dan laptop.",
  ],
  [
    "Data apa saja yang perlu disiapkan?",
    "Biasanya profil singkat, foto, CV atau pengalaman, daftar skill, karya, dan link yang ingin ditampilkan. Kita bisa cek kebutuhannya saat konsultasi.",
  ],
  [
    "Apakah saya bisa memilih desain?",
    "Bisa. Kamu dapat memilih arah visual dari contoh yang tersedia, lalu kita sesuaikan bagian yang paling penting untuk kebutuhanmu.",
  ],
  [
    "Apakah website bisa dibagikan untuk melamar pekerjaan?",
    "Bisa. Website dapat dibagikan lewat satu link di CV, email, atau pesan lamaran untuk melengkapi dokumenmu.",
  ],
  [
    "Apakah domain dan hosting sudah termasuk?",
    "Ketersediaan domain, hosting, dan pengaturannya bergantung pada paket serta kesepakatan. Silakan konsultasikan kebutuhanmu terlebih dahulu.",
  ],
  [
    "Berapa lama pengerjaannya?",
    "Waktu pengerjaan bergantung pada kelengkapan materi, tingkat custom, dan kesepakatan proyek. Kami akan membantu memperkirakannya setelah melihat kebutuhanmu.",
  ],
];

function WhatsAppButton({
  label = "Konsultasi via WhatsApp",
  demo,
}: {
  label?: string;
  demo?: DemoSlug;
}) {
  const message = demo
    ? `Halo kak, saya tertarik membuat website portofolio seperti demo ${demoMeta[demo].name}. Boleh konsultasi mengenai desain dan harganya?`
    : "Halo kak, saya tertarik membuat website portofolio. Boleh konsultasi mengenai desain dan harganya?";
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#ee5b44]"
    >
      <MessageCircle size={16} />
      {label}
    </a>
  );
}

function Mockup({ type }: { type: "blue" | "dark" | "lime" }) {
  return (
    <div className="mockup-browser w-full">
      <div className="mockup-bar">
        <i />
        <i />
        <i />
        <span className="ml-2 text-[8px] text-stone-400">
          portfolio.example
        </span>
      </div>
      <div className={`mockup-screen screen-${type}`}>
        {type === "blue" && (
          <>
            <div className="mb-7 flex justify-between text-[8px] font-semibold">
              <span>ADITYA.</span>
              <span>About · Work · Contact</span>
            </div>
            <div className="max-w-[220px]">
              <p className="mb-2 text-[8px] uppercase tracking-[.15em] opacity-60">
                Information Systems Graduate
              </p>
              <p className="display text-2xl font-semibold leading-[.9]">
                Ready to make
                <br />
                an impact.
              </p>
            </div>
            <div className="mt-12 flex gap-2">
              <span className="h-1 w-12 rounded bg-[#2c6cae]" />
              <span className="h-1 w-5 rounded bg-[#a5c5e2]" />
            </div>
          </>
        )}
        {type === "dark" && (
          <>
            <div className="mb-8 flex justify-between text-[8px] opacity-70">
              <span>NADIA PUTRI</span>
              <span>Work / Profile / Contact</span>
            </div>
            <p className="mb-2 font-serif text-xs text-[#d5b36b]">
              Digital strategy & growth
            </p>
            <p className="display text-2xl font-medium leading-[.95]">
              Brands that
              <br />
              <span className="text-[#d5b36b]">move forward.</span>
            </p>
            <div className="mt-10 flex items-end justify-between border-t border-white/15 pt-3 text-[8px] opacity-65">
              <span>Strategy / Content / Analytics</span>
              <span>2024</span>
            </div>
          </>
        )}
        {type === "lime" && (
          <>
            <div className="mb-9 flex justify-between text-[8px] font-bold">
              <span>RAKA®</span>
              <span>SELECTED WORKS ↘</span>
            </div>
            <p className="display text-[29px] font-bold leading-[.83] tracking-[-.08em]">
              Ideas with
              <br />
              <span className="text-[#ee5b44]">a pulse.</span>
            </p>
            <div className="mt-12 h-6 w-full bg-[#ee5b44]" />
          </>
        )}
      </div>
    </div>
  );
}

const heroSlides = [
  { name: "Arga Visuals", role: "Professional Photographer", headline: "Capturing moments, creating stories.", screen: "dark" as const },
  { name: "Nadia Creative", role: "Graphic Designer", headline: "Design that speaks louder.", screen: "lime" as const },
  { name: "Rizky Dev", role: "Full-Stack Web Developer", headline: "Building digital experiences.", screen: "blue" as const },
  { name: "Karsa Motion", role: "Videographer", headline: "Every frame has a feeling.", screen: "dark" as const },
  { name: "Maya Interface", role: "UI/UX Designer", headline: "Making complex feel clear.", screen: "blue" as const },
  { name: "Sora Content", role: "Content Creator", headline: "Ideas made to travel.", screen: "lime" as const },
  { name: "Nala Growth", role: "Digital Marketer", headline: "Insight into momentum.", screen: "blue" as const },
  { name: "Atelier Ruang", role: "Arsitek", headline: "Space tells stories.", screen: "dark" as const },
  { name: "Dimas Pratama", role: "Sales / Marketing", headline: "Build trust. Grow well.", screen: "blue" as const },
];

function HeroPreview({ activeSlide, setActiveSlide }: { activeSlide: number; setActiveSlide: (value: number | ((current: number) => number)) => void }) {
  const slide = heroSlides[activeSlide];
  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 4200);
    return () => window.clearInterval(timer);
  }, []);
  const changeSlide = (direction: number) => setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);

  return <div className="visual-frame rounded-[3px] bg-[#e8e2d7] p-4"><div className="mb-3 flex items-center justify-between text-[10px] text-stone-500"><span className="mono">LIVE PREVIEW / {String(activeSlide + 1).padStart(2, "0")}</span><span>{slide.name}</span></div><div className="mockup-browser w-full"><div className="mockup-bar"><i /><i /><i /><span className="ml-2 text-[8px] text-stone-400">portfolio.example</span></div><div className={`mockup-screen screen-${slide.screen} relative min-h-[225px]`}><div className="mb-7 flex justify-between text-[8px] font-semibold"><span>{slide.name}</span><span className="hidden sm:inline">About · Work · Contact</span></div><div className="max-w-[250px]"><p className="mb-2 text-[8px] uppercase tracking-[.15em] opacity-60">{slide.role}</p><p className="display text-2xl font-semibold leading-[.9]">{slide.headline}</p></div><div className="mt-12 flex items-center justify-between"><div className="flex gap-1">{heroSlides.map((item, index) => <button key={item.name} onClick={() => setActiveSlide(index)} aria-label={`Lihat contoh ${item.name}`} className={`h-1 rounded-full transition-all ${index === activeSlide ? "w-8 bg-[var(--coral)]" : "w-2 bg-current/25"}`} />)}</div><div className="flex gap-1"><button onClick={() => changeSlide(-1)} aria-label="Contoh sebelumnya" className="rounded-full border border-current/20 p-1.5 transition hover:border-current/60"><ChevronLeft size={12} /></button><button onClick={() => changeSlide(1)} aria-label="Contoh berikutnya" className="rounded-full border border-current/20 p-1.5 transition hover:border-current/60"><ChevronRight size={12} /></button></div></div></div></div></div>;
}

function DemoCard({
  slug,
  type,
  number,
}: {
  slug: DemoSlug;
  type: "blue" | "dark" | "lime";
  number: string;
}) {
  const demo = demoMeta[slug];
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="paper-card group overflow-hidden rounded-[2px]"
    >
      <div className="border-b border-[var(--line)] bg-[#e9e4da] p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow text-stone-500">
            {number} / {demo.eyebrow}
          </span>
          <ArrowUpRight
            size={17}
            className="text-stone-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--coral)]"
          />
        </div>
        <Mockup type={type} />
      </div>
      <div className="p-5">
        <h3 className="display text-2xl font-semibold">{demo.name}</h3>
        <p className="mt-2 min-h-[52px] text-sm leading-6 text-[var(--muted)]">
          {demo.description}
        </p>
        <Link href={`/demo/${slug}`} className="arrow-link mt-5 text-sm">
          Lihat live demo <ArrowUpRight size={15} />
        </Link>
      </div>
    </motion.article>
  );
}

function InteractiveCard({
  slug,
  number,
}: {
  slug: InteractiveDemoSlug;
  number: string;
}) {
  const demo = demoCategories.find((item) => item.slug === slug)!;
  const visualClass =
    slug === "fotografer"
      ? "bg-[linear-gradient(145deg,#bca789,#56443e_46%,#15191d)]"
      : slug === "desainer"
        ? "bg-[#ed5b37]"
        : slug === "programmer"
          ? "bg-[linear-gradient(145deg,#112536,#0c1822)]"
          : slug === "videografer"
            ? "bg-[linear-gradient(145deg,#bd8a55,#4b2f26_55%,#1b1818)]"
            : slug === "uiux-designer"
              ? "bg-[linear-gradient(145deg,#d8e7ff,#6c7fc0_58%,#252848)]"
              : slug === "content-creator"
                ? "bg-[linear-gradient(145deg,#f7b267,#e76f51_55%,#7f2f54)]"
                : slug === "digital-marketer"
                  ? "bg-[linear-gradient(145deg,#d9ed92,#5b8c5a_55%,#173b3f)]"
                  : slug === "arsitek"
                    ? "bg-[linear-gradient(145deg,#ded5c4,#8b8171_55%,#30302c)]"
                    : "bg-[linear-gradient(145deg,#b6e0e3,#327c88_55%,#123447)]";
  return (
    <article className="group overflow-hidden border border-stone-300 bg-[#fbfaf7]">
      <Link
        href={`/demo/${slug}`}
        className="block border-b border-stone-300 bg-[#e9e4da] p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow text-stone-500">
            {number} / {demo.tag}
          </span>
          <ArrowUpRight
            size={17}
            className="text-stone-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--coral)]"
          />
        </div>
        <div
          className={`${visualClass} relative flex min-h-[220px] items-end overflow-hidden p-5 text-white transition duration-300 group-hover:scale-[1.015]`}
        >
          {slug === "fotografer" && (
            <>
              <span className="absolute right-5 top-5 font-serif text-4xl opacity-50">
                ARGA
              </span>
              <div>
                <span className="eyebrow text-white/65">
                  MEDIA ILLUSTRATION
                </span>
                <p className="mt-2 max-w-[220px] font-serif text-3xl leading-[.9]">
                  Capturing moments,
                  <br />
                  creating stories.
                </p>
              </div>
            </>
          )}
          {slug === "desainer" && (
            <>
              <span className="absolute right-5 top-5 text-6xl font-black leading-none text-[#f1ce48]">
                N
              </span>
              <div>
                <span className="eyebrow">NADIA CREATIVE</span>
                <p className="mt-2 max-w-[220px] text-3xl font-black leading-[.8] tracking-[-.08em]">
                  Design that
                  <br />
                  speaks louder.
                </p>
              </div>
            </>
          )}
          {slug === "programmer" && (
            <>
              <span className="absolute right-5 top-5 font-mono text-5xl text-[#75d9d2]/70">
                &lt;/&gt;
              </span>
              <div>
                <span className="eyebrow text-[#75d9d2]">RIZKY.DEV</span>
                <p className="mt-2 max-w-[220px] text-3xl font-semibold leading-[.9]">
                  Build useful
                  <br />
                  <span className="text-[#75d9d2]">things.</span>
                </p>
              </div>
            </>
          )}
          {!(["fotografer", "desainer", "programmer"] as InteractiveDemoSlug[]).includes(slug) && (
            <div>
              <span className="eyebrow text-white/70">{demo.person}</span>
              <p className="mt-2 max-w-[220px] text-3xl font-semibold leading-[.9] tracking-[-.05em]">
                {slug === "uiux-designer" && <>Design the <span className="text-[#d8e7ff]">useful.</span></>}
                {slug === "content-creator" && <>Make ideas <span className="text-[#ffd6a5]">travel.</span></>}
                {slug === "digital-marketer" && <>Turn insight into <span className="text-[#d9ed92]">momentum.</span></>}
                {slug === "arsitek" && <>Space tells <span className="text-[#ded5c4]">stories.</span></>}
                {slug === "sales-marketing" && <>Build trust. <span className="text-[#b6e0e3]">Grow well.</span></>}
              </p>
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <h3 className="display text-2xl font-semibold">{demo.name}</h3>
        <p className="mt-2 min-h-[52px] text-sm leading-6 text-[var(--muted)]">
          {demo.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href={`/demo/${slug}`} className="arrow-link text-sm">
            Lihat live demo <ArrowUpRight size={15} />
          </Link>
          <a
            href={whatsappUrl(
              `Halo kak, saya tertarik membuat website portofolio seperti contoh ${demo.name} (${demo.person}). Boleh konsultasi mengenai harga dan pengerjaannya?`,
            )}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[var(--coral)] underline underline-offset-4"
          >
            Pesan desain ini
          </a>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [demoQuery, setDemoQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredDemoItems = interactiveCatalogItems.filter(({ slug }) => {
    const demo = demoCategories.find((item) => item.slug === slug)!;
    const searchText = `${demo.name} ${demo.person} ${demo.description} ${demo.tag}`.toLowerCase();
    return searchText.includes(demoQuery.trim().toLowerCase());
  });

  return (
    <main className="grain selection-coral overflow-hidden">
      <header className={`catalog-nav${isScrolled ? " is-scrolled" : ""}`}>
        <div className="catalog-shell flex min-h-[72px] items-center justify-between">
        <Link href="/" className="display text-2xl font-bold tracking-[-.08em]">
          {businessConfig.brandMark}
          <span className="text-[var(--coral)]">.</span>
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 text-sm text-stone-600 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-black"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <WhatsAppButton label="Pesan sekarang" />
          </div>
          <button
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-stone-300 p-2 md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        </div>
      </header>
      {menuOpen && (
        <div className="catalog-mobile-menu catalog-shell border-b border-stone-300 pb-5 md:hidden">
          {navItems.map((item) => (
            <a
              onClick={() => setMenuOpen(false)}
              className="block border-t border-stone-300 py-3 text-sm"
              key={item.href}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 sm:hidden">
            <WhatsAppButton label="Pesan sekarang" />
          </div>
        </div>
      )}
      <section className="catalog-shell grid gap-12 pb-24 pt-20 md:grid-cols-[.9fr_1.1fr] md:items-end md:pb-32 md:pt-28">
        <div>
          <p className="eyebrow mb-6 text-[var(--coral)]">
            STUDIO PORTFOLIO DIGITAL / 2024
          </p>
          <h1 className="display max-w-[650px] text-[clamp(3.5rem,7vw,6.8rem)] font-semibold leading-[.89]">
            Profil yang layak{" "}
            <span className="text-[var(--coral)]">dilihat.</span>
          </h1>
          <p className="mt-8 max-w-[460px] text-lg leading-8 text-[var(--muted)]">
            {businessConfig.serviceDescription} Bagikan satu link, lalu biarkan
            karya dan ceritamu membuka percakapan.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#contoh"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--coral)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#d94b37]"
            >
              Lihat contoh portofolio <ArrowUpRight size={16} />
            </a>
            <WhatsAppButton />
            <Link
              href="/custom"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-[#fbfaf7] px-5 py-3 text-sm font-semibold text-stone-700 transition hover:-translate-y-0.5 hover:border-[var(--coral)] hover:text-[var(--coral)]"
            >
              Custom sendiri <PenLine size={16} />
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[580px] md:pb-7">
          <HeroPreview activeSlide={heroSlide} setActiveSlide={setHeroSlide} />
          <div className="absolute -bottom-1 right-0 w-[104px] md:w-[132px]">
            <div className="phone-shell">
              <div className="h-[8px] bg-[#1a1b1e]" />
              <div className="screen-blue min-h-[175px] p-3">
                <div className="mb-5 text-[7px] font-bold">{heroSlides[heroSlide].name.toUpperCase()}.</div>
                <div className="mt-4 break-words text-[19px] font-semibold leading-[.9]">{heroSlides[heroSlide].headline}</div>
                <div className="mt-12 h-1 w-8 bg-[#2c6cae]" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contoh"
        className="catalog-shell section-rule no-divider scroll-mt-10"
      >
        <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5 text-[var(--coral)]">
              INTERACTIVE LIVE DEMO
            </p>
            <h2 className="display max-w-[650px] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[.95]">
              Contoh Website Portofolio
            </h2>
          </div>
          <p className="max-w-[360px] text-sm leading-6 text-[var(--muted)]">
            Setiap profesi punya cerita dan karya yang berbeda. Pilih contoh
            website sesuai kebutuhanmu dan lihat langsung tampilannya.
          </p>
        </div>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-md">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              value={demoQuery}
              onChange={(event) => setDemoQuery(event.target.value)}
              placeholder="Cari profesi, skill, atau gaya desain..."
              aria-label="Cari contoh website portofolio"
              className="h-12 w-full rounded-full border border-stone-300 bg-[#fbfaf7] pl-11 pr-5 text-sm outline-none transition placeholder:text-stone-400 focus:border-[var(--coral)] focus:ring-4 focus:ring-[var(--coral)]/10"
            />
          </label>
          <p className="text-xs text-stone-500">
            {filteredDemoItems.length} contoh tersedia
          </p>
        </div>
        {filteredDemoItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredDemoItems.map((item) => (
              <InteractiveCard key={item.slug} {...item} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-stone-300 bg-[#fbfaf7] px-6 py-12 text-center">
            <p className="display text-2xl font-semibold">Belum ada contoh yang cocok.</p>
            <p className="mt-2 text-sm text-stone-500">Coba kata kunci lain seperti “desain”, “marketing”, “web”, atau “kreatif”.</p>
            <button onClick={() => setDemoQuery("")} className="mt-5 rounded-full bg-[#151515] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--coral)]">Tampilkan semua contoh</button>
          </div>
        )}
      </section>
      <section className="catalog-shell section-rule">
        <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5 text-[var(--coral)]">KOLEKSI LAMA</p>
            <h2 className="display max-w-[560px] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[.95]">
              Contoh gaya lainnya.
            </h2>
          </div>
          <p className="max-w-[290px] text-sm leading-6 text-[var(--muted)]">
            Tiga demo awal tetap tersedia untuk kamu jelajahi.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <DemoCard slug="fresh-graduate" type="blue" number="01" />
          <DemoCard slug="professional" type="dark" number="02" />
          <DemoCard slug="creative" type="lime" number="03" />
        </div>
      </section>
      <section
        id="keunggulan"
        className="catalog-shell section-rule scroll-mt-10 py-24 md:py-32"
      >
        <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-4 text-[var(--coral)]">
              KENAPA PAMERPORTO
            </p>
            <h2 className="display text-4xl font-semibold leading-none md:text-6xl">
              Rapi di layar.
              <br />
              Jelas tujuannya.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--muted)]">
              Kamu tidak perlu memulai dari halaman kosong. Kami membantu
              menerjemahkan isi kepalamu menjadi halaman yang mudah dipahami.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {[
              [
                "01",
                "Proses cepat",
                "Alur kerja dibuat ringkas supaya kamu bisa fokus menyiapkan materi yang penting.",
              ],
              [
                "02",
                "Harga terjangkau",
                "Ruang lingkup dan biaya dibicarakan di awal, sesuai kebutuhan website yang kamu pilih.",
              ],
              [
                "03",
                "Amanah",
                "Materi dan cerita personalmu kami perlakukan dengan tanggung jawab selama proses berlangsung.",
              ],
              [
                "04",
                "Bebas request",
                "Kamu bisa menyampaikan referensi, kebutuhan section, dan detail custom sesuai kesepakatan.",
              ],
            ].map(([no, title, copy]) => (
              <div key={no} className="border-t border-stone-300 pt-4">
                <span className="eyebrow text-stone-400">{no}</span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="cara-kerja"
        className="scroll-mt-10 bg-[#1c1c1b] py-24 text-[#f4f1eb] md:py-32"
      >
        <div className="catalog-shell">
          <div className="mb-12 max-w-xl">
            <p className="eyebrow mb-4 text-[#f18a77]">CARA KERJA</p>
            <h2 className="display text-4xl font-semibold leading-none md:text-6xl">
              Dari bahan mentah jadi satu link yang siap dibagikan.
            </h2>
          </div>
          <div className="grid border-l border-white/20 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Pilih contoh portofolio.",
              "Konsultasi melalui WhatsApp.",
              "Kirim data, foto, dan materi.",
              "Website mulai dikerjakan.",
              "Review dan revisi sesuai kesepakatan.",
              "Website siap digunakan dan dibagikan.",
            ].map((step, i) => (
              <div
                className="border-b border-r border-t border-white/20 p-5 md:p-7"
                key={step}
              >
                <span className="eyebrow text-[#f18a77]">0{i + 1}</span>
                <p className="mt-10 max-w-[180px] text-lg leading-7">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        id="faq"
        className="catalog-shell section-rule scroll-mt-10 py-24 md:py-32"
      >
        <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow mb-4 text-[var(--coral)]">FAQ</p>
            <h2 className="display text-4xl font-semibold leading-none md:text-6xl">
              Yang biasanya ingin kamu tanyakan.
            </h2>
          </div>
          <div>
            {faqItems.map(([question, answer], i) => (
              <div key={question} className="border-t border-stone-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left font-medium"
                >
                  <span>{question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${openFaq === i ? "rotate-180 text-[var(--coral)]" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <p className="max-w-xl pb-5 pr-8 text-sm leading-6 text-[var(--muted)]">
                    {answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="catalog-shell pb-24 pt-8 md:pb-32">
        <div className="relative overflow-hidden rounded-[3px] bg-[var(--coral)] p-8 text-white md:p-16">
          <PenLine className="absolute -right-4 -top-5 h-40 w-40 rotate-12 opacity-15" />
          <p className="eyebrow mb-6 text-white/70">NEXT STEP</p>
          <h2 className="display max-w-2xl text-5xl font-semibold leading-[.9] md:text-7xl">
            Siap punya website portofolio kamu sendiri?
          </h2>
          <p className="mt-7 max-w-md text-sm leading-6 text-white/80">
            Bawa profilmu ke tempat yang lebih mudah ditemukan, dibaca, dan
            dibagikan.
          </p>
          <div className="mt-8">
            <a
              href={whatsappUrl(
                "Halo kak, saya siap konsultasi membuat website portofolio. Boleh dibantu mulai dari contoh desain dan harganya?",
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#151515] transition hover:bg-[#151515] hover:text-white"
            >
              Pesan portofolio sekarang <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <footer className="catalog-footer">
        <div className="catalog-shell grid gap-10 py-12 text-sm text-stone-500 md:grid-cols-[1fr_auto] md:items-start md:py-14">
          <div>
            <Link
              href="/"
              className="display text-xl font-bold tracking-[-.08em] text-black"
            >
              {businessConfig.brandMark}
              <span className="text-[var(--coral)]">.</span>
            </Link>
            <p className="mt-4 max-w-sm leading-7">
              Website portfolio yang membantu kamu menunjukkan apa yang kamu
              bisa.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:min-w-[360px] md:justify-items-end">
            <a className="footer-link" href="#contoh">Contoh</a>
            <a className="footer-link" href="#keunggulan">Keunggulan</a>
            <a className="footer-link" href="#cara-kerja">Cara kerja</a>
            <a className="footer-link" href="#faq">FAQ</a>
            <a className="footer-link" href={`mailto:${businessConfig.email}`}>Email</a>
            <a className="footer-link" href={whatsappUrl("Halo kak, saya ingin konsultasi membuat website portofolio.")} target="_blank" rel="noreferrer">WhatsApp</a>
            <span>© {new Date().getFullYear()} pamerporto</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
