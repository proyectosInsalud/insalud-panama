export function getGestorData(landing: "ondasChoque" | "prostatitis") {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50763719084";
  
  const gestores = {
    ondasChoque: {
      gestor: "Liset",
      email: process.env.NEXT_PUBLIC_EMAIL,
      whatsapp,
      message: "Hola, quiero informacion sobre Ondas de Choque",
    },
    prostatitis: {
      gestor: "Liset",
      email: process.env.NEXT_PUBLIC_EMAIL,
      whatsapp,
      message: "Hola, quiero informacion sobre Prostatitis",
    },
  };

  return gestores[landing];
}
