import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Movilidad<span className="text-primary-600">Seguros</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <a href="#simulador" className="hover:text-gray-600 transition-colors">
              Simulador
            </a>
            <a href="#como-funciona" className="hover:text-gray-600 transition-colors">
              Como funciona
            </a>
            <a href="#servicios" className="hover:text-gray-600 transition-colors">
              Servicios
            </a>
            <a href="#nosotros" className="hover:text-gray-600 transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="hover:text-gray-600 transition-colors">
              Contacto
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-300">
            &copy; {new Date().getFullYear()} Movilidad Seguros. Todos los
            derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-gray-300">
            <a href="#" className="hover:text-gray-500 transition-colors">
              Politica de privacidad
            </a>
            <a href="#" className="hover:text-gray-500 transition-colors">
              Terminos y condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
