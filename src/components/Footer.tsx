import { principalData } from "@/data/sedes/principal";
import { Heart, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[var(--surface-light-blue)] border-t border-white/10 py-14">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Grid principal */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="h-7 w-7 text-[var(--brand-primary)]" />
              <span className="text-xl font-bold text-[var(--text-primary)]">
                {principalData.name}
              </span>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Más de 20,000 tratamientos realizados con excelentes resultados.
              Terapia especializada para recuperar confianza y bienestar.
            </p>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Contacto
            </h3>

            <a
              href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
            >
              <Phone className="h-4 w-4" />
              {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
            </a>

            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
            >
              <Mail className="h-4 w-4" />
              {process.env.NEXT_PUBLIC_EMAIL}
            </a>

            <p className="text-sm text-[var(--text-secondary)]">
              {principalData.address}
            </p>
          </div>

          {/* Redes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--text-primary)]">
              Síguenos
            </h3>

            <div className="flex gap-3">
              {[
                { icon: Facebook, href: principalData.socials.facebook },
                { icon: Instagram, href: principalData.socials.instagram },
                { icon: FaTiktok, href: principalData.socials.tiktok },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-10 h-10 rounded-full
                    bg-white/5 border border-white/10
                    flex items-center justify-center
                    text-[var(--text-secondary)]
                    hover:bg-[var(--brand-primary)]
                    hover:text-white
                    transition-all
                  "
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-10 mt-10 border-t border-white/10 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            © {new Date().getFullYear()} {principalData.name}. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}