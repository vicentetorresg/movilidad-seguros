"use client";

import {
  Car,
  CreditCard,
  ShieldCheck,
  TrendingDown,
  Repeat,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: CreditCard,
    title: "Crédito de consumo",
    description:
      "Portabilidad de seguros asociados a créditos de consumo bancarios y financieros.",
  },
  {
    icon: Car,
    title: "Crédito automotriz",
    description:
      "Recupera dinero de seguros en tu crédito automotriz con mejores condiciones.",
  },
  {
    icon: TrendingDown,
    title: "Ahorro en primas",
    description:
      "Accede a pólizas más económicas manteniendo la misma cobertura o incluso mejor.",
  },
  {
    icon: Repeat,
    title: "Portabilidad total",
    description:
      "Gestionamos el cambio completo de tu seguro sin que pierdas cobertura en ningún momento.",
  },
  {
    icon: ShieldCheck,
    title: "Asesoría personalizada",
    description:
      "Nuestro equipo analiza tu caso particular y te recomienda la mejor opción.",
  },
  {
    icon: HeartPulse,
    title: "Seguros complementarios",
    description:
      "Te asesoramos en seguros de vida, salud y otros productos complementarios.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left intro */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-primary text-sm font-semibold tracking-wide mb-2">
              Servicios
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight leading-tight">
              Todo lo que necesitas en seguros
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Nos especializamos en portabilidad de seguros asociados a créditos,
              ayudándote a ahorrar sin perder protección.
            </p>
          </motion.div>

          {/* Right grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="group flex gap-4 p-5 rounded-2xl bg-surface border border-border-light hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-50 group-hover:bg-primary flex items-center justify-center transition-colors duration-300 shrink-0">
                  <s.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-primary-950 text-[15px]">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-text-secondary text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
