import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

export interface NavDropdownItem {
  name: string;
  description?: string;
  url: string;
  icon?: LucideIcon;
  state?: Record<string, unknown>;
}

interface NavDropdownProps {
  label: string;
  url: string;
  items: NavDropdownItem[];
  isActive: boolean;
  columns?: 1 | 2;
}

export function NavDropdown({
  label,
  url,
  items,
  isActive,
  columns = 1,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // slight delay to prevent accidental closing
  };

  const handleItemClick = (item: NavDropdownItem) => {
    setIsOpen(false);
    navigate(item.url, { state: item.state });
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Link/Trigger */}
      <Link
        to={url}
        className={`group relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
          isActive
            ? "bg-accent text-black shadow-[0_0_22px_rgba(244,194,13,0.35)] font-black"
            : "text-text-secondary hover:bg-bg-card-hover hover:text-text-primary"
        }`}
      >
        <span>{label}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } ${isActive ? "text-black" : "text-text-secondary group-hover:text-text-primary"}`}
        />
      </Link>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 rounded-2xl border border-border bg-bg-card/95 backdrop-blur-2xl p-4 shadow-[0_24px_50px_rgba(0,0,0,0.6)] ${
              columns === 2 ? "w-[480px] sm:w-[540px]" : "w-[240px]"
            }`}
          >
            {/* Decorative Top Arrow/Glow Indicator */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l border-border bg-bg-card" />

            {/* Dropdown Grid */}
            <div
              className={`relative z-10 grid gap-2 ${
                columns === 2 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.url + JSON.stringify(item.state || {})}
                    onClick={() => handleItemClick(item)}
                    className="flex text-left items-start gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-border/30 transition-all duration-200 group/item"
                  >
                    {Icon && (
                      <div className="flex items-center justify-center p-2 rounded-lg bg-accent/10 text-accent group-hover/item:bg-accent group-hover/item:text-black transition-all duration-300 shrink-0">
                        <Icon size={16} />
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-black text-text-primary group-hover/item:text-accent transition-colors duration-200">
                        {item.name}
                      </div>
                      {item.description && (
                        <div className="text-[10px] text-text-secondary leading-relaxed mt-1 line-clamp-2">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
