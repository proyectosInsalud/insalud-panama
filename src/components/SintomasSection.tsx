"use client";

import { Check, ThumbsUp } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { CtaButton } from "@/shared/ui/CtaButton";
import { useSmoothCta } from "@/shared/lib/hooks/useSmoothCta";
import { cn } from "@/shared/lib/utils/cn";

const sintomas = [
  "Erecciones menos firmes",
  "Dificultad para mantener el rendimiento",
  "Menor duración en las relaciones",
  "Pérdida de confianza o ansiedad",
];

export function SintomasSection() {
  const { active: scrolling, handleCta, motionProps } = useSmoothCta({
    href: "#lead-form-dark",
    durationMs: 1000,
  });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  return (
    <motion.section
      className="py-20 bg-[var(--surface-light-blue)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div className="container mx-auto px-4 max-w-7xl" variants={stagger}>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-[var(--text-primary)]">
          ¿Te está pasando esto?
        </h2>

        <motion.div className="grid md:grid-cols-2 gap-12 items-center" variants={stagger}>
          {/* Imagen izquierda */}
          <motion.div className="relative" variants={fadeUp}>
            <div
              className="
                relative rounded-3xl overflow-hidden
                border border-white/10
                shadow-[0_26px_80px_-52px_rgba(0,0,0,0.75)]
              "
            >
              {/* Placeholder oscuro coherente con la sección */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/jpg/young-frustrated-man-having-sexual-problems-while-2024-11-19-11-27-31-utc.jpg"
                  alt="Pareja con dificultades íntimas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Overlay suave para integración visual */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />

                {/* Glow sutil para profundidad */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="w-[60%] h-[60%] bg-[var(--brand-teal)]/10 blur-3xl rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card derecha */}
          <motion.div
            variants={fadeUp}
            className="
              relative overflow-hidden rounded-3xl p-8 md:p-10
              bg-[rgba(255,255,255,0.03)]
              border border-white/10
              shadow-[0_26px_80px_-52px_rgba(0,0,0,0.75)]
            "
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50" />

            <ul className="relative space-y-4">
              {sintomas.map((s) => (
                <li key={s} className="flex items-start gap-4">
                  <span
                    className="
                      mt-0.5 h-8 w-8 rounded-xl
                      bg-[var(--brand-teal)]/10
                      border border-[var(--brand-teal)]/20
                      flex items-center justify-center shrink-0
                    "
                  >
                    <Check className="h-4 w-4 text-[var(--brand-teal)]" />
                  </span>

                  <span className="text-[var(--text-primary)] text-lg leading-relaxed">
                    {s}
                  </span>
                </li>
              ))}
            </ul>

            <div className="relative my-8 h-px w-full bg-white/10" />

            <div className="relative flex items-start gap-4 mb-8">
              <span
                className="
                  mt-0.5 h-8 w-8 rounded-xl
                  bg-[var(--brand-warning)]/10
                  border border-[var(--brand-warning)]/20
                  flex items-center justify-center shrink-0
                "
              >
                <ThumbsUp className="h-4 w-4 text-[var(--brand-warning)]" />
              </span>

              <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                Estos síntomas pueden tratarse con evaluación médica adecuada.
              </p>
            </div>

            <motion.div {...motionProps}>
              <CtaButton
                href="#lead-form-dark"
                onClick={handleCta}
                className={cn("inline-flex items-center justify-center rounded-xl px-10 py-4 font-semibold bg-[var(--brand-teal)] text-white shadow-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100", scrolling ? "pointer-events-none" : undefined)}
                aria-busy={scrolling}
              >
                {scrolling ? "Llevandote al formulario..." : "Quiero recuperar mi rendimiento"}
              </CtaButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
