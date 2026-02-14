"use client";

import { FormProvider } from "react-hook-form";
import { useLeadForm } from "../hooks/useLeadForm";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { Button } from "@/shared/ui/Button";
import { TurnoField } from "./TurnoField";
import { FormLeads } from "@/types";
import { motion, type Variants } from "framer-motion";

interface LeadFormProps {
  defaultValues?: Partial<FormLeads>;
}

export function LeadForm({ defaultValues }: LeadFormProps) {
  const form = useLeadForm(defaultValues);

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

  return (
    <FormProvider {...form}>
      <motion.form onSubmit={form.onSubmit} className="space-y-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <motion.div variants={fadeUp}>
          <Label htmlFor="nombres" required>
            Nombres completos
          </Label>
          <Input
            id="nombres"
            {...form.register("nombres")}
            placeholder="Ingresa tu nombre completo"
          />
          {form.formState.errors.nombres && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.nombres.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={fadeUp}>
          <Label htmlFor="telefono" required>
            Teléfono
          </Label>
          <Input
            id="telefono"
            type="tel"
            {...form.register("telefono")}
            placeholder="6XXXXXXX"
            maxLength={8}
          />
          {form.formState.errors.telefono && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.telefono.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={fadeUp}>
          <TurnoField />
        </motion.div>

        <motion.button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full rounded-xl py-4 px-4 bg-[var(--brand-teal)] text-white font-bold flex items-center justify-center gap-2 shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          variants={fadeUp}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {form.formState.isSubmitting ? "Enviando..." : "Enviar solicitud"}
        </motion.button>
      </motion.form>
    </FormProvider>
  );
}
