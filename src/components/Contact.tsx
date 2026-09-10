"use client";

import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const info = [
  {
    icon: MapPin,
    title: "Oficina",
    detail: "Apoquindo 6410, Of. 1404, Las Condes",
  },
  {
    icon: Phone,
    title: "Telefono",
    detail: "+56 9 0000 0000",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "contacto@movilidadseguros.cl",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Escribenos directo",
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            Conversemos sobre tu caso
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Nuestro equipo esta listo para ayudarte a recuperar tu dinero.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-surface border border-border-light shadow-sm hover:shadow-lg hover:shadow-primary-100/20 hover:border-primary-200 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold text-primary-950 text-sm">
                {item.title}
              </p>
              <p className="text-text-muted text-sm mt-1">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#simulador"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full btn-primary text-base cursor-pointer"
          >
            Simula tu devolucion ahora
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
