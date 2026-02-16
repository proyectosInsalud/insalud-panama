import type { FormLeads } from "@/types";

export async function submitLead(
  data: FormLeads
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => ({} as any));

    if (!response.ok || result.ok === false) {
      return {
        success: false,
        message: result.error || result.mensaje || "Error al enviar el formulario",
      };
    }

    return {
      success: true,
      message: result.message || result.mensaje || "Formulario enviado correctamente",
    };
  } catch {
    return {
      success: false,
      message: "Error de conexión. Por favor intenta nuevamente.",
    };
  }
}
