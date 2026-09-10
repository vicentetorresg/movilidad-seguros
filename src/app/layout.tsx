import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibm = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Movilidad Seguros | Portabilidad de Seguros en Chile",
  description:
    "Porta tus seguros asociados a creditos de consumo o automotriz y recupera tu dinero. 100% online, rapido y legal.",
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
