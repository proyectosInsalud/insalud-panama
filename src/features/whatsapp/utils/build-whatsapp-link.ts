export function buildWhatsAppLink(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const text = encodeURIComponent(
    "Hola, quiero empezar mi tratamiento con Ondas de Choque. Los vi en Google."
  );

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`;
}