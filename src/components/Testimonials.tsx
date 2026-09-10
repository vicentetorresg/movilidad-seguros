"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Carolina M.",
    role: "Credito de consumo",
    text: "Recupere mas de $380.000 de mi seguro. El proceso fue super rapido y nunca perdi cobertura. Totalmente recomendado.",
    rating: 5,
    initials: "CM",
  },
  {
    name: "Roberto S.",
    role: "Credito automotriz",
    text: "No sabia que podia portar mi seguro del credito del auto. Me devolvieron plata y ahora pago menos de prima mensual.",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Patricia L.",
    role: "Credito de consumo",
    text: "Excelente servicio. Me explicaron todo paso a paso y en menos de 3 semanas ya tenia la devolucion en mi cuenta.",
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-50 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-950 tracking-tight">
            Historias de exito
          </h2>
          <p className="mt-4 text-text-secondary text-lg">
            Miles de personas ya han recuperado su dinero con nosotros.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="bg-surface rounded-2xl p-8 border border-border-light shadow-sm hover:shadow-lg hover:shadow-primary-100/20 transition-all duration-300 relative"
            >
              <Quote className="w-8 h-8 text-primary-100 absolute top-6 right-6" />
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-text-secondary leading-relaxed text-[15px] mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-primary-950 text-sm">
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
