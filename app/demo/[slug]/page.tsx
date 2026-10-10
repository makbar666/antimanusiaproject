import { notFound } from "next/navigation";
import DemoExperience from "@/components/demo-experience";
import InteractiveDemo from "@/components/interactive-demos";
import type { DemoSlug } from "@/lib/config";
import type { InteractiveDemoSlug } from "@/lib/interactive-demos";

const legacySlugs: DemoSlug[] = ["fresh-graduate", "professional", "creative"];
const interactiveSlugs: InteractiveDemoSlug[] = ["fotografer", "desainer", "programmer", "videografer", "uiux-designer", "content-creator", "digital-marketer", "arsitek", "sales-marketing"];
const allSlugs = [...legacySlugs, ...interactiveSlugs];

export function generateStaticParams() { return allSlugs.map(slug => ({ slug })); }

export default function DemoPage({ params }: { params: { slug: string } }) {
  if (interactiveSlugs.includes(params.slug as InteractiveDemoSlug)) return <InteractiveDemo slug={params.slug as InteractiveDemoSlug} />;
  if (legacySlugs.includes(params.slug as DemoSlug)) return <DemoExperience slug={params.slug as DemoSlug} />;
  notFound();
}
