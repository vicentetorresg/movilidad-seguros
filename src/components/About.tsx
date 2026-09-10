"use client";

import { Building2, Users, TrendingUp, Award, MapPin, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { icon: Users, value: "+2.500", label: "Clientes atendidos" },
  { icon: TrendingUp, value: "$850M+", label: "Devueltos a clientes" },
  { icon: Award, value: "100%", label: "Proceso legal" },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-primary-600 text-sm font-semibold tracking-wide uppercase mb-3">
            Quiénes somos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            Expertos en portabilidad de seguros
          </h2>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Somos una empresa especializada en el mercado asegurador chileno,
            dedicada a empoderar a las personas para que optimicen sus finanzas
            personales sin perder cobertura.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-surface border border-border-light"
            >
              <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                <m.icon className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-primary-950">
                {m.value}
              </p>
              <p className="text-sm text-text-muted mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Office card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-950 rounded-2xl p-8 sm:p-10"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <Building2 className="w-7 h-7 text-primary-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-1">Oficinas centrales</h3>
              <p className="text-primary-300 text-sm">
                Donde nos encuentras
              </p>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">Dirección</p>
                <p className="text-sm text-primary-300 mt-1">
                  Apoquindo 6410, Of. 1404<br />
                  Las Condes, Santiago<br />
                  🚇 Metro Manquehue
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">Email</p>
                <p className="text-sm text-primary-300 mt-1">
                  contacto@rebajatuseguro.cl
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white">Horario</p>
                <p className="text-sm text-primary-300 mt-1">
                  Lunes a viernes<br />
                  9:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
