import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NavDropdown } from "@/components/shared/nav-dropdown";

const logoImage =
  "https://res.cloudinary.com/diiyy6bar/image/upload/v1775361777/WhatsApp_Image_2026-03-17_at_9.07.36_PM-removebg-preview_xvv4dn.png";

function isActivePath(currentPath: string, targetPath: string) {
  if (targetPath === "/") {
    return currentPath === "/";
  }
  return currentPath.startsWith(targetPath);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const servicesItems = [
    {
      name: "Social Media Management",
      description: "Build a loyal brand community and consistent growth.",
      url: "/services",
      icon: "fa-solid fa-bullhorn",
      state: { serviceId: "social-media" },
    },
    {
      name: "Content Creation",
      description: "Produce audience-first creative that people remember.",
      url: "/services",
      icon: "fa-solid fa-pen-nib",
      state: { serviceId: "content-creation" },
    },
    {
      name: "Performance Marketing",
      description: "Paid campaigns with structured testing and optimization.",
      url: "/services",
      icon: "fa-solid fa-chart-line",
      state: { serviceId: "performance" },
    },
    {
      name: "Brand Identity & Design",
      description: "Visual systems to make your brand recognizable and premium.",
      url: "/services",
      icon: "fa-solid fa-palette",
      state: { serviceId: "brand-identity" },
    },
    {
      name: "Video Production",
      description: "Platform-ready videos designed for retention and trust.",
      url: "/services",
      icon: "fa-solid fa-video",
      state: { serviceId: "video-production" },
    },
    {
      name: "Website & Funnel Design",
      description: "Conversion-first web journeys to turn traffic into action.",
      url: "/services",
      icon: "fa-solid fa-globe",
      state: { serviceId: "website-funnel" },
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-20">
          {/* Logo - Left aligned */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="HOTA logo"
                className="h-12 w-auto md:h-10 object-contain rounded-full"
              />
            </Link>
          </div>

          {/* Centered Navigation Menu - Desktop only */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative rounded-full border border-border bg-bg-card/70 p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-transparent via-accent/15 to-transparent" />
              <div className="relative flex items-center gap-1.5">
                {/* Home Link */}
                <Link
                  to="/"
                  className={`group relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    location.pathname === "/"
                      ? "bg-accent text-black shadow-[0_0_22px_rgba(244,194,13,0.35)]"
                      : "text-text-secondary hover:bg-bg-card-hover hover:text-text-primary"
                  }`}
                >
                  <i className="fa-solid fa-house text-[14px]"></i>
                  <span>Home</span>
                </Link>

                {/* Services Dropdown */}
                <NavDropdown
                  label="Services"
                  url="/services"
                  items={servicesItems}
                  isActive={isActivePath(location.pathname, "/services")}
                  columns={2}
                />

                {/* Portfolio Link */}
                <Link
                  to="/portfolio"
                  className={`group relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    isActivePath(location.pathname, "/portfolio")
                      ? "bg-accent text-black shadow-[0_0_22px_rgba(244,194,13,0.35)]"
                      : "text-text-secondary hover:bg-bg-card-hover hover:text-text-primary"
                  }`}
                >
                  <i className="fa-solid fa-briefcase text-[14px]"></i>
                  <span>Portfolio</span>
                </Link>

                {/* Blog Link */}
                <Link
                  to="/blog"
                  className={`group relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    isActivePath(location.pathname, "/blog")
                      ? "bg-accent text-black shadow-[0_0_22px_rgba(244,194,13,0.35)]"
                      : "text-text-secondary hover:bg-bg-card-hover hover:text-text-primary"
                  }`}
                >
                  <i className="fa-solid fa-book-open text-[14px]"></i>
                  <span>Blog</span>
                </Link>

                {/* Contact Link */}
                <Link
                  to="/contact"
                  className={`group relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    isActivePath(location.pathname, "/contact")
                      ? "bg-accent text-black shadow-[0_0_22px_rgba(244,194,13,0.35)]"
                      : "text-text-secondary hover:bg-bg-card-hover hover:text-text-primary"
                  }`}
                >
                  <i className="fa-solid fa-phone text-[14px]"></i>
                  <span>Contact</span>
                </Link>
              </div>
            </div>
          </div>

          {/* CTA & Mobile Toggle - Right aligned */}
          <div className="flex justify-end items-center gap-4">
            <Link
              to="/free-audit"
              className="hidden md:inline-flex bg-accent hover:bg-accent-hover text-black font-bold text-xs px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(244,194,13,0.2)] hover:scale-105"
            >
              Free Audit
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-text-primary p-2 hover:bg-white/5 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <i className="fa-solid fa-xmark text-xl"></i> : <i className="fa-solid fa-bars text-xl"></i>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-bg-secondary border-b border-border"
          >
            <div className="px-6 py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium py-1 transition-colors duration-300 hover:text-accent ${
                  location.pathname === "/" ? "text-accent" : "text-text-secondary"
                }`}
              >
                Home
              </Link>

              {/* Services Collapsible Accordion */}
              <div className="space-y-1">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between text-lg font-medium py-1 transition-colors duration-300 hover:text-accent ${
                    isActivePath(location.pathname, "/services")
                      ? "text-accent"
                      : "text-text-secondary"
                  }`}
                >
                  <span>Services</span>
                  {mobileServicesOpen ? (
                    <i className="fa-solid fa-chevron-up text-sm"></i>
                  ) : (
                    <i className="fa-solid fa-chevron-down text-sm"></i>
                  )}
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 mt-1 space-y-2.5 border-l border-border/60"
                    >
                      {servicesItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            setIsOpen(false);
                            navigate(item.url, { state: item.state });
                          }}
                          className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent py-1.5 w-full text-left transition-colors"
                        >
                          {item.icon && <i className={`${item.icon} text-accent text-xs`}></i>}
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Portfolio */}
              <Link
                to="/portfolio"
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium py-1 transition-colors duration-300 hover:text-accent ${
                  isActivePath(location.pathname, "/portfolio")
                    ? "text-accent"
                    : "text-text-secondary"
                }`}
              >
                Portfolio
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium py-1 transition-colors duration-300 hover:text-accent ${
                  isActivePath(location.pathname, "/blog")
                    ? "text-accent"
                    : "text-text-secondary"
                }`}
              >
                Blog
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium py-1 transition-colors duration-300 hover:text-accent ${
                  isActivePath(location.pathname, "/contact")
                    ? "text-accent"
                    : "text-text-secondary"
                }`}
              >
                Contact
              </Link>

              {/* Free Audit Button */}
              <div className="pt-2">
                <Link
                  to="/free-audit"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-accent hover:bg-accent-hover text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(244,194,13,0.15)]"
                >
                  Free Audit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
