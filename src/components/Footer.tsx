import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/rebajatuseguro-logo-white.svg"
              alt="Rebaja Tu Seguro"
              width={160}
              height={30}
              className="h-7 w-auto"
            />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary-300">
            {[
              ["#simulador", "Simulador"],
              ["#como-funciona", "Cómo funciona"],
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
          <div className="text-xs text-primary-400 text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()} Fortex Corredora de Seguros SpA
              — RUT 78.452.756-5
            </p>
            <p className="mt-0.5">
              Rebaja Tu Seguro es una marca de Fortex Corredora de Seguros SpA. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex gap-6 text-xs text-primary-400">
            <a
              href="/privacidad"
              className="hover:text-primary-200 transition-colors cursor-pointer"
            >
              Política de privacidad
            </a>
            <a
              href="/terminos"
              className="hover:text-primary-200 transition-colors cursor-pointer"
            >
              Términos y condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
