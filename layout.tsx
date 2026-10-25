import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toast } from "@/components/toast";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VIBEON CREATIVE — Social Media Marketing Agency",
    template: "%s · VIBEON CREATIVE",
  },
  description:
    "VIBEON CREATIVE is a premium social media marketing agency in Armenia. Strategy, cinematic content, SMM packages and AI-powered production.",
  metadataBase: new URL("https://vibeoncreativemarketing.am"),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink font-sans text-white antialiased">
        <CartProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
