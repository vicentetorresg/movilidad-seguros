"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  Phone,
  FileText,
  CreditCard,
  Car,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2;

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo_credito: string;
  acepta_datos: boolean;
  acepta_portabilidad: boolean;
}

export default function Simulator() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    tipo_credito: "",
    acepta_datos: false,
    acepta_portabilidad: false,
  });

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canGoStep2 =
    form.nombre.trim() &&
    form.apellido.trim() &&
    form.email.trim() &&
    form.telefono.trim() &&
    form.acepta_datos &&
    form.acepta_portabilidad;

  const canSubmit = form.tipo_credito;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await supabase.from("simulation_leads").insert({
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        tipo_credito: form.tipo_credito,
      });
      setSubmitted(true);
    } catch {
      alert("Error al enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm";
  const labelClass = "block text-sm font-medium text-text mb-1.5";

  return (
    <section
      id="simulador"
      className="py-24 lg:py-32 bg-surface-tertiary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Simulador
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
              Descubre en segundos cuanto podrias recuperar
            </h2>
            <p className="mt-4 text-text-secondary text-lg leading-relaxed">
              Completa tus datos y nuestro equipo analizara tu caso para
              entregarte una estimacion personalizada de tu devolucion.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Analisis gratuito y sin compromiso",
                "Te contactamos en menos de 24 horas",
                "Quedas con tu seguro vigente, sin perder cobertura",
                "No aplica para creditos hipotecarios",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-600 mt-0.5 shrink-0" />
                  <span className="text-text-secondary text-[15px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="bg-surface rounded-2xl p-8 sm:p-10 border border-border-light shadow-xl shadow-primary-900/5">
              {/* Progress */}
              {!submitted && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-text-inverse">
                      1
                    </div>
                    <div className="flex-1 h-1 rounded-full bg-primary-200">
                      <div
                        className={`h-full rounded-full bg-primary transition-all duration-500 ${
                          step >= 2 ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step >= 2
                        ? "bg-primary text-text-inverse"
                        : "bg-primary-100 text-text-muted"
                    }`}
                  >
                    2
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === 1 && !submitted && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-lg font-bold text-primary-950 mb-1">
                      Paso 1 de 2
                    </h3>
                    <p className="text-sm text-text-muted mb-6">
                      Ingresa tus datos personales
                    </p>

                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass}>Nombre</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                              type="text"
                              className={inputClass}
                              placeholder="Juan"
                              value={form.nombre}
                              onChange={(e) => set("nombre", e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={labelClass}>Apellido</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                              type="text"
                              className={inputClass}
                              placeholder="Perez"
                              value={form.apellido}
                              onChange={(e) => set("apellido", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Telefono de contacto</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="tel"
                            className={inputClass}
                            placeholder="+56 9 1234 5678"
                            value={form.telefono}
                            onChange={(e) => set("telefono", e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Correo electronico</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="email"
                            className={inputClass}
                            placeholder="juan@email.com"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.acepta_datos}
                          onChange={(e) =>
                            set("acepta_datos", e.target.checked)
                          }
                          className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
                        />
                        <span className="text-xs text-text-muted leading-relaxed">
                          Autorizo el tratamiento de mis datos personales segun
                          la politica de privacidad.
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.acepta_portabilidad}
                          onChange={(e) =>
                            set("acepta_portabilidad", e.target.checked)
                          }
                          className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
                        />
                        <span className="text-xs text-text-muted leading-relaxed">
                          Autorizo el tratamiento de datos para portabilidad y
                          promocion de seguros.
                        </span>
                      </label>
                    </div>

                    <button
                      disabled={!canGoStep2}
                      onClick={() => setStep(2)}
                      className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
                    >
                      Continuar
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && !submitted && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-lg font-bold text-primary-950 mb-1">
                      Paso 2 de 2
                    </h3>
                    <p className="text-sm text-text-muted mb-6">
                      Selecciona tu tipo de credito
                    </p>

                    <div className="space-y-3">
                      {[
                        {
                          value: "consumo",
                          label: "Credito de consumo",
                          desc: "Creditos personales, avances, lineas de credito",
                          icon: CreditCard,
                        },
                        {
                          value: "automotriz",
                          label: "Credito automotriz",
                          desc: "Financiamiento de vehiculos nuevos o usados",
                          icon: Car,
                        },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            form.tipo_credito === opt.value
                              ? "border-primary bg-primary-50 shadow-sm"
                              : "border-border-light hover:border-primary-200 hover:bg-primary-50/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="tipo_credito"
                            value={opt.value}
                            checked={form.tipo_credito === opt.value}
                            onChange={(e) =>
                              set("tipo_credito", e.target.value)
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              form.tipo_credito === opt.value
                                ? "bg-primary text-text-inverse"
                                : "bg-primary-100 text-primary"
                            }`}
                          >
                            <opt.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-primary-950 text-sm">
                              {opt.label}
                            </p>
                            <p className="text-xs text-text-muted mt-0.5">
                              {opt.desc}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                              form.tipo_credito === opt.value
                                ? "border-primary bg-primary"
                                : "border-border"
                            }`}
                          >
                            {form.tipo_credito === opt.value && (
                              <div className="w-2 h-2 rounded-full bg-text-inverse" />
                            )}
                          </div>
                        </label>
                      ))}
                    </div>

                    <p className="mt-4 text-xs text-text-muted flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      No aplica para creditos hipotecarios
                    </p>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="px-5 py-4 rounded-xl font-semibold text-text-secondary bg-surface border border-border hover:bg-surface-secondary transition-colors cursor-pointer"
                      >
                        Atras
                      </button>
                      <button
                        disabled={!canSubmit || loading}
                        onClick={handleSubmit}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Solicitar simulacion
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {submitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-accent-50 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-accent-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary-950 mb-3">
                      Solicitud recibida
                    </h3>
                    <p className="text-text-secondary max-w-sm mx-auto leading-relaxed">
                      Nuestro equipo analizara tu caso y te contactara a la
                      brevedad con tu estimacion personalizada.
                    </p>
                    <div className="mt-6 p-4 rounded-xl bg-primary-50 border border-primary-200">
                      <p className="text-sm text-primary font-medium">
                        Revisa tu correo electronico en las proximas 24 horas
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
