import { useState } from "react";

interface NewsletterCTAProps {
  variant?: "inline" | "slide";
}

export default function NewsletterCTA({
  variant = "inline",
}: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Integrate with newsletter backend
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (variant === "slide") {
    return (
      <div className="fixed bottom-6 right-6 z-30 max-w-sm w-full p-6 bg-bg-card border border-border rounded-2xl shadow-2xl shadow-black/40 animate-fade-in-up">
        <p className="text-lg font-bold text-text-primary mb-1">
          Stay in the loop
        </p>
        <p className="text-sm text-text-secondary mb-4">
          Get the latest insights on branding, marketing, and growth — delivered
          to your inbox.
        </p>
        {submitted ? (
          <p className="text-accent font-semibold text-sm">
            Thanks for subscribing! 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 bg-bg-secondary border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-all duration-300"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-accent text-black font-bold text-sm rounded-lg hover:bg-accent-hover transition-all duration-300 cursor-pointer"
            >
              <i className="fa-regular fa-paper-plane"></i>
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="my-12 p-8 bg-bg-card border border-border rounded-2xl text-center">
      <p className="text-xl font-bold text-text-primary mb-2">
        Get insights like this in your inbox
      </p>
      <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
        Join our newsletter for actionable branding, marketing, and growth
        strategies — no fluff, just value.
      </p>
      {submitted ? (
        <p className="text-accent font-semibold">
          You're in! Check your inbox for a welcome email. 🎉
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-5 py-3 bg-bg-secondary border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-all duration-300"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-black font-bold text-sm rounded-xl hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            Subscribe
            <i className="fa-regular fa-paper-plane text-xs"></i>
          </button>
        </form>
      )}
    </div>
  );
}
