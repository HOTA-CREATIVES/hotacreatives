import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/card";

type AdminActionTileProps = {
  title: string;
  description: string;
  to: string;
  icon?: ReactNode;
};

export default function AdminActionTile({
  title,
  description,
  to,
  icon,
}: AdminActionTileProps) {
  return (
    <Link to={to} className="group block focus-visible:outline-none">
      <Card className="h-full border-border/70 bg-bg-secondary/80 transition hover:border-accent/60 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-accent">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between gap-3 text-lg">
            <span>{title}</span>
            <span className="rounded-lg border border-border bg-bg-primary/70 p-2 text-text-secondary transition group-hover:border-accent/50 group-hover:text-accent">
              {icon || <ArrowRight size={16} />}
            </span>
          </CardTitle>
          <CardDescription className="text-text-secondary">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
            Open
            <ArrowRight size={14} />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
