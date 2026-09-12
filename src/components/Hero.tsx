"use client";

import { ArrowRight, ShieldCheck, Clock, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  { icon: ShieldCheck, text: "100% Legal" },
  { icon: Clock, text: "20 días promedio" },
  { icon: Laptop, text: "100% Online" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-surface">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface to-surface" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-100/30 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-bold text-primary-950 leading-[1.08] tracking-tight"
            >
              Recupera el dinero{" "}
              <span className="text-primary-600">de tus seguros</span> asociados
              a créditos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-5"
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

            {/* Mobile case study */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 lg:hidden rounded-2xl p-5 bg-surface border border-border-light shadow-lg shadow-primary-950/5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  CM
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-primary-950">Carlos M.</p>
                  <p className="text-xs text-text-muted">Santiago · Crédito de consumo</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                  <span className="text-xs font-medium text-accent-600">Caso real</span>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                Tenía un crédito de consumo y pagaba $38.000 mensuales en seguro de desgravamen. Portó su seguro con nosotros y recuperó $985.985 del seguro no devengado.
              </p>
              <div className="flex items-center justify-between bg-accent-50 rounded-xl px-4 py-3 border border-accent-100">
                <div>
                  <p className="text-xs text-accent-600 font-medium">Devolución obtenida</p>
                  <p className="text-2xl font-bold text-accent-600 tracking-tight">$985.985</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">Proceso</p>
                  <p className="text-sm font-semibold text-primary-950">12 días · $0 costo</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop case study card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl p-8 bg-surface border border-border-light shadow-xl shadow-primary-950/5">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                <p className="text-sm font-medium text-accent-600">Caso real</p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-xl font-bold text-white shrink-0">
                  CM
                </div>
                <div>
                  <p className="font-semibold text-primary-950">Carlos M.</p>
                  <p className="text-sm text-text-muted">Santiago, Región Metropolitana</p>
                </div>
              </div>

              <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
                Carlos tenía un crédito de consumo a 48 meses con su banco y pagaba $38.000 mensuales
                en seguro de desgravamen incluido en la cuota. Al portar su seguro, recuperó
                $985.985 del seguro no devengado y ahora paga una prima mensual más baja.
              </p>

              <div className="bg-accent-50 rounded-xl p-5 mb-6 border border-accent-100">
                <p className="text-sm text-accent-600 font-medium mb-1">Devolución obtenida</p>
                <p className="text-3xl font-bold text-accent-600 tracking-tight">$985.985</p>
                <p className="text-xs text-text-muted mt-1">Crédito de consumo · Seguro de desgravamen</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border-light">
                {[
                  { v: "12 días", l: "Tiempo del proceso" },
                  { v: "$0", l: "Costo para Carlos" },
                  { v: "100%", l: "Online" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="text-lg font-bold text-primary-950">{s.v}</p>
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
