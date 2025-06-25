import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { NavigationSection } from "@/app/components/NavigationSection";
import { quitoData } from "@/data/sedes/quito";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: `Insalud ${quitoData.name}`,
  description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  keywords: "centro médico, hospital, servicios médicos, especialistas médicos, atención médica especializada, urologia, vph, verruga, disfunción eréctil, prostatitis, ondas de choque",
  authors: [{ name: `Insalud ${quitoData.name}` }],
  creator: `Insalud ${quitoData.name}`,
  publisher: `Insalud ${quitoData.name}`,
  robots: "index, follow",
  openGraph: {
    title: `Insalud ${quitoData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
    type: "website",
    locale: "es_EC",
    siteName: `Insalud ${quitoData.name}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Insalud ${quitoData.name}`,
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  },
};

export default function QuitoLayout({
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
        <NavigationSection sede={quitoData.name} 
          srcLogo={'/shared/logos/insalud-sede-quito.svg'}
        />
        {children}

      </body>
    </html>
  );
} 