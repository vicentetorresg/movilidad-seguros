"use client";

import { useState, useMemo, useCallback } from "react";
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
  Building2,
  Shield,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2 | 3;

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  acepta_datos: boolean;
  acepta_portabilidad: boolean;
  tipo_seguro: string;
  tipo_institucion: string;
  monto_original: number;
  monto_pendiente: number;
  cuotas_restantes: number;
}

const DEFAULTS = {
  monto_original: 5000000,
  monto_pendiente: 3000000,
  cuotas_restantes: 24,
};

const formatCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

const formatNum = (n: number) =>
  new Intl.NumberFormat("es-CL").format(n);

// Calculo de devolucion:
// Prima mensual estimada del seguro = % del saldo pendiente
// Tasa desgravamen tipica: 0.028% a 0.045% mensual del saldo
// Tasa cesantia tipica: 0.015% a 0.025% mensual del saldo
// Al portar, la nueva prima es ~40-60% mas barata
// Devolucion = prima_actual_mensual * cuotas_restantes * factor_ahorro
function calcularDevolucion(
  tipoSeguro: string,
  montoOriginal: number,
  montoPendiente: number,
  cuotasRestantes: number,
  tipoInstitucion: string
) {
  const tasaDesg =
    tipoInstitucion === "automotriz" ? 0.00038 : 0.00035;
  const tasaCes = 0.0002;

  const primaDesgMensual = montoPendiente * tasaDesg;
  const primaCesMensual = montoPendiente * tasaCes;

  // Factor de ahorro por portabilidad (diferencia entre prima banco vs mercado)
  const factorAhorro = tipoInstitucion === "automotriz" ? 0.45 : 0.5;

  // Factor de ajuste por cuotas restantes (mas cuotas = mas devolucion proporcional)
  const factorCuotas = Math.min(cuotasRestantes / 48, 1);
  const ajuste = 0.85 + 0.15 * factorCuotas;

  let desgAmount = 0;
  let deseAmount = 0;

  if (tipoSeguro === "desgravamen" || tipoSeguro === "ambos") {
    desgAmount = Math.round(
      primaDesgMensual * cuotasRestantes * factorAhorro * ajuste
    );
  }
  if (tipoSeguro === "cesantia" || tipoSeguro === "ambos") {
    deseAmount = Math.round(
      primaCesMensual * cuotasRestantes * factorAhorro * ajuste
    );
  }

  return { desgAmount, deseAmount, total: desgAmount + deseAmount };
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
    acepta_datos: false,
    acepta_portabilidad: false,
    tipo_seguro: "",
    tipo_institucion: "",
    monto_original: DEFAULTS.monto_original,
    monto_pendiente: DEFAULTS.monto_pendiente,
    cuotas_restantes: DEFAULTS.cuotas_restantes,
  });

  const set = useCallback(
    (field: keyof FormData, value: string | boolean | number) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const resultado = useMemo(() => {
    if (
      !form.tipo_seguro ||
      !form.tipo_institucion ||
      form.monto_pendiente <= 0 ||
      form.cuotas_restantes <= 0
    )
      return null;
    return calcularDevolucion(
      form.tipo_seguro,
      form.monto_original,
      form.monto_pendiente,
      form.cuotas_restantes,
      form.tipo_institucion
    );
  }, [
    form.tipo_seguro,
    form.tipo_institucion,
    form.monto_original,
    form.monto_pendiente,
    form.cuotas_restantes,
  ]);

  const canGoStep2 =
    form.nombre.trim() &&
    form.apellido.trim() &&
    form.email.trim() &&
    form.telefono.trim() &&
    form.acepta_datos &&
    form.acepta_portabilidad;

  const canGoStep3 =
    form.tipo_seguro && form.tipo_institucion;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await supabase.from("simulation_leads").insert({
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim(),
        tipo_credito: form.tipo_institucion,
        monto_credito: form.monto_original,
        plazo_meses: form.cuotas_restantes,
        prima_seguro: resultado?.total ?? 0,
        ahorro_estimado: resultado?.total ?? 0,
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
  const sliderLabel = "text-sm font-medium text-text mb-2 flex justify-between items-center";

  return (
    <section id="simulador" className="py-24 lg:py-32 bg-surface-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: copy + resultado en vivo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Simula tu Devolucion
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
              Descubre en segundos cuanto podrias recuperar
            </h2>
            <p className="mt-4 text-text-secondary text-lg leading-relaxed">
              Completa el simulador y obtendras una estimacion inmediata de tu
              devolucion. Quedando asegurado.
            </p>

            {/* Resultado en vivo */}
            {resultado && resultado.total > 0 && step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="bg-surface rounded-2xl p-6 border border-border-light shadow-lg shadow-primary-900/5">
                  <p className="text-sm text-text-muted mb-1">
                    Tu devolucion estimada
                  </p>
                  <p className="text-4xl sm:text-5xl font-bold text-primary-950 tracking-tight">
                    {formatCLP(resultado.total)}
                  </p>

                  <div className="mt-4 space-y-2">
                    {resultado.desgAmount > 0 && (
                      <div className="flex justify-between items-center py-2 border-t border-border-light">
                        <span className="text-sm text-text-secondary">
                          Desgravamen
                        </span>
                        <span className="text-sm font-semibold text-primary-950">
                          {formatCLP(resultado.desgAmount)}
                        </span>
                      </div>
                    )}
                    {resultado.deseAmount > 0 && (
                      <div className="flex justify-between items-center py-2 border-t border-border-light">
                        <span className="text-sm text-text-secondary">
                          Cesantia
                        </span>
                        <span className="text-sm font-semibold text-primary-950">
                          {formatCLP(resultado.deseAmount)}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="mt-3 text-xs text-text-muted">
                    Monto referencial sujeto a confirmacion.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Beneficios */}
            <div className="mt-8 space-y-3">
              {[
                "Analisis gratuito y sin compromiso",
                "Te contactamos en menos de 24 horas",
                "Quedas con tu seguro vigente",
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
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          step >= s
                            ? "bg-primary text-text-inverse"
                            : "bg-primary-100 text-text-muted"
                        }`}
                      >
                        {s}
                      </div>
                      {s < 3 && (
                        <div className="flex-1 h-1 rounded-full bg-primary-100">
                          <div
                            className={`h-full rounded-full bg-primary transition-all duration-500 ${
                              step > s ? "w-full" : "w-0"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* PASO 1: Datos personales */}
                {step === 1 && !submitted && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-lg font-bold text-primary-950 mb-1">
                      Paso 1 de 3: Tus datos
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
                        <label className={labelClass}>Telefono</label>
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
                          className="mt-1 w-4 h-4 rounded accent-primary cursor-pointer"
                        />
                        <span className="text-xs text-text-muted leading-relaxed">
                          Autorizo el tratamiento de mis datos personales.
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.acepta_portabilidad}
                          onChange={(e) =>
                            set("acepta_portabilidad", e.target.checked)
                          }
                          className="mt-1 w-4 h-4 rounded accent-primary cursor-pointer"
                        />
                        <span className="text-xs text-text-muted leading-relaxed">
                          Autorizo tratamiento para portabilidad y promocion de
                          seguros.
                        </span>
                      </label>
                    </div>

                    <button
                      disabled={!canGoStep2}
                      onClick={() => setStep(2)}
                      className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Continuar
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {/* PASO 2: Tipo de seguro + institucion */}
                {step === 2 && !submitted && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-lg font-bold text-primary-950 mb-1">
                      Paso 2 de 3: Tu seguro
                    </h3>
                    <p className="text-sm text-text-muted mb-6">
                      Selecciona el seguro que quieres portar
                    </p>

                    <div className="space-y-5">
                      {/* Tipo de seguro */}
                      <div>
                        <label className={labelClass}>Tipo de seguro</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "desgravamen", label: "Desgravamen" },
                            { value: "cesantia", label: "Cesantia" },
                            { value: "ambos", label: "Ambos" },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => set("tipo_seguro", opt.value)}
                              className={`py-3 px-3 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${
                                form.tipo_seguro === opt.value
                                  ? "border-primary bg-primary-50 text-primary"
                                  : "border-border-light text-text-secondary hover:border-primary-200"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tipo de institucion */}
                      <div>
                        <label className={labelClass}>
                          Tipo de institucion
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                          <select
                            value={form.tipo_institucion}
                            onChange={(e) =>
                              set("tipo_institucion", e.target.value)
                            }
                            className={`${inputClass} appearance-none cursor-pointer`}
                          >
                            <option value="">Selecciona</option>
                            <option value="banco">Banco</option>
                            <option value="cooperativa">Cooperativa</option>
                            <option value="automotriz">Automotriz</option>
                            <option value="otros">Otros</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="px-5 py-4 rounded-xl font-semibold text-text-secondary bg-surface border border-border hover:bg-surface-secondary transition-colors cursor-pointer"
                      >
                        Atras
                      </button>
                      <button
                        disabled={!canGoStep3}
                        onClick={() => setStep(3)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* PASO 3: Simulador con sliders */}
                {step === 3 && !submitted && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-lg font-bold text-primary-950 mb-1">
                      Paso 3 de 3: Simulador
                    </h3>
                    <p className="text-sm text-text-muted mb-6">
                      Ajusta los montos de tu credito
                    </p>

                    <div className="space-y-6">
                      {/* Monto original */}
                      <div>
                        <div className={sliderLabel}>
                          <span>Monto solicitado original</span>
                          <span className="font-bold text-primary-950">
                            {formatCLP(form.monto_original)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1500000}
                          max={300000000}
                          step={500000}
                          value={form.monto_original}
                          onChange={(e) => {
                            const v = Number(e.target.value);
                            set("monto_original", v);
                            if (form.monto_pendiente > v)
                              set("monto_pendiente", v);
                          }}
                          className="w-full h-2 rounded-full appearance-none bg-primary-100 accent-primary cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-text-muted mt-1">
                          <span>$1.500.000</span>
                          <span>$300.000.000</span>
                        </div>
                      </div>

                      {/* Monto pendiente */}
                      <div>
                        <div className={sliderLabel}>
                          <span>Monto que te queda por pagar</span>
                          <span className="font-bold text-primary-950">
                            {formatCLP(form.monto_pendiente)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1000000}
                          max={form.monto_original}
                          step={500000}
                          value={Math.min(
                            form.monto_pendiente,
                            form.monto_original
                          )}
                          onChange={(e) =>
                            set("monto_pendiente", Number(e.target.value))
                          }
                          className="w-full h-2 rounded-full appearance-none bg-primary-100 accent-primary cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-text-muted mt-1">
                          <span>$1.000.000</span>
                          <span>{formatCLP(form.monto_original)}</span>
                        </div>
                      </div>

                      {/* Cuotas restantes */}
                      <div>
                        <div className={sliderLabel}>
                          <span>Cuotas que te quedan por pagar</span>
                          <span className="font-bold text-primary-950">
                            {formatNum(form.cuotas_restantes)} cuotas
                          </span>
                        </div>
                        <input
                          type="range"
                          min={6}
                          max={240}
                          step={1}
                          value={form.cuotas_restantes}
                          onChange={(e) =>
                            set("cuotas_restantes", Number(e.target.value))
                          }
                          className="w-full h-2 rounded-full appearance-none bg-primary-100 accent-primary cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-text-muted mt-1">
                          <span>6 cuotas</span>
                          <span>240 cuotas</span>
                        </div>
                      </div>
                    </div>

                    {/* Resultado inline (mobile) */}
                    {resultado && resultado.total > 0 && (
                      <div className="mt-6 p-5 rounded-xl bg-primary-50 border border-primary-200 lg:hidden">
                        <p className="text-xs text-text-muted mb-1">
                          Tu devolucion estimada
                        </p>
                        <p className="text-3xl font-bold text-primary-950">
                          {formatCLP(resultado.total)}
                        </p>
                        {resultado.desgAmount > 0 && (
                          <p className="text-xs text-text-secondary mt-1">
                            Desgravamen: {formatCLP(resultado.desgAmount)}
                          </p>
                        )}
                        {resultado.deseAmount > 0 && (
                          <p className="text-xs text-text-secondary">
                            Cesantia: {formatCLP(resultado.deseAmount)}
                          </p>
                        )}
                        <p className="text-[10px] text-text-muted mt-2">
                          Monto referencial sujeto a confirmacion.
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => setStep(2)}
                        className="px-5 py-4 rounded-xl font-semibold text-text-secondary bg-surface border border-border hover:bg-surface-secondary transition-colors cursor-pointer"
                      >
                        Atras
                      </button>
                      <button
                        disabled={loading || !resultado || resultado.total <= 0}
                        onClick={handleSubmit}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Solicitar portabilidad
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Exito */}
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
                      brevedad.
                    </p>
                    {resultado && (
                      <div className="mt-6 p-5 rounded-xl bg-primary-50 border border-primary-200">
                        <p className="text-sm text-text-muted">
                          Devolucion estimada
                        </p>
                        <p className="text-3xl font-bold text-primary-950">
                          {formatCLP(resultado.total)}
                        </p>
                      </div>
                    )}
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
