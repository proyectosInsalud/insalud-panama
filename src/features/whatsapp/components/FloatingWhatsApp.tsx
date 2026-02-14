"use client";

import { buildWhatsAppLink } from "../utils/build-whatsapp-link";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

interface FloatingWhatsAppProps {
  phone: string;
}

export function FloatingWhatsApp({ phone }: FloatingWhatsAppProps) {
  const whatsappUrl = buildWhatsAppLink(phone);

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
    <motion.div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      {/* Botón de WhatsApp */}
      <motion.a
        variants={fadeUp}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--whatsapp-green)] text-white shadow-lg hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contactar por WhatsApp"
      >
        <Image
          src="/images/svg/Whatsapp_icon-icons.com_66931.svg"
          alt="WhatsApp"
          width={46}
          height={46}
          priority
          className="object-contain select-none"
        />
        {/* Punto de notificación */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
      </motion.a>
    </motion.div>
  );
}
