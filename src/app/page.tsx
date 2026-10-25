import { ContactSection } from "@/components/contact-section";
import { FounderSection } from "@/components/founder-section";
import { Hero } from "@/components/hero";
import { PackagesSection } from "@/components/packages-section";
import { ServicesSection } from "@/components/services-section";
import { SmmAiSection } from "@/components/smm-ai-section";
import { SystemSection } from "@/components/system-section";
import { getPackages } from "@/lib/packages";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const packages = await getPackages();

  return (
    <main>
      <Hero />
      <PackagesSection packages={packages} />
      <SmmAiSection />
      <ServicesSection />
      <SystemSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}
