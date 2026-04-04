import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  LogOut,
  Settings2,
  SquarePen,
  Users,
  UserCircle2,
} from "lucide-react";
import { ROUTES } from "@/routes";
import { Button } from "@/components/base/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/base/sidebar";
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
  activePage: "dashboard" | "content" | "profile" | "settings" | "users";
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
  const primaryItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      to: ROUTES.ADMIN_DASHBOARD,
      icon: <LayoutDashboard size={16} />,
    },
    {
      key: "content",
      label: "Content CMS",
      to: ROUTES.ADMIN_BLOGS,
      icon: <SquarePen size={16} />,
    },
    {
      key: "profile",
      label: "Profile",
      to: ROUTES.ADMIN_PROFILE,
      icon: <UserCircle2 size={16} />,
    },
    {
      key: "settings",
      label: "Settings",
      to: ROUTES.ADMIN_SETTINGS,
      icon: <Settings2 size={16} />,
    },
    {
      key: "users",
      label: "Users",
      to: ROUTES.ADMIN_USERS,
      icon: <Users size={16} />,
    },
  ] as const;

  return (
    <Sidebar className="space-y-2">
      <SidebarHeader>
        <SidebarGroupLabel>HOTA Admin</SidebarGroupLabel>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {primaryItems.map((item) => (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  asChild
                  isActive={activePage === item.key}
                  className={cn(
                    "rounded-xl",
                    activePage === item.key
                      ? "bg-accent text-black hover:bg-accent/90"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  <Link to={item.to}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {items && items.length > 0 && onSectionChange && activeSection && (
          <SidebarGroup>
            <SidebarGroupLabel>CMS Sections</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        "justify-between rounded-xl",
                        isActive
                          ? "bg-accent text-black hover:bg-accent/90"
                          : "text-text-secondary hover:text-text-primary",
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
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <Button
          asChild
          variant="outline"
          className="w-full justify-start rounded-xl border-border"
        >
          <Link to={ROUTES.BLOG}>Public Blog</Link>
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="mt-2 w-full justify-start rounded-xl"
          onClick={onLogout}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
