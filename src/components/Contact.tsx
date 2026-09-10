"use client";

import { MapPin, Phone, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
              Conversemos sobre tu caso
            </h2>
            <p className="mt-4 text-text-secondary text-lg leading-relaxed">
              Nuestro equipo está listo para ayudarte a recuperar tu dinero.
              Contáctanos por el canal que prefieras.
            </p>
            <a
              href="#simulador"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl btn-primary text-base cursor-pointer"
            >
              Simula tu devolución ahora
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                icon: MapPin,
                title: "Oficina",
                detail: "Apoquindo 6410, Of. 1404, Las Condes",
              },
              {
                icon: Phone,
                title: "Teléfono",
                detail: "+56 9 0000 0000",
              },
              {
                icon: Mail,
                title: "Email",
                detail: "contacto@rebajatuseguro.cl",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                detail: "Escríbenos directo",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-surface-secondary"
              >
                <item.icon className="w-5 h-5 text-primary mb-3" />
                <p className="font-semibold text-primary-950 text-sm">
                  {item.title}
                </p>
                <p className="text-text-muted text-sm mt-1">{item.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
