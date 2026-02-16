export function buildWhatsAppLink(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://api.whatsapp.com/send/?${cleanPhone}?&text=Hola%2C+quiero+empezar+mi+tratamiento+con+Ondas+de+Choque.+Los+vi+en+google.`;
}