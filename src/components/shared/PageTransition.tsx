import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const logoImage =
  "https://res.cloudinary.com/diiyy6bar/image/upload/v1775361777/WhatsApp_Image_2026-03-17_at_9.07.36_PM-removebg-preview_xvv4dn.png";

const curtainVariants = {
  initial: {
    top: "100%",
  },
  animate: {
    top: ["100%", "0%", "0%", "-100%"],
    transition: {
      duration: 1.6,
      times: [0, 0.45, 0.75, 1.2],
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
  exit: {
    top: "100%",
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  },
};

const logoVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  animate: {
    opacity: [0, 1, 1, 0],
    scale: [0.8, 1, 1.05, 0.9],
    y: [10, 0, 0, -10],
    transition: {
      duration: 1.6,
      times: [0.15, 0.4, 0.75, 1.05],
      ease: "easeInOut" as const,
    },
  },
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      <motion.div
        className="fixed left-0 w-full h-full z-50 flex items-center justify-center bg-bg-secondary"
        variants={curtainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          boxShadow: "0 0 100px rgba(244, 194, 13, 0.15)",
        }}
      >
        <motion.div
          className="flex flex-col items-center gap-6"
          variants={logoVariants}
        >
          <img
            src={logoImage}
            alt="HOTA logo"
            className="h-28 w-auto object-contain rounded-full border border-accent/20 p-2 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(244,194,13,0.15)]"
          />
          <h2 className="text-xl font-black uppercase tracking-[0.3em] text-accent text-center">
            Hota Creatives
          </h2>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </>
  );
}
