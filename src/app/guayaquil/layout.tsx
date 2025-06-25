import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { NavigationSection } from "@/app/components/NavigationSection";
import { guayaquilData } from "@/data/sedes/guayaquil";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `Insalud ${guayaquilData.name}`,
  description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  keywords: "centro médico, hospital, servicios médicos, especialistas médicos, atención médica especializada, urologia, vph, verruga, disfunción eréctil, prostatitis, ondas de choque",
  authors: [{ name: `Insalud ${guayaquilData.name}` }],
  creator: `Insalud ${guayaquilData.name}`,
  publisher: `Insalud ${guayaquilData.name}`,
  robots: "index, follow",
  openGraph: {
    title: `Insalud ${guayaquilData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
    type: "website",
    locale: "es_PE",
    siteName: `Insalud ${guayaquilData.name}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Insalud ${guayaquilData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  },
};

export default function GuayaquilLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`antialiased`}
        suppressHydrationWarning
      >
        <NavigationSection sede={guayaquilData.name} srcLogo={'/shared/logos/insalud-sede-guayaquil.svg'} />
        {children}

      </body>
    </html>
  );
} 