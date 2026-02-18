"use client";

import Image from "next/image";

export function TopBanner() {
  return (
    <div className="w-full border-b border-white/10 bg-[var(--surface-light-blue)]/80 backdrop-blur">
      <div className="container mx-auto px-4 max-w-6xl py-3 sm:py-4">
        {/* Desktop / Tablet */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Logo izquierda */}
          <Image
            src="/images/png/logo_png.webp"
            alt="Insalud"
            width={90}
            height={30}
            className="h-12 w-auto shrink-0"
          />

          {/* Texto centrado en 2 líneas */}
          <div className="flex-1 flex justify-center">
            <div className="text-center leading-snug">
              <p className="text-sm md:text-base font-semibold text-[var(--text-primary)]">
                Líderes en salud sexual masculina en Latinoamérica.
              </p>
              <p className="text-sm md:text-base font-semibold text-[var(--text-primary)]">
                Más de 110 000 procedimientos realizados nos respaldan.
              </p>
            </div>
          </div>

          {/* Spacer balance */}
          <div className="w-[90px]" />
        </div>

        {/* Mobile: mensaje arriba centrado + logo abajo a la izquierda */}
        <div className="sm:hidden">
          <p className="text-center text-sm font-semibold leading-relaxed text-[var(--text-primary)]">
            Líderes en salud sexual masculina en Latinoamérica. <br />
            Más de 110 000 procedimientos realizados nos respaldan.
          </p>

          <div className="mt-3 flex justify-start">
            <Image
              src="/images/png/logo_png.webp"
              alt="Insalud"
              width={90}
              height={30}
              className="h-7 w-auto opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}