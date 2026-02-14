import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/shared/ui/Toaster";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Insalud Panamá - Salud Masculina",
  description:
    "Tratamientos especializados en salud masculina. Ondas de choque para disfunción eréctil y tratamiento para prostatitis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}