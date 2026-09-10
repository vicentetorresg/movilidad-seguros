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
    <section id="contacto" className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
            Contacto
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Conversemos sobre tu caso
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
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
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-100 transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary-600" />
              </div>
              <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
              <p className="text-gray-400 text-sm mt-1">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#simulador"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/20"
          >
            Simula tu devolucion ahora
          </a>
        </div>
      </div>
    </section>
  );
}
