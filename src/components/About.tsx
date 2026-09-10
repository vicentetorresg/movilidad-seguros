"use client";

import { Building2, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  {
    icon: Users,
    value: "+2.500",
    label: "Clientes atendidos",
    highlight: true,
  },
  { icon: TrendingUp, value: "$850M+", label: "Devueltos a clientes" },
  { icon: Award, value: "100%", label: "Proceso legal" },
  { icon: Building2, value: "Las Condes", label: "Oficinas centrales" },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Quienes somos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
              Expertos en portabilidad de seguros
            </h2>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              Somos una empresa especializada en el mercado asegurador chileno,
              dedicada a empoderar a las personas para que optimicen sus finanzas
              personales sin perder cobertura.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Trabajamos con las principales aseguradoras del pais para
              garantizar que nuestros clientes siempre tengan la mejor opcion
              disponible. Nuestro equipo de profesionales te guia en cada paso
              del proceso.
            </p>
            <div className="mt-8 p-5 rounded-2xl bg-primary-50 border border-primary-200">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-primary-950 text-sm">
                    Oficinas centrales
                  </p>
                  <p className="text-text-secondary text-sm mt-0.5">
                    Apoquindo 6410, Of. 1404, Las Condes, Santiago
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 gap-5"
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  m.highlight
                    ? "bg-primary shadow-xl shadow-primary/15 text-text-inverse"
                    : "bg-surface border border-border-light shadow-sm hover:shadow-md hover:shadow-primary-100/20"
                }`}
              >
                <m.icon
                  className={`w-6 h-6 mb-4 ${
                    m.highlight ? "text-primary-300" : "text-primary"
                  }`}
                />
                <p
                  className={`text-2xl font-bold ${
                    m.highlight ? "text-text-inverse" : "text-primary-950"
                  }`}
                >
                  {m.value}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    m.highlight ? "text-primary-200" : "text-text-muted"
                  }`}
                >
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
