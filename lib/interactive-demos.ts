export type InteractiveDemoSlug =
  | "fotografer"
  | "desainer"
  | "programmer"
  | "videografer"
  | "uiux-designer"
  | "content-creator"
  | "digital-marketer"
  | "arsitek"
  | "sales-marketing";

export const interactiveDemoMeta: Record<InteractiveDemoSlug, { name: string; person: string; description: string; tag: string }> = {
  fotografer: {
    name: "Fotografer",
    person: "Arga Visuals",
    description: "Cerita visual yang tenang, personal, dan terasa dekat.",
    tag: "Dark cinematic",
  },
  desainer: {
    name: "Graphic Designer",
    person: "Nadia Creative",
    description: "Identitas, sistem, dan ide yang punya suara sendiri.",
    tag: "Bold editorial",
  },
  programmer: {
    name: "Web Developer",
    person: "Rizky Dev",
    description: "Produk digital yang dibangun dengan struktur dan rasa ingin tahu.",
    tag: "Technical premium",
  },
  videografer: {
    name: "Videografer",
    person: "Karsa Motion",
    description: "Showreel, cerita, dan produksi video dalam satu pengalaman sinematik.",
    tag: "Cinematic motion",
  },
  "uiux-designer": {
    name: "UI/UX Designer",
    person: "Maya Interface",
    description: "Case study produk digital dengan fokus pada alur, empati, dan sistem visual.",
    tag: "Product thinking",
  },
  "content-creator": {
    name: "Content Creator",
    person: "Sora Content",
    description: "Tampilkan ide, format konten, dan proses kreatif dalam satu ruang personal.",
    tag: "Editorial social",
  },
  "digital-marketer": {
    name: "Digital Marketer",
    person: "Nala Growth",
    description: "Profil strategis untuk campaign, insight audiens, dan eksperimen pertumbuhan.",
    tag: "Growth strategy",
  },
  arsitek: {
    name: "Arsitek",
    person: "Atelier Ruang",
    description: "Presentasikan gagasan ruang, proses desain, dan proyek arsitektur secara terkurasi.",
    tag: "Spatial editorial",
  },
  "sales-marketing": {
    name: "Sales / Marketing",
    person: "Dimas Pratama",
    description: "Profil profesional untuk menunjukkan pencapaian, pendekatan, dan relasi bisnis.",
    tag: "Commercial profile",
  },
};

export const demoCategories = Object.entries(interactiveDemoMeta).map(([slug, data]) => ({ slug: slug as InteractiveDemoSlug, ...data }));
