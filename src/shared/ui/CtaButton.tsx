import React from "react";
import { cn } from "@/shared/lib/utils/cn";

type AnchorCtaProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  className?: string;
  children: React.ReactNode;
};

type ButtonCtaProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  className?: string;
  children: React.ReactNode;
};

export type CtaButtonProps = AnchorCtaProps | ButtonCtaProps;

const baseClasses =
  "inline-flex items-center justify-center rounded-xl px-10 py-4 font-semibold bg-[var(--brand-teal)] text-white shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100";

export function CtaButton(props: CtaButtonProps) {
  const { className, children } = props;

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={cn(baseClasses, className)} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { className: _c, children: _ch, ...buttonProps } = props;
  return (
    <button type="button" className={cn(baseClasses, className)} {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
