"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

type FAQItem = { question: string; answer: string };

type QuestionsProps = {
  faqs: FAQItem[];
  defaultOpenIndex?: number;
  collapsible?: boolean;
};

export function Questions({
  faqs,
  defaultOpenIndex = 0,
  collapsible = true,
}: QuestionsProps) {
  const baseId = useId();

  const safeDefault = useMemo(() => {
    if (!faqs?.length) return -1;
    return Math.min(Math.max(defaultOpenIndex, 0), faqs.length - 1);
  }, [faqs, defaultOpenIndex]);

  const [openIndex, setOpenIndex] = useState<number>(safeDefault);

  useEffect(() => {
    setOpenIndex(safeDefault);
  }, [safeDefault]);

  if (!faqs?.length) return null;

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      className="space-y-5 md:space-y-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {faqs.map((item, idx) => {
        const isOpen = idx === openIndex;
        const panelId = `${baseId}-panel-${idx}`;
        const buttonId = `${baseId}-button-${idx}`;

        return (
          <motion.div
            key={`${item.question}-${idx}`}
            variants={fadeUp}
            className={[
              "group relative overflow-hidden rounded-2xl",
              // glass base
              "bg-[rgba(19,23,44,0.55)] backdrop-blur",
              // border premium (subtle)
              "border border-white/10",
              // shadow + hover glow
              "shadow-[0_20px_60px_-25px_rgba(0,0,0,0.55)]",
              "hover:shadow-[0_20px_70px_-25px_rgba(255,255,255,0.14)]",
              "transition-shadow duration-300",
              // open state
              isOpen
                ? "ring-1 ring-[var(--brand-teal)]/35 shadow-[0_20px_70px_-25px_rgba(255,255,255,0.18)]"
                : "",
            ].join(" ")}
          >
            {/* highlight suave arriba (le da “acabado” premium) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-60" />

            <button
              id={buttonId}
              type="button"
              onClick={() => {
                if (isOpen) setOpenIndex(collapsible ? -1 : idx);
                else setOpenIndex(idx);
              }}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={[
                "relative w-full flex items-center justify-between gap-6 text-left",
                "px-6 md:px-8 py-5 md:py-6",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-teal)]/50",
              ].join(" ")}
            >
              <span className="text-lg md:text-xl font-semibold text-white/90">
                {item.question}
              </span>

              <span
                className={[
                  "grid place-items-center shrink-0",
                  "h-9 w-9 rounded-full",
                  "bg-white/5 border border-white/10",
                  "transition-all duration-300",
                  isOpen ? "bg-[var(--brand-teal)]/15 border-[var(--brand-teal)]/25" : "",
                ].join(" ")}
              >
                <ChevronDown
                  className={[
                    "h-5 w-5 text-white/70 transition-transform duration-300",
                    isOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden"
                >
                  {/* divider fino */}
                  <div className="mx-6 md:mx-8 h-px bg-white/10" />

                  <div className="px-6 md:px-8 pt-5 pb-6">
                    <p className="text-white/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}