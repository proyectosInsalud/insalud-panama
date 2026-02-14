import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { nombres, telefono, turno, gestorEmail, gestorNombre, tratamiento, sede } = await req.json();

    if (!nombres || !telefono || !turno) {
      return NextResponse.json({ mensaje: "Missing required fields" }, { status: 400 });
    }

    const destinatario = gestorEmail || process.env.SMTP_USER;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: destinatario,
      subject: `Nuevo Lead - ${tratamiento || "Consulta"}${sede ? ` - ${sede}` : ""}`,
      html: `<p>Lead nuevo</p><p>Nombre: ${nombres}</p><p>Telefono: ${telefono}</p><p>Turno: ${turno}</p><p>Gestor: ${gestorNombre || "N/A"}</p>`,
    });

    return NextResponse.json({ mensaje: "Correo enviado correctamente", destinatario, gestor: gestorNombre || "Gestor por defecto" }, { status: 200 });
  } catch {
    return NextResponse.json({ mensaje: "Error al enviar el correo" }, { status: 500 });
  }
}
