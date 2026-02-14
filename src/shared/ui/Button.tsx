import React from "react";
import { cn } from "@/shared/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-[var(--brand-accent)] text-white hover:opacity-90 focus:ring-[var(--brand-accent)]",
      secondary: "bg-[var(--brand-primary)] text-white hover:opacity-90 focus:ring-[var(--brand-primary)]",
      outline: "border border-[var(--border-default)] bg-[var(--surface-light-blue)] text-[var(--text-primary)] hover:bg-[color:rgba(19,23,44,0.85)] focus:ring-[var(--state-focus)]",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
