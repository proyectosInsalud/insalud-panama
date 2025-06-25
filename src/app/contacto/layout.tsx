import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { NavigationSection } from "@/app/components/NavigationSection";
import { principalData } from "@/data/sedes/principal";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `Insalud ${principalData.name}`,
  description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  keywords: "centro médico, hospital, servicios médicos, especialistas médicos, atención médica especializada, urologia, vph, verruga, disfunción eréctil, prostatitis, ondas de choque",
  authors: [{ name: `Insalud ${principalData.name}` }],
  creator: `Insalud ${principalData.name}`,
  publisher: `Insalud ${principalData.name}`,
  robots: "index, follow",
  openGraph: {
    title: `Insalud ${principalData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
    type: "website",
    locale: "es_PA",
    siteName: `Insalud ${principalData.name}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Insalud ${principalData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  },
};

export default function PrincipalLayout({
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
        <NavigationSection sede={principalData.name} srcLogo={'/shared/logos/insalud-sede-panama.svg'} />
        {children}

      </body>
    </html>
  );
} 