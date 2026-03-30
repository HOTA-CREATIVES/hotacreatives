import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, UserCircle2 } from "lucide-react";
import { ROUTES } from "@/routes";
import { Button } from "@/components/base/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/card";
import { cn } from "@/lib/utils";

export type AdminSidebarSection = "posts" | "authors" | "categories" | "tags";

type AdminSidebarItem = {
  key: AdminSidebarSection;
  label: string;
  count?: number;
};

type AdminSidebarProps = {
  items?: AdminSidebarItem[];
  activeSection?: AdminSidebarSection;
  activePage: "dashboard" | "profile";
  onSectionChange?: (section: AdminSidebarSection) => void;
  onLogout: () => void | Promise<void>;
};

export default function AdminSidebar({
  items,
  activeSection,
  activePage,
  onSectionChange,
  onLogout,
}: AdminSidebarProps) {
  return (
    <aside className="space-y-4">
      <Card className="border-border/80 bg-bg-secondary/85">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-black uppercase tracking-[0.18em] text-text-muted">
            HOTA Admin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            asChild
            variant={activePage === "dashboard" ? "default" : "outline"}
            className={cn(
              "w-full justify-start rounded-xl",
              activePage === "dashboard"
                ? "bg-accent text-black hover:bg-accent/90"
                : "border-border bg-transparent text-text-secondary hover:border-accent",
            )}
          >
            <Link to={ROUTES.ADMIN_BLOGS}>
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant={activePage === "profile" ? "default" : "outline"}
            className={cn(
              "w-full justify-start rounded-xl",
              activePage === "profile"
                ? "bg-accent text-black hover:bg-accent/90"
                : "border-border bg-transparent text-text-secondary hover:border-accent",
            )}
          >
            <Link to={ROUTES.ADMIN_PROFILE}>
              <UserCircle2 size={16} />
              Profile
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full justify-start rounded-xl border-border">
            <Link to={ROUTES.BLOG}>Public Blog</Link>
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="w-full justify-start rounded-xl"
            onClick={onLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </CardContent>
      </Card>

      {items && items.length > 0 && onSectionChange && activeSection && (
        <Card className="border-border/80 bg-bg-secondary/85">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-black uppercase tracking-[0.18em] text-text-muted">
              CMS Sections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <nav aria-label="Admin sections" className="space-y-2">
              {items.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <Button
                    key={item.key}
                    type="button"
                    variant={isActive ? "default" : "outline"}
                    className={cn(
                      "w-full justify-between rounded-xl",
                      isActive
                        ? "bg-accent text-black hover:bg-accent/90"
                        : "border-border bg-transparent text-text-secondary hover:border-accent hover:text-text-primary",
                    )}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => onSectionChange(item.key)}
                  >
                    <span>{item.label}</span>
                    {typeof item.count === "number" && (
                      <span className="rounded-md bg-black/15 px-2 py-0.5 text-xs">
                        {item.count}
                      </span>
                    )}
                  </Button>
                );
              })}
            </nav>
          </CardContent>
        </Card>
      )}
    </aside>
  );
}
