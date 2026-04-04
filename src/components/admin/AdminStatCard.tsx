import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { cn } from "@/lib/utils";

type AdminStatCardProps = {
  title: string;
  value: string | number;
  helperText?: string;
  icon?: ReactNode;
  accentClassName?: string;
};

export default function AdminStatCard({
  title,
  value,
  helperText,
  icon,
  accentClassName,
}: AdminStatCardProps) {
  return (
    <Card className="border-border/70 bg-bg-secondary/80 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xs uppercase tracking-[0.16em] text-text-muted">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-3">
          <p className="text-3xl font-black leading-none">{value}</p>
          {icon ? (
            <div
              className={cn(
                "rounded-xl border border-border bg-bg-primary/70 p-2 text-text-secondary",
                accentClassName,
              )}
            >
              {icon}
            </div>
          ) : null}
        </div>
        {helperText ? (
          <p className="mt-3 text-sm text-text-secondary">{helperText}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
