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
    title: "Credito de consumo",
    description:
      "Portabilidad de seguros asociados a creditos de consumo bancarios y financieros.",
  },
  {
    icon: Car,
    title: "Credito automotriz",
    description:
      "Recupera dinero de seguros en tu credito automotriz con mejores condiciones.",
  },
  {
    icon: TrendingDown,
    title: "Ahorro en primas",
    description:
      "Accede a polizas mas economicas manteniendo la misma cobertura o incluso mejor.",
  },
  {
    icon: Repeat,
    title: "Portabilidad total",
    description:
      "Gestionamos el cambio completo de tu seguro sin que pierdas cobertura en ningun momento.",
  },
  {
    icon: ShieldCheck,
    title: "Asesoria personalizada",
    description:
      "Nuestro equipo analiza tu caso particular y te recomienda la mejor opcion.",
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            Todo lo que necesitas en seguros
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Nos especializamos en portabilidad de seguros asociados a creditos,
            ayudandote a ahorrar sin perder proteccion.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-surface p-7 rounded-2xl border border-border-light hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/30 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-primary flex items-center justify-center transition-all duration-300">
                <s.icon className="w-5 h-5 text-primary group-hover:text-text-inverse transition-colors duration-300" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-primary-950">
                {s.title}
              </h3>
              <p className="mt-2 text-text-secondary text-sm leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
