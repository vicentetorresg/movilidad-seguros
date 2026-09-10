import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movilidad Seguros | Portabilidad de Seguros en Chile",
  description:
    "Porta tus seguros asociados a creditos de consumo o automotriz y recupera tu dinero. 100% online, rapido y legal.",
  keywords: [
    "portabilidad seguros",
    "devolucion seguros",
    "seguros credito consumo",
    "seguros credito automotriz",
    "Chile",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-dark-950">
        {children}
      </body>
    </html>
  );
}
