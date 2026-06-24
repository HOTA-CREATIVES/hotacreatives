import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/utils";

type HomeCTAButtonVariant = "primary" | "secondary";

interface HomeCTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: HomeCTAButtonVariant;
}

const variantClasses: Record<HomeCTAButtonVariant, string> = {
  primary:
    "border-accent bg-accent text-black shadow-[0_18px_40px_rgba(244,194,13,0.2)] hover:bg-accent-hover hover:border-accent-hover",
  secondary:
    "border-border bg-transparent text-text-primary hover:border-accent/50 hover:bg-white/5",
};

export default function HomeCTAButton({
  children,
  className,
  variant = "primary",
  ...props
}: HomeCTAButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border px-10 py-4 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <i className="fa-solid fa-arrow-right text-[15px] transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}
