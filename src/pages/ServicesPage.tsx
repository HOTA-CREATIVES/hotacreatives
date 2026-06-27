import ServicesHero from "@/components/sections/services/ServicesHero";
import ServiceShowcase from "@/components/sections/services/ServiceShowcase";
import HowWeWork from "@/components/sections/services/HowWeWork";
import WhyChooseUs from "@/components/sections/services/WhyChooseUs";
import GrowthCalculator from "@/components/sections/services/GrowthCalculator";
import ServicesCTA from "@/components/sections/services/ServicesCTA";
import { useSEO } from "@/components/shared/SEO";

export default function ServicesPage() {
  useSEO({
    title: "Our Services — Strategic Growth & Repositioning",
    description:
      "Explore HOTA's comprehensive growth systems. We offer social media management, premium content creation, ROAS-driven performance marketing, visual brand design, and conversion-optimized websites.",
    keywords:
      "social media management India, performance marketing agency, luxury brand design, content creation services, landing page conversion, digital growth stack",
    canonicalUrl: "https://hotacreatives.in/services",
  });

  return (
    <>
      <ServicesHero />
      <ServiceShowcase />
      <HowWeWork />
      <WhyChooseUs />
      <GrowthCalculator />
      <ServicesCTA />
    </>
  );
}

