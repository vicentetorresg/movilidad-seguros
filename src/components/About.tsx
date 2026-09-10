"use client";

import { Building2, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { icon: Users, value: "+2.500", label: "Clientes atendidos" },
  { icon: TrendingUp, value: "$850M+", label: "Devueltos a clientes" },
  { icon: Award, value: "100%", label: "Proceso legal" },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <p className="text-primary text-sm font-semibold tracking-wide mb-2">
              Quiénes somos
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
              Expertos en portabilidad de seguros
            </h2>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              Somos una empresa especializada en el mercado asegurador chileno,
              dedicada a empoderar a las personas para que optimicen sus finanzas
              personales sin perder cobertura.
            </p>
            <p className="mt-4 text-text-secondary leading-relaxed">
              Trabajamos con las principales aseguradoras del país para
              garantizar que nuestros clientes siempre tengan la mejor opción
              disponible. Nuestro equipo de profesionales te guía en cada paso
              del proceso.
            </p>

            {/* Metrics row */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  <p className="text-2xl sm:text-3xl font-bold text-primary-950">
                    {m.value}
                  </p>
                  <p className="text-sm text-text-muted mt-1">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="bg-primary-950 rounded-2xl p-8 text-white">
              <Building2 className="w-7 h-7 text-primary-300 mb-5" />
              <h3 className="text-xl font-bold mb-2">Oficinas centrales</h3>
              <p className="text-primary-200 text-sm leading-relaxed mb-6">
                Apoquindo 6410, Of. 1404
                <br />
                Las Condes, Santiago
              </p>
              <div className="pt-5 border-t border-primary-800 space-y-3">
                <div>
                  <p className="text-xs text-primary-400 uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm text-primary-100 mt-0.5">
                    contacto@rebajatuseguro.cl
                  </p>
                </div>
                <div>
                  <p className="text-xs text-primary-400 uppercase tracking-wider">
                    Horario
                  </p>
                  <p className="text-sm text-primary-100 mt-0.5">
                    Lunes a viernes, 9:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
