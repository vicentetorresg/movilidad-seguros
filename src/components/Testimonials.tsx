"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Carolina M.",
    role: "Credito de consumo",
    text: "Recupere mas de $380.000 de mi seguro. El proceso fue super rapido y nunca perdi cobertura. Totalmente recomendado.",
    rating: 5,
  },
  {
    name: "Roberto S.",
    role: "Credito automotriz",
    text: "No sabia que podia portar mi seguro del credito del auto. Me devolvieron plata y ahora pago menos de prima mensual.",
    rating: 5,
  },
  {
    name: "Patricia L.",
    role: "Credito de consumo",
    text: "Excelente servicio. Me explicaron todo paso a paso y en menos de 3 semanas ya tenia la devolucion en mi cuenta.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-dark-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">
            Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-950 tracking-tight">
            Historias de exito
          </h2>
          <p className="mt-4 text-dark-400 text-lg">
            Miles de personas ya han recuperado su dinero con nosotros.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="bg-white rounded-3xl p-8 border border-dark-100 relative"
            >
              <Quote className="w-10 h-10 text-primary-100 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-dark-600 leading-relaxed text-sm mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="font-bold text-dark-950">{t.name}</p>
                <p className="text-sm text-dark-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
