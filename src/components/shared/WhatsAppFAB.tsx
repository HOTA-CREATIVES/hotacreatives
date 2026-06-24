import { socialLinks } from "@/constants";

export default function WhatsAppFAB() {
  return (
    <a
      href={socialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-bg-card/95 px-3 py-2 text-text-primary shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      aria-label="Chat on WhatsApp"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-inner shadow-black/20 transition-colors duration-300 group-hover:bg-[#20BD5A]">
        <i className="fa-brands fa-whatsapp text-xl"></i>
      </span>
      <span className="hidden sm:inline text-sm font-semibold tracking-wide text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
        Chat
      </span>
    </a>
  );
}
