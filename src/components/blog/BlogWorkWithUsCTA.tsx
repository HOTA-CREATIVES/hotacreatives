import { Link } from "react-router-dom";

/**
 * "Work with us" CTA component shown at the end of every blog article.
 */
export default function BlogWorkWithUsCTA() {
  return (
    <div className="mt-12 p-8 sm:p-10 rounded-2xl border border-border bg-gradient-to-br from-bg-card to-bg-secondary text-center relative overflow-hidden">
      {/* Decorative accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-black text-text-primary mb-3">
          Ready to grow your brand?
        </h3>
        <p className="text-text-secondary max-w-lg mx-auto mb-6">
          Let's talk about how we can position your brand for dominance — not
          just existence. Free strategy consultation included.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 group"
        >
          Work with Us
          <i className="fa-solid fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </div>
  );
}