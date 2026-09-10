"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Carolina M.",
    role: "Crédito de consumo",
    text: "Recuperé más de $380.000 de mi seguro. El proceso fue súper rápido y nunca perdí cobertura. Totalmente recomendado.",
    amount: "$380.000",
    rating: 5,
    initials: "CM",
  },
  {
    name: "Roberto S.",
    role: "Crédito automotriz",
    text: "No sabía que podía portar mi seguro del crédito del auto. Me devolvieron plata y ahora pago menos de prima mensual.",
    amount: "$520.000",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Patricia L.",
    role: "Crédito de consumo",
    text: "Excelente servicio. Me explicaron todo paso a paso y en menos de 3 semanas ya tenía la devolución en mi cuenta.",
    amount: "$290.000",
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
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-primary-600 text-sm font-semibold tracking-wide uppercase mb-3">
            Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            Historias de éxito
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Miles de personas ya han recuperado su dinero con nosotros.
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-4 text-sm text-text-muted">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-primary-950">4.9</span>
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
              className="relative rounded-2xl bg-surface border border-border-light p-7 hover:shadow-xl hover:shadow-primary-900/5 hover:border-primary-100 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-primary-100 mb-4" />

              <p className="text-text leading-relaxed text-[15px] mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="bg-primary-50 rounded-xl px-4 py-2.5 mb-6 inline-flex items-center gap-2">
                <span className="text-xs text-primary-600 font-medium">Recuperó</span>
                <span className="text-sm font-bold text-primary-700">{t.amount}</span>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-border-light">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-primary-950 text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
