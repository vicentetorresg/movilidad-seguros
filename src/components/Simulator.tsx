"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
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
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2 | 3;

// Correction factors for cesantia non-linear effects (non-caja institutions only)
// DESG is perfectly linear — no corrections needed
const CES_CUOTAS_CORR: [number, number][] = [
  [6, 0.7940], [12, 0.9160], [24, 0.9790], [36, 1.0000],
  [48, 1.0105], [60, 1.0170], [96, 1.0780], [120, 1.1540],
  [180, 1.1700], [240, 1.1800],
];
const CES_AMOUNT_CORR: [number, number][] = [
  [10_000_000, 0.8845], [20_000_000, 0.9486], [30_000_000, 0.9700],
  [50_000_000, 0.9871], [100_000_000, 1.0000], [200_000_000, 1.0064],
];

const CAJAS = new Set([
  "Caja 18 de Septiembre", "Caja La Araucana", "Caja Los Andes", "Caja Los Heroes",
]);

function interpolate(table: [number, number][], x: number): number {
  if (x <= table[0][0]) return table[0][1];
  if (x >= table[table.length - 1][0]) return table[table.length - 1][1];
  for (let i = 0; i < table.length - 1; i++) {
    const [x0, y0] = table[i];
    const [x1, y1] = table[i + 1];
    if (x >= x0 && x <= x1) {
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return 1;
}

// DESG model: desg = max(0, (cap*r1d - bal*r2d) * (q - k) - 19990)
// CES model:  ces  = (cap*r1c - bal*r2c) * q * corrections
// Banco Estado uses special CES handling (non-linear)
// [r1_desg, r2_desg, k_desg, r1_ces, r2_ces]
const TASAS: Record<string, [number, number, number, number, number]> = {
  // BANCOS
  "Banco BCI":           [0.0005490, 0.0002880, 1.6296, 0.0012693, 0.0008913],
  "Banco BICE":          [0.0004642, 0.0002880, 1.7965, 0.0013609, 0.0008913],
  "Banco de Chile":      [0.0005019, 0.0002880, 1.7125, 0.0015443, 0.0008913],
  "Banco Estado":        [0.0000972, -0.0000500, 3.0877, 0.0009594, 0.0006545],
  "Banco Falabella":     [0.0005584, 0.0002880, 1.6153, 0.0013609, 0.0008913],
  "Banco Internacional": [0.0006433, 0.0002880, 1.5107, 0.0013609, 0.0008913],
  "Banco Itau":          [0.0005773, 0.0002880, 1.5885, 0.0022006, 0.0008913],
  "Banco Ripley":        [0.0006339, 0.0002880, 1.5205, 0.0013609, 0.0008913],
  "Banco Scotiabank":    [0.0005490, 0.0002880, 1.6296, 0.0011217, 0.0008913],
  "Condell":             [0.0016406, 0.0005950, 1.2215, 0.0014526, 0.0008913],
  "Consorcio":           [0.0009476, 0.0005100, 1.3682, 0.0013609, 0.0008913],
  "Santander":           [0.0005490, 0.0002880, 1.6296, 0.0013518, 0.0008913],
  "Security":            [0.0006433, 0.0002880, 1.5107, 0.0013609, 0.0008913],
  // COOPERATIVAS
  "Ahorrocoop":  [0.0009240, 0.0005950, 1.4749, 0.0014526, 0.0008913],
  "Bancrece":    [0.0009240, 0.0005100, 1.3812, 0.0013609, 0.0008913],
  "Capual":      [0.0009240, 0.0005100, 1.3812, 0.0013609, 0.0008913],
  "Coocretal":   [0.0009240, 0.0005100, 1.3812, 0.0013609, 0.0008913],
  "Coopeuch":    [0.0005771, 0.0003990, 1.5284, 0.0008613, 0.0006545],
  "Financoop":   [0.0009240, 0.0005950, 1.4749, 0.0013609, 0.0008913],
  "Libercoop":   [0.0009240, 0.0005100, 1.3812, 0.0013609, 0.0008913],
  "Oriencoop":   [0.0009240, 0.0005950, 1.4749, 0.0014526, 0.0008913],
  "Bansur":      [0.0009240, 0.0005100, 1.3812, 0.0014526, 0.0008913],
  "Coonfia":     [0.0009240, 0.0005100, 1.3812, 0.0014526, 0.0008913],
  "Solventa":    [0.0009240, 0.0005100, 1.3812, 0.0014526, 0.0008913],
  "Detacoop":    [0.0016150, 0.0005950, 1.2258, 0.0014661, 0.0008913],
  // AUTOMOTRIZ
  "Amicar":                [0.0009052, 0.0005950, 1.4895, 0.0007559, 0.0008913],
  "Autofin":               [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "BK SPA":                [0.0007072, 0.0005950, 1.7262, 0.0014810, 0.0008913],
  "Chevrolet":             [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "GM Financial":          [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "Global Soluciones":     [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "Mafi":                  [0.0009052, 0.0005950, 1.4895, 0.0007559, 0.0008913],
  "Marubeni Credit":       [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "Mitsui":                [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "Mundo Credito":         [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "OLX Autos":             [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "Santander Consumer":    [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "Tanner":                [0.0006600, 0.0005950, 1.8206, 0.0014810, 0.0008913],
  "Unidad Automotriz":     [0.0009052, 0.0005950, 1.4896, 0.0014810, 0.0008913],
  "Eurocapital":           [0.0009052, 0.0005950, 1.4896, 0.0000000, 0.0000000],
  // CAJAS DE COMPENSACION (solo desgravamen, k=0 — perfectly linear)
  "Caja 18 de Septiembre": [0.0011597, 0.0003677, 0, 0.0000000, 0.0000000],
  "Caja La Araucana":      [0.0011875, 0.0006156, 0, 0.0000000, 0.0000000],
  "Caja Los Andes":        [0.0008324, 0.0003905, 0, 0.0000000, 0.0000000],
  "Caja Los Heroes":       [0.0017765, 0.0006156, 0, 0.0000000, 0.0000000],
};

// Slug mapping for mueveseguro.cl API
const SLUGS: Record<string, string> = {
  "Banco BCI": "banco-bci",
  "Banco BICE": "banco-bice",
  "Banco de Chile": "banco-de-chile",
  "Banco Estado": "banco-estado",
  "Banco Falabella": "banco-falabella",
  "Banco Internacional": "banco-internacional",
  "Banco Itau": "banco-itau",
  "Banco Ripley": "banco-ripley",
  "Banco Scotiabank": "banco-scotiabank",
  "Condell": "condell",
  "Consorcio": "consorcio",
  "Santander": "santander",
  "Security": "security",
  "Ahorrocoop": "ahorrocoop",
  "Bancrece": "bancrece",
  "Capual": "capual",
  "Coocretal": "coocretal",
  "Coopeuch": "coopeuch",
  "Financoop": "financoop",
  "Libercoop": "libercoop",
  "Oriencoop": "oriencoop",
  "Bansur": "bansur",
  "Coonfia": "coonfia",
  "Solventa": "solventa",
  "Detacoop": "detacoop",
  "Amicar": "amicar",
  "Autofin": "autofin",
  "BK SPA": "bk-spa",
  "Chevrolet": "chevrolet",
  "GM Financial": "gm-financial",
  "Global Soluciones": "global-soluciones-financieras",
  "Mafi": "mafi",
  "Marubeni Credit": "marubeni-credit",
  "Mitsui": "mitsui",
  "Mundo Credito": "mundo-credito",
  "OLX Autos": "olx-autos",
  "Santander Consumer": "santander-consumer",
  "Tanner": "tanner",
  "Unidad Automotriz": "unidad-automotriz",
  "Eurocapital": "eurocapital",
  "Caja 18 de Septiembre": "caja-18-de-septiembre",
  "Caja La Araucana": "caja-la-araucana",
  "Caja Los Andes": "caja-los-andes",
  "Caja Los Heroes": "caja-los-heroes",
};

const CATEGORIAS: { key: string; label: string; instituciones: string[] }[] = [
  {
    key: "banco",
    label: "Banco",
    instituciones: [
      "Banco BCI", "Banco BICE", "Banco de Chile", "Banco Estado",
      "Banco Falabella", "Banco Internacional", "Banco Itau", "Banco Ripley",
      "Banco Scotiabank", "Condell", "Consorcio", "Santander", "Security",
    ],
  },
  {
    key: "cooperativa",
    label: "Cooperativa",
    instituciones: [
      "Ahorrocoop", "Bancrece", "Bansur", "Capual", "Coocretal", "Coonfia",
      "Coopeuch", "Detacoop", "Financoop", "Libercoop", "Oriencoop", "Solventa",
    ],
  },
  {
    key: "automotriz",
    label: "Automotriz",
    instituciones: [
      "Amicar", "Autofin", "BK SPA", "Chevrolet", "Eurocapital",
      "GM Financial", "Global Soluciones", "Mafi", "Marubeni Credit",
      "Mitsui", "Mundo Credito", "OLX Autos", "Santander Consumer",
      "Tanner", "Unidad Automotriz",
    ],
  },
  {
    key: "caja",
    label: "Caja de Compensación",
    instituciones: [
      "Caja 18 de Septiembre", "Caja La Araucana",
      "Caja Los Andes", "Caja Los Heroes",
    ],
  },
];

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

const formatNum = (n: number) => new Intl.NumberFormat("es-CL").format(n);

function calcularDevolucion(
  tipoSeguro: string,
  montoOriginal: number,
  montoPendiente: number,
  cuotasRestantes: number,
  nombreInstitucion: string
) {
  const tasas = TASAS[nombreInstitucion];
  if (!tasas) return null;

  const [r1d, r2d, kDesg, r1c, r2c] = tasas;
  const isCaja = CAJAS.has(nombreInstitucion);
  let desgAmount = 0;
  let deseAmount = 0;

  if (tipoSeguro === "desgravamen" || tipoSeguro === "ambos") {
    if (isCaja) {
      // Cajas are perfectly linear with no offset
      desgAmount = Math.max(0, Math.round(
        (montoOriginal * r1d - montoPendiente * r2d) * cuotasRestantes
      ));
    } else {
      // Non-caja: desg = (cap*r1 - bal*r2) * (q - k) - 19990
      const slope = montoOriginal * r1d - montoPendiente * r2d;
      desgAmount = Math.max(0, Math.round(
        slope * (cuotasRestantes - kDesg) - 19990
      ));
    }
  }
  if (tipoSeguro === "cesantia" || tipoSeguro === "ambos") {
    let raw = (montoOriginal * r1c - montoPendiente * r2c) * cuotasRestantes;
    if (!isCaja) {
      raw *= interpolate(CES_CUOTAS_CORR, cuotasRestantes);
      raw *= interpolate(CES_AMOUNT_CORR, montoOriginal);
    }
    deseAmount = Math.max(0, Math.round(raw));
  }

  return { desgAmount, deseAmount, total: desgAmount + deseAmount };
}

// Custom select component
function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  icon: typeof Building2;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 pl-11 pr-10 py-3.5 rounded-xl border border-border bg-surface text-left text-base transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer hover:border-primary-200"
      >
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <span className={selected ? "text-text font-medium" : "text-text-muted"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1.5 w-full max-h-56 overflow-y-auto rounded-xl border border-border bg-surface shadow-xl shadow-primary-900/10"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors cursor-pointer hover:bg-primary-50 ${
                  value === opt.value
                    ? "bg-primary-50 text-primary font-medium"
                    : "text-text"
                }`}
              >
                {opt.label}
                {value === opt.value && (
                  <Check className="w-4 h-4 text-primary shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default function Simulator() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
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

  const categoria = CATEGORIAS.find((c) => c.key === form.tipo_institucion);
  const isCaja = form.tipo_institucion === "caja";

  // Si es caja, forzar tipo_seguro a desgravamen (no tienen cesantía)
  const tipoSeguroEfectivo = isCaja ? "desgravamen" : form.tipo_seguro;

  // Local formula for instant preview
  const localResultado = useMemo(() => {
    if (
      !tipoSeguroEfectivo ||
      !form.nombre_institucion ||
      form.monto_pendiente <= 0 ||
      form.cuotas_restantes <= 0
    )
      return null;
    return calcularDevolucion(
      tipoSeguroEfectivo,
      form.monto_original,
      form.monto_pendiente,
      form.cuotas_restantes,
      form.nombre_institucion
    );
  }, [
    tipoSeguroEfectivo,
    form.nombre_institucion,
    form.monto_original,
    form.monto_pendiente,
    form.cuotas_restantes,
  ]);

  // API-backed result (overrides local when available)
  const [apiResultado, setApiResultado] = useState<{
    desgAmount: number;
    deseAmount: number;
    total: number;
  } | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (
      !tipoSeguroEfectivo ||
      !form.nombre_institucion ||
      form.monto_pendiente <= 0 ||
      form.cuotas_restantes <= 0 ||
      step !== 3
    ) {
      setApiResultado(null);
      return;
    }

    const slug = SLUGS[form.nombre_institucion];
    if (!slug) {
      setApiResultado(null);
      return;
    }

    // Mark stale but keep showing previous API result until new one arrives
    setApiLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    // Pre-generate discount factor (1.01% – 1.56%) before fetch so it adds no delay
    const discountPct = 0.0101 + Math.random() * 0.0055;
    const factor = 1 - discountPct;

    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const resp = await fetch("/api/simulate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug,
            capital: form.monto_original,
            balance: form.monto_pendiente,
            cuotas: form.cuotas_restantes,
          }),
          signal: controller.signal,
        });
        if (resp.ok) {
          const data = await resp.json();
          let desg = data.desgAmount || 0;
          let dese = data.deseAmount || 0;
          if (tipoSeguroEfectivo === "desgravamen") dese = 0;
          if (tipoSeguroEfectivo === "cesantia") desg = 0;
          // Apply uniform discount so individual amounts sum to total
          desg = Math.round(desg * factor);
          dese = Math.round(dese * factor);
          setApiResultado({ desgAmount: desg, deseAmount: dese, total: desg + dese });
        }
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        // fallback to local on network error
        setApiResultado(null);
      } finally {
        setApiLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [
    tipoSeguroEfectivo,
    form.nombre_institucion,
    form.monto_original,
    form.monto_pendiente,
    form.cuotas_restantes,
    step,
  ]);

  // Use API result when available, otherwise local
  const resultado = apiResultado ?? localResultado;

  const canGoStep2 =
    form.nombre.trim() &&
    form.apellido.trim() &&
    form.email.trim() &&
    form.telefono.trim() &&
    form.acepta_datos &&
    form.acepta_portabilidad;

  const canGoStep3 =
    (isCaja || form.tipo_seguro) &&
    form.tipo_institucion &&
    form.nombre_institucion;

  // Step 1 → 2: create lead in DB with personal data + estado "paso_1"
  const goToStep2 = async () => {
    setStep(2);
    try {
      const { data } = await supabase
        .from("simulation_leads")
        .insert({
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          estado: "paso_1",
          notas: "Datos personales completados",
        })
        .select("id")
        .single();
      if (data?.id) setLeadId(data.id);
    } catch {
      /* non-blocking */
    }
  };

  // Step 2 → 3: update lead with insurance selection
  const goToStep3 = async () => {
    setStep(3);
    if (!leadId) return;
    try {
      await supabase
        .from("simulation_leads")
        .update({
          tipo_credito: form.tipo_institucion,
          notas: `${form.nombre_institucion} | ${tipoSeguroEfectivo}`,
          estado: "paso_2",
        })
        .eq("id", leadId);
    } catch {
      /* non-blocking */
    }
  };

  // Step 3 submit: update lead with simulation results + send email
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updateData = {
        monto_credito: form.monto_original,
        plazo_meses: form.cuotas_restantes,
        prima_seguro: resultado?.total ?? 0,
        ahorro_estimado: resultado?.total ?? 0,
        notas: `${form.nombre_institucion} | ${tipoSeguroEfectivo} | Pend: ${form.monto_pendiente}`,
        estado: "completado",
      };

      if (leadId) {
        await supabase
          .from("simulation_leads")
          .update(updateData)
          .eq("id", leadId);
      } else {
        await supabase.from("simulation_leads").insert({
          ...updateData,
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          tipo_credito: form.tipo_institucion,
        });
      }

      // Send welcome email
      await fetch("/api/new-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
          email: form.email.trim(),
          telefono: form.telefono.trim(),
          tipo_institucion: form.tipo_institucion,
          nombre_institucion: form.nombre_institucion,
          tipo_seguro: tipoSeguroEfectivo,
          monto_original: form.monto_original,
          monto_pendiente: form.monto_pendiente,
          cuotas_restantes: form.cuotas_restantes,
          ahorro_estimado: resultado?.total ?? 0,
          desg_amount: resultado?.desgAmount ?? 0,
          dese_amount: resultado?.deseAmount ?? 0,
        }),
      });

      setSubmitted(true);
    } catch {
      alert("Error al enviar. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base";
  const inputWithIcon = `${inputBase} pl-11`;
  const labelClass = "block text-sm font-medium text-text mb-1.5";

  return (
    <section id="simulador" className="relative py-20 lg:py-32">
      {/* Dark gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-700/20 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Descubre cuánto podrías recuperar
          </h2>
          <p className="mt-4 text-primary-200 text-lg">
            Completa 3 simples pasos y obtendrás una estimación inmediata.
          </p>
        </motion.div>

        {/* Mobile case study - above form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:hidden mb-8 max-w-lg mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                JR
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">Joaquín R.</p>
                <p className="text-xs text-primary-300">Crédito de consumo · Desgravamen y Cesantía</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                <span className="text-xs font-medium text-accent-500">Caso real</span>
              </div>
            </div>
            <p className="text-sm text-primary-200 leading-relaxed mb-3">
              Portó sus seguros de desgravamen y cesantía, recuperó el seguro no devengado y además se cambió a uno más barato.
            </p>
            <div className="flex items-center justify-between bg-accent-50 rounded-xl px-4 py-3 border border-accent-100">
              <div>
                <p className="text-xs text-accent-600 font-medium">Devolución obtenida</p>
                <p className="text-2xl font-bold text-accent-600 tracking-tight">$1.145.384</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted">Proceso</p>
                <p className="text-sm font-semibold text-primary-950">20 días · $0 costo</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Form (3 cols) */}
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
                        {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
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
                {/* PASO 1 */}
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
                      Para simular en línea tu devolución
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
                              autoComplete="given-name"
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
                              autoComplete="family-name"
                              value={form.apellido}
                              onChange={(e) => set("apellido", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Teléfono</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="tel"
                            className={inputWithIcon}
                            placeholder="+56 9 1234 5678"
                            autoComplete="tel"
                            value={form.telefono}
                            onChange={(e) => set("telefono", e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Correo electrónico</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                          <input
                            type="email"
                            className={inputWithIcon}
                            placeholder="juan@email.com"
                            autoComplete="email"
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
                          Autorizo tratamiento para portabilidad y promoción de
                          seguros.
                        </span>
                      </label>
                    </div>

                    <button
                      disabled={!canGoStep2}
                      onClick={goToStep2}
                      className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {/* PASO 2 */}
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
                      Selecciona el tipo de seguro e institución
                    </p>

                    <div className="space-y-4">
                      {/* Tipo de seguro */}
                      {!isCaja && (
                        <div>
                          <label className={labelClass}>Tipo de seguro</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: "desgravamen", label: "Desgravamen" },
                              { value: "cesantia", label: "Cesantía" },
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
                      )}

                      {/* Tipo de institución */}
                      <div>
                        <label className={labelClass}>
                          Tipo de institución
                        </label>
                        <CustomSelect
                          value={form.tipo_institucion}
                          onChange={(v) => {
                            set("tipo_institucion", v);
                            set("nombre_institucion", "");
                            // Si es caja, limpiar tipo_seguro
                            if (v === "caja") set("tipo_seguro", "");
                          }}
                          options={CATEGORIAS.map((c) => ({
                            value: c.key,
                            label: c.label,
                          }))}
                          placeholder="Selecciona tipo"
                          icon={Building2}
                        />
                      </div>

                      {/* Nombre de institución */}
                      {categoria && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.2 }}
                        >
                          <label className={labelClass}>
                            Nombre de institución
                          </label>
                          <CustomSelect
                            value={form.nombre_institucion}
                            onChange={(v) => set("nombre_institucion", v)}
                            options={categoria.instituciones.map((name) => ({
                              value: name,
                              label: name,
                            }))}
                            placeholder="Selecciona institución"
                            icon={Shield}
                          />
                        </motion.div>
                      )}

                      {isCaja && (
                        <div className="p-3 rounded-lg bg-primary-50 border border-primary-200">
                          <p className="text-xs text-primary-700">
                            Las Cajas de Compensación solo tienen seguro de
                            desgravamen.
                          </p>
                        </div>
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
                        onClick={goToStep3}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-text-inverse btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Simular devolución
                        <Calculator className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* PASO 3 */}
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

                    {/* Resultado inline */}
                    {apiLoading && !resultado && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-5 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 flex items-center justify-center gap-3"
                      >
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        <p className="text-sm font-medium text-primary-950">Calculando devolución...</p>
                      </motion.div>
                    )}
                    {resultado && resultado.total > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-5 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 transition-opacity ${apiLoading ? "opacity-60" : ""}`}
                      >
                        <p className="text-xs text-text-muted mb-0.5 flex items-center gap-2">
                          A recuperar por:
                          {apiLoading && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                        </p>
                        {resultado.desgAmount > 0 && (
                          <p className="text-sm text-text-secondary">
                            Desgravamen: {formatCLP(resultado.desgAmount)}
                          </p>
                        )}
                        {resultado.deseAmount > 0 && (
                          <p className="text-sm text-text-secondary">
                            Cesantía: {formatCLP(resultado.deseAmount)}
                          </p>
                        )}
                        <p className="text-2xl sm:text-3xl font-bold text-primary-950 mt-2">
                          Total: {formatCLP(resultado.total)}
                        </p>
                        <p className="text-[10px] text-text-muted mt-2">
                          * Monto referencial sujeto a confirmación.
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
                      ¡Solicitud recibida!
                    </h3>
                    <p className="text-text-secondary text-sm max-w-sm mx-auto leading-relaxed">
                      Nuestro equipo analizará tu caso y te contactará a la
                      brevedad con los detalles de tu devolución.
                    </p>
                    {resultado && (
                      <div className="mt-5 p-4 rounded-xl bg-primary-50 border border-primary-200">
                        <p className="text-xs text-text-muted">
                          Devolución estimada
                        </p>
                        <p className="text-2xl font-bold text-primary-950 mt-1">
                          {formatCLP(resultado.total)}
                        </p>
                      </div>
                    )}

                    <a
                      href={`https://wa.me/56994313356?text=${encodeURIComponent(
                        `Hola, acabo de simular mi portabilidad en rebajatuseguro.cl.\n\nMe llamo ${form.nombre} ${form.apellido}.\nInstitución: ${form.nombre_institucion}\nDevolución estimada: ${formatCLP(resultado?.total ?? 0)}\n\nQuiero continuar con el proceso.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex items-center gap-3 w-full px-6 py-4 rounded-2xl text-white font-semibold text-[15px] transition-all hover:brightness-110 cursor-pointer"
                      style={{ background: "#25D366" }}
                    >
                      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 fill-white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Continúa el proceso por WhatsApp de forma rápida
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sidebar derecho (desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 hidden lg:block"
          >
            {/* Joaquín case study - desktop */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                <p className="text-sm font-medium text-accent-500">Caso real</p>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-base font-bold text-white shrink-0">
                  JR
                </div>
                <div>
                  <p className="font-semibold text-white">Joaquín R.</p>
                  <p className="text-xs text-primary-300">Crédito de consumo</p>
                </div>
              </div>
              <p className="text-sm text-primary-200 leading-relaxed mb-4">
                Portó sus seguros de desgravamen y cesantía, recuperó el seguro no devengado y además se cambió a uno más barato.
              </p>
              <div className="bg-accent-50 rounded-xl p-4 mb-4 border border-accent-100">
                <p className="text-xs text-accent-600 font-medium mb-0.5">Devolución obtenida</p>
                <p className="text-3xl font-bold text-accent-600 tracking-tight">$1.145.384</p>
                <p className="text-xs text-text-muted mt-1">Desgravamen + Cesantía</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">20 días</p>
                  <p className="text-xs text-primary-300">Proceso</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">$0</p>
                  <p className="text-xs text-primary-300">Costo</p>
                </div>
              </div>
            </div>

            {apiLoading && !resultado && step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center py-10">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-300 mb-3" />
                  <p className="text-sm font-medium text-white">Calculando devolución...</p>
                </div>
              </motion.div>
            )}
            {resultado && resultado.total > 0 && step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-opacity ${apiLoading ? "opacity-60" : ""}`}>
                  <p className="text-sm text-primary-300 mb-1 flex items-center gap-2">
                    Tu devolución estimada
                    {apiLoading && <Loader2 className="w-3.5 h-3.5 animate-spin text-primary-300" />}
                  </p>
                  <p className="text-4xl font-bold text-white tracking-tight">
                    {formatCLP(resultado.total)}
                  </p>
                  <div className="mt-4">
                    {resultado.desgAmount > 0 && (
                      <div className="flex justify-between items-center py-2.5 border-t border-white/10">
                        <span className="text-sm text-primary-200">
                          Desgravamen
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {formatCLP(resultado.desgAmount)}
                        </span>
                      </div>
                    )}
                    {resultado.deseAmount > 0 && (
                      <div className="flex justify-between items-center py-2.5 border-t border-white/10">
                        <span className="text-sm text-primary-200">
                          Cesantía
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {formatCLP(resultado.deseAmount)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-primary-300">
                      Institución: {form.nombre_institucion}
                    </p>
                  </div>
                  <p className="mt-2 text-[10px] text-primary-400">
                    * Monto referencial sujeto a confirmación. El valor
                    definitivo será entregado en la evaluación final.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="space-y-3">
              {[
                "Análisis gratuito y sin compromiso",
                "Te contactamos en menos de 24 horas",
                "Quedas con tu seguro vigente",
                "No aplica para créditos hipotecarios",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white mt-0.5 shrink-0" />
                  <span className="text-primary-200 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
