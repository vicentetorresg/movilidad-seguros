"use client";

import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
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
    <section id="contacto" className="py-24 gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-accent-400 uppercase tracking-wider mb-3">
            Contacto
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Conversemos sobre tu caso
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Nuestro equipo esta listo para ayudarte a recuperar tu dinero.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-accent-400" />
              </div>
              <p className="font-semibold text-white text-sm">{item.title}</p>
              <p className="text-white/60 text-sm mt-1">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#simulador"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary-700 font-semibold hover:bg-white/90 transition-colors"
          >
            Simula tu devolucion ahora
          </a>
        </div>
      </div>
    </section>
  );
}
