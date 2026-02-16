const DEFAULT_MESSAGE =
  "Hola, quiero empezar mi tratamiento con Ondas de Choque. Los vi en Google.";

export function buildWhatsAppLink(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(DEFAULT_MESSAGE);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
}
