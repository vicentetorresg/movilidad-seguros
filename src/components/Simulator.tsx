"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  ChevronDown,
  Shield,
  DollarSign,
  Calculator,
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
  nombre_institucion: string;
  monto_original: number;
  monto_pendiente: number;
  cuotas_restantes: number;
}

// Instituciones por tipo con factores de ajuste por cada una
const INSTITUCIONES: Record<string, { label: string; factor: number }[]> = {
  banco: [
    { label: "Banco de Chile", factor: 1.0 },
    { label: "Banco Estado", factor: 0.92 },
    { label: "Banco Santander", factor: 1.05 },
    { label: "BCI", factor: 1.02 },
    { label: "Banco Scotiabank", factor: 0.98 },
    { label: "Banco Itau", factor: 1.08 },
    { label: "Banco Falabella", factor: 0.95 },
    { label: "Banco Ripley", factor: 0.90 },
    { label: "Banco Security", factor: 1.03 },
    { label: "Banco BICE", factor: 1.06 },
    { label: "Banco Consorcio", factor: 1.01 },
    { label: "Otro banco", factor: 0.97 },
  ],
  cooperativa: [
    { label: "Coopeuch", factor: 1.0 },
    { label: "Oriencoop", factor: 0.95 },
    { label: "Capual", factor: 0.92 },
    { label: "Detacoop", factor: 0.93 },
    { label: "Coocretal", factor: 0.91 },
    { label: "Otra cooperativa", factor: 0.94 },
  ],
  automotriz: [
    { label: "Forum (Cencosud)", factor: 1.0 },
    { label: "Santander Consumer", factor: 1.05 },
    { label: "GMAC", factor: 0.98 },
    { label: "Tanner", factor: 0.96 },
    { label: "Otra automotriz", factor: 0.97 },
  ],
  otros: [
    { label: "Caja de Compensacion", factor: 0.88 },
    { label: "Financiera", factor: 0.95 },
    { label: "Otra institucion", factor: 0.90 },
  ],
};

const DEFAULTS = {
  monto_original: 30000000,
  monto_pendiente: 25000000,
  cuotas_restantes: 36,
};

const formatCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

const formatNum = (n: number) =>
  new Intl.NumberFormat("es-CL").format(n);

