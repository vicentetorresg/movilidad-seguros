"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Carolina M.",
    role: "Crédito de consumo",
    text: "Recuperé más de $380.000 de mi seguro. El proceso fue súper rápido y nunca perdí cobertura. Totalmente recomendado.",
    rating: 5,
    initials: "CM",
  },
  {
    name: "Roberto S.",
    role: "Crédito automotriz",
    text: "No sabía que podía portar mi seguro del crédito del auto. Me devolvieron plata y ahora pago menos de prima mensual.",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Patricia L.",
    role: "Crédito de consumo",
    text: "Excelente servicio. Me explicaron todo paso a paso y en menos de 3 semanas ya tenía la devolución en mi cuenta.",
    rating: 5,
    initials: "PL",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
              Historias de éxito
            </h2>
            <p className="mt-2 text-text-secondary text-lg">
              Miles de personas ya han recuperado su dinero con nosotros.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-text-muted shrink-0">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-medium text-primary-950">4.9</span>
            <span>promedio</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface-secondary rounded-2xl p-7 relative"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-text leading-relaxed text-[15px] mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-border-light">
                <div className="w-9 h-9 rounded-full bg-primary-950 flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-primary-950 text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
