import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5",
    "text-[11px] font-semibold leading-tight tracking-wide",
    "transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/12 text-primary",
        secondary:
          "border-border/60 bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        outline:
          "border-border/60 text-foreground bg-transparent",
        purple:
          "border-transparent bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
        blue:
          "border-transparent bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        green:
          "border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        amber:
          "border-transparent bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        pink:
          "border-transparent bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
        sky:
          "border-transparent bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
        rose:
          "border-transparent bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
