"use client";

import { Building2, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { icon: Users, value: "+2.500", label: "Clientes atendidos" },
  { icon: TrendingUp, value: "$850M+", label: "Devueltos a clientes" },
  { icon: Award, value: "100%", label: "Proceso legal" },
  { icon: Building2, value: "Las Condes", label: "Oficinas centrales" },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
              Quienes somos
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Expertos en portabilidad de seguros
            </h2>
            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              Somos una empresa especializada en el mercado asegurador chileno,
              dedicada a empoderar a las personas para que optimicen sus finanzas
              personales sin perder cobertura.
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Trabajamos con las principales aseguradoras del pais para
              garantizar que nuestros clientes siempre tengan la mejor opcion
              disponible. Nuestro equipo de profesionales te guia en cada paso
              del proceso.
            </p>
            <div className="mt-8 p-5 rounded-2xl bg-primary-50 border border-primary-100">
              <p className="font-semibold text-gray-900 text-sm">
                Oficinas centrales
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Apoquindo 6410, Of. 1404, Las Condes, Santiago
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-5"
          >
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`p-6 rounded-2xl ${
                  i === 0
                    ? "gradient-primary shadow-lg shadow-primary-500/20"
                    : "bg-white border border-gray-100 shadow-sm"
                }`}
              >
                <m.icon
                  className={`w-7 h-7 mb-4 ${
                    i === 0 ? "text-white/80" : "text-primary-500"
                  }`}
                />
                <p
                  className={`text-2xl font-bold ${
                    i === 0 ? "text-white" : "text-gray-900"
                  }`}
                >
                  {m.value}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    i === 0 ? "text-white/60" : "text-gray-400"
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
