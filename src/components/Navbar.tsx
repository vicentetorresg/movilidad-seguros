"use client";

import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";

const links = [
  { href: "#simulador", label: "Simulador" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-dark-950 tracking-tight">
              Movilidad<span className="text-primary-600">Seguros</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-dark-500 hover:text-primary-600 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#simulador"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-primary hover:opacity-90 transition-opacity"
            >
              Simular ahora
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-dark-100">
          <div className="px-4 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-dark-600 hover:text-primary-600"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#simulador"
              onClick={() => setOpen(false)}
              className="block w-full text-center px-5 py-2.5 rounded-full text-sm font-semibold text-white gradient-primary"
            >
              Simular ahora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
