"use client";

import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const channels = [
  {
    icon: Phone,
    title: "Teléfono",
    detail: "+56 9 9431 3356",
    href: "tel:+56994313356",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "contacto@rebajatuseguro.cl",
    href: "mailto:contacto@rebajatuseguro.cl",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Escríbenos directo",
    href: "https://wa.me/56994313356?text=Hola%2C%20quiero%20información%20sobre%20portabilidad%20de%20seguros",
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-secondary/50 to-surface" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary-600 text-sm font-semibold tracking-wide uppercase mb-3">
              Contacto
            </p>
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-14 grid sm:grid-cols-3 gap-4"
          >
            {channels.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group p-6 rounded-2xl bg-surface border border-border-light hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 group-hover:bg-primary flex items-center justify-center transition-colors duration-300 mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="font-semibold text-primary-950 text-sm">
                  {item.title}
                </p>
                <p className="text-text-muted text-sm mt-1">{item.detail}</p>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
