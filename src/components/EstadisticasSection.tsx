"use client";

import { Heart, Users, Award, MapPin } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const stats = [
  { icon: Users, value: "+110 000", label: "Procedimientos realizados con éxito" },
  { icon: Award, value: "+25 000", label: "Pacientes satisfechos" },
  { icon: MapPin, value: "9", label: "Sedes especializadas en Latinoamérica" },
];

export function EstadisticasSection() {
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
      <motion.div className="container mx-auto px-4 max-w-6xl" variants={stagger}>
        <div className="text-center mb-12">
          <Heart className="h-12 w-12 text-[var(--brand-teal)] mx-auto mb-4" />

          <p className="text-xl text-[var(--text-primary)] mb-2">
            <span className="font-bold text-[var(--brand-teal)]">Equipos</span> que estimulan la{" "}
            <span className="font-bold text-[var(--brand-teal)]">circulación sanguínea</span> y
            promueve erecciones más firmes y duraderas.
          </p>

          <h2 className="text-3xl font-bold mt-8 text-[var(--text-primary)]">
            <span className="text-[var(--brand-teal)]">Médicos</span> especialistas certificados
          </h2>
        </div>

        <motion.div className="max-w-5xl mx-auto space-y-6" variants={stagger}>
          {stats.map((s) => {
            const Icon = s.icon;

            return (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="
                  group relative overflow-hidden rounded-3xl
                  px-6 py-6 md:px-8 md:py-7
                  bg-[rgba(255,255,255,0.03)]
                  border border-white/10
                  shadow-[0_22px_70px_-45px_rgba(0,0,0,0.75)]
                  transition-transform duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_22px_80px_-50px_rgba(255,255,255,0.18)]
                "
              >
                {/* highlight superior sutil */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-55" />

                <div className="relative flex items-center gap-5 md:gap-6">
                  {/* Icono */}
                  <div
                    className="
                      h-12 w-12 md:h-14 md:w-14 rounded-2xl
                      bg-[var(--brand-teal)]/10
                      border border-[var(--brand-teal)]/18
                      flex items-center justify-center shrink-0
                    "
                  >
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-[var(--brand-teal)]" />
                  </div>

                  {/* Texto */}
                  <div className="min-w-0">
                    <div className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight">
                      {s.value}
                    </div>
                    <div className="text-base md:text-lg text-[var(--text-secondary)] mt-1">
                      {s.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}