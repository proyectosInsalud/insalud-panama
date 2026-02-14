import Image from "next/image";
import { getGestorData } from "@/data/sedes/get-gestor";
import { FloatingWhatsApp } from "@/features/whatsapp/components/FloatingWhatsApp";
import { Questions } from "@/features/faq/components/Questions";
import { LeadFormDark } from "@/features/lead-form/components/LeadFormDark";
import { Hero } from "@/components/Hero";
import { SintomasSection } from "@/components/SintomasSection";
import { BeneficiosSection } from "@/components/BeneficiosSection";
import { EstadisticasSection } from "@/components/EstadisticasSection";
import { Footer } from "@/components/Footer";
import { disfuncionFAQs } from "@/content/faqs/disfuncion.es";
import { TopBanner } from "@/components/TopBanner";

const gestor = getGestorData("ondasChoque");

function Section({
  id,
  children,
  className = "",
  containerClassName = "max-w-6xl",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className={`container mx-auto px-4 ${containerClassName}`}>{children}</div>
    </section>
  );
}

export default function OndasChoquePage() {
  return (
    <div className="min-h-screen bg-[var(--surface-light-blue)]">
      {/* Banner construido en layout: desktop fila, mobile/tablet apilado */}
      <TopBanner />
      <Hero
        title="¿DISFUNCIÓN ERÉCTIL Y BAJO RENDIMIENTO SEXUAL?"
        description="Recupera tu confianza y mejora tu desempeño con tratamientos médicos modernos, seguros y personalizados para hombres."
        benefits={[
          "Atención médica especializada en salud masculina",
          "Tratamientos no invasivos y sin cirugía",
          "Evaluación totalmente confidencial",
        ]}
        ctaText="Quiero recuperar mi rendimiento"
        ctaHref="#lead-form-dark"
      />

      <SintomasSection />
      <BeneficiosSection />
      <EstadisticasSection />

      {/* FAQ */}
      <Section containerClassName="max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-[var(--brand-teal)]">Preguntas</span>{" "}
          <span className="text-[var(--text-primary)]">Frecuentes</span>
        </h2>
        <Questions faqs={disfuncionFAQs} />
      </Section>

      {/* Lead Form */}
      <Section id="lead-form-dark" containerClassName="max-w-xl">
        <LeadFormDark
          defaultValues={{
            gestorEmail: gestor.email,
            gestorNombre: gestor.gestor,
            tratamiento: "Ondas de Choque",
            sede: "Panama",
          }}
        />
      </Section>

      <Footer />

      <FloatingWhatsApp phone={gestor.whatsapp} />
    </div>
  );
}
