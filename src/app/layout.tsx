import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibm = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rebaja Tu Seguro | Portabilidad de Seguros en Chile",
  description:
    "Recupera dinero portando tus seguros de créditos de consumo y automotriz. Simulador online, proceso 100% digital y legal. Hasta $5M de devolución.",
  keywords: [
    "portabilidad de seguros",
    "seguro desgravamen",
    "seguro cesantía",
    "devolución seguro crédito",
    "rebaja tu seguro",
    "portabilidad seguro Chile",
    "recuperar dinero seguro",
  ],
  openGraph: {
    title: "Rebaja Tu Seguro | Recupera dinero de tus seguros de crédito",
    description:
      "Porta tus seguros asociados a créditos de consumo o automotriz y recupera tu dinero. 100% online, rápido y legal.",
    url: "https://www.rebajatuseguro.cl",
    siteName: "Rebaja Tu Seguro",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "https://www.rebajatuseguro.cl/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rebaja Tu Seguro — Portabilidad de Seguros en Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebaja Tu Seguro | Portabilidad de Seguros en Chile",
    description:
      "Recupera dinero portando tus seguros de créditos. Simulador online gratuito.",
    images: ["https://www.rebajatuseguro.cl/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.rebajatuseguro.cl",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${ibm.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-surface text-text">
        {children}
      </body>
    </html>
  );
}
