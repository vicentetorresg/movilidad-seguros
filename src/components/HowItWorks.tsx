"use client";

import { FileText, PenTool, Banknote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Sube tu documentación",
    description:
      "Carga los documentos de tu seguro en nuestra plataforma segura. Solo necesitas tu póliza y datos del crédito.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Firma el mandato digital",
    description:
      "Firmas una autorización digital para que gestionemos la portabilidad de tu seguro de forma 100% legal.",
  },
  {
    icon: Banknote,
    step: "03",
    title: "Recibe tu devolución",
    description:
      "En un promedio de 20 días recibirás el dinero en tu cuenta bancaria. Sin sorpresas, sin costos ocultos.",
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
          <p className="text-primary-600 text-sm font-semibold tracking-wide uppercase mb-3">
            Proceso simple
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            3 pasos para recuperar tu dinero
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Todo digital. Sin filas, sin papeles, sin complicaciones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="relative p-8 rounded-2xl bg-surface border border-border-light hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300">
                {/* Step number */}
                <span className="absolute -top-4 left-8 px-3 py-1 text-xs font-bold tracking-wider text-primary-600 bg-primary-50 rounded-full border border-primary-100">
                  PASO {s.step}
                </span>

                <div className="w-12 h-12 rounded-2xl bg-primary-950 flex items-center justify-center mt-2 mb-5">
                  <s.icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-lg font-bold text-primary-950 mb-2">
                  {s.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  {s.description}
                </p>
              </div>

              {/* Arrow connector (hidden on mobile and last item) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-primary-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
