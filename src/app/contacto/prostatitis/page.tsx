import { principalData } from "@/data/sedes/principal";
import { getGestorData } from "@/data/sedes/get-gestor";
import { FloatingWhatsApp } from "@/features/whatsapp/components/FloatingWhatsApp";
import { Questions } from "@/features/faq/components/Questions";
import { LeadForm } from "@/features/lead-form/components/LeadForm";
import { Hero } from "@/components/Hero";
import { SintomasSection } from "@/components/SintomasSection";
import { BeneficiosSection } from "@/components/BeneficiosSection";
import { EstadisticasSection } from "@/components/EstadisticasSection";
import { Footer } from "@/components/Footer";
import { prostatitisFAQs } from "@/content/faqs/prostatitis.es";

const gestor = getGestorData("prostatitis");

export default function ProstatitisPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-light-blue)]">
      {/* Hero Section */}
      <Hero
        title="Tratamiento para Prostatitis"
        description="Solución efectiva para la inflamación de la próstata con tratamientos especializados y personalizados que mejoran tu calidad de vida."
        benefits={[
          "Atención médica especializada en salud masculina",
          "Tratamientos no invasivos y sin cirugía",
          "Evaluación totalmente confidencial",
        ]}
        ctaText="Quiero recuperar mi rendimiento"
      />

      {/* Sección de Síntomas */}
      <SintomasSection />

      {/* Sección de Beneficios */}
      <BeneficiosSection />

      {/* Sección de Estadísticas */}
      <EstadisticasSection />

      {/* FAQ Section */}
      <section className="py-20 bg-[var(--surface-light-blue)]">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="text-[var(--brand-teal)]">Preguntas</span>{" "}
            <span className="text-[var(--text-primary)]">Frecuentes</span>
          </h2>
          <Questions faqs={prostatitisFAQs} />
        </div>
      </section>

      {/* Agenda tu cita - tarjeta oscura flotando sobre fondo claro */}
      <section className="py-20 bg-[var(--surface-light-blue)]" id="lead-form-dark">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="relative rounded-2xl p-[1px] bg-[color:rgba(19,23,44,0.25)] backdrop-blur shadow-xl">
            <div className="bg-[var(--surface-dark)] rounded-[1.05rem] p-8 md:p-10 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.6)]">
              <LeadForm
                defaultValues={{
                  gestorEmail: gestor.email,
                  gestorNombre: gestor.gestor,
                  tratamiento: "Prostatitis",
                  sede: "Panama",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp phone={gestor.whatsapp} />
    </div>
  );
}
