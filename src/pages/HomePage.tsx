import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SignatureProject from "@/components/sections/SignatureProject";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import FeatureSpotlight from "@/components/sections/FeatureSpotlight";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SignatureProject />
      <PortfolioPreview />
      <FeatureSpotlight />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
