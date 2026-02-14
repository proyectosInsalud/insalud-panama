"use client";

import { RadioGroup } from "@/shared/ui/RadioGroup";
import { useFormContext } from "react-hook-form";
import { FormLeads } from "@/types";
import { motion, type Variants } from "framer-motion";

const TURNO_OPTIONS = [
  { value: "mañana", label: "Mañana" },
  { value: "tarde", label: "Tarde" },
  { value: "noche", label: "Noche" },
];

export function TurnoField() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }, // equivalente “easeOut” (cubic-bezier)
    },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const { register, formState: { errors } } = useFormContext<FormLeads>();

  return (
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <motion.label htmlFor="turno" variants={fadeUp}>
        Turno preferido
      </motion.label>
      <motion.div variants={fadeUp}>
        <RadioGroup
          options={TURNO_OPTIONS}
          {...register("turno")}
          name="turno"
        />
      </motion.div>
      {errors.turno && (
        <motion.p className="mt-1 text-sm text-red-500" variants={fadeUp}>{errors.turno.message}</motion.p>
      )}
    </motion.div>
  );
}
