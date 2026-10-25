import { db } from "@/db";
import { packages, type Package } from "@/db/schema";
import { asc } from "drizzle-orm";
import type { PackageDTO } from "@/lib/types";

const SEED = [
  {
    slug: "start",
    name: "Start Package",
    tagline: "Essential presence for growing brands",
    description:
      "A focused monthly retainer that builds a consistent, professional social presence — content, design and page management, handled end to end.",
    priceUsd: 299,
    priceAmd: 120000,
    billingCycle: "month",
    features: [
      "8 posts",
      "4 Reels",
      "12 Stories",
      "Content planning",
      "Design",
      "Copywriting",
      "Page management",
    ],
    highlighted: false,
    sortOrder: 1,
  },
  {
    slug: "smm",
    name: "SMM Package",
    tagline: "Strategy, content and growth in one retainer",
    description:
      "Full social media management with strategy, professional design, production volume and a monthly performance report.",
    priceUsd: 499,
    priceAmd: 200000,
    billingCycle: "month",
    features: [
      "12 posts",
      "6 Reels",
      "20 Stories",
      "SMM strategy",
      "Professional design",
      "Copywriting",
      "Full page management",
      "Monthly report",
    ],
    highlighted: true,
    sortOrder: 2,
  },
  {
    slug: "premium-event",
    name: "Premium Event Package",
    tagline: "Cinematic coverage for launches and live moments",
    description:
      "A premium event content system — on-site capture, branded storytelling, targeted ads and a full analytics close-out.",
    priceUsd: 999,
    priceAmd: 400000,
    billingCycle: "event",
    features: [
      "Event identity & content system",
      "16 posts",
      "8 Reels",
      "30+ Stories",
      "On-site / event coverage",
      "Full SMM strategy",
      "Targeted advertising management",
      "Monthly analytics and report",
    ],
    highlighted: false,
    sortOrder: 3,
  },
];

function toDTO(row: Package): PackageDTO {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    priceUsd: row.priceUsd,
    priceAmd: row.priceAmd,
    billingCycle: row.billingCycle,
    features: row.features ?? [],
    highlighted: row.highlighted,
    sortOrder: row.sortOrder,
  };
}

export async function getPackages(): Promise<PackageDTO[]> {
  const existing = await db.select().from(packages).orderBy(asc(packages.sortOrder));
  if (existing.length === 0) {
    await db.insert(packages).values(SEED).onConflictDoNothing();
    const seeded = await db.select().from(packages).orderBy(asc(packages.sortOrder));
    return seeded.map(toDTO);
  }
  return existing.map(toDTO);
}

export async function getPackageById(id: number): Promise<PackageDTO | null> {
  const rows = await db.select().from(packages);
  const match = rows.find((row) => row.id === id);
  return match ? toDTO(match) : null;
}
