import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VIBEON CREATIVE — Marketing Agency",
    short_name: "VIBEON",
    description:
      "Premium social media marketing agency in Armenia. Strategy, content, SMM packages & AI production.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#f1272d",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
