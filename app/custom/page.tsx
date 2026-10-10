"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ChevronLeft, ChevronRight, LayoutTemplate, Palette, PenLine } from "lucide-react";
import html2canvas from "html2canvas";
import { businessConfig, whatsappUrl } from "@/lib/config";

const accentOptions = [
  { label: "Coral", value: "#ee5b44" },
  { label: "Navy", value: "#173a62" },
  { label: "Sage", value: "#66806b" },
  { label: "Gold", value: "#b58a4a" },
];

const themeOptions = [
  { id: "clean", label: "Clean & profesional", description: "Rapi, terang, dan mudah dibaca." },
  { id: "editorial", label: "Bold editorial", description: "Lebih ekspresif untuk karya dan personal brand." },
  { id: "dark", label: "Dark premium", description: "Kontras, elegan, dan terasa lebih eksklusif." },
] as const;

const layoutOptions = [
  { id: "balanced", label: "Balanced", description: "Profil, karya, dan pengalaman seimbang." },
  { id: "visual", label: "Visual first", description: "Karya dan project menjadi fokus utama." },
  { id: "story", label: "Story led", description: "Cerita personal dan pengalaman lebih dominan." },
] as const;

const sectionOptions = ["Tentang saya", "Pengalaman", "Project / Karya", "Skill", "Kontak"];
const previewSlides = [
  { label: "Fotografer", name: "Arga Visuals", title: "Capturing moments.", color: "#8d735d" },
  { label: "Graphic Designer", name: "Nadia Creative", title: "Design speaks louder.", color: "#ed5b37" },
  { label: "Web Developer", name: "Rizky Dev", title: "Build useful things.", color: "#1e4258" },
  { label: "Videografer", name: "Karsa Motion", title: "Every frame has a feeling.", color: "#9a6947" },
  { label: "UI/UX Designer", name: "Maya Interface", title: "Make complex feel clear.", color: "#5b6ee1" },
  { label: "Content Creator", name: "Sora Content", title: "Ideas made to travel.", color: "#e76f51" },
  { label: "Digital Marketer", name: "Nala Growth", title: "Turn insight into momentum.", color: "#4f8b62" },
  { label: "Arsitek", name: "Atelier Ruang", title: "Space tells stories.", color: "#9a6f43" },
  { label: "Sales / Marketing", name: "Dimas Pratama", title: "Build trust. Grow well.", color: "#2d7580" },
];

