"use client";

import { ArrowRight, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: ShieldCheck, value: "100%", label: "Legal y seguro" },
  { icon: Clock, value: "20 dias", label: "Promedio devolucion" },
  { icon: BadgeCheck, value: "Online", label: "Proceso 100% digital" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-accent-200 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-sm text-primary-700 font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
              Portabilidad de seguros en Chile
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
          >
            Recupera el dinero de tus{" "}
            <span className="text-primary-600">
              seguros asociados
            </span>{" "}
            a creditos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl leading-relaxed"
          >
            Te ayudamos a portar tus seguros de creditos de consumo o automotriz,
            recuperando tu dinero de forma rapida, segura y completamente online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#simulador"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-primary text-white font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/20"
            >
              Simula tu devolucion
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gray-200 text-gray-700 font-medium text-base hover:bg-gray-50 transition-colors"
            >
              Como funciona
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                <s.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
