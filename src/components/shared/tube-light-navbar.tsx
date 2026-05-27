import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface TubeNavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: TubeNavItem[];
}

function isActivePath(currentPath: string, targetPath: string) {
  if (targetPath === "/") {
    return currentPath === "/";
  }

  return currentPath.startsWith(targetPath);
}

export function NavBar({ items }: NavBarProps) {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="relative rounded-full border border-border bg-bg-card/70 p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-transparent via-accent/15 to-transparent" />
        <div className="relative flex items-center gap-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(location.pathname, item.url);

            return (
              <Link
                key={item.url}
                to={item.url}
                className={`group relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                  active
                    ? "bg-accent text-black shadow-[0_0_22px_rgba(244,194,13,0.35)]"
                    : "text-text-secondary hover:bg-bg-card-hover hover:text-text-primary"
                }`}
              >
                <Icon size={14} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