export default function CustomPortfolioPage() {
  const [theme, setTheme] = useState<(typeof themeOptions)[number]["id"]>("clean");
  const [accent, setAccent] = useState(accentOptions[0].value);
  const [profileName, setProfileName] = useState("Nama Kamu");
  const [profileRole, setProfileRole] = useState("Your profession / your point of view");
  const [headline, setHeadline] = useState("A profile worth remembering.");
  const [bio, setBio] = useState("Ceritakan siapa kamu, apa yang kamu kerjakan, dan project yang ingin orang lihat.");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profilePhotoName, setProfilePhotoName] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % previewSlides.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = previewSlides[activeSlide];
  const changeSlide = (direction: number) => setActiveSlide((current) => (current + direction + previewSlides.length) % previewSlides.length);
  const [layout, setLayout] = useState<(typeof layoutOptions)[number]["id"]>("balanced");
  const [sections, setSections] = useState(sectionOptions);

  const selectedTheme = themeOptions.find((option) => option.id === theme)!;
  const selectedLayout = layoutOptions.find((option) => option.id === layout)!;
  const previewClass = theme === "dark" ? "bg-[#15191e] text-[#f4f0e8]" : theme === "editorial" ? "bg-[#f5f1e8] text-[#1b1d1b]" : "bg-[#f7faff] text-[#182d48]";
  const message = useMemo(
    () => `Halo kak, saya ingin membuat website portofolio custom untuk ${profileName || "nama saya"}. Profesi: ${profileRole || "belum ditentukan"}. Headline: ${headline || "belum ditentukan"}. Pilihan awal saya: gaya ${selectedTheme.label}, warna aksen ${accent}, layout ${selectedLayout.label}, section ${sections.join(", ") || "belum ditentukan"}, ${profilePhoto ? `saya juga sudah menyiapkan foto profil${profilePhotoName ? ` (${profilePhotoName})` : ""}` : "saya belum menyiapkan foto profil"}. Boleh konsultasi mengenai desain dan harganya?`,
    [accent, headline, profileName, profilePhoto, profilePhotoName, profileRole, sections, selectedLayout.label, selectedTheme.label],
  );

  const handleProfilePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePhoto(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
    setProfilePhotoName(file.name);
  };

  const capturePreview = async () => {
    if (!previewRef.current || isCapturing) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: Math.min(window.devicePixelRatio * 2, 3),
        useCORS: true,
        onclone: (clonedDocument) => {
          const capturedRules: string[] = [];
          for (const stylesheet of Array.from(clonedDocument.styleSheets)) {
            try {
              capturedRules.push(
                ...Array.from(stylesheet.cssRules).map((rule) => rule.cssText),
              );
            } catch {
              // External stylesheets can be blocked by browser security rules.
            }
          }

          const safeStyles = clonedDocument.createElement("style");
          safeStyles.textContent = capturedRules
            .join("\n")
            .replace(/oklch\([^)]*\)/gi, "rgb(128, 128, 128)")
            .replace(/oklab\([^)]*\)/gi, "rgb(128, 128, 128)")
            .replace(/color-mix\([^)]*\)/gi, "rgb(220, 220, 220)");

          clonedDocument
            .querySelectorAll('style, link[rel="stylesheet"]')
            .forEach((node) => {
              (node as HTMLStyleElement | HTMLLinkElement).disabled = true;
            });
          clonedDocument.head.appendChild(safeStyles);
        },
      });
      const link = document.createElement("a");
      link.download = "custom-portfolio-preview.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleSection = (section: string) => {
    setSections((current) => current.includes(section) ? current.filter((item) => item !== section) : [...current, section]);
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="catalog-nav">
        <div className="catalog-shell flex min-h-[72px] items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-black">
            <ArrowLeft size={16} /> Kembali ke katalog
          </Link>
          <span className="display text-xl font-bold tracking-[-.08em]">{businessConfig.brandMark}<span className="text-[var(--coral)]">.</span></span>
        </div>
      </header>

      <section className="catalog-shell grid gap-12 pb-16 pt-16 md:grid-cols-[.8fr_1.2fr] md:items-end md:pb-24 md:pt-24">
        <div>
          <p className="eyebrow mb-5 text-[var(--coral)]">CUSTOM PORTFOLIO BUILDER</p>
          <h1 className="display max-w-2xl text-[clamp(3rem,7vw,6rem)] font-semibold leading-[.9]">Rancang website yang terasa seperti kamu.</h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[var(--muted)]">Pilih arah visual dan isi yang ingin ditonjolkan. Ini adalah brief awal untuk memudahkan konsultasi, bukan batasan desain final.</p>
        </div>
        <div className="rounded-[3px] border border-stone-300 bg-[#fbfaf7] p-5 text-sm text-stone-500 md:p-7">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-4"><PenLine size={17} className="text-[var(--coral)]" /><span className="font-semibold text-stone-800">Cara kerjanya</span></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3"><div><span className="eyebrow text-stone-400">01</span><p className="mt-2">Pilih preferensi</p></div><div><span className="eyebrow text-stone-400">02</span><p className="mt-2">Lihat preview</p></div><div><span className="eyebrow text-stone-400">03</span><p className="mt-2">Kirim brief via WhatsApp</p></div></div>
        </div>
      </section>

      <section className="catalog-shell grid gap-8 pb-24 md:grid-cols-[.8fr_1.2fr] md:items-start">
        <div className="space-y-6">
          <div className="rounded-[3px] border border-stone-300 bg-[#fbfaf7] p-5 md:p-7"><div className="flex items-center gap-3"><PenLine size={18} className="text-[var(--coral)]" /><h2 className="font-semibold">Konten utama</h2></div><div className="mt-5 space-y-4"><label className="block text-xs font-semibold text-stone-600">Nama kamu<input value={profileName} onChange={(event) => setProfileName(event.target.value)} maxLength={40} className="mt-2 h-11 w-full rounded-[3px] border border-stone-300 bg-white px-3 text-sm font-normal outline-none focus:border-[var(--coral)]" placeholder="Contoh: Aditya Pratama" /></label><label className="block text-xs font-semibold text-stone-600">Profesi / label<input value={profileRole} onChange={(event) => setProfileRole(event.target.value)} maxLength={60} className="mt-2 h-11 w-full rounded-[3px] border border-stone-300 bg-white px-3 text-sm font-normal outline-none focus:border-[var(--coral)]" placeholder="Contoh: UI/UX Designer" /></label><label className="block text-xs font-semibold text-stone-600">Headline<textarea value={headline} onChange={(event) => setHeadline(event.target.value)} maxLength={100} rows={2} className="mt-2 w-full resize-y rounded-[3px] border border-stone-300 bg-white px-3 py-3 text-sm font-normal leading-6 outline-none focus:border-[var(--coral)]" placeholder="Headline utama portfolio" /></label><label className="block text-xs font-semibold text-stone-600">Deskripsi singkat<textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={220} rows={3} className="mt-2 w-full resize-y rounded-[3px] border border-stone-300 bg-white px-3 py-3 text-sm font-normal leading-6 outline-none focus:border-[var(--coral)]" placeholder="Ceritakan fokus dan keahlianmu" /></label></div></div>
          <div className="rounded-[3px] border border-stone-300 bg-[#fbfaf7] p-5 md:p-7"><div className="flex items-center gap-3"><Palette size={18} className="text-[var(--coral)]" /><h2 className="font-semibold">Gaya visual</h2></div><div className="mt-5 space-y-3">{themeOptions.map((option) => <button key={option.id} onClick={() => setTheme(option.id)} className={`block w-full rounded-[3px] border p-4 text-left transition ${theme === option.id ? "border-[var(--coral)] bg-[#fff3ef]" : "border-stone-200 hover:border-stone-400"}`}><span className="flex items-center justify-between font-semibold">{option.label}{theme === option.id && <Check size={16} className="text-[var(--coral)]" />}</span><span className="mt-1 block text-xs leading-5 text-stone-500">{option.description}</span></button>)}</div></div>
          <div className="rounded-[3px] border border-stone-300 bg-[#fbfaf7] p-5 md:p-7"><div className="flex items-center gap-3"><LayoutTemplate size={18} className="text-[var(--coral)]" /><h2 className="font-semibold">Struktur layout</h2></div><div className="mt-5 grid gap-3">{layoutOptions.map((option) => <button key={option.id} onClick={() => setLayout(option.id)} className={`rounded-[3px] border p-4 text-left transition ${layout === option.id ? "border-[var(--coral)] bg-[#fff3ef]" : "border-stone-200 hover:border-stone-400"}`}><span className="flex items-center justify-between font-semibold">{option.label}{layout === option.id && <Check size={16} className="text-[var(--coral)]" />}</span><span className="mt-1 block text-xs text-stone-500">{option.description}</span></button>)}</div></div>
          <div className="rounded-[3px] border border-stone-300 bg-[#fbfaf7] p-5 md:p-7"><h2 className="font-semibold">Warna aksen</h2><div className="mt-5 flex flex-wrap gap-3">{accentOptions.map((option) => <button key={option.value} onClick={() => setAccent(option.value)} aria-label={`Pilih warna ${option.label}`} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs ${accent === option.value ? "border-stone-800" : "border-stone-200"}`}><span className="h-4 w-4 rounded-full" style={{ backgroundColor: option.value }} />{option.label}</button>)}</div><div className="mt-5 flex items-center gap-3 border-t border-stone-200 pt-5"><label htmlFor="custom-accent" className="text-xs font-semibold text-stone-600">Pilih warna sendiri</label><input id="custom-accent" type="color" value={accent} onChange={(event) => setAccent(event.target.value)} className="h-10 w-14 cursor-pointer rounded border border-stone-300 bg-white p-1" /><code className="text-xs text-stone-500">{accent.toUpperCase()}</code></div></div>
          <div className="rounded-[3px] border border-stone-300 bg-[#fbfaf7] p-5 md:p-7"><div className="flex items-center justify-between gap-4"><div><h2 className="font-semibold">Foto profil</h2><p className="mt-1 text-xs leading-5 text-stone-500">Preview lokal saja, tidak dikirim ke server.</p></div>{profilePhoto && <button onClick={() => { setProfilePhoto(null); setProfilePhotoName(""); }} className="text-xs font-semibold text-[var(--coral)] underline underline-offset-4">Hapus</button>}</div><label htmlFor="profile-photo" className="mt-5 flex min-h-[92px] cursor-pointer items-center gap-4 rounded-[3px] border border-dashed border-stone-300 p-4 transition hover:border-[var(--coral)]">{profilePhoto ? <img src={profilePhoto} alt="Preview foto profil" className="h-16 w-16 rounded-full object-cover" /> : <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-xs text-stone-400">Foto</span>}<span><span className="block text-sm font-semibold">{profilePhotoName || "Tambah foto profil"}</span><span className="mt-1 block text-xs text-stone-500">JPG, PNG, atau WebP. Maksimal 5 MB disarankan.</span></span></label><input id="profile-photo" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleProfilePhoto} className="sr-only" /></div>
          <div className="rounded-[3px] border border-stone-300 bg-[#fbfaf7] p-5 md:p-7"><h2 className="font-semibold">Section yang ingin ditampilkan</h2><div className="mt-5 grid grid-cols-2 gap-3">{sectionOptions.map((section) => <button key={section} onClick={() => toggleSection(section)} className={`rounded-[3px] border px-3 py-3 text-left text-xs transition ${sections.includes(section) ? "border-[var(--coral)] bg-[#fff3ef] font-semibold" : "border-stone-200 text-stone-500"}`}><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: sections.includes(section) ? accent : "#d8d3c9" }} />{section}</button>)}</div></div>
        </div>

        <div className="sticky top-24">
          <div className="mb-4 flex items-center justify-between"><div><p className="eyebrow text-[var(--coral)]">LIVE PREVIEW</p><p className="mt-2 text-sm text-stone-500">Preview awal berdasarkan pilihanmu.</p></div><span className="text-xs text-stone-400">{selectedLayout.label}</span></div>
          <div ref={previewRef} className={`relative overflow-hidden rounded-[3px] border border-stone-300 shadow-[10px_10px_0_#d9d1c5] ${previewClass}`} style={{ "--preview-accent": accent } as CSSProperties}>
            {profilePhoto && <img src={profilePhoto} alt="Foto profil pada preview" className="absolute right-5 top-16 z-10 h-14 w-14 rounded-full border-2 border-white/80 object-cover shadow-md" />}
            <div className="flex items-center justify-between border-b border-current/10 px-5 py-4 text-xs"><span className="font-semibold">{profileName || "Nama Kamu"}<span style={{ color: accent }}>.</span></span><span className="hidden gap-4 opacity-60 sm:flex">About&nbsp;&nbsp; Work&nbsp;&nbsp; Contact</span><span className="rounded-full px-3 py-1 text-[10px]" style={{ backgroundColor: `${accent}20`, color: accent }}>Portfolio</span></div>
            <div className={`grid gap-8 p-6 md:p-10 ${layout === "visual" ? "md:grid-cols-[.7fr_1.3fr]" : layout === "story" ? "md:grid-cols-1" : "md:grid-cols-[1.1fr_.9fr]"}`}><div><p className="eyebrow" style={{ color: accent }}>{profileRole || "YOUR PROFESSION / YOUR POINT OF VIEW"}</p><h2 className="mt-5 text-4xl font-semibold leading-[.92] tracking-[-.06em] md:text-6xl">{headline || "A profile worth remembering."}</h2><p className="mt-5 max-w-md text-sm leading-6 opacity-60">{bio || "Ceritakan siapa kamu, apa yang kamu kerjakan, dan project yang ingin orang lihat."}</p><div className="mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: accent }}>Let&apos;s connect <ArrowUpRight size={13} /></div></div><div className="relative flex min-h-[220px] items-end overflow-hidden p-5 text-white" style={{ background: `linear-gradient(145deg, ${currentSlide.color}, ${accent}99)` }}><div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 75% 25%, ${accent}, transparent 36%)` }} /><div className="relative w-full"><div className="flex items-center justify-between"><span className="eyebrow text-white/75">LIVE PREVIEW / {String(activeSlide + 1).padStart(2, "0")}</span><span className="text-xs text-white/60">{currentSlide.label}</span></div><p className="mt-3 max-w-[250px] text-3xl font-semibold leading-none">{currentSlide.title}</p><div className="mt-6 flex items-center justify-between"><span className="text-xs text-white/65">{currentSlide.name}</span><span className="flex gap-1"><button onClick={() => changeSlide(-1)} aria-label="Contoh sebelumnya" className="rounded-full border border-white/40 p-2 transition hover:bg-white/15"><ChevronLeft size={14} /></button><button onClick={() => changeSlide(1)} aria-label="Contoh berikutnya" className="rounded-full border border-white/40 p-2 transition hover:bg-white/15"><ChevronRight size={14} /></button></span></div></div></div></div>
            <div className="grid gap-3 border-t border-current/10 p-6 sm:grid-cols-2 md:grid-cols-3">{sections.length > 0 ? sections.slice(0, 3).map((section) => <div key={section} className="border-t border-current/10 pt-3 text-sm"><span className="eyebrow opacity-50">SECTION</span><p className="mt-2 font-semibold">{section}</p></div>) : <p className="text-sm opacity-60">Pilih section untuk melengkapi preview.</p>}</div>
          </div>
          <div className="mt-8 rounded-[3px] border border-stone-300 bg-[#fbfaf7] p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">Suka arah desain ini?</p><p className="mt-1 text-xs text-stone-500">Simpan preview atau kirim pilihan awalmu untuk dibahas bersama.</p></div><div className="flex flex-col gap-2 sm:flex-row"><button onClick={capturePreview} disabled={isCapturing} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-[var(--coral)] hover:text-[var(--coral)] disabled:cursor-wait disabled:opacity-60">{isCapturing ? "Menyiapkan..." : "Capture preview"} <ArrowUpRight size={16} /></button><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#151515] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--coral)]">Pesan custom sekarang <ArrowUpRight size={16} /></a></div></div><div className="mt-5 grid gap-3 border-t border-stone-200 pt-4 text-xs text-stone-500 sm:grid-cols-3"><span>Gaya: <strong className="text-stone-800">{selectedTheme.label}</strong></span><span>Layout: <strong className="text-stone-800">{selectedLayout.label}</strong></span><span>Foto profil: <strong className="text-stone-800">{profilePhoto ? "Sudah ditambahkan" : "Belum ditambahkan"}</strong></span></div></div>
        </div>
      </section>
    </main>
  );
}
