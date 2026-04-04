import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      isActive: {
        true: "bg-accent text-accent-foreground",
        false: "text-muted-foreground",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

type SidebarProviderProps = React.ComponentPropsWithoutRef<"div">;

function SidebarProvider({ className, ...props }: SidebarProviderProps) {
  return <div className={cn("min-h-screen w-full", className)} {...props} />;
}

type SidebarProps = React.ComponentPropsWithoutRef<"aside">;

function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "w-[280px] rounded-2xl border border-border/70 bg-bg-secondary/85 p-3",
        className,
      )}
      {...props}
    />
  );
}

type SidebarInsetProps = React.ComponentPropsWithoutRef<"div">;

function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return <div className={cn("min-w-0 flex-1", className)} {...props} />;
}

type SidebarHeaderProps = React.ComponentPropsWithoutRef<"div">;

function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("mb-3", className)} {...props} />;
}

type SidebarContentProps = React.ComponentPropsWithoutRef<"div">;

function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

type SidebarFooterProps = React.ComponentPropsWithoutRef<"div">;

function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn("mt-3", className)} {...props} />;
}

type SidebarGroupProps = React.ComponentPropsWithoutRef<"div">;

function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

type SidebarGroupLabelProps = React.ComponentPropsWithoutRef<"p">;

function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  return (
    <p
      className={cn(
        "px-2 text-xs font-black uppercase tracking-[0.18em] text-text-muted",
        className,
      )}
      {...props}
    />
  );
}

type SidebarMenuProps = React.ComponentPropsWithoutRef<"ul">;

function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <ul className={cn("space-y-1", className)} {...props} />;
}

type SidebarMenuItemProps = React.ComponentPropsWithoutRef<"li">;

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <li className={cn("list-none", className)} {...props} />;
}

type SidebarMenuButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
};

function SidebarMenuButton({
  asChild = false,
  className,
  isActive,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(sidebarMenuButtonVariants({ isActive }), className)}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
};
