"use client";

import { FileText, PenTool, Banknote } from "lucide-react";
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
          className="max-w-2xl mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            3 pasos para recuperar tu dinero
          </h2>
          <p className="mt-3 text-text-secondary text-lg">
            Todo digital. Sin filas, sin papeles, sin complicaciones.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="p-8 h-full border-t-2 border-primary-100 group-hover:border-primary transition-colors duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-4xl font-black text-primary-200 group-hover:text-primary-400 transition-colors select-none">
                    {s.step}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-primary-950 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-primary-950 mb-2">
                  {s.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
