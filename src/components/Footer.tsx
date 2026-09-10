import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/rebajatuseguro-logo.svg"
              alt="Rebaja Tu Seguro"
              width={160}
              height={30}
              className="h-7 w-auto brightness-0 invert"
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
          <p className="text-xs text-primary-400">
            &copy; {new Date().getFullYear()} Movilidad Seguros — Todos los
            derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-primary-400">
            <a
              href="#"
              className="hover:text-primary-200 transition-colors cursor-pointer"
            >
              Política de privacidad
            </a>
            <a
              href="#"
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
