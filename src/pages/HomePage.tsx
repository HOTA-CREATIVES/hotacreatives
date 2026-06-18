import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
// import PackagesPreview from "@/components/sections/PackagesPreview";
import CTASection from "@/components/sections/CTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
// import { SEO } from "@/components";

export default function HomePage() {
  return (
    <>
      {/* SEO removed */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      {/* <PackagesPreview /> */}
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
