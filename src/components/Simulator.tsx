"use client";

import { useState, useMemo, useCallback } from "react";
import { Calculator, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2 | 3;

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipo_credito: string;
  monto_credito: string;
  plazo_meses: string;
  meses_pagados: string;
  prima_seguro: string;
}

const formatMiles = (value: string) => {
  const nums = value.replace(/\D/g, "");
  if (!nums) return "";
  return Number(nums).toLocaleString("es-CL");
};

const parseMiles = (value: string) => value.replace(/\./g, "").replace(/,/g, "");

const formatCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

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
    monto_credito: "",
    plazo_meses: "",
    meses_pagados: "",
    prima_seguro: "",
  });

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setMoneyField = useCallback((field: keyof FormData, raw: string) => {
    const nums = raw.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, [field]: nums }));
  }, []);

  // Algoritmo de portabilidad:
  // Prima no devengada = prima_mensual * meses_restantes
  // Al portar, la nueva poliza cuesta ~40-50% menos que la del banco.
  // Devolucion = prima_no_devengada - costo_nueva_poliza_por_meses_restantes
  // Devolucion ≈ prima_mensual * meses_restantes * factor_ahorro
  // Factor: consumo ~35%, automotriz ~30% (seguros automotriz tienen mayor siniestralidad)
  const ahorro = useMemo(() => {
    const prima = parseInt(form.prima_seguro) || 0;
    const plazo = parseInt(form.plazo_meses) || 0;
    const pagados = parseInt(form.meses_pagados) || 0;
    if (!prima || !plazo || pagados >= plazo) return 0;

    const mesesRestantes = plazo - pagados;
    const primaNoDevengada = prima * mesesRestantes;
    const factor = form.tipo_credito === "automotriz" ? 0.30 : 0.35;
    const devolucion = Math.round(primaNoDevengada * factor);

    return devolucion;
  }, [form.prima_seguro, form.plazo_meses, form.meses_pagados, form.tipo_credito]);

  const primaNoDevengada = useMemo(() => {
    const prima = parseInt(form.prima_seguro) || 0;
    const plazo = parseInt(form.plazo_meses) || 0;
    const pagados = parseInt(form.meses_pagados) || 0;
    if (!prima || !plazo || pagados >= plazo) return 0;
    return prima * (plazo - pagados);
  }, [form.prima_seguro, form.plazo_meses, form.meses_pagados]);

  const canGoStep2 =
    form.nombre && form.apellido && form.email && form.telefono;
  const canGoStep3 =
    form.tipo_credito &&
    form.monto_credito &&
    form.plazo_meses &&
    form.meses_pagados &&
    form.prima_seguro;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await supabase.from("simulation_leads").insert({
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        telefono: form.telefono,
        tipo_credito: form.tipo_credito,
        monto_credito: parseInt(form.monto_credito) || null,
        plazo_meses: parseInt(form.plazo_meses) || null,
        meses_pagados: parseInt(form.meses_pagados) || null,
        prima_seguro: parseInt(form.prima_seguro) || null,
        ahorro_estimado: ahorro,
      });
      setSubmitted(true);
    } catch {
      alert("Error al enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm";
  const labelClass = "block text-sm font-medium text-gray-600 mb-1.5";

  return (
    <section id="simulador" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
            Simulador
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Descubre cuanto podrias recuperar
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Completa tus datos y simula en segundos tu devolucion estimada.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s
                      ? "gradient-primary text-white shadow-md shadow-primary-500/20"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {submitted && s === 3 ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 sm:w-24 h-1 rounded-full transition-all ${
                      step > s ? "bg-primary-500" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Datos personales
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Nombre</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Juan"
                        value={form.nombre}
                        onChange={(e) => set("nombre", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Apellido</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Perez"
                        value={form.apellido}
                        onChange={(e) => set("apellido", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Correo electronico</label>
                      <input
                        type="email"
                        className={inputClass}
                        placeholder="juan@email.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Telefono</label>
                      <input
                        type="tel"
                        className={inputClass}
                        placeholder="+56 9 1234 5678"
                        value={form.telefono}
                        onChange={(e) => set("telefono", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    Al continuar, autorizas el tratamiento de tus datos
                    personales segun nuestra politica de privacidad.
                  </div>
                  <button
                    disabled={!canGoStep2}
                    onClick={() => setStep(2)}
                    className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white gradient-primary hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-6">
                    Datos de tu credito y seguro
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Tipo de credito</label>
                      <select
                        className={inputClass}
                        value={form.tipo_credito}
                        onChange={(e) => set("tipo_credito", e.target.value)}
                      >
                        <option value="">Selecciona</option>
                        <option value="consumo">Credito de consumo</option>
                        <option value="automotriz">Credito automotriz</option>
                      </select>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>
                          Monto del credito
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            className={`${inputClass} pl-8`}
                            placeholder="5.000.000"
                            value={formatMiles(form.monto_credito)}
                            onChange={(e) => setMoneyField("monto_credito", parseMiles(e.target.value))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>
                          Prima del seguro mensual
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            className={`${inputClass} pl-8`}
                            placeholder="15.000"
                            value={formatMiles(form.prima_seguro)}
                            onChange={(e) => setMoneyField("prima_seguro", parseMiles(e.target.value))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>
                          Plazo total (meses)
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className={inputClass}
                          placeholder="36"
                          value={form.plazo_meses}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            set("plazo_meses", v);
                          }}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Meses ya pagados
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className={inputClass}
                          placeholder="12"
                          value={form.meses_pagados}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            set("meses_pagados", v);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-gray-400">
                    No aplica para creditos hipotecarios.
                  </p>
                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-4 rounded-xl font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Atras
                    </button>
                    <button
                      disabled={!canGoStep3}
                      onClick={() => setStep(3)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white gradient-primary hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Ver resultado
                      <Calculator className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && !submitted && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 mx-auto rounded-3xl gradient-primary flex items-center justify-center mb-6">
                    <Calculator className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    Tu devolucion estimada
                  </p>
                  <p className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight">
                    {formatCLP(ahorro)}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400">Prima no devengada</p>
                      <p className="text-lg font-bold text-gray-900">{formatCLP(primaNoDevengada)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-xs text-gray-400">Meses restantes</p>
                      <p className="text-lg font-bold text-gray-900">
                        {(parseInt(form.plazo_meses) || 0) - (parseInt(form.meses_pagados) || 0)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-400 text-xs max-w-md mx-auto">
                    Estimacion basada en un ahorro del {form.tipo_credito === "automotriz" ? "30" : "35"}% sobre
                    la prima no devengada. El monto final depende de las condiciones de tu poliza y la nueva aseguradora.
                  </p>

                  <div className="mt-6 p-4 rounded-2xl bg-accent-50 border border-accent-200">
                    <div className="flex items-start gap-3 text-left">
                      <CheckCircle2 className="w-5 h-5 text-accent-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Quedas asegurado
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Al portar tu seguro no pierdes cobertura. Mantienes tu
                          proteccion con una poliza mas conveniente.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="px-6 py-4 rounded-xl font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Atras
                    </button>
                    <button
                      disabled={loading}
                      onClick={handleSubmit}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white gradient-primary hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Quiero portarme
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-6"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-accent-50 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-accent-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Solicitud recibida
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Nos pondremos en contacto contigo a la brevedad para iniciar
                    el proceso de portabilidad. Revisa tu correo electronico.
                  </p>
                  <p className="mt-6 text-3xl font-bold text-accent-600">
                    {formatCLP(ahorro)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Devolucion estimada
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
