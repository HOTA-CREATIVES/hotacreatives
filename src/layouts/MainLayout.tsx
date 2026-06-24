import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WhatsAppFAB from "@/components/shared/WhatsAppFAB";
import CustomCursor from "@/components/shared/CustomCursor";
import PageTransition from "@/components/shared/PageTransition";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

export default function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Force scroll to top on page mount/transition
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <CustomCursor />
      <Navbar />
      <main className="flex-1 pt-20 flex flex-col">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
