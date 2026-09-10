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
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.3),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-primary-200 mb-6"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
              Portabilidad de seguros en Chile
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] tracking-tight"
            >
              Recupera el dinero{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-500">
                de tus seguros
              </span>{" "}
              asociados a créditos
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg text-primary-200 max-w-xl leading-relaxed"
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-900 font-semibold text-base hover:bg-primary-50 transition-all cursor-pointer shadow-lg shadow-black/10"
              >
                Simula tu devolución
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-medium text-base hover:bg-white/10 transition-all cursor-pointer"
              >
                Cómo funciona
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-5"
            >
              {badges.map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 text-sm text-primary-300"
                >
                  <b.icon className="w-4 h-4 text-accent-500" />
                  <span className="font-medium">{b.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Mobile case study */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 lg:hidden rounded-2xl p-5 bg-white/10 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  CM
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">Carlos M.</p>
                  <p className="text-xs text-primary-300">Santiago · Crédito de consumo</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                  <span className="text-xs font-medium text-accent-400">Caso real</span>
                </div>
              </div>
              <p className="text-sm text-primary-200 leading-relaxed mb-3">
                Pagaba un seguro de desgravamen incluido en la cuota de su crédito. Al portar su seguro, recuperó la diferencia acumulada.
              </p>
              <div className="flex items-center justify-between bg-accent-500/15 rounded-xl px-4 py-3 border border-accent-500/20">
                <div>
                  <p className="text-xs text-accent-400 font-medium">Devolución obtenida</p>
                  <p className="text-2xl font-bold text-white tracking-tight">$985.985</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-primary-300">Proceso</p>
                  <p className="text-sm font-semibold text-white">12 días · $0 costo</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Case study card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="rounded-3xl p-8 bg-white/10 backdrop-blur-md border border-white/15 shadow-2xl shadow-black/10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                <p className="text-sm font-medium text-accent-400">
                  Caso real
                </p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center text-xl font-bold text-white shrink-0">
                  CM
                </div>
                <div>
                  <p className="font-semibold text-white">Carlos M.</p>
                  <p className="text-sm text-primary-300">
                    Santiago, Región Metropolitana
                  </p>
                </div>
              </div>

              <p className="text-primary-200 text-[15px] leading-relaxed mb-6">
                Carlos tenía un crédito de consumo con su banco y pagaba un seguro de desgravamen
                incluido en la cuota. Al portar su seguro con nosotros, obtuvo una póliza más
                económica y recuperó la diferencia acumulada.
              </p>

              <div className="bg-accent-500/15 rounded-2xl p-5 mb-6 border border-accent-500/20">
                <p className="text-sm text-accent-400 font-medium mb-1">
                  Devolución obtenida
                </p>
                <p className="text-3xl font-bold text-white tracking-tight">
                  $985.985
                </p>
                <p className="text-xs text-primary-300 mt-1">
                  Crédito de consumo · Seguro de desgravamen
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
                {[
                  { v: "12 días", l: "Tiempo del proceso" },
                  { v: "$0", l: "Costo para Carlos" },
                  { v: "100%", l: "Online" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="text-lg font-bold text-white">{s.v}</p>
                    <p className="text-xs text-primary-400 mt-0.5">{s.l}</p>
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
