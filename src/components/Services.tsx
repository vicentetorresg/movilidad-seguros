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
      "Accede a polizas mas economicas manteniendo la misma cobertura o mejor.",
  },
  {
    icon: Repeat,
    title: "Portabilidad total",
    description:
      "Gestionamos el cambio completo de tu seguro sin que pierdas cobertura.",
  },
  {
    icon: ShieldCheck,
    title: "Asesoria personalizada",
    description:
      "Nuestro equipo analiza tu caso y te recomienda la mejor opcion.",
  },
  {
    icon: HeartPulse,
    title: "Seguros complementarios",
    description:
      "Te asesoramos en seguros de vida, salud y otros complementarios.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
            Nuestros servicios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Todo lo que necesitas en seguros
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Nos especializamos en portabilidad de seguros asociados a creditos,
            ayudandote a ahorrar sin perder proteccion.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-7 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-50 transition-all duration-300 bg-white"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 group-hover:gradient-primary flex items-center justify-center transition-all duration-300">
                <s.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
