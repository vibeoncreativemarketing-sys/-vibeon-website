import type { MetadataRoute } from "next";
import { getPrimaryDomain } from "@/lib/domains";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const domain = await getPrimaryDomain();
  const baseUrl = `https://${domain}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
