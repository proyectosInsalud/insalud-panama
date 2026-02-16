const DEFAULT_MESSAGE =
  "Hola, quiero empezar mi tratamiento con Ondas de Choque. Los vi en Google.";

export function buildWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const raw = message ?? DEFAULT_MESSAGE;
  // Sanitiza por si viene un texto que ya trae '?text=' para evitar duplicarlo
  const cleaned = raw.replace(/(\?|&)?text=/gi, "").trim();
  const encoded = encodeURIComponent(cleaned);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
}
