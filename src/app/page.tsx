import type { Metadata } from "next";
import { AboutMasterSection } from "@/components/landing/AboutMasterSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { FloatingActions } from "@/components/landing/FloatingActions";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { KnowledgeSection } from "@/components/landing/KnowledgeSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { PrinciplesSection } from "@/components/landing/PrinciplesSection";
import { SampleReadingSection } from "@/components/landing/SampleReadingSection";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { MobileCtaBar } from "@/components/landing/MobileCtaBar";
import { homeJsonLd, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[52px] md:pt-20">
        <HeroSection />
        <ComparisonSection />
        <HowItWorksSection />
        <SampleReadingSection />
        <PricingSection />
        <AboutMasterSection />
        <PrinciplesSection />
        {/* Both render nothing until real content exists in src/content/. */}
        <TestimonialsSection />
        <KnowledgeSection />
        <FaqSection />
        <FinalCtaSection />
        <FloatingActions />
      </main>
      <MobileCtaBar />
      <SiteFooter />
      <ScrollReveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd()).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
