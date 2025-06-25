import type { Metadata, Viewport } from "next";
import { Nunito, Poppins, Roboto } from "next/font/google";
import "../styles/globals.css";

import { Toaster } from "@/components/ui/sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Insalud Ecuador",
  description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  keywords: "centro médico quito, hospital quito, servicios médicos ecuador, especialistas médicos, atención médica especializada, urologia, vph, verruga, vih, ondas de choque",
  authors: [{ name: "Insalud Ecuador" }],
  creator: "Insalud Ecuador",
  publisher: "Insalud Ecuador",
  robots: "index, follow",
  openGraph: {
    title: "Insalud Ecuador",
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
    type: "website",
    locale: "es_EC",
    siteName: "Insalud Ecuador",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insalud Ecuador",
    description: "Red de centros de salud especializados en brindar soluciones integrales en el ámbito de la salud sexual.",
  },
  alternates: {
    canonical: "https://insalud.ec",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${poppins.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
