import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Rebaja Tu Seguro",
  description:
    "Política de privacidad y protección de datos personales de Fortex Corredora de Seguros SpA.",
};

export default function Privacidad() {
  return (
    <main className="min-h-dvh bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <Link
          href="/"
          className="inline-block text-sm text-primary font-medium mb-8 hover:underline"
        >
          &larr; Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold text-primary-950 mb-2">
          Política de Privacidad
        </h1>
        <p className="text-sm text-text-muted mb-10">
          Última actualización: septiembre 2026
        </p>

        <div className="prose-legal">
          <h2>1. Identificación del responsable</h2>
          <p>
            <strong>Fortex Corredora de Seguros SpA</strong>, RUT
            78.452.756-5, con domicilio en Apoquindo 6410, Of. 1404, Las
            Condes, Santiago, Chile (en adelante, &ldquo;la Empresa&rdquo;),
            es responsable del tratamiento de los datos personales recopilados
            a través del sitio web rebajatuseguro.cl.
          </p>

          <h2>2. Datos que recopilamos</h2>
          <p>Recopilamos los siguientes datos personales:</p>
          <ul>
            <li>Nombre y apellido</li>
            <li>Correo electrónico</li>
            <li>Número de teléfono</li>
            <li>
              Información financiera proporcionada voluntariamente en el
              simulador: tipo de crédito, institución financiera, montos y
              plazos
            </li>
          </ul>

          <h2>3. Finalidad del tratamiento</h2>
          <p>Los datos personales serán utilizados para:</p>
          <ul>
            <li>
              Realizar simulaciones de portabilidad de seguros asociados a
              créditos
            </li>
            <li>
              Contactar al usuario para informar sobre los resultados de su
              simulación
            </li>
            <li>
              Gestionar el proceso de portabilidad de seguros cuando el
              usuario lo solicite
            </li>
            <li>
              Enviar comunicaciones relacionadas con el servicio contratado
            </li>
          </ul>

          <h2>4. Base legal</h2>
          <p>
            El tratamiento de datos se realiza con base en el consentimiento
            expreso otorgado por el usuario al completar el formulario de
            simulación, de conformidad con la Ley N° 19.628 sobre Protección
            de la Vida Privada y sus modificaciones posteriores.
          </p>

          <h2>5. Compartición de datos</h2>
          <p>
            Los datos personales podrán ser compartidos con compañías
            aseguradoras y entidades financieras exclusivamente para efectos
            de gestionar la portabilidad del seguro solicitada por el usuario.
            No vendemos ni cedemos datos personales a terceros con fines
            comerciales no relacionados al servicio.
          </p>

          <h2>6. Almacenamiento y seguridad</h2>
          <p>
            Los datos son almacenados en servidores seguros con cifrado en
            tránsito y en reposo. Implementamos medidas técnicas y
            organizativas para proteger la información contra acceso no
            autorizado, pérdida o alteración.
          </p>

          <h2>7. Plazo de conservación</h2>
          <p>
            Los datos personales serán conservados mientras exista una
            relación comercial activa con el usuario y, una vez finalizada,
            durante el plazo necesario para cumplir con obligaciones legales
            aplicables.
          </p>

          <h2>8. Derechos del titular</h2>
          <p>
            De acuerdo con la legislación vigente, el titular de los datos
            puede ejercer los siguientes derechos:
          </p>
          <ul>
            <li>Acceder a sus datos personales</li>
            <li>Rectificar datos inexactos o incompletos</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Revocar el consentimiento otorgado</li>
          </ul>
          <p>
            Para ejercer estos derechos, puede escribir a{" "}
            <a href="mailto:contacto@rebajatuseguro.cl">
              contacto@rebajatuseguro.cl
            </a>
            .
          </p>

          <h2>9. Cookies</h2>
          <p>
            Este sitio web puede utilizar cookies técnicas necesarias para su
            funcionamiento. No utilizamos cookies de seguimiento publicitario
            de terceros sin consentimiento previo del usuario.
          </p>

          <h2>10. Modificaciones</h2>
          <p>
            La Empresa se reserva el derecho de actualizar esta política en
            cualquier momento. Las modificaciones serán publicadas en esta
            misma página con la fecha de última actualización.
          </p>

          <h2>11. Contacto</h2>
          <p>
            Para consultas sobre esta política de privacidad, puede
            contactarnos en:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:contacto@rebajatuseguro.cl">
                contacto@rebajatuseguro.cl
              </a>
            </li>
            <li>Dirección: Apoquindo 6410, Of. 1404, Las Condes, Santiago</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
