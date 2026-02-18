"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { CtaButton } from "@/shared/ui/CtaButton";
import { useSmoothCta } from "@/shared/lib/hooks/useSmoothCta";
import { cn } from "@/shared/lib/utils/cn";

type HeroProps = {
  title: string;
  description: string;
  benefits?: string[];
  ctaText: string;
  ctaHref?: string;
};

export function Hero({
  title,
  description,
  benefits = [],
  ctaText,
  ctaHref = "#lead-form-dark",
}: HeroProps) {
  const { active: scrolling, handleCta, motionProps } = useSmoothCta({
    href: ctaHref,
    durationMs: 1000,
  });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  return (
    <motion.section
      className="relative overflow-hidden bg-[var(--surface-light-blue)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="container mx-auto px-4 max-w-6xl py-12 md:py-16"
        variants={stagger}
      >
        <motion.div
          className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <h1 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)] uppercase leading-tight">
              {title}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl">
              {description}
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 h-8 w-8 rounded-full bg-[var(--brand-teal)]/15 flex items-center justify-center shrink-0">
                    <Check className="h-5 w-5 text-[var(--brand-teal)]" />
                  </span>
                  <span className="text-[var(--text-primary)]">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <motion.div {...motionProps}>
                <CtaButton
                  href={ctaHref}
                  onClick={handleCta}
                  className={cn("inline-flex items-center justify-center rounded-xl px-10 py-4 font-semibold bg-[var(--brand-teal)] text-white shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100", scrolling ? "pointer-events-none" : undefined)}
                  aria-busy={scrolling}
                >
                  {scrolling ? "Llevandote al formulario..." : ctaText}
                </CtaButton>
              </motion.div>
              <p className="mt-5 text-sm text-[var(--text-secondary)]">
                Reserva privada · Atención discreta · Respuesta rápida por WhatsApp
              </p>
            </div>
          </motion.div>

          {/* Imagen HERO mejorada */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={fadeUp}
          >
            <div className="relative w-full max-w-[520px] h-[300px] sm:h-[340px] md:h-[420px]">
              <div className="absolute inset-0 -z-10 flex justify-center items-center">
                <div className="w-[70%] h-[70%] rounded-full bg-[var(--brand-teal)]/10 blur-3xl" />
              </div>

              <Image
                src="/images/jpg/head-full-thoughts-when-she-is-around.webp"
                alt="Tratamiento medico"
                fill
                priority
                className="object-cover drop-shadow-xl rounded-t-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4) 88%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.4) 88%, rgba(0,0,0,0) 100%)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
