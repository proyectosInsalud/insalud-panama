export function buildWhatsAppLink(
  phone: string,
  text?: string
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const message =
    text ??
    "Hola, quiero empezar mi tratamiento con Ondas de Choque. Los vi en Google.";

  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
}