// Calculo calibrado con datos de mercado chileno.
// Cada institucion tiene un factor de ajuste propio.
function calcularDevolucion(
  tipoSeguro: string,
  montoOriginal: number,
  montoPendiente: number,
  cuotasRestantes: number,
  tipoInstitucion: string,
  nombreInstitucion: string
) {
  let tasaDesg: number;
  let tasaCes: number;

  switch (tipoInstitucion) {
    case "automotriz":
      tasaDesg = 0.000210;
      tasaCes = 0.000720;
      break;
    case "cooperativa":
      tasaDesg = 0.000190;
      tasaCes = 0.000650;
      break;
    default:
      tasaDesg = 0.000184;
      tasaCes = 0.000630;
  }

  // Factor de la institucion especifica
  const instituciones = INSTITUCIONES[tipoInstitucion] ?? [];
  const inst = instituciones.find((i) => i.label === nombreInstitucion);
  const factorInst = inst?.factor ?? 1.0;

  const ratio = Math.max(montoOriginal / montoPendiente, 1);
  const factorDesg = Math.pow(ratio, 1.8);
  const factorCes = Math.pow(ratio, 1.7);

  let desgAmount = 0;
  let deseAmount = 0;

  if (tipoSeguro === "desgravamen" || tipoSeguro === "ambos") {
    desgAmount = Math.round(
      montoPendiente * tasaDesg * cuotasRestantes * factorDesg * factorInst
    );
  }
  if (tipoSeguro === "cesantia" || tipoSeguro === "ambos") {
    deseAmount = Math.round(
      montoPendiente * tasaCes * cuotasRestantes * factorCes * factorInst
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
    nombre_institucion: "",
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
      !form.nombre_institucion ||
      form.monto_pendiente <= 0 ||
      form.cuotas_restantes <= 0
    )
      return null;
    return calcularDevolucion(
      form.tipo_seguro,
      form.monto_original,
      form.monto_pendiente,
      form.cuotas_restantes,
      form.tipo_institucion,
      form.nombre_institucion
    );
  }, [
    form.tipo_seguro,
    form.tipo_institucion,
    form.nombre_institucion,
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
    form.tipo_seguro && form.tipo_institucion && form.nombre_institucion;

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
        notas: `${form.nombre_institucion} | ${form.tipo_seguro} | Pend: ${form.monto_pendiente}`,
      });
      setSubmitted(true);
    } catch {
      alert("Error al enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm";
  const inputWithIcon = `${inputBase} pl-11`;
  const labelClass = "block text-sm font-medium text-text mb-1.5";

  const instituciones = INSTITUCIONES[form.tipo_institucion] ?? [];

  return (
    <section id="simulador" className="py-20 lg:py-32 bg-surface-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header centrado */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Simulador de Devolucion
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            Descubre cuanto podrias recuperar
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Completa 3 simples pasos y obtendras una estimacion inmediata.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left: Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border-light shadow-xl shadow-primary-900/5">
              {/* Progress */}
              {!submitted && (
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                          step >= s
                            ? "bg-primary text-text-inverse"
                            : "bg-primary-100 text-text-muted"
                        }`}
                      >
                        {step > s ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          s
                        )}
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
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-primary-950 mb-1">
                      Tus datos
                    </h3>
                    <p className="text-sm text-text-muted mb-5">
                      Para contactarte con tu simulacion
                    </p>

                    <div className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>Nombre</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <input
                              type="text"
                              className={inputWithIcon}
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
                              className={inputWithIcon}
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
                            className={inputWithIcon}
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
                            className={inputWithIcon}
                            placeholder="juan@email.com"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2.5">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.acepta_datos}
                          onChange={(e) =>
                            set("acepta_datos", e.target.checked)
                          }
                          className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer"
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
                          className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer"
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
                      className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* PASO 2: Tipo seguro + institucion */}
                {step === 2 && !submitted && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-primary-950 mb-1">
                      Tu seguro
                    </h3>
                    <p className="text-sm text-text-muted mb-5">
                      Selecciona el seguro e institucion
                    </p>

                    <div className="space-y-4">
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
                              className={`py-3 px-2 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${
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
                            onChange={(e) => {
                              set("tipo_institucion", e.target.value);
                              set("nombre_institucion", "");
                            }}
                            className={`${inputWithIcon} appearance-none cursor-pointer pr-10`}
                          >
                            <option value="">Selecciona tipo</option>
                            <option value="banco">Banco</option>
                            <option value="cooperativa">Cooperativa</option>
                            <option value="automotriz">Automotriz</option>
                            <option value="otros">Otros</option>
                          </select>
                        </div>
                      </div>

                      {/* Nombre de institucion */}
                      {form.tipo_institucion && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.2 }}
                        >
                          <label className={labelClass}>
                            Nombre de institucion
                          </label>
                          <div className="relative">
                            <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                            <select
                              value={form.nombre_institucion}
                              onChange={(e) =>
                                set("nombre_institucion", e.target.value)
                              }
                              className={`${inputWithIcon} appearance-none cursor-pointer pr-10`}
                            >
                              <option value="">Selecciona</option>
                              {instituciones.map((inst) => (
                                <option key={inst.label} value={inst.label}>
                                  {inst.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="px-4 py-3.5 rounded-xl font-semibold text-text-secondary bg-surface border border-border hover:bg-surface-secondary transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        disabled={!canGoStep3}
                        onClick={() => setStep(3)}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Simular devolucion
                        <Calculator className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* PASO 3: Sliders + resultado */}
                {step === 3 && !submitted && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-bold text-primary-950 mb-1">
                      Simulador
                    </h3>
                    <p className="text-sm text-text-muted mb-5">
                      Ingresa los valores o usa las barras
                    </p>

                    <div className="space-y-5">
                      {/* Monto original */}
                      <div>
                        <label className={labelClass}>
                          Monto solicitado original
                        </label>
                        <div className="relative mb-2">
                          <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            inputMode="numeric"
                            className={inputWithIcon + " font-semibold"}
                            value={formatNum(form.monto_original)}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, "");
                              const v = Math.min(Number(raw) || 0, 300000000);
                              set("monto_original", v);
                              if (form.monto_pendiente > v)
                                set("monto_pendiente", v);
                            }}
                            onBlur={() => {
                              if (form.monto_original < 1500000)
                                set("monto_original", 1500000);
                            }}
                          />
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
                      </div>

                      {/* Monto pendiente */}
                      <div>
                        <label className={labelClass}>
                          Monto que te queda por pagar
                        </label>
                        <div className="relative mb-2">
                          <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            inputMode="numeric"
                            className={inputWithIcon + " font-semibold"}
                            value={formatNum(
                              Math.min(
                                form.monto_pendiente,
                                form.monto_original
                              )
                            )}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, "");
                              const v = Math.min(
                                Number(raw) || 0,
                                form.monto_original
                              );
                              set("monto_pendiente", v);
                            }}
                            onBlur={() => {
                              if (form.monto_pendiente < 1000000)
                                set("monto_pendiente", 1000000);
                            }}
                          />
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
                      </div>

                      {/* Cuotas restantes */}
                      <div>
                        <label className={labelClass}>
                          Cuotas que te quedan por pagar
                        </label>
                        <div className="relative mb-2">
                          <Calculator className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="text"
                            inputMode="numeric"
                            className={inputWithIcon + " font-semibold"}
                            value={form.cuotas_restantes || ""}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, "");
                              set(
                                "cuotas_restantes",
                                Math.min(Number(raw) || 0, 240)
                              );
                            }}
                            onBlur={() => {
                              if (form.cuotas_restantes < 6)
                                set("cuotas_restantes", 6);
                            }}
                          />
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
                      </div>
                    </div>

                    {/* Resultado inline (siempre visible en step 3) */}
                    {resultado && resultado.total > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-5 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200"
                      >
                        <p className="text-xs text-text-muted mb-0.5">
                          A recuperar por:
                        </p>
                        {resultado.desgAmount > 0 && (
                          <p className="text-sm text-text-secondary">
                            Desgravamen: {formatCLP(resultado.desgAmount)}
                          </p>
                        )}
                        {resultado.deseAmount > 0 && (
                          <p className="text-sm text-text-secondary">
                            Cesantia: {formatCLP(resultado.deseAmount)}
                          </p>
                        )}
                        <p className="text-2xl sm:text-3xl font-bold text-primary-950 mt-2">
                          Total: {formatCLP(resultado.total)}
                        </p>
                        <p className="text-[10px] text-text-muted mt-2">
                          * Monto referencial sujeto a confirmacion.
                        </p>
                      </motion.div>
                    )}

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => setStep(2)}
                        className="px-4 py-3.5 rounded-xl font-semibold text-text-secondary bg-surface border border-border hover:bg-surface-secondary transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        disabled={loading || !resultado || resultado.total <= 0}
                        onClick={handleSubmit}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Solicitar portabilidad
                            <ArrowRight className="w-4 h-4" />
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
                    transition={{ duration: 0.3 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-accent-50 flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-8 h-8 text-accent-600" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-950 mb-2">
                      Solicitud recibida
                    </h3>
                    <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed">
                      Nuestro equipo analizara tu caso y te contactara a la
                      brevedad con los detalles de tu devolucion.
                    </p>
                    {resultado && (
                      <div className="mt-5 p-4 rounded-xl bg-primary-50 border border-primary-200">
                        <p className="text-xs text-text-muted">
                          Devolucion estimada
                        </p>
                        <p className="text-2xl font-bold text-primary-950 mt-1">
                          {formatCLP(resultado.total)}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Info sidebar (2 cols) — hidden on mobile until step 3 result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 hidden lg:block"
          >
            {/* Resultado desktop */}
            {resultado && resultado.total > 0 && step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-surface rounded-2xl p-6 border border-border-light shadow-lg shadow-primary-900/5">
                  <p className="text-sm text-text-muted mb-1">
                    Tu devolucion estimada
                  </p>
                  <p className="text-4xl font-bold text-primary-950 tracking-tight">
                    {formatCLP(resultado.total)}
                  </p>

                  <div className="mt-4 space-y-0">
                    {resultado.desgAmount > 0 && (
                      <div className="flex justify-between items-center py-2.5 border-t border-border-light">
                        <span className="text-sm text-text-secondary">
                          Desgravamen
                        </span>
                        <span className="text-sm font-semibold text-primary-950">
                          {formatCLP(resultado.desgAmount)}
                        </span>
                      </div>
                    )}
                    {resultado.deseAmount > 0 && (
                      <div className="flex justify-between items-center py-2.5 border-t border-border-light">
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
                    * Monto referencial sujeto a confirmacion. El valor
                    definitivo sera entregado en la evaluacion final.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Beneficios */}
            <div className="space-y-3">
              {[
                "Analisis gratuito y sin compromiso",
                "Te contactamos en menos de 24 horas",
                "Quedas con tu seguro vigente",
                "No aplica para creditos hipotecarios",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-600 mt-0.5 shrink-0" />
                  <span className="text-text-secondary text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
