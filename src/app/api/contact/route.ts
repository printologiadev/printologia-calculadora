import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations';
import { ContactFormData } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validar los datos del formulario
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = validationResult.data;

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Printología <contacto@printologia.com.mx>',
      to: ['contacto@printologia.com.mx'], // Cambia esto por tu email real
      subject: `Nuevo mensaje de contacto - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Nuevo mensaje de contacto</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #666; }
              .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #3b82f6; }
              .message { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #8b5cf6; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🖨️ Nuevo Mensaje de Contacto</h1>
                <p>Printología - Impresión de Gran Formato</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">👤 Nombre:</div>
                  <div class="value">${name}</div>
                </div>

                <div class="field">
                  <div class="label">📧 Email:</div>
                  <div class="value">${email}</div>
                </div>

                <div class="field">
                  <div class="label">📱 Teléfono:</div>
                  <div class="value">${phone || 'No proporcionado'}</div>
                </div>

                <div class="field">
                  <div class="label">💬 Mensaje:</div>
                  <div class="message">${message}</div>
                </div>

                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

                <p style="color: #666; font-size: 14px; text-align: center;">
                  Este mensaje fue enviado desde el formulario de contacto de Printología.<br>
                  Por favor responde lo antes posible para atender la consulta del cliente.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      replyTo: email, // Permite responder directamente al cliente
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email enviado exitosamente',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}