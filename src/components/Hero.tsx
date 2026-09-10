"use client";

import { ArrowRight, ShieldCheck, Clock, Laptop, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: ShieldCheck, text: "100% Legal" },
  { icon: Clock, text: "20 días promedio" },
  { icon: Laptop, text: "100% Online" },
];

const counter = { value: "+2.500", label: "personas ya portaron sus seguros" };

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-surface">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-surface-secondary" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-100/30 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-bold text-primary-950 leading-[1.1] tracking-tight"
            >
              Recupera el dinero{" "}
              <span className="text-primary">de tus seguros</span> asociados a
              créditos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed"
            >
              Portamos tus seguros de créditos de consumo o automotriz,
              devolviendo tu dinero de forma rápida, segura y completamente
              online. Sin letra chica.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#simulador"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl btn-primary text-base cursor-pointer"
              >
                Simula tu devolución
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-text font-medium text-base hover:bg-primary-50 transition-colors cursor-pointer"
              >
                Cómo funciona
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              {badges.map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <b.icon className="w-4 h-4 text-accent-600" />
                  <span className="font-medium">{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-3xl p-8 shadow-xl shadow-primary-900/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-text-inverse" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted">
                    Ya han confiado en nosotros
                  </p>
                  <p className="text-2xl font-bold text-primary-900">
                    {counter.value}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Créditos de consumo",
                    pct: 65,
                    color: "bg-primary",
                  },
                  {
                    label: "Créditos automotriz",
                    pct: 35,
                    color: "bg-primary-400",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-text">
                        {item.label}
                      </span>
                      <span className="text-text-muted">{item.pct}%</span>
                    </div>
                    <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border-light grid grid-cols-3 gap-4">
                {[
                  { v: "$850M+", l: "Devueltos" },
                  { v: "20 días", l: "Promedio" },
                  { v: "98%", l: "Satisfacción" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="text-lg font-bold text-primary-900">{s.v}</p>
                    <p className="text-xs text-text-muted mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
