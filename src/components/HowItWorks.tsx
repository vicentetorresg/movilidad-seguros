"use client";

import { FileText, PenTool, Banknote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Sube tu documentacion",
    description:
      "Carga los documentos de tu seguro en nuestra plataforma segura. Solo necesitas tu poliza y datos del credito.",
    color: "bg-primary",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Firma el mandato digital",
    description:
      "Firmas una autorizacion digital para que gestionemos la portabilidad de tu seguro de forma 100% legal.",
    color: "bg-primary-600",
  },
  {
    icon: Banknote,
    step: "03",
    title: "Recibe tu devolucion",
    description:
      "En un promedio de 20 dias recibiras el dinero en tu cuenta bancaria. Sin sorpresas, sin costos ocultos.",
    color: "bg-accent",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Proceso simple
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            3 pasos para recuperar tu dinero
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Todo digital. Sin filas, sin papeles, sin complicaciones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative group"
            >
              <div className="bg-surface rounded-2xl p-8 h-full border border-border-light hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/40 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center shadow-lg shadow-primary/10`}
                  >
                    <s.icon className="w-6 h-6 text-text-inverse" />
                  </div>
                  <span className="text-5xl font-bold text-primary-100/60 group-hover:text-primary-200 transition-colors select-none">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary-950 mb-3">
                  {s.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  {s.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-10 -right-5 w-10 items-center justify-center z-10">
                  <ArrowRight className="w-5 h-5 text-primary-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
