import ServicesHero from "@/components/sections/services/ServicesHero";
import ServiceShowcase from "@/components/sections/services/ServiceShowcase";
import HowWeWork from "@/components/sections/services/HowWeWork";
import WhyChooseUs from "@/components/sections/services/WhyChooseUs";
import ServicesCTA from "@/components/sections/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceShowcase />
      <HowWeWork />
      <WhyChooseUs />
      <ServicesCTA />
    </>
  );
}

