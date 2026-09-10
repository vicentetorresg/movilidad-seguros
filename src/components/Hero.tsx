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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-white/80 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              Portabilidad de seguros en Chile
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          >
            Recupera el dinero de tus{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-500">
              seguros asociados
            </span>{" "}
            a creditos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed"
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold text-base hover:bg-white/90 transition-colors"
            >
              Simula tu devolucion
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/10 transition-colors"
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
              className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <s.icon className="w-6 h-6 text-accent-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-white/60">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
