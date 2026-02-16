"use client";

import { FormProvider } from "react-hook-form";
import { motion, type Variants } from "framer-motion";
import { useLeadForm } from "../hooks/useLeadForm";
import { Input } from "@/shared/ui/Input";
import { CtaButton } from "@/shared/ui/CtaButton";
import type { FormLeads } from "@/types";
import { Calendar, Clock3, ShieldCheck } from "lucide-react";

interface LeadFormDarkProps {
  defaultValues?: Partial<FormLeads>;
}

export function LeadFormDark({ defaultValues }: LeadFormDarkProps) {
  const form = useLeadForm(defaultValues);

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  const inputBase =
    "bg-[var(--surface-light-blue)] text-[var(--text-primary)] placeholder:text-white/70 rounded-xl h-12 border border-white/14 " +
    "focus:outline-none focus:ring-2 focus:ring-[var(--brand-teal)]/55 focus:border-[var(--brand-teal)]/45 transition-colors";

  const inputError =
    "border border-red-400/70 focus:ring-red-400/30 focus:border-red-400/70";

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <FormProvider {...form}>
      <motion.form
        onSubmit={form.onSubmit}
        className="space-y-6 rounded-2xl border border-white/10 bg-[color:rgba(19,23,44,0.55)] p-6 md:p-8 shadow-2xl shadow-[0_20px_60px_-20px_rgba(255,255,255,0.15)]"
        noValidate
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
      >
        {/* Header */}
        <motion.div className="space-y-3" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-white/80">
            <ShieldCheck className="h-4 w-4 text-[var(--brand-teal)]" />
            Atención 100% confidencial
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
            Agenda tu cita y recupera tu confianza
          </h2>

          <p className="text-white/75 text-sm md:text-base leading-relaxed">
            Respuesta rápida por WhatsApp · Atención discreta · Horarios flexibles.
          </p>
        </motion.div>

        {/* Datos básicos (GRID estable) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
          }}
        >
          <motion.div className="space-y-2 min-w-0" variants={fadeUp}>
            <label htmlFor="nombres" className="text-white text-sm font-medium">
              Nombres y apellidos <span className="text-red-400">*</span>
            </label>

            <Input
              id="nombres"
              {...register("nombres")}
              placeholder="Ej. Juan Pérez"
              autoComplete="name"
              aria-invalid={!!errors.nombres}
              className={`w-full ${inputBase} ${errors.nombres ? inputError : ""}`}
            />

            {errors.nombres && (
              <p className="text-sm text-red-300">{errors.nombres.message}</p>
            )}
          </motion.div>

          <motion.div className="space-y-2 min-w-0" variants={fadeUp}>
            <label htmlFor="telefono" className="text-white text-sm font-medium">
              Celular <span className="text-red-400">*</span>
            </label>

            <Input
              id="telefono"
              type="tel"
              {...register("telefono")}
              placeholder="Ej. 61234567"
              inputMode="numeric"
              autoComplete="tel"
              maxLength={8}
              aria-invalid={!!errors.telefono}
              className={`w-full ${inputBase} ${errors.telefono ? inputError : ""}`}
            />

            {errors.telefono && (
              <p className="text-sm text-red-300">{errors.telefono.message}</p>
            )}
          </motion.div>
        </motion.div>

        {/* Turno */}
        <motion.div className="space-y-3" variants={fadeUp}>
          <p className="text-white text-sm font-medium">
            Elige un turno para contactarte <span className="text-red-400">*</span>
          </p>

          <div className="grid gap-3">
            <label
              className="
                flex items-center gap-3 cursor-pointer rounded-xl border
                border-white/15 bg-[var(--surface-light-blue)] px-4 py-3
                hover:border-[var(--brand-teal)]/50 hover:bg-[color:rgba(32,178,170,0.08)]
                has-[input:checked]:border-[var(--brand-teal)] has-[input:checked]:bg-[color:rgba(32,178,170,0.14)]
                transition-colors
              "
            >
              <input
                type="radio"
                {...register("turno")}
                value="mañana"
                className="h-4 w-4 accent-[var(--brand-teal)]"
              />
              <div className="text-white">
                <div className="text-sm font-semibold">Mañana</div>
                <div className="text-xs text-white/70">9am a 1pm</div>
              </div>
            </label>

            <label
              className="
                flex items-center gap-3 cursor-pointer rounded-xl border
                border-white/15 bg-[var(--surface-light-blue)] px-4 py-3
                hover:border-[var(--brand-teal)]/50 hover:bg-[color:rgba(32,178,170,0.08)]
                has-[input:checked]:border-[var(--brand-teal)] has-[input:checked]:bg-[color:rgba(32,178,170,0.14)]
                transition-colors
              "
            >
              <input
                type="radio"
                {...register("turno")}
                value="tarde"
                className="h-4 w-4 accent-[var(--brand-teal)]"
              />
              <div className="text-white">
                <div className="text-sm font-semibold">Tarde</div>
                <div className="text-xs text-white/70">3pm a 7pm</div>
              </div>
            </label>
          </div>

          {errors.turno && (
            <p className="text-sm text-red-300">{errors.turno.message}</p>
          )}
        </motion.div>

        {/* Submit */}
        <motion.div variants={fadeUp} className="space-y-3">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock3 className="h-4 w-4 text-[var(--brand-teal)]" />
            Tiempo de respuesta promedio: &lt; 10 minutos
          </div>

          <CtaButton
            type="submit"
            disabled={isSubmitting}
            className="w-full justify-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            {isSubmitting ? "Enviando..." : "Agendar cita"}
          </CtaButton>

          {form.submitError && (
            <p className="text-sm text-red-300 text-center">{form.submitError}</p>
          )}
        </motion.div>

        <motion.p
          className="text-center text-xs text-white/65 leading-relaxed"
          variants={fadeUp}
        >
          Al enviar, aceptas ser contactado por nuestro equipo para coordinar tu evaluación.
        </motion.p>
      </motion.form>
    </FormProvider>
  );
}