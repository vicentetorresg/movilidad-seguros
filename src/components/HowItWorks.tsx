"use client";

import { FileText, PenTool, Banknote } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Sube tu documentacion",
    description:
      "Carga los documentos de tu seguro de forma segura en nuestra plataforma. Solo necesitas tu poliza y datos del credito.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Firma digital",
    description:
      "Firmas una autorizacion digital (mandato) para que gestionemos la portabilidad de tu seguro de forma legal.",
  },
  {
    icon: Banknote,
    step: "03",
    title: "Recibe tu devolucion",
    description:
      "En un promedio de 20 dias recibiras el dinero directamente en tu cuenta. Sin letra chica, sin sorpresas.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
            Proceso simple
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-950 tracking-tight">
            3 pasos para recuperar tu dinero
          </h2>
          <p className="mt-4 text-dark-400 text-lg">
            Un proceso 100% digital, sin filas, sin papeles impresos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl p-8 h-full border border-dark-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                    <s.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-5xl font-bold text-dark-100 group-hover:text-primary-100 transition-colors">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-dark-950 mb-3">
                  {s.title}
                </h3>
                <p className="text-dark-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-dark-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
