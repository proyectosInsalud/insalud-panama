"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formLeadsSchema } from "@/schemas";
import type { FormLeads } from "@/types";
import { submitLead } from "../api/submitLead";
import { toast } from "sonner";
import { buildWhatsAppLink } from "@/features/whatsapp/utils/build-whatsapp-link";

export function useLeadForm(defaultValues?: Partial<FormLeads>) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormLeads>({
    resolver: zodResolver(formLeadsSchema),
    defaultValues: {
      nombres: "",
      telefono: "",
      turno: "",
      ...defaultValues,
    },
  });

  const onSubmit = async (data: FormLeads) => {
    setSubmitError(null);

    const result = await submitLead(data);

    if (result.success) {
      toast.success(result.message);
      form.reset();

      const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "") ?? "";

      if (!phone) {
        // si no hay número, no redirijas (y deja evidencia clara)
        const msg = "Falta configurar NEXT_PUBLIC_WHATSAPP_NUMBER en el .env";
        setSubmitError(msg);
        toast.error(msg);
        return;
      }

      // Mensaje prellenado (ajústalo a tu copy)
      const text = `Hola, acabo de enviar el formulario.
Nombre: ${data.nombres}
Celular: ${data.telefono}
Turno: ${data.turno}`;

      const whatsappUrl = `${buildWhatsAppLink(phone)}?text=${encodeURIComponent(text)}`;

      // redirección externa
      window.location.assign(whatsappUrl);
      return;
    }

    // error
    toast.error(result.message);
    setSubmitError(result.message);
  };

  return {
    ...form,
    submitError, // 👈 para mostrar debajo del botón si quieres
    onSubmit: form.handleSubmit(onSubmit),
  };
}