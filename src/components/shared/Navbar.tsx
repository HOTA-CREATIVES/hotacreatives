import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BriefcaseBusiness,
  FileText,
  Home,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { NavBar as TubeLightNavBar } from "@/components/shared/tube-light-navbar";

const logoImage =
  "https://res.cloudinary.com/diiyy6bar/image/upload/v1775361777/WhatsApp_Image_2026-03-17_at_9.07.36_PM-removebg-preview_xvv4dn.png";

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Services", path: "/services", icon: BriefcaseBusiness },
  // { name: "Packages", path: "/packages" },
  { name: "Portfolio", path: "/portfolio", icon: BriefcaseBusiness },
  { name: "Blog", path: "/blog", icon: FileText },
  { name: "Contact", path: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="HOTA logo"
              className="h-15 w-50 rounded-full md:h-10"
            />
          </Link>

          <TubeLightNavBar
            items={navLinks.map((link) => ({
              name: link.name,
              url: link.path,
              icon: link.icon,
            }))}
          />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-bg-secondary border-b border-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium transition-colors duration-300 hover:text-accent ${
                  link.path === "/"
                    ? location.pathname === "/"
                      ? "text-accent"
                      : "text-text-secondary"
                    : location.pathname.startsWith(link.path)
                      ? "text-accent"
                      : "text-text-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/free-audit"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-accent hover:bg-accent-hover text-black font-bold text-sm px-6 py-3 rounded-full transition-all duration-300"
            >
              Free Audit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
