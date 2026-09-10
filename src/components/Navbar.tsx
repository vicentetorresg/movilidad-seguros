"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { href: "#simulador", label: "Simula tu Devolución" },
  { href: "#como-funciona", label: "Cómo Funciona" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <a href="#" className="flex items-center gap-2.5 cursor-pointer">
            <Image
              src="/rebajatuseguro-logo.svg"
              alt="Rebaja Tu Seguro"
              width={180}
              height={34}
              className="h-6 sm:h-8 w-auto"
              priority
            />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary-700 transition-colors rounded-lg hover:bg-primary-50 cursor-pointer"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#simulador"
              className="ml-4 px-6 py-2.5 rounded-xl text-sm font-semibold btn-primary"
            >
              Simular ahora
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? (
              <X className="w-6 h-6 text-text" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-surface border-t border-border-light shadow-lg">
          <div className="px-4 py-5 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-xl transition-colors cursor-pointer"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#simulador"
              onClick={() => setOpen(false)}
              className="block w-full text-center mt-3 px-6 py-3 rounded-xl text-sm font-semibold btn-primary cursor-pointer"
            >
              Simular ahora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
