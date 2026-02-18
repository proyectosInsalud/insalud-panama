"use client";

import Image from "next/image";
import { Shield, Zap, Clock, TrendingUp, type LucideIcon } from "lucide-react";
import { motion, type Variants } from "framer-motion";

type Beneficio = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const beneficios: Beneficio[] = [
  { icon: Shield, title: "Seguro y efectivo", description: "No invasivo y sin efectos secundarios" },
  { icon: Zap, title: "Sin dolor", description: "Tecnología de última generación que minimiza molestias." },
  { icon: Clock, title: "Rápido retorno", description: "Vuelve a tu rutina al instante." },
  { icon: TrendingUp, title: "Resultados visibles", description: "Mejora la erección de forma natural y progresiva." },
];

function BenefitCard({ icon: Icon, title, description }: Beneficio) {
  return (
    <div className="
      rounded-2xl p-7
      bg-[rgba(255,255,255,0.03)]
      border border-white/10
      shadow-lg
      backdrop-blur-sm
    ">
      <Icon className="h-6 w-6 text-[var(--brand-teal)] mb-4" />
      <h3 className="text-lg md:text-xl font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-secondary)] text-sm md:text-base">
        {description}
      </p>
    </div>
  );
}

export function BeneficiosSection() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.section
      className="py-20 bg-[var(--surface-light-blue)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div className="container mx-auto px-4 max-w-6xl" variants={stagger}>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">
            ¿Por qué tratarse con{" "}
            <span className="text-[var(--brand-teal)]">Ondas de Choque</span>?
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Descubre los beneficios de esta tecnología de vanguardia.
          </p>
        </div>

        {/* DESKTOP: imagen central */}
        <motion.div className="relative hidden lg:block min-h-[560px]" variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[520px] h-[420px]">
              <Image
                src="/images/png/tratamiento-ondas.webp"
                alt="Tratamiento ondas de choque"
                fill
                className="object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="absolute top-0 left-0 w-[340px]">
            <BenefitCard {...beneficios[0]} />
          </motion.div>

          <motion.div variants={fadeUp} className="absolute top-0 right-0 w-[340px]">
            <BenefitCard {...beneficios[2]} />
          </motion.div>

          <motion.div variants={fadeUp} className="absolute bottom-0 left-0 w-[340px]">
            <BenefitCard {...beneficios[1]} />
          </motion.div>

          <motion.div variants={fadeUp} className="absolute bottom-0 right-0 w-[340px]">
            <BenefitCard {...beneficios[3]} />
          </motion.div>
        </motion.div>

        {/* MOBILE: solo beneficios (sin imagen) */}
        <motion.div className="lg:hidden grid md:grid-cols-2 gap-6" variants={stagger}>
          {beneficios.map((b) => (
            <motion.div key={b.title} variants={fadeUp}>
              <BenefitCard {...b} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}