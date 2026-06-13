"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    /* Spring press feel on ALL buttons */
    "transition-[transform,box-shadow,background-color,border-color,opacity]",
    "duration-[150ms,200ms,200ms,200ms,200ms]",
    "ease-[cubic-bezier(0.16,1,0.3,1)]",
    "active:scale-[0.97]",
    /* Minimum touch target */
    "min-h-[44px] min-w-[44px]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md",
        outline:
          "border border-input bg-background/80 shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-border/80 hover:shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/70 hover:shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline min-h-0 min-w-0",
        gradient:
          "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-md shadow-violet-500/30 hover:shadow-[0_0_28px_rgba(168,85,247,0.55)] hover:brightness-110 ring-1 ring-white/10",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm",
        sm:      "h-8  px-4 py-1.5 text-xs rounded-md min-h-0",
        lg:      "h-11 px-7 py-2.5 text-base",
        xl:      "h-13 px-9 py-3 text-base rounded-xl",
        icon:    "h-9 w-9 min-h-0 min-w-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
