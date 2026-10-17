"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, AtSign, Check, ChevronDown, Code2, ExternalLink, Github, Instagram, Layers3, Linkedin, Menu, Monitor, MoveUpRight, Music2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { businessConfig, whatsappUrl } from "@/lib/config";
import { interactiveDemoMeta, type InteractiveDemoSlug } from "@/lib/interactive-demos";

function ContactLink({ slug, label = "Pesan template ini" }: { slug: InteractiveDemoSlug; label?: string }) {
  const messages: Record<InteractiveDemoSlug, string> = {
    fotografer: "Halo kak, saya tertarik membuat website portofolio seperti contoh Fotografer (Arga Visuals). Boleh konsultasi mengenai harga dan pengerjaannya?",
    desainer: "Halo kak, saya tertarik membuat website portofolio seperti contoh Graphic Designer (Nadia Creative). Boleh konsultasi mengenai harga dan pengerjaannya?",
    programmer: "Halo kak, saya tertarik membuat website portofolio seperti contoh Programmer (Rizky Dev). Boleh konsultasi mengenai harga dan pengerjaannya?",
    videografer: "Halo kak, saya tertarik bekerja sama dengan Anti Manusia Project untuk kebutuhan video. Boleh konsultasi mengenai konsep, harga, dan jadwal pengerjaannya?",
    "uiux-designer": "Halo kak, saya tertarik membuat website portofolio seperti contoh UI/UX Designer (Maya Interface). Boleh konsultasi mengenai harga dan pengerjaannya?",
    "content-creator": "Halo kak, saya tertarik membuat website portofolio seperti contoh Content Creator (Sora Content). Boleh konsultasi mengenai harga dan pengerjaannya?",
    "digital-marketer": "Halo kak, saya tertarik membuat website portofolio seperti contoh Digital Marketer (Nala Growth). Boleh konsultasi mengenai harga dan pengerjaannya?",
    arsitek: "Halo kak, saya tertarik membuat website portofolio seperti contoh Arsitek (Atelier Ruang). Boleh konsultasi mengenai harga dan pengerjaannya?",
    "sales-marketing": "Halo kak, saya tertarik membuat website portofolio seperti contoh Sales / Marketing (Dimas Pratama). Boleh konsultasi mengenai harga dan pengerjaannya?",
  };
  return <a href={whatsappUrl(messages[slug])} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ee5b44] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#151515]">{label} <ArrowUpRight size={15} /></a>;
}

function DemoModeBar({ slug }: { slug: InteractiveDemoSlug }) {
  const [visible, setVisible] = useState(true);
  const meta = interactiveDemoMeta[slug];
  if (!visible) return <button onClick={() => setVisible(true)} className="fixed bottom-4 right-4 z-40 rounded-full bg-[#ee5b44] px-4 py-2 text-xs font-semibold text-white shadow-lg">Buka panel demo</button>;
  return <div className="demo-mode-bar fixed bottom-3 left-3 right-3 z-40 mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-[0_10px_40px_rgba(0,0,0,.16)] backdrop-blur md:bottom-5 md:rounded-full md:px-4"><div className="hidden items-center gap-2 text-xs sm:flex"><span className="h-2 w-2 shrink-0 rounded-full bg-[#ee5b44]" /><span className="font-semibold">Anda sedang melihat contoh website.</span><span className="hidden text-stone-400 lg:inline">{meta.person} / {meta.tag}</span></div><div className="flex w-full items-center justify-between gap-2 sm:w-auto"><Link href="/" className="inline-flex min-h-[44px] items-center gap-1 px-2 text-xs font-semibold text-stone-600"><ArrowLeft size={14} /> Katalog</Link><Link href="#demo-switcher" className="hidden min-h-[44px] items-center px-2 text-xs font-semibold text-stone-600 sm:inline-flex">Demo lainnya</Link><ContactLink slug={slug} label="Pesan website seperti ini" /><button aria-label="Sembunyikan panel demo" onClick={() => setVisible(false)} className="min-h-[44px] rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-800"><X size={15} /></button></div></div>;
}

