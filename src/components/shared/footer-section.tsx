import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { contact, socialLinks } from "@/constants";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const services = [
  "Social Media Management",
  "Content Creation",
  "Brand Positioning",
  "Performance Marketing",
  "Video Production",
];

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg-secondary text-text-primary">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />

      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-accent">
              HOTA
            </h2>
            <p className="mb-6 text-text-secondary">
              We Don&apos;t Post. We Position. India&apos;s creative growth
              agency for brands that want to dominate, not just exist.
            </p>
            <form
              className="relative"
              onSubmit={(event) => event.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email for updates"
                className="h-11 rounded-full border-border bg-bg-card pr-12 text-text-primary placeholder:text-text-muted"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full bg-accent text-black transition-transform hover:scale-105 hover:bg-accent-hover"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-text-secondary transition-colors hover:text-accent"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <address className="space-y-2 text-sm not-italic">
              {services.map((service) => (
                <p key={service} className="text-text-secondary">
                  {service}
                </p>
              ))}
            </address>
          </div>

          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Get in Touch</h3>
            <div className="mb-6 space-y-3 text-sm text-text-secondary">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
              <a
                href={`tel:+${contact.phoneRaw}`}
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4" />
                {contact.phone}
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {contact.locationShort}
              </p>
            </div>

            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-border bg-bg-card hover:bg-accent/10"
                      asChild
                    >
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{socialLinks.instagramHandle}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-border bg-bg-card hover:bg-accent/10"
                      asChild
                    >
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{socialLinks.linkedinName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-text-muted">
            © {currentYear} Hota Creative Growth Agency. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-accent">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              Terms of Service
            </a>
            <Link
              to="/free-audit"
              className="transition-colors hover:text-accent"
            >
              Free Audit
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
