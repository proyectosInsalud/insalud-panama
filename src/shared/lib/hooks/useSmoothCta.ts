import { useCallback, useState, type MouseEvent } from "react";
import type { MotionProps } from "framer-motion";

type Options = {
  href?: string;
  durationMs?: number;
};

// Hook para reutilizar la lógica de CTA con scroll suave y animación
export function useSmoothCta({
  href = "#lead-form-dark",
  durationMs = 1000,
}: Options = {}) {
  const [active, setActive] = useState(false);

  const handleCta = useCallback(
    (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.preventDefault();
      if (active) return;
      setActive(true);

      const target = href ? document.querySelector(href) : null;
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (href && !href.startsWith("#")) {
        window.location.href = href;
      }

      window.setTimeout(() => setActive(false), durationMs);
    },
    [active, href, durationMs]
  );

  const motionProps: MotionProps = active
    ? {
        animate: {
          scale: [1, 1.04, 1],
          boxShadow: "0 0 0 8px rgba(14,165,137,0.12)",
        },
        transition: {
          duration: 0.9,
          repeat: Infinity,
          ease: [0.45, 0, 0.2, 1],
        },
      }
    : {
        animate: {
          scale: 1,
          boxShadow: "0 12px 34px rgba(0,0,0,0.12)",
        },
        transition: { duration: 0.3, ease: [0.45, 0, 0.2, 1] },
      };

  return { active, handleCta, motionProps };
}
