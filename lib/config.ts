export const businessConfig = {
  brandName: "pamerporto",
  brandMark: "pp/",
  whatsappNumber: "085254099133",
  email: "email-bisnis@contoh.com",
  instagramUrl: "https://instagram.com/",
  headline: "Portofolio website yang terasa seperti kamu.",
  serviceDescription:
    "Kami membantu kamu menyusun profil, pengalaman, dan karya menjadi website yang siap dibagikan.",
};

export type DemoSlug = "fresh-graduate" | "professional" | "creative";

export const demoMeta: Record<
  DemoSlug,
  { name: string; eyebrow: string; description: string; accent: string }
> = {
  "fresh-graduate": {
    name: "Fresh Graduate",
    eyebrow: "Clean · Focused",
    description:
      "Untuk mahasiswa dan lulusan baru yang ingin masuk ke dunia kerja dengan percaya diri.",
    accent: "blue",
  },
  professional: {
    name: "Professional",
    eyebrow: "Dark · Executive",
    description:
      "Untuk menata pengalaman, capaian, dan cara kerja dalam satu profil yang meyakinkan.",
    accent: "gold",
  },
  creative: {
    name: "Creative Portfolio",
    eyebrow: "Bold · Editorial",
    description:
      "Untuk menempatkan karya di depan, dengan cerita yang membuat orang ingin melihat lebih jauh.",
    accent: "lime",
  },
};

export function whatsappUrl(message: string) {
  if (!businessConfig.whatsappNumber)
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  const normalizedNumber = businessConfig.whatsappNumber.startsWith("0")
    ? `62${businessConfig.whatsappNumber.slice(1)}`
    : businessConfig.whatsappNumber;
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}