function DemoSwitcher({ active }: { active: InteractiveDemoSlug }) {
  return <div id="demo-switcher" className="flex flex-wrap gap-2">{(Object.keys(interactiveDemoMeta) as InteractiveDemoSlug[]).map(slug => <Link key={slug} href={`/demo/${slug}`} className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${slug === active ? "border-current bg-current/10" : "border-current/20 opacity-60 hover:opacity-100"}`}>{interactiveDemoMeta[slug].name}</Link>)}</div>;
}

const photoCategories = ["All", "Wedding", "Portrait", "Product", "Landscape", "Event"];
const photos = [
  { title: "After the vows", category: "Wedding", tone: "photo-dusk" },
  { title: "Quiet morning", category: "Portrait", tone: "photo-sand" },
  { title: "Objects with intent", category: "Product", tone: "photo-ink" },
  { title: "Between the hills", category: "Landscape", tone: "photo-moss" },
  { title: "A room full of people", category: "Event", tone: "photo-night" },
  { title: "Soft light study", category: "Portrait", tone: "photo-rose" },
  { title: "Small details", category: "Product", tone: "photo-clay" },
  { title: "The long way home", category: "Landscape", tone: "photo-blue" },
];

function PhotographerDemo() {
  const [category, setCategory] = useState("All");
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const visiblePhotos = photos.filter(photo => category === "All" || photo.category === category);
  const current = activePhoto === null ? null : photos[activePhoto];
  const moveLightbox = (direction: number) => { if (activePhoto === null) return; setActivePhoto((activePhoto + direction + photos.length) % photos.length); };
  return <div className="photo-demo min-h-screen bg-[#101111] text-[#f2efe8]"><style>{`.photo-demo .photo-dusk{background:linear-gradient(145deg,#bca789 0%,#56443e 45%,#15191d 100%)} .photo-demo .photo-sand{background:linear-gradient(135deg,#d8c7a8,#957e68 52%,#3c3736)} .photo-demo .photo-ink{background:linear-gradient(120deg,#232426,#8d744c 50%,#101113)} .photo-demo .photo-moss{background:linear-gradient(145deg,#c0c7a0,#596d5c 55%,#1c302c)} .photo-demo .photo-night{background:linear-gradient(145deg,#0b1225,#456180 45%,#c88e62)} .photo-demo .photo-rose{background:linear-gradient(135deg,#d9a59d,#73525a 52%,#28222d)} .photo-demo .photo-clay{background:linear-gradient(135deg,#e4c1a4,#a65f42 50%,#222325)} .photo-demo .photo-blue{background:linear-gradient(135deg,#b0c9d4,#466b7d 45%,#172631)}`}</style><nav className="sticky top-0 z-20 border-b border-white/10 bg-[#101111]/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5"><a href="#photo-top" className="font-serif text-xl tracking-[.2em]">ARGA <span className="text-[#bda67f]">VISUALS</span></a><div className="hidden gap-7 text-xs tracking-[.08em] text-white/65 md:flex"><a href="#about">Tentang</a><a href="#works">Works</a><a href="#services">Layanan</a><a href="#contact">Kontak</a></div><Menu className="md:hidden" size={19} /></div></nav><main id="photo-top" className="mx-auto max-w-7xl px-5"><section className="grid min-h-[760px] items-center gap-10 py-20 md:grid-cols-[1.1fr_.9fr] md:py-28"><div><p className="photo-kicker mb-7">Arga Pratama / Professional Photographer</p><h1 className="font-serif text-6xl font-light leading-[.9] tracking-[-.06em] md:text-9xl">Capturing moments,<br /><span className="text-[#bda67f]">creating stories.</span></h1><p className="mt-8 max-w-md text-sm leading-7 text-white/55">Fotografi pernikahan, portrait, dan ruang yang menyimpan perasaan. Ini adalah contoh tampilan portfolio dengan media ilustrasi untuk demo.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#works" className="rounded-full bg-[#f2efe8] px-5 py-3 text-sm font-semibold text-[#101111]">Explore the work <ArrowDownSmall /></a><ContactLink slug="fotografer" /></div></div><div className="relative"><div className="photo-dusk flex aspect-[.78] items-end rounded-[2px] p-6"><div><p className="photo-kicker text-white/70">MEDIA ILLUSTRATION / 01</p><p className="mt-2 max-w-[220px] font-serif text-3xl leading-none">Light finds the people who wait for it.</p></div></div><div className="absolute -bottom-5 -left-4 border border-white/20 bg-[#101111] p-4"><p className="photo-kicker text-[#bda67f]">BASE</p><p className="mt-1 text-sm">Jakarta / Anywhere</p></div></div></section><section id="about" className="border-t border-white/10 py-24"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="photo-kicker text-[#bda67f]">01 / TENTANG THE PHOTOGRAPHER</p><div><p className="max-w-3xl font-serif text-4xl leading-tight text-white/90 md:text-6xl">Saya mencari momen yang terasa kecil, lalu memberinya ruang untuk <span className="text-[#bda67f]">tinggal lebih lama.</span></p><p className="mt-8 max-w-2xl text-sm leading-7 text-white/55">Arga Visuals adalah contoh identitas portfolio fotografi untuk kebutuhan personal branding. Narasi, gambar, dan ruang di halaman ini semuanya bersifat simulasi.</p></div></div></section><section id="works" className="border-t border-white/10 py-24"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="photo-kicker text-[#bda67f]">02 / SELECTED WORKS</p><h2 className="mt-3 font-serif text-5xl font-light leading-none md:text-7xl">A few frames<br />worth keeping.</h2></div><div className="flex flex-wrap gap-2">{photoCategories.map(item => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-3 py-2 text-xs transition ${category === item ? "border-[#bda67f] bg-[#bda67f] text-[#101111]" : "border-white/20 text-white/60 hover:border-white/60"}`}>{item}</button>)}</div></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{visiblePhotos.map(photo => { const index = photos.indexOf(photo); return <button key={photo.title} onClick={() => setActivePhoto(index)} className="group text-left"><div className={`${photo.tone} relative flex aspect-[.78] items-end overflow-hidden p-4 transition duration-300 group-hover:-translate-y-1`}><span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" /><div className="relative"><span className="photo-kicker text-white/65">{photo.category}</span><p className="mt-1 font-serif text-xl">{photo.title}</p></div><MoveUpRight className="absolute right-3 top-3 opacity-0 transition group-hover:opacity-100" size={18} /></div></button>; })}</div><p className="mt-6 text-xs text-white/35">Klik karya untuk membuka lightbox. Media di atas adalah ilustrasi visual demo.</p></section><section id="services" className="border-t border-white/10 py-24"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="photo-kicker text-[#bda67f]">03 / SERVICES</p><div className="grid gap-0 sm:grid-cols-2">{[["Wedding stories", "Merekam hari yang kamu ingin ingat dengan ritme yang tenang."], ["Portrait sessions", "Membuat ruang untuk karakter, bukan sekadar pose."], ["Product frames", "Menempatkan detail produk dengan konteks yang terasa."], ["Event coverage", "Menangkap energi ruangan dan orang-orang di dalamnya."]].map(([title, copy]) => <div className="border-t border-white/15 py-5 sm:pr-8" key={title}><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{copy}</p></div>)}</div></div></section><section className="border-t border-white/10 py-24"><div className="grid gap-10 md:grid-cols-2"><div><p className="photo-kicker text-[#bda67f]">04 / CREATIVE PROCESS</p><h2 className="mt-4 max-w-md font-serif text-5xl font-light leading-none md:text-7xl">Slow down to notice more.</h2></div><div className="space-y-0">{[["Dengarkan", "Memahami cerita, orang, dan suasana yang ingin kamu bawa."], ["Make room", "Mencari cahaya dan ruang yang membiarkan momen bergerak natural."], ["Deliver", "Menyusun hasil akhir menjadi cerita visual yang mudah dibagikan."]].map(([title, copy], index) => <div className="flex gap-6 border-t border-white/15 py-5" key={title}><span className="photo-kicker text-[#bda67f]">0{index + 1}</span><div><h3 className="font-serif text-2xl">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-white/50">{copy}</p></div></div>)}</div></div></section><section id="contact" className="border-t border-white/10 py-24 pb-44"><p className="photo-kicker text-[#bda67f]">05 / CONTACT</p><h2 className="mt-5 max-w-3xl font-serif text-6xl font-light leading-[.85] md:text-9xl">Tell me what<br /><span className="text-[#bda67f]">matters to you.</span></h2><div className="mt-10 flex flex-wrap items-center gap-5"><ContactLink slug="fotografer" label="Pesan template fotografer" /><a className="text-sm text-white/60 underline underline-offset-4" href={`mailto:${businessConfig.email}`}>Email studio</a></div></section></main>{current && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5" role="dialog" aria-modal="true" aria-label="Preview karya" onClick={() => setActivePhoto(null)}><div className="relative w-full max-w-3xl" onClick={event => event.stopPropagation()}><div className={`${current.tone} aspect-video`} /><div className="mt-4 flex items-center justify-between"><div><p className="photo-kicker text-[#bda67f]">{current.category} / MEDIA ILLUSTRATION</p><h2 className="mt-1 font-serif text-3xl">{current.title}</h2></div><button onClick={() => setActivePhoto(null)} aria-label="Tutup lightbox" className="rounded-full border border-white/25 p-2"><X size={18} /></button></div><div className="mt-5 flex justify-between"><button onClick={() => moveLightbox(-1)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs">Previous <ArrowLeft size={14} /></button><button onClick={() => moveLightbox(1)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs">Next <ArrowRight size={14} /></button></div></div></div>}<DemoModeBar slug="fotografer" /></div>;
}

function ArrowDownSmall() { return <ArrowRight className="ml-2 inline" size={15} />; }

const designCategories = ["All", "Brand Identity", "Logo Design", "Media Sosial", "Packaging", "UI/UX"];
const designWorks = [
  { title: "Mori Coffee", category: "Brand Identity", color: "design-orange", copy: "Sistem identitas untuk kedai kopi yang hangat dan tidak berisik." },
  { title: "Sora Mark", category: "Logo Design", color: "design-blue", copy: "Eksplorasi tanda untuk studio arsitektur yang bekerja dengan cahaya." },
  { title: "Sunday Market", category: "Media Sosial", color: "design-pink", copy: "Template konten untuk pasar akhir pekan dengan banyak karakter." },
  { title: "Good Grain", category: "Packaging", color: "design-yellow", copy: "Kemasan makanan rumahan yang jujur, berani, dan mudah dikenali." },
  { title: "Field Notes", category: "UI/UX", color: "design-green", copy: "Antarmuka catatan lapangan yang mengutamakan ritme membaca." },
  { title: "Ceria Studio", category: "Brand Identity", color: "design-purple", copy: "Identitas visual untuk tim kreatif yang suka bermain dengan bentuk." },
];

function DesignerDemo() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<(typeof designWorks)[number] | null>(null);
  const filtered = designWorks.filter(work => category === "All" || work.category === category);
  return <div className="designer-demo min-h-screen bg-[#f1eee8] text-[#171918]"><style>{`.designer-demo .design-orange{background:#ed5b37}.designer-demo .design-blue{background:#5268e8;color:#f5f2ea}.designer-demo .design-pink{background:#ef9bb6}.designer-demo .design-yellow{background:#f1ce48}.designer-demo .design-green{background:#8dbf9a}.designer-demo .design-purple{background:#b3a4e6}`}</style><nav className="border-b-2 border-[#171918] bg-[#f1eee8]"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5"><a href="#design-top" className="text-2xl font-black tracking-[-.08em]">NADIA<span className="text-[#ed5b37]">CREATIVE</span></a><div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[.12em] md:flex"><a href="#about">Tentang</a><a href="#projects">Projects</a><a href="#services">Layanan</a><a href="#contact">Contact ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â</a></div><Menu className="md:hidden" size={20} /></div></nav><main id="design-top" className="mx-auto max-w-7xl px-5"><section className="grid min-h-[720px] items-center gap-10 py-16 md:grid-cols-[1.2fr_.8fr] md:py-24"><div><p className="design-kicker mb-8">Nadia Creative / Graphic Designer & Brand Identity Specialist</p><h1 className="text-[clamp(4rem,10vw,9.5rem)] font-black leading-[.77] tracking-[-.1em]">Design that<br /><span className="text-[#ed5b37]">speaks</span> louder<br />than words<span className="text-[#5268e8]">.</span></h1><p className="mt-10 max-w-md text-base leading-7 text-stone-600">Identitas visual, packaging, dan sistem desain untuk ide yang ingin terlihat jelas di dunia.</p><div className="mt-8"><ContactLink slug="desainer" label="Pesan template ini" /></div></div><div className="relative"><div className="grid grid-cols-2 gap-3"><div className="design-blue flex aspect-[.78] items-end p-4 text-3xl font-black leading-none">SORA<br />MARK</div><div className="design-orange mt-16 flex aspect-[.78] items-end p-4 text-3xl font-black leading-none">MORI<br />COFFEE</div><div className="design-yellow -mt-10 flex aspect-[.78] items-end p-4 text-3xl font-black leading-none">GOOD<br />GRAIN</div><div className="design-pink flex aspect-[.78] items-end p-4 text-3xl font-black leading-none">SUNDAY<br />MARKET</div></div><span className="absolute -bottom-4 left-4 rounded-full border-2 border-[#171918] bg-[#f1eee8] px-3 py-2 text-[10px] font-bold uppercase">Visual language / 01</span></div></section><section id="about" className="border-t-2 border-[#171918] py-20"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="design-kicker">01 / TENTANG ME</p><div><h2 className="max-w-4xl text-5xl font-black leading-[.85] tracking-[-.08em] md:text-8xl">I make ideas easier to <span className="text-[#5268e8]">recognize.</span></h2><p className="mt-10 max-w-xl text-base leading-7 text-stone-600">Nadia Creative adalah contoh identitas portfolio untuk desainer grafis. Proyek dan cerita di halaman ini dibuat khusus sebagai ilustrasi demo, bukan karya klien nyata.</p></div></div></section><section id="projects" className="border-t-2 border-[#171918] py-20"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="design-kicker">02 / FEATURED PROJECTS</p><h2 className="mt-4 text-5xl font-black leading-[.85] tracking-[-.08em] md:text-8xl">Make it<br /><span className="text-[#ed5b37]">memorable.</span></h2></div><div className="flex max-w-md flex-wrap justify-end gap-2">{designCategories.map(item => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border-2 border-[#171918] px-3 py-2 text-xs font-bold transition ${category === item ? "bg-[#171918] text-white" : "hover:bg-[#d9e7cf]"}`}>{item}</button>)}</div></div><motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((work, index) => <motion.button layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={work.title} onClick={() => setSelected(work)} className="group text-left"><div className={`${work.color} relative flex aspect-[.95] items-end p-5 transition group-hover:-translate-y-1 group-hover:shadow-[7px_7px_0_#171918]`}><span className="text-3xl font-black leading-[.82] tracking-[-.08em]">{work.title}</span><MoveUpRight className="absolute right-4 top-4 opacity-60 transition group-hover:rotate-45" /></div><div className="flex justify-between border-b-2 border-[#171918] py-3 text-xs"><span className="font-bold">{work.title}</span><span className="text-stone-500">{work.category}</span></div></motion.button>)}</motion.div></section><section id="services" className="border-t-2 border-[#171918] py-20"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="design-kicker">03 / DESIGN SERVICES</p><div className="grid sm:grid-cols-2">{[["Brand identity", "Nama, bentuk, warna, dan aturan main yang terasa utuh."], ["Logo design", "Satu tanda yang bekerja di kartu nama sampai layar kecil."], ["Social media", "Template yang memberi ruang untuk konten tetap hidup."], ["Packaging", "Kemasan yang membuat orang berhenti sebentar dan melihat."]].map(([title, copy]) => <div key={title} className="border-t-2 border-[#171918] py-5 sm:pr-8"><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{copy}</p></div>)}</div></div></section><section className="border-t-2 border-[#171918] py-20"><div className="grid gap-10 md:grid-cols-2"><div><p className="design-kicker">04 / CREATIVE PROCESS</p><h2 className="mt-4 text-6xl font-black leading-[.8] tracking-[-.1em] md:text-9xl">Find the<br /><span className="text-[#5268e8]">right shape.</span></h2></div><div>{[["Context", "Dengar dulu. Pahami masalah, audiens, dan ruang geraknya."], ["Direction", "Pilih satu sudut pandang yang bisa memandu banyak keputusan."], ["Detail", "Rapi di bagian kecil supaya ide besar terasa lebih kuat."]].map(([title, copy], index) => <div key={title} className="flex gap-6 border-t-2 border-[#171918] py-5"><span className="design-kicker text-[#ed5b37]">0{index + 1}</span><div><h3 className="text-xl font-black">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-stone-600">{copy}</p></div></div>)}</div></div></section><section id="contact" className="border-t-2 border-[#171918] py-20 pb-44"><p className="design-kicker">05 / CONTACT</p><h2 className="mt-4 max-w-5xl text-6xl font-black leading-[.78] tracking-[-.1em] md:text-9xl">Have a good idea?<br /><span className="text-[#ed5b37]">LetÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢s give it a voice.</span></h2><div className="mt-10 flex flex-wrap items-center gap-5"><ContactLink slug="desainer" label="Pesan template desainer" /><a className="font-bold underline underline-offset-4" href={`mailto:${businessConfig.email}`}>Email Nadia ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â</a></div></section></main>{selected && <AnimatePresence><div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171918]/75 p-5" role="dialog" aria-modal="true" aria-label="Detail proyek" onClick={() => setSelected(null)}><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-lg border-2 border-[#171918] bg-[#f1eee8] p-7" onClick={event => event.stopPropagation()}><div className="flex justify-between gap-5"><div><p className="design-kicker text-[#ed5b37]">DETAIL PROJECT / SIMULATION</p><h2 className="mt-3 text-4xl font-black tracking-[-.06em]">{selected.title}</h2></div><button aria-label="Tutup detail proyek" onClick={() => setSelected(null)}><X /></button></div><div className={`${selected.color} mt-7 flex aspect-video items-end p-5 text-4xl font-black leading-[.8]`}>{selected.title}</div><p className="mt-6 text-sm leading-6 text-stone-600">{selected.copy} Proyek ini hanya berfungsi sebagai materi visual untuk contoh website.</p><button onClick={() => setSelected(null)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#171918] px-4 py-2 text-xs font-bold text-white">Tutup detail <Check size={14} /></button></motion.div></div></AnimatePresence>}<DemoModeBar slug="desainer" /></div>;
}

const stack = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Git", "Docker"];
const codeProjects = [
  { title: "Inventory Management System", category: "Web Application", code: "inventory", copy: "Aplikasi untuk membantu tim melihat stok, aktivitas, dan kebutuhan restock dalam satu alur." },
  { title: "E-Commerce Dashboard", category: "Admin Dashboard", code: "commerce", copy: "Dashboard admin untuk membaca pesanan, produk, dan ringkasan operasional." },
  { title: "Online Booking Platform", category: "Booking System", code: "booking", copy: "Alur booking yang menghubungkan jadwal, detail layanan, dan konfirmasi pengguna." },
  { title: "IoT Monitoring Dashboard", category: "IoT Application", code: "iot", copy: "Tampilan monitoring simulasi untuk membaca status perangkat dan data sensor." },
];

const videoProjects = [
  { title: "Ruang Kota", type: "Brand Film", tone: "video-amber", copy: "Film pendek tentang ritme kota dan orang-orang yang membuatnya terasa hidup." },
  { title: "Northbound", type: "Travel Film", tone: "video-blue", copy: "Cerita perjalanan dengan pacing tenang dan ruang untuk lanskap berbicara." },
  { title: "After Hours", type: "Music Visual", tone: "video-violet", copy: "Visual campaign untuk rilisan musik dengan potongan gambar yang eksperimental." },
  { title: "Made Slowly", type: "Documentary", tone: "video-green", copy: "Potret proses di balik produk yang dibuat dengan tangan dan perhatian." },
];

function VideographerDemo() {
  const [selected, setSelected] = useState<(typeof videoProjects)[number] | null>(null);
  return <div className="videographer-demo min-h-screen bg-[#171414] text-[#f4eee5]"><style>{`.videographer-demo .video-amber{background:linear-gradient(135deg,#bd8a55,#4b2f26 55%,#1b1818)} .videographer-demo .video-blue{background:linear-gradient(135deg,#8ba8b4,#27424a 55%,#121c21)} .videographer-demo .video-violet{background:linear-gradient(135deg,#81709a,#392a47 55%,#16141c)} .videographer-demo .video-green{background:linear-gradient(135deg,#9ba57d,#3e4c3b 55%,#161b18)}`}</style><nav className="sticky top-0 z-20 border-b border-white/10 bg-[#171414]/90 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><a href="#video-top" className="font-serif text-xl tracking-[.12em]">KARSA <span className="text-[#e7a66a]">MOTION</span></a><div className="hidden items-center gap-7 text-xs uppercase tracking-[.14em] text-white/60 md:flex"><a href="#reel">Reel Utama</a><a href="#work">Work</a><a href="#process">Process</a><a href="#contact">Kontak</a></div><span className="font-mono text-xs text-[#e7a66a]">PLAY / PAUSE</span></div></nav><main id="video-top" className="mx-auto max-w-6xl px-5"><section className="grid min-h-[700px] items-end gap-12 py-20 md:grid-cols-[1.1fr_.9fr] md:py-28"><div className="pb-4"><p className="mb-7 font-mono text-xs uppercase tracking-[.14em] text-[#e7a66a]">Karsa Motion / Videographer & Visual Director</p><h1 className="font-serif text-6xl font-light leading-[.88] tracking-[-.05em] md:text-8xl">Every frame<br />has a <span className="text-[#e7a66a]">feeling.</span></h1><p className="mt-8 max-w-lg text-base leading-7 text-white/55">Portofolio video yang memberi ruang untuk showreel, cerita produksi, dan cara kerja yang terasa personal.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#reel" className="inline-flex items-center gap-2 rounded-full bg-[#e7a66a] px-5 py-3 text-sm font-semibold text-[#171414]">Lihat showreel <ArrowUpRight size={15} /></a><ContactLink slug="videografer" label="Pesan template ini" /></div></div><div className="video-amber relative flex aspect-[.9] items-end overflow-hidden p-6"><div className="absolute inset-0 bg-black/15" /><div className="relative"><span className="font-mono text-[10px] uppercase tracking-[.14em] text-white/70">MEDIA ILLUSTRATION / 01</span><p className="mt-2 max-w-[220px] font-serif text-3xl leading-none">Stories move<br />when people do.</p></div><div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-xs">01:24</div></div></section><section id="reel" className="border-t border-white/10 py-24"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase tracking-[.14em] text-[#e7a66a]">01 / SHOWREEL</p><h2 className="mt-4 max-w-2xl font-serif text-5xl font-light leading-none md:text-7xl">A moving<br /><span className="text-[#e7a66a]">point of view.</span></h2></div><p className="max-w-xs text-sm leading-6 text-white/50">Klik frame untuk melihat ringkasan proyek. Semua visual di halaman ini adalah ilustrasi demo.</p></div><button onClick={() => setSelected(videoProjects[0])} className="video-amber group relative mt-12 flex aspect-video w-full items-end overflow-hidden p-6 text-left"><div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/5" /><div className="relative flex w-full items-end justify-between"><div><span className="font-mono text-[10px] uppercase tracking-[.14em] text-white/70">PLAY REEL / SIMULATION</span><p className="mt-2 font-serif text-4xl">Ruang Kota</p></div><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eee5] text-[#171414] transition group-hover:scale-105">ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“Ãƒâ€šÃ‚Â¶</span></div></button></section><section id="work" className="border-t border-white/10 py-24"><div className="mb-12"><p className="font-mono text-xs uppercase tracking-[.14em] text-[#e7a66a]">02 / SELECTED WORK</p><h2 className="mt-4 font-serif text-5xl font-light md:text-7xl">Stories in different <span className="text-[#e7a66a]">rhythms.</span></h2></div><div className="grid gap-4 sm:grid-cols-2">{videoProjects.map(project => <motion.button whileHover={{ y: -5 }} onClick={() => setSelected(project)} key={project.title} className={`${project.tone} group relative flex min-h-[250px] items-end overflow-hidden p-6 text-left`}><div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" /><div className="relative"><span className="font-mono text-[10px] uppercase tracking-[.14em] text-white/70">{project.type}</span><h3 className="mt-2 font-serif text-3xl">{project.title}</h3></div><ArrowUpRight className="absolute right-5 top-5 opacity-60 transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} /></motion.button>)}</div></section><section id="process" className="border-t border-white/10 py-24"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-xs uppercase tracking-[.14em] text-[#e7a66a]">03 / PRODUCTION PROCESS</p><div>{[["Dengarkan", "Memahami brand, audiens, dan rasa yang ingin ditinggalkan."], ["Bentuk", "Menyusun treatment, visual reference, dan ritme cerita sebelum shooting."], ["Edit", "Memilih potongan yang penting, merapikan suara, lalu menguatkan pesan."], ["Deliver", "Menyiapkan hasil akhir yang siap dibagikan di kanal yang kamu butuhkan."]].map(([title, copy], index) => <div key={title} className="flex gap-6 border-t border-white/15 py-5"><span className="font-mono text-xs text-[#e7a66a]">0{index + 1}</span><div><h3 className="font-serif text-2xl">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-white/50">{copy}</p></div></div>)}</div></div></section><section id="services" className="border-t border-white/10 py-24"><div className="grid gap-0 sm:grid-cols-3">{[["Brand film", "Cerita visual untuk memperkenalkan cara sebuah brand bergerak."], ["Event video", "Energi acara yang tetap terasa setelah lampu ruangan padam."], ["Social content", "Potongan video yang dirancang untuk ritme layar kecil."]].map(([title, copy]) => <div key={title} className="border-t border-white/15 py-5 sm:pr-8"><h3 className="font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{copy}</p></div>)}</div></section><section id="contact" className="border-t border-white/10 py-24 pb-44"><p className="font-mono text-xs uppercase tracking-[.14em] text-[#e7a66a]">04 / CONTACT</p><h2 className="mt-5 max-w-4xl font-serif text-6xl font-light leading-[.86] md:text-8xl">Punya cerita<br /><span className="text-[#e7a66a]">in motion?</span></h2><div className="mt-10 flex flex-wrap items-center gap-5"><ContactLink slug="videografer" label="Pesan template videografer" /><a href={`mailto:${businessConfig.email}`} className="text-sm text-white/60 underline underline-offset-4">Email studio</a></div></section></main>{selected && <AnimatePresence><div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5" role="dialog" aria-modal="true" aria-label="Detail video" onClick={() => setSelected(null)}><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="video-amber w-full max-w-lg p-7" onClick={event => event.stopPropagation()}><div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/70">DETAIL PROJECT / SIMULATION</p><h2 className="mt-3 font-serif text-4xl">{selected.title}</h2></div><button aria-label="Tutup detail video" onClick={() => setSelected(null)} className="rounded-full border border-white/40 p-2"><X size={17} /></button></div><p className="mt-8 text-sm leading-6 text-white/75">{selected.copy}</p><button onClick={() => setSelected(null)} className="mt-8 rounded-full bg-[#f4eee5] px-4 py-2 text-xs font-semibold text-[#171414]">Tutup detail</button></motion.div></div></AnimatePresence>}<DemoModeBar slug="videografer" /></div>;
}

type AntiProject = {
  title: string;
  category: "FILM BRAND" | "VIDEO MUSIK" | "ACARA" | "DOKUMENTER";
  year: string;
  description: string;
  link: string;
  tone: string;
};

const antiProjects: AntiProject[] = [
  {
    title: "KARYA VIDEO 1",
    category: "FILM BRAND",
    year: "Belum dicantumkan",
    description: "Video portfolio ANTI MANUSIA PROJECT.",
    link: "https://drive.google.com/file/d/17QszUNTs1VnxuWVP_7R1g2g-VdSQbDS1/view?usp=drive_link",
    tone: "linear-gradient(135deg,#252525,#7d5546 52%,#111)",
  },
  {
    title: "KARYA VIDEO 2",
    category: "VIDEO MUSIK",
    year: "Belum dicantumkan",
    description: "Video portfolio ANTI MANUSIA PROJECT.",
    link: "https://drive.google.com/file/d/1VhSTq1G3XVaewra1n3mM7EOPpd3kYu_p/view?usp=drive_link",
    tone: "linear-gradient(135deg,#181b2a,#59486b 55%,#0d0d13)",
  },
  {
    title: "KARYA VIDEO 3",
    category: "ACARA",
    year: "Belum dicantumkan",
    description: "Video portfolio ANTI MANUSIA PROJECT.",
    link: "https://drive.google.com/file/d/1sEFyzuV-_m6o7dab8Y91JotC-URdYdrM/view?usp=drive_link",
    tone: "linear-gradient(135deg,#536c72,#1d353b 55%,#0c1113)",
  },
  {
    title: "KARYA VIDEO 4",
    category: "DOKUMENTER",
    year: "Belum dicantumkan",
    description: "Video portfolio ANTI MANUSIA PROJECT.",
    link: "https://drive.google.com/file/d/1cv-zSn3k89p3pydlnGuFz8WiPHWJ2s4_/view?usp=drive_link",
    tone: "linear-gradient(135deg,#737c5a,#374437 55%,#111611)",
  },
];

function validVideoUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function drivePreviewUrl(value: string) {
  const match = value.match(/\/d\/([^/]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : value;
}

function AntiProjectCard({ project, onSelect }: { project: AntiProject; onSelect: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onSelect}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
      className="group relative min-h-[280px] cursor-pointer overflow-hidden text-left"
      style={{ background: project.tone }}
    >
      <iframe
        src={drivePreviewUrl(project.link)}
        title={project.title}
        className="pointer-events-none absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/15" />
      <div className="relative flex min-h-[280px] items-end p-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[.14em] text-white/70">{project.category} / {project.year}</span>
          <h3 className="mt-3 max-w-sm text-3xl font-semibold tracking-[-.05em]">{project.title}</h3>
        </div>
      </div>
      <ArrowUpRight className="absolute right-5 top-5 opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
    </motion.div>
  );
}

function SocialCardStack() {
  const cards = [
    { src: "/sosmed/ig.png", alt: "Capture Instagram ANTI MANUSIA PROJECT", platform: "Instagram", handle: "antimanusia13", href: "https://instagram.com/antimanusia13", className: "left-0 top-10 rotate-[-7deg]" },
    { src: "/sosmed/tiktok.png", alt: "Capture TikTok ANTI MANUSIA PROJECT", platform: "TikTok", handle: "reydysta", href: "https://tiktok.com/@reydysta", className: "right-0 top-0 rotate-[6deg]" },
    { src: "/sosmed/treads.png", alt: "Capture Threads ANTI MANUSIA PROJECT", platform: "Threads", handle: "antimanusia13", href: "https://threads.net/@antimanusia13", className: "left-1/2 top-24 -translate-x-1/2 rotate-[-1deg]" },
  ];

  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[430px] sm:h-[580px]">
      <div className="absolute inset-8 rounded-full bg-[#d4ff3f]/10 blur-3xl" />
      {cards.map(card => (
        <div key={card.src} className={`group/card absolute w-[58%] overflow-hidden rounded-[18px] border border-white/25 bg-[#151515] p-1 shadow-2xl transition duration-500 hover:z-20 hover:rotate-0 ${card.className}`}>
          <img src={card.src} alt={card.alt} className="block h-auto w-full rounded-[13px]" />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-[13px] bg-[#0b0b0b]/65 p-4 opacity-0 transition duration-300 group-hover/card:pointer-events-auto group-hover/card:opacity-100">
            <a href={card.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#d4ff3f] px-4 py-2 text-xs font-semibold text-[#0b0b0b] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4ff3f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b]">
              Kunjungi {card.platform} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      ))}
      <div className="absolute bottom-2 right-2 z-30 border border-white/20 bg-[#0b0b0b]/90 px-4 py-3 backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] accent">SOSIAL MEDIA</p>
        <div className="mt-2 space-y-2 text-xs">
          <a href="https://instagram.com/antimanusia13" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-[#d4ff3f]">
            <Instagram size={14} aria-hidden="true" /> <span>@antimanusia13</span>
          </a>
          <a href="https://threads.net/@antimanusia13" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-[#d4ff3f]">
            <AtSign size={14} aria-hidden="true" /> <span>@antimanusia13</span>
          </a>
          <a href="https://tiktok.com/@reydysta" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-[#d4ff3f]">
            <Music2 size={14} aria-hidden="true" /> <span>@reydysta</span>
          </a>
          <a href="https://www.linkedin.com/in/reydysta-pradana-krisna-mukti/" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-[#d4ff3f]">
            <Linkedin size={14} aria-hidden="true" /> <span>reydysta-pradana-krisna-mukti</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function AntiManusiaProjectDemo() {
  const [introVisible, setIntroVisible] = useState(true);
  const [category, setCategory] = useState<"SEMUA" | AntiProject["category"]>("SEMUA");
  const [selected, setSelected] = useState<AntiProject | null>(null);
  const categories = ["SEMUA", "FILM BRAND", "VIDEO MUSIK", "ACARA", "DOKUMENTER"] as const;
  const projects = category === "SEMUA" ? antiProjects : antiProjects.filter(project => project.category === category);
  const whatsapp = whatsappUrl("Halo kak, saya tertarik bekerja sama dengan Anti Manusia Project untuk kebutuhan video. Boleh konsultasi mengenai konsep, harga, dan jadwal pengerjaannya?");

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  return <div className="anti-project min-h-screen bg-[#0b0b0b] text-[#f5f2ec]">
    <style>{`.anti-project .accent{color:#d4ff3f}.anti-project .accent-bg{background:#d4ff3f;color:#0b0b0b}.anti-project .muted{color:rgba(245,242,236,.58)}.anti-project .line{border-color:rgba(245,242,236,.15)}`}</style>
    <AnimatePresence>
      {introVisible && <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }} className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b0b0b] px-6" aria-label="Membuka ANTI MANUSIA PROJECT"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }} className="w-full max-w-sm"><div className="font-mono text-[10px] uppercase tracking-[.16em] text-white/45">ANTI MANUSIA / PROJECT</div><div className="mt-6 overflow-hidden"><motion.h1 initial={{ y: "100%" }} animate={{ y: 0, transition: { duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] } }} className="text-4xl font-semibold leading-none tracking-[-.08em] sm:text-5xl">ANTI MANUSIA <span className="text-[#d4ff3f]">/ PROJECT</span></motion.h1></div><div className="mt-8 h-px w-full bg-white/15"><motion.div initial={{ scaleX: 0, transformOrigin: "left" }} animate={{ scaleX: 1, transition: { duration: 1.1, delay: 0.18, ease: "easeInOut" } }} className="h-full bg-[#d4ff3f]" /></div></motion.div></motion.div>}
    </AnimatePresence>
    <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-5">
        <a href="#anti-top" className="font-mono text-sm font-semibold tracking-[.12em]">ANTI MANUSIA <span className="accent">/ PROJECT</span></a>
        <div className="hidden items-center gap-6 text-xs uppercase tracking-[.12em] text-white/65 md:flex"><a href="#about">Tentang</a><a href="#reel">Reel Utama</a><a href="#work">Karya</a><a href="#services">Layanan</a><a href="#contact">Kontak</a></div>
        <span className="font-mono text-[10px] uppercase tracking-[.12em] accent">ANTI MANUSIA / PROJECT</span>
      </div>
    </nav>
    <main id="anti-top" className="mx-auto max-w-7xl px-5">
      <section className="grid min-h-[760px] items-center gap-12 py-20 md:grid-cols-[1.15fr_.85fr] md:py-28">
        <div><p className="mb-7 font-mono text-xs uppercase tracking-[.16em] accent">REYDYSTA PRADANA KRISNA MUKTI / KREATOR VIDEO</p><h1 className="max-w-5xl text-6xl font-semibold leading-[.84] tracking-[-.08em] md:text-9xl">Buat agar<br /><span className="accent">terasa</span> nyata.</h1><p className="mt-8 max-w-xl text-base leading-7 muted">ANTI MANUSIA PROJECT adalah ruang kerja visual untuk video yang jujur, eksperimental, dan punya sudut pandang.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#reel" className="accent-bg inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">Lihat reel utama <ArrowUpRight size={15} /></a><Link href="/resume" className="inline-flex items-center gap-2 rounded-full border border-[#d4ff3f]/70 px-5 py-3 text-sm font-semibold text-[#d4ff3f] transition hover:bg-[#d4ff3f] hover:text-[#0b0b0b]">CV / Resume <ArrowUpRight size={15} /></Link><a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-[#d4ff3f]">Konsultasi via WhatsApp <ArrowUpRight size={15} /></a></div></div>
        <SocialCardStack />
      </section>
      <section id="about" className="line border-t py-24"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-xs uppercase tracking-[.14em] accent">01 / TENTANG</p><div><h2 className="max-w-4xl text-4xl font-medium leading-[.95] tracking-[-.06em] md:text-7xl">Ruang visual untuk cerita yang tidak muat di dalam templat.</h2><p className="mt-8 max-w-2xl text-sm leading-7 muted">Reydysta menangani penyuntingan video dengan CapCut, videografi menggunakan iPhone, dan pengelolaan media sosial. Detail pengalaman, klien, dan portofolio akan ditambahkan saat data resmi tersedia.</p><div className="mt-8 flex flex-wrap gap-2">{["Penyuntingan Video / CapCut", "Videografi / iPhone", "Pengelolaan Media Sosial"].map(item => <span key={item} className="rounded-full border border-white/20 px-4 py-2 text-xs">{item}</span>)}</div></div></div></section>
      <section id="reel" className="line border-t py-24"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase tracking-[.14em] accent">02 / SHOWREEL</p><h2 className="mt-4 max-w-3xl text-5xl font-medium leading-[.9] tracking-[-.07em] md:text-8xl">Tonton<br /><span className="accent">karya utama.</span></h2></div><p className="max-w-xs text-sm leading-6 muted">Video utama tersedia melalui Google Drive. Pastikan akses file disetel ke Siapa saja yang memiliki link.</p></div><div className="group relative mt-12 aspect-video w-full overflow-hidden" style={{ background: antiProjects[0].tone }}><iframe src={drivePreviewUrl(antiProjects[0].link)} title="Showreel ANTI MANUSIA PROJECT" className="absolute inset-0 h-full w-full" allow="autoplay; fullscreen" /> <div className="pointer-events-none absolute inset-0 bg-black/10 transition group-hover:bg-black/0" /><div className="relative flex w-full items-end justify-between"><div><span className="font-mono text-[10px] uppercase tracking-[.14em] text-white/70">REEL UTAMA / GOOGLE DRIVE</span><p className="mt-2 text-4xl font-semibold tracking-[-.06em]">REEL UTAMA ANTI MANUSIA</p></div><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f2ec] text-[#0b0b0b] transition group-hover:scale-105">&rarr;</span></div></div></section>
      <section id="work" className="line border-t py-24"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase tracking-[.14em] accent">03 / KARYA PILIHAN</p><h2 className="mt-4 text-5xl font-medium leading-[.9] tracking-[-.07em] md:text-8xl">Karya<br /><span className="accent">pilihan.</span></h2></div><div className="flex max-w-xl flex-wrap gap-2">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-3 py-2 text-xs transition ${category === item ? "accent-bg border-[#d4ff3f]" : "border-white/20 text-white/65 hover:border-white/60"}`}>{item}</button>)}</div></div><div className="mt-12 grid gap-4 sm:grid-cols-2">{projects.map(project => <AntiProjectCard key={`${project.category}-${project.title}`} project={project} onSelect={() => setSelected(project)} />)}</div></section>
      <section id="services" className="line border-t py-24"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-xs uppercase tracking-[.14em] accent">04 / LAYANAN</p><div className="grid gap-0 sm:grid-cols-3">{[["Penyuntingan Video", "Penyuntingan video dengan CapCut dan ritme yang sesuai cerita."], ["Videografi", "Pengambilan gambar menggunakan iPhone untuk konten yang dekat dan lincah."], ["Media Sosial", "Pengelolaan dan dukungan konten untuk menjaga kanal tetap hidup."]].map(([title, copy]) => <div key={title} className="line border-t py-5 sm:pr-8"><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 muted">{copy}</p></div>)}</div></div></section>
      <section id="process" className="line border-t py-24"><div className="grid gap-10 md:grid-cols-2"><div><p className="font-mono text-xs uppercase tracking-[.14em] accent">05 / PROSES KREATIF</p><h2 className="mt-4 max-w-xl text-5xl font-medium leading-[.9] tracking-[-.07em] md:text-7xl">Temukan rasanya.<br /><span className="accent">Lalu susun ceritanya.</span></h2></div><div>{[["01", "Dengarkan", "Memahami brief, audiens, dan rasa yang ingin ditinggalkan."], ["02", "Bentuk", "Mengubah ide menjadi treatment, frame, dan ritme cerita."], ["03", "Sempurnakan", "Mengedit, merapikan, lalu menyiapkan output yang siap dipakai."]].map(([no, title, copy]) => <div key={no} className="line flex gap-5 border-t py-5"><span className="font-mono text-xs accent">{no}</span><div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 muted">{copy}</p></div></div>)}</div></div></section>
      <section id="contact" className="line border-t py-24 pb-44"><p className="font-mono text-xs uppercase tracking-[.14em] accent">06 / KOLABORASI</p><h2 className="mt-5 max-w-5xl text-6xl font-medium leading-[.82] tracking-[-.08em] md:text-9xl">Punya cerita<br /><span className="accent">yang layak dirasakan?</span></h2><p className="mt-8 max-w-xl text-base leading-7 muted">Mari bicarakan konsep, kebutuhan produksi, harga, dan jadwal pengerjaan.</p><div className="mt-10 flex flex-wrap items-center gap-4"><a href={whatsapp} target="_blank" rel="noreferrer" className="accent-bg inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">Hubungi WhatsApp <ArrowUpRight size={15} /></a><a href={`mailto:${businessConfig.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm">{businessConfig.email} <ArrowUpRight size={15} /></a></div><div className="mt-10 flex gap-5 text-xs uppercase tracking-[.12em]">{businessConfig.instagramUrl && <a href={businessConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram &rarr;</a>}{businessConfig.youtubeUrl && <a href={businessConfig.youtubeUrl} target="_blank" rel="noreferrer">YouTube &rarr;</a>}{businessConfig.tiktokUrl && <a href={businessConfig.tiktokUrl} target="_blank" rel="noreferrer">TikTok &rarr;</a>}</div></section>
    </main>
    {selected && <AnimatePresence><div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5" role="dialog" aria-modal="true" aria-label="Detail project" onClick={() => setSelected(null)}><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg bg-[#151515] p-7" onClick={event => event.stopPropagation()}><div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[10px] uppercase tracking-[.14em] accent">DETAIL PROJECT</p><h2 className="mt-3 text-3xl font-semibold">{selected.title}</h2></div><button aria-label="Tutup detail project" onClick={() => setSelected(null)} className="rounded-full border border-white/30 p-2"><X size={17} /></button></div><div className="mt-7 aspect-video overflow-hidden" style={{ background: selected.tone }}>{validVideoUrl(selected.link) ? <iframe src={drivePreviewUrl(selected.link)} title={`Video ${selected.title}`} className="h-full w-full" allow="autoplay; fullscreen" /> : null}</div><p className="mt-6 text-sm leading-6 muted">{selected.description}</p><p className="mt-3 font-mono text-xs text-white/45">Kategori: {selected.category} - Tahun: {selected.year}</p>{validVideoUrl(selected.link) && <a href={selected.link} target="_blank" rel="noreferrer" className="accent-bg mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">Buka tautan video <ExternalLink size={14} /></a>}<button onClick={() => setSelected(null)} className="mt-7 ml-3 rounded-full border border-white/25 px-4 py-2 text-xs">Tutup detail</button></motion.div></div></AnimatePresence>}
  </div>;
}

type ExtendedDemoSlug = "uiux-designer" | "content-creator" | "digital-marketer" | "arsitek" | "sales-marketing";

const extendedDemoContent: Record<ExtendedDemoSlug, {
  className: string;
  accent: string;
  eyebrow: string;
  headline: string;
  intro: string;
  focus: string[];
  projects: { title: string; category: string; copy: string }[];
}> = {
  "uiux-designer": {
    className: "uiux-demo",
    accent: "#5b6ee1",
    eyebrow: "MAYA INTERFACE / PRODUCT DESIGNER",
    headline: "Making complex products feel clear.",
    intro: "Maya Interface adalah contoh portfolio UI/UX Designer yang memperlihatkan cara berpikir, proses riset, dan keputusan desain.",
    focus: ["Research", "Flows", "Prototyping", "Design systems"],
    projects: [
      { title: "Kita Finance", category: "Mobile product", copy: "Menyederhanakan pengalaman mencatat keuangan harian agar terasa ringan dan mudah dipahami." },
      { title: "Carepath", category: "Service design", copy: "Merapikan alur layanan kesehatan dari pencarian informasi hingga tindak lanjut." },
      { title: "Field Notes", category: "Design system", copy: "Membangun pola komponen dan aturan visual untuk produk internal yang terus berkembang." },
      { title: "Ruang Kerja", category: "Web platform", copy: "Membuat dashboard kolaborasi yang membantu tim melihat prioritas tanpa kehilangan konteks." },
    ],
  },
  "content-creator": {
    className: "creator-demo",
    accent: "#e76f51",
    eyebrow: "SORA CONTENT / CREATOR & STORYTELLER",
    headline: "Ideas made to travel further.",
    intro: "Contoh website untuk content creator yang ingin menampilkan format konten, sudut pandang, dan kerja sama brand secara personal.",
    focus: ["Video", "Writing", "Campaigns", "Community"],
    projects: [
      { title: "Notes from Monday", category: "Editorial series", copy: "Serial konten mingguan tentang kerja kreatif, rutinitas, dan hal kecil yang sering terlewat." },
      { title: "Taste the City", category: "Brand collaboration", copy: "Konsep cerita kuliner yang menggabungkan short video, caption, dan rekomendasi lokal." },
      { title: "One Minute Reset", category: "Short-form video", copy: "Format video singkat dengan ritme konsisten untuk membantu audiens berhenti sejenak." },
      { title: "Behind the Post", category: "Creator journal", copy: "Catatan proses dari ide mentah hingga konten yang siap bertemu audiens." },
    ],
  },
  "digital-marketer": {
    className: "marketer-demo",
    accent: "#4f8b62",
    eyebrow: "NALA GROWTH / DIGITAL MARKETER",
    headline: "Turning audience insight into momentum.",
    intro: "Contoh portfolio digital marketer dengan fokus pada strategi, campaign, channel, dan pembelajaran yang bisa ditindaklanjuti.",
    focus: ["Strategy", "Campaigns", "Analytics", "Growth"],
    projects: [
      { title: "Good Habit Launch", category: "Campaign strategy", copy: "Rangkaian campaign untuk memperkenalkan produk kebiasaan sehat kepada audiens baru." },
      { title: "Always On Content", category: "Content system", copy: "Sistem konten yang menjaga brand tetap relevan tanpa kehilangan suara yang konsisten." },
      { title: "The Signal Report", category: "Audience insight", copy: "Kerangka laporan untuk mengubah data perilaku menjadi keputusan marketing yang lebih tajam." },
      { title: "Retail, Reframed", category: "Growth experiment", copy: "Eksperimen channel untuk menemukan cara baru mempertemukan produk dan pelanggan." },
    ],
  },
  arsitek: {
    className: "architect-demo",
    accent: "#9a6f43",
    eyebrow: "ATELIER RUANG / ARCHITECTURE & INTERIORS",
    headline: "Spaces shaped by light, life, and context.",
    intro: "Contoh portfolio arsitek yang menempatkan proyek, gambar proses, dan gagasan ruang sebagai cerita utama.",
    focus: ["Concept", "Site", "Material", "Built work"],
    projects: [
      { title: "Rumah Lereng", category: "Residential", copy: "Rumah yang mengikuti kontur lahan dan membuka hubungan perlahan dengan pemandangan." },
      { title: "Studio Senja", category: "Workplace", copy: "Ruang kerja kecil yang disusun untuk cahaya sore, percakapan, dan fokus yang tenang." },
      { title: "Paviliun Air", category: "Installation", copy: "Eksplorasi material, bayangan, dan suara air dalam sebuah ruang jeda." },
      { title: "Kota Dalam", category: "Urban study", copy: "Studi tentang ruang komunal yang membuat lingkungan padat terasa lebih manusiawi." },
    ],
  },
  "sales-marketing": {
    className: "sales-demo",
    accent: "#2d7580",
    eyebrow: "DIMAS PRATAMA / SALES & MARKETING",
    headline: "Building trust that moves business forward.",
    intro: "Contoh portfolio profesional untuk sales dan marketing, dengan ruang untuk pencapaian simulasi, pendekatan kerja, dan keahlian relasi.",
    focus: ["Consultative selling", "Partnerships", "Pipeline", "Go-to-market"],
    projects: [
      { title: "Market Entry Plan", category: "Go-to-market", copy: "Kerangka masuk pasar yang menyatukan segmentasi, pesan, dan ritme follow-up." },
      { title: "Partner Playbook", category: "Partnership", copy: "Playbook kolaborasi untuk membantu tim membangun hubungan bisnis yang lebih terarah." },
      { title: "Pipeline Reset", category: "Sales operations", copy: "Perapian proses pipeline agar peluang, catatan, dan prioritas tim terlihat lebih jelas." },
      { title: "Customer Story", category: "Account growth", copy: "Cara menyusun cerita pelanggan menjadi materi yang membantu percakapan penjualan." },
    ],
  },
};

function ExtendedDemo({ slug }: { slug: ExtendedDemoSlug }) {
  const content = extendedDemoContent[slug];
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<(typeof content.projects)[number] | null>(null);
  const categories = ["All", ...Array.from(new Set(content.projects.map(project => project.category)))];
  const projects = content.projects.filter(project => category === "All" || project.category === category);

  return <div className={`${content.className} extended-demo min-h-screen text-[#202321]`} style={{ "--demo-accent": content.accent } as CSSProperties}>
    <style>{`.extended-demo .demo-accent{color:var(--demo-accent)} .extended-demo .demo-surface{background:color-mix(in srgb,var(--demo-accent) 12%,#fff)} .extended-demo .demo-project{background:linear-gradient(145deg,color-mix(in srgb,var(--demo-accent) 18%,#fff),color-mix(in srgb,var(--demo-accent) 58%,#1f2928))}`}</style>
    <nav className="sticky top-0 z-20 border-b border-black/10 bg-[#f8f6f0]/90 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><a href="#extended-top" className="font-semibold tracking-[-.04em]">{interactiveDemoMeta[slug].person}<span className="demo-accent">.</span></a><div className="hidden items-center gap-7 text-xs text-black/60 md:flex"><a href="#about">Tentang</a><a href="#work">Work</a><a href="#process">Process</a><a href="#contact">Kontak</a></div><span className="demo-accent font-mono text-xs">SIMULATION</span></div></nav>
    <main id="extended-top" className="mx-auto max-w-6xl px-5">
      <section className="grid min-h-[680px] items-end gap-12 py-20 md:grid-cols-[1.15fr_.85fr] md:py-28"><div className="pb-4"><p className="font-mono text-xs uppercase tracking-[.12em] demo-accent">{content.eyebrow}</p><h1 className="mt-7 max-w-4xl text-6xl font-semibold leading-[.9] tracking-[-.07em] md:text-8xl">{content.headline}</h1><p className="mt-8 max-w-lg text-base leading-7 text-black/60">{content.intro}</p><div className="mt-9 flex flex-wrap gap-3"><a href="#work" className="inline-flex items-center gap-2 rounded-full bg-[#202321] px-5 py-3 text-sm font-semibold text-white">Lihat selected work <ArrowUpRight size={15} /></a><ContactLink slug={slug} /></div></div><div className="demo-surface relative flex aspect-[.9] items-end overflow-hidden p-6"><div className="absolute right-5 top-5 font-mono text-xs demo-accent">/ 01</div><div><p className="font-mono text-[10px] uppercase tracking-[.12em] text-black/50">MEDIA ILLUSTRATION / DEMO</p><p className="mt-3 max-w-[240px] text-4xl font-semibold leading-none">A profile with a point of view.</p></div></div></section>
      <section id="about" className="border-t border-black/10 py-24"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-xs uppercase tracking-[.12em] demo-accent">01 / TENTANG</p><div><h2 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">A portfolio that explains <span className="demo-accent">how you think.</span></h2><p className="mt-8 max-w-2xl text-sm leading-7 text-black/60">Semua nama, proyek, pencapaian, dan visual pada halaman ini adalah data simulasi untuk contoh website. Struktur dapat disesuaikan dengan profesi dan materi pemiliknya.</p><div className="mt-10 flex flex-wrap gap-3">{content.focus.map(item => <span key={item} className="rounded-full border border-black/15 px-4 py-2 text-xs">{item}</span>)}</div></div></div></section>
      <section id="work" className="border-t border-black/10 py-24"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase tracking-[.12em] demo-accent">02 / SELECTED WORK</p><h2 className="mt-4 max-w-2xl text-5xl font-semibold leading-none tracking-[-.06em] md:text-7xl">Work with a clear <span className="demo-accent">story.</span></h2></div><div className="flex flex-wrap gap-2">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-3 py-2 text-xs transition ${category === item ? "border-[#202321] bg-[#202321] text-white" : "border-black/15 hover:border-black/50"}`}>{item}</button>)}</div></div><div className="mt-12 grid gap-4 sm:grid-cols-2">{projects.map(project => <motion.button whileHover={{ y: -4 }} key={project.title} onClick={() => setSelected(project)} className="group demo-project relative flex min-h-[260px] items-end overflow-hidden p-6 text-left text-white"><div className="absolute inset-0 bg-black/10 transition group-hover:bg-transparent" /><div className="relative"><span className="font-mono text-[10px] uppercase tracking-[.12em] text-white/70">{project.category}</span><h3 className="mt-3 text-3xl font-semibold tracking-[-.04em]">{project.title}</h3></div><ArrowUpRight className="absolute right-5 top-5 opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} /></motion.button>)}</div><p className="mt-6 text-xs text-black/45">Klik project untuk melihat ringkasan. Seluruh konten bersifat simulasi demo.</p></section>
      <section id="process" className="border-t border-black/10 py-24"><div className="grid gap-10 md:grid-cols-2"><div><p className="font-mono text-xs uppercase tracking-[.12em] demo-accent">03 / PROCESS</p><h2 className="mt-4 max-w-xl text-5xl font-semibold leading-none tracking-[-.06em] md:text-7xl">Good work gets clearer as it moves.</h2></div><div>{[["Discover", "Memahami tujuan, audiens, dan konteks sebelum menentukan arah."], ["Bentuk", "Mengubah insight menjadi konsep, struktur, dan materi yang mudah dibaca."], ["Sempurnakan", "Mengasah detail, menguji alur, dan menyiapkan hasil yang siap dipakai."]].map(([title, copy], index) => <div key={title} className="flex gap-5 border-t border-black/10 py-5"><span className="font-mono text-xs demo-accent">0{index + 1}</span><div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-black/55">{copy}</p></div></div>)}</div></div></section>
      <section id="contact" className="border-t border-black/10 py-24 pb-44"><p className="font-mono text-xs uppercase tracking-[.12em] demo-accent">04 / CONTACT</p><h2 className="mt-5 max-w-4xl text-6xl font-semibold leading-[.88] tracking-[-.07em] md:text-8xl">Ready to make your work easier to understand?</h2><div className="mt-10 flex flex-wrap items-center gap-5"><ContactLink slug={slug} label={`Pesan template ${interactiveDemoMeta[slug].name}`} /><a href={`mailto:${businessConfig.email}`} className="text-sm text-black/60 underline underline-offset-4">Email untuk konsultasi</a></div></section>
    </main>
    {selected && <AnimatePresence><div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5" role="dialog" aria-modal="true" aria-label="Detail project" onClick={() => setSelected(null)}><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="demo-surface w-full max-w-lg p-7" onClick={event => event.stopPropagation()}><div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[10px] uppercase tracking-[.12em] demo-accent">DETAIL PROJECT / SIMULATION</p><h2 className="mt-3 text-4xl font-semibold">{selected.title}</h2></div><button aria-label="Tutup detail project" onClick={() => setSelected(null)} className="rounded-full border border-black/20 p-2"><X size={17} /></button></div><p className="mt-8 text-sm leading-7 text-black/65">{selected.copy}</p><button onClick={() => setSelected(null)} className="mt-8 rounded-full bg-[#202321] px-4 py-2 text-xs font-semibold text-white">Tutup detail</button></motion.div></div></AnimatePresence>}
    <DemoModeBar slug={slug} />
  </div>;
}

function ProgrammerDemo() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<(typeof codeProjects)[number] | null>(null);
  const categories = ["All", ...Array.from(new Set(codeProjects.map(project => project.category)))];
  const filtered = codeProjects.filter(project => category === "All" || project.category === category);
  return <div className="programmer-demo min-h-screen bg-[#09131d] text-[#e8f0f2]"><style>{`.programmer-demo .code-card{background:linear-gradient(145deg,#112536,#0c1822)} .programmer-demo .terminal-line{color:#8fe3df}`}</style><nav className="sticky top-0 z-20 border-b border-[#203442] bg-[#09131d]/90 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5"><a href="#code-top" className="flex items-center gap-2 font-mono text-sm"><span className="text-[#75d9d2]">&lt;</span>rizky.dev<span className="text-[#75d9d2]">/&gt;</span></a><div className="hidden items-center gap-7 font-mono text-xs text-[#7d9aa3] md:flex"><a href="#about">about()</a><a href="#stack">stack()</a><a href="#projects">projects()</a><a href="#contact">contact()</a></div><Code2 size={19} className="text-[#75d9d2] md:hidden" /></div></nav><main id="code-top" className="mx-auto max-w-6xl px-5"><section className="grid min-h-[760px] items-center gap-12 py-20 md:grid-cols-[1.1fr_.9fr] md:py-28"><div><p className="mb-7 font-mono text-xs text-[#75d9d2]">// RIZKY DEV / FULL-STACK WEB DEVELOPER</p><h1 className="max-w-3xl text-6xl font-semibold leading-[.9] tracking-[-.06em] md:text-8xl">Building digital experiences <span className="text-[#75d9d2]">through code.</span></h1><p className="mt-8 max-w-lg text-base leading-7 text-[#91aab2]">Saya merancang dan membangun produk web yang membantu orang menyelesaikan pekerjaan dengan lebih jelas.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#projects" className="rounded-md bg-[#75d9d2] px-5 py-3 text-sm font-semibold text-[#09131d]">Lihat proyek <ArrowUpRight className="ml-2 inline" size={15} /></a><ContactLink slug="programmer" label="Mulai diskusi" /></div></div><div className="code-card overflow-hidden rounded-xl border border-[#244052] shadow-2xl"><div className="flex items-center gap-2 border-b border-[#244052] px-4 py-3"><span className="h-2 w-2 rounded-full bg-[#ee5b44]" /><span className="h-2 w-2 rounded-full bg-[#e5bd5e]" /><span className="h-2 w-2 rounded-full bg-[#75d9d2]" /><span className="ml-3 font-mono text-[10px] text-[#708c96]">rizky-intro.tsx</span></div><div className="space-y-3 p-5 font-mono text-xs leading-6 text-[#8fa8af]"><p><span className="text-[#be8de4]">const</span> developer = &#123;</p><p className="pl-4"><span className="text-[#75d9d2]">name</span>: <span className="text-[#e6bd7c]">&quot;Rizky Dev&quot;</span>,</p><p className="pl-4"><span className="text-[#75d9d2]">focus</span>: [<span className="text-[#e6bd7c]">&quot;web&quot;</span>, <span className="text-[#e6bd7c]">&quot;systems&quot;</span>],</p><p className="pl-4"><span className="text-[#75d9d2]">available</span>: <span className="text-[#75d9d2]">true</span>,</p><p>&#125;;</p><p className="pt-4 text-[#75d9d2]">$ npm run build-better-things</p></div></div></section><section id="about" className="border-t border-[#203442] py-24"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-xs text-[#75d9d2]">01 / TENTANG ME</p><div><h2 className="max-w-3xl text-4xl font-medium leading-tight md:text-6xl">Kode yang baik memberi ruang untuk <span className="text-[#75d9d2]">tumbuh.</span></h2><p className="mt-8 max-w-2xl text-sm leading-7 text-[#91aab2]">Rizky Dev adalah contoh website portfolio untuk full-stack developer. Semua riwayat, proyek, dan kemampuan di halaman ini adalah data simulasi untuk kebutuhan showcase.</p></div></div></section><section id="stack" className="border-t border-[#203442] py-24"><div className="grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="font-mono text-xs text-[#75d9d2]">02 / TECH STACK</p><div className="flex flex-wrap gap-3">{stack.map(item => <span key={item} className="rounded-md border border-[#2a4b5d] bg-[#0e202e] px-4 py-3 font-mono text-sm text-[#b1c6ca] transition hover:border-[#75d9d2] hover:text-[#75d9d2]">{item}</span>)}</div></div></section><section id="projects" className="border-t border-[#203442] py-24"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><p className="font-mono text-xs text-[#75d9d2]">03 / FEATURED PROJECTS</p><h2 className="mt-4 text-5xl font-medium leading-none md:text-7xl">Selected builds<span className="text-[#75d9d2]">.</span></h2></div><div className="flex flex-wrap gap-2">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={`rounded-md border px-3 py-2 font-mono text-xs transition ${category === item ? "border-[#75d9d2] bg-[#75d9d2] text-[#09131d]" : "border-[#2a4b5d] text-[#91aab2] hover:border-[#75d9d2]"}`}>{item}</button>)}</div></div><div className="mt-12 grid gap-4 md:grid-cols-2">{filtered.map(project => <motion.button whileHover={{ y: -4 }} key={project.title} onClick={() => setSelected(project)} className="code-card group rounded-xl border border-[#203d4d] p-6 text-left"><div className="flex items-start justify-between"><span className="font-mono text-xs text-[#75d9d2]">./{project.code}</span><ExternalLink size={16} className="text-[#6c8790] transition group-hover:text-[#75d9d2]" /></div><h3 className="mt-16 text-2xl font-medium">{project.title}</h3><p className="mt-2 font-mono text-xs text-[#75d9d2]">{project.category}</p><p className="mt-5 max-w-md text-sm leading-6 text-[#91aab2]">{project.copy}</p></motion.button>)}</div></section><section className="border-t border-[#203442] py-24"><div className="grid gap-10 md:grid-cols-2"><div><p className="font-mono text-xs text-[#75d9d2]">04 / DEVELOPMENT WORKFLOW</p><h2 className="mt-4 max-w-xl text-5xl font-medium leading-none md:text-7xl">Ship with<br /><span className="text-[#75d9d2]">intention.</span></h2></div><div className="font-mono text-sm">{[["01", "Understand", "Menyusun masalah, tujuan, dan batasan sebelum menulis kode."], ["02", "Build", "Membuat fondasi yang jelas, lalu menguji bagian yang paling penting."], ["03", "Sempurnakan", "Memotong yang tidak perlu dan merapikan pengalaman sampai terasa pas."]].map(([no, title, copy]) => <div key={no} className="flex gap-5 border-t border-[#203442] py-5"><span className="text-[#75d9d2]">{no}</span><div><h3 className="font-sans text-lg font-semibold">{title}</h3><p className="mt-2 max-w-md font-sans text-sm leading-6 text-[#91aab2]">{copy}</p></div></div>)}</div></div></section><section id="contact" className="border-t border-[#203442] py-24 pb-44"><p className="font-mono text-xs text-[#75d9d2]">05 / CONTACT</p><h2 className="mt-5 max-w-4xl text-6xl font-medium leading-[.86] md:text-9xl">Have a useful problem?<br /><span className="text-[#75d9d2]">LetÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢s build.</span></h2><div className="mt-10 flex flex-wrap items-center gap-5"><ContactLink slug="programmer" label="Pesan template programmer" /><a href={`mailto:${businessConfig.email}`} className="font-mono text-sm text-[#91aab2] underline underline-offset-4">rizky@example.com</a></div></section></main>{selected && <AnimatePresence><div className="fixed inset-0 z-50 flex items-center justify-center bg-[#061019]/85 p-5" role="dialog" aria-modal="true" aria-label="Detail proyek" onClick={() => setSelected(null)}><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="code-card w-full max-w-lg rounded-xl border border-[#75d9d2]/40 p-7" onClick={event => event.stopPropagation()}><div className="flex items-start justify-between gap-5"><div><p className="font-mono text-xs text-[#75d9d2]">PROJECT_DETAIL / SIMULATION</p><h2 className="mt-3 text-3xl font-semibold">{selected.title}</h2></div><button aria-label="Tutup detail proyek" onClick={() => setSelected(null)}><X /></button></div><div className="mt-7 rounded-lg border border-[#2a4b5d] bg-[#09131d] p-5 font-mono text-xs leading-6 text-[#91aab2]"><p className="text-[#75d9d2]">$ cat ./{selected.code}/README.md</p><p className="mt-4">category: {selected.category}</p><p className="mt-2">status: demo simulation</p><p className="mt-2">focus: {selected.copy}</p></div><button onClick={() => setSelected(null)} className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#75d9d2] px-4 py-2 text-xs font-semibold text-[#09131d]">Close detail <Check size={14} /></button></motion.div></div></AnimatePresence>}<DemoModeBar slug="programmer" /></div>;
}

export default function InteractiveDemo({ slug }: { slug: InteractiveDemoSlug }) {
  return slug === "fotografer"
    ? <PhotographerDemo />
    : slug === "desainer"
      ? <DesignerDemo />
      : slug === "programmer"
        ? <ProgrammerDemo />
        : slug === "videografer"
        ? <AntiManusiaProjectDemo />
          : <ExtendedDemo slug={slug as ExtendedDemoSlug} />;
}








