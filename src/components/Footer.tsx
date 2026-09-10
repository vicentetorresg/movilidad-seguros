import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-text-inverse" />
            </div>
            <span className="text-lg font-bold text-text-inverse tracking-tight">
              Movilidad Seguros
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-300">
            {[
              ["#simulador", "Simulador"],
              ["#como-funciona", "Como funciona"],
              ["#servicios", "Servicios"],
              ["#nosotros", "Nosotros"],
              ["#contacto", "Contacto"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="hover:text-text-inverse transition-colors cursor-pointer"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-400">
            &copy; {new Date().getFullYear()} Movilidad Seguros. Todos los
            derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-primary-400">
            <a
              href="#"
              className="hover:text-primary-200 transition-colors cursor-pointer"
            >
              Politica de privacidad
            </a>
            <a
              href="#"
              className="hover:text-primary-200 transition-colors cursor-pointer"
            >
              Terminos y condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
