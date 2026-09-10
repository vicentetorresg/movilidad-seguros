import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nombre,
      apellido,
      email,
      telefono,
      tipo_institucion,
      nombre_institucion,
      tipo_seguro,
      monto_original,
      monto_pendiente,
      cuotas_restantes,
      ahorro_estimado,
      desg_amount,
      dese_amount,
    } = body;

    const formatCLP = (n: number) =>
      new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
      }).format(n);

    // Email al cliente
    await resend.emails.send({
      from: "Movilidad Seguros <notificaciones@rebajatuseguro.cl>",
      to: email,
      cc: "contacto@rebajatuseguro.cl",
      subject: `${nombre}, tu simulación de portabilidad está lista`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f0f9ff;font-family:'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(3,105,161,0.08)">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#0369A1 0%,#0EA5E9 100%);padding:32px 24px;text-align:center">
        <h1 style="color:#fff;font-size:22px;margin:0">Movilidad Seguros</h1>
        <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:8px 0 0">Portabilidad de Seguros</p>
      </div>

      <!-- Body -->
      <div style="padding:32px 24px">
        <h2 style="color:#0c4a6e;font-size:18px;margin:0 0 8px">Hola ${nombre} ${apellido},</h2>
        <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px">
          Recibimos tu simulación de portabilidad de seguros. Aquí tienes un resumen de lo que podrías recuperar:
        </p>

        <!-- Resultado -->
        <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px">
          <p style="color:#64748b;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px">Devolución estimada</p>
          <p style="color:#0c4a6e;font-size:36px;font-weight:700;margin:0">${formatCLP(ahorro_estimado)}</p>
          ${desg_amount > 0 ? `<p style="color:#64748b;font-size:13px;margin:8px 0 0">Desgravamen: ${formatCLP(desg_amount)}</p>` : ""}
          ${dese_amount > 0 ? `<p style="color:#64748b;font-size:13px;margin:4px 0 0">Cesantía: ${formatCLP(dese_amount)}</p>` : ""}
        </div>

        <!-- Detalles -->
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px">Institución</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0c4a6e;font-size:13px;font-weight:600;text-align:right">${nombre_institucion}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px">Tipo</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0c4a6e;font-size:13px;font-weight:600;text-align:right">${tipo_institucion} / ${tipo_seguro}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px">Monto original</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0c4a6e;font-size:13px;font-weight:600;text-align:right">${formatCLP(monto_original)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px">Saldo pendiente</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0c4a6e;font-size:13px;font-weight:600;text-align:right">${formatCLP(monto_pendiente)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#64748b;font-size:13px">Cuotas restantes</td>
            <td style="padding:10px 0;color:#0c4a6e;font-size:13px;font-weight:600;text-align:right">${cuotas_restantes}</td>
          </tr>
        </table>

        <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px">
          Nuestro equipo analizará tu caso y te contactará a la brevedad para confirmar el monto exacto de tu devolución.
        </p>

        <div style="text-align:center">
          <a href="https://www.rebajatuseguro.cl/#contacto" style="display:inline-block;background:linear-gradient(135deg,#0369A1,#0EA5E9);color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:600">Contáctanos</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:20px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center">
        <p style="color:#94a3b8;font-size:11px;margin:0">* Monto referencial sujeto a confirmación.</p>
        <p style="color:#94a3b8;font-size:11px;margin:4px 0 0">Movilidad Seguros | Apoquindo 6410, Of. 1404, Las Condes</p>
      </div>
    </div>
  </div>
</body>
</html>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Error sending email" },
      { status: 500 }
    );
  }
}
