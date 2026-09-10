import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Rebaja Tu Seguro",
  description:
    "Términos y condiciones de uso del sitio web rebajatuseguro.cl, operado por Fortex Corredora de Seguros SpA.",
};

export default function Terminos() {
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
          Términos y Condiciones
        </h1>
        <p className="text-sm text-text-muted mb-10">
          Última actualización: septiembre 2026
        </p>

        <div className="prose-legal">
          <h2>1. Identificación</h2>
          <p>
            El sitio web rebajatuseguro.cl es operado por{" "}
            <strong>Fortex Corredora de Seguros SpA</strong>, RUT
            78.452.756-5, con domicilio en Apoquindo 6410, Of. 1404, Las
            Condes, Santiago, Chile.
          </p>

          <h2>2. Objeto del servicio</h2>
          <p>
            Rebaja Tu Seguro es una plataforma que permite a los usuarios
            simular la portabilidad de seguros asociados a créditos de consumo
            y automotriz, con el objetivo de obtener mejores condiciones y/o
            recuperar dinero a través del proceso de portabilidad establecido
            por la normativa chilena.
          </p>

          <h2>3. Naturaleza del simulador</h2>
          <p>
            El simulador disponible en el sitio web entrega{" "}
            <strong>estimaciones referenciales</strong> basadas en la
            información proporcionada por el usuario. Los montos mostrados no
            constituyen una oferta vinculante ni garantía de devolución. El
            monto definitivo será determinado tras la evaluación formal del
            caso por parte de la Empresa y las compañías aseguradoras
            involucradas.
          </p>

          <h2>4. Requisitos del usuario</h2>
          <p>Para utilizar los servicios, el usuario debe:</p>
          <ul>
            <li>Ser mayor de 18 años</li>
            <li>Ser titular de un crédito con seguro asociado vigente</li>
            <li>
              Proporcionar información veraz y completa en los formularios
            </li>
            <li>
              Otorgar las autorizaciones necesarias para la gestión de
              portabilidad
            </li>
          </ul>

          <h2>5. Proceso de portabilidad</h2>
          <p>
            Una vez que el usuario solicita la portabilidad, la Empresa
            gestionará el proceso ante las compañías aseguradoras
            correspondientes. El usuario será informado en cada etapa del
            proceso y deberá firmar los documentos necesarios para autorizar
            la gestión.
          </p>

          <h2>6. Honorarios</h2>
          <p>
            La simulación y el análisis inicial son gratuitos. Los honorarios
            por la gestión de portabilidad serán informados al usuario antes
            de iniciar el proceso formal y estarán sujetos a su aceptación
            expresa. La Empresa solo cobrará en caso de que la portabilidad
            resulte exitosa.
          </p>

          <h2>7. Responsabilidad</h2>
          <p>La Empresa no será responsable por:</p>
          <ul>
            <li>
              Información incorrecta o incompleta proporcionada por el
              usuario
            </li>
            <li>
              Decisiones de las compañías aseguradoras que escapen al control
              de la Empresa
            </li>
            <li>
              Diferencias entre los montos estimados en el simulador y los
              montos definitivos
            </li>
            <li>
              Interrupciones del servicio por causas de fuerza mayor o
              mantenimiento técnico
            </li>
          </ul>

          <h2>8. Propiedad intelectual</h2>
          <p>
            Todo el contenido del sitio web, incluyendo textos, diseños,
            logotipos, marcas y software, es propiedad de Fortex Corredora de
            Seguros SpA o de sus licenciantes y está protegido por la
            legislación de propiedad intelectual vigente.
          </p>

          <h2>9. Protección de datos</h2>
          <p>
            El tratamiento de datos personales se rige por nuestra{" "}
            <Link href="/privacidad" className="text-primary hover:underline">
              Política de Privacidad
            </Link>
            , la cual forma parte integral de estos términos y condiciones.
          </p>

          <h2>10. Legislación aplicable</h2>
          <p>
            Estos términos y condiciones se rigen por las leyes de la
            República de Chile. Cualquier controversia será sometida a la
            jurisdicción de los tribunales ordinarios de justicia de Santiago,
            Chile.
          </p>

          <h2>11. Modificaciones</h2>
          <p>
            La Empresa se reserva el derecho de modificar estos términos y
            condiciones en cualquier momento. Las modificaciones entrarán en
            vigencia desde su publicación en el sitio web. El uso continuado
            del servicio implica la aceptación de los términos vigentes.
          </p>

          <h2>12. Contacto</h2>
          <p>
            Para consultas sobre estos términos, puede contactarnos en:
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
