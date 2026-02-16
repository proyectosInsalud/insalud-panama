Servicios y flujo del proyecto
==============================

1. Arquitectura y stack
-----------------------
- Framework: Next.js (App Router).
- UI y animaciones: Tailwind + Framer Motion.
- Formularios: react-hook-form + zod.
- Email saliente: Nodemailer vía `/api/mail` (SMTP).
- Registro de leads en Google Sheets: API interna `/api/leads` que reenvía a un Web App de Google Apps Script (solo server-side).
- Contacto rápido: WhatsApp (link prellenado), botón flotante y redirección tras submit.

2. Variables de entorno (colocar en `.env.local`)
-------------------------------------------------
- `SMTP_HOST` : host SMTP.
- `SMTP_PORT` : puerto (ej. 465).
- `SMTP_USER` : usuario SMTP.
- `SMTP_PASS` : contraseña SMTP.
- `SMTP_FROM` : remitente (opcional, usa SMTP_USER si falta).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` : número E.164 o local sin separadores para armar el link de WhatsApp (se limpia a dígitos).
- `GOOGLE_SHEETS_WEBAPP_URL` : URL del Web App de Google Apps Script (termina en `/exec`). **Solo server-side**, no exponer en cliente.
- Opcional Turnstile (anti-bot):
  - `TURNSTILE_SECRET_KEY`
  - `TURNSTILE_SITE_KEY`

3. Flujo de trabajo del lead
----------------------------
1) El usuario llena el formulario (`LeadForm` o `LeadForm`) con campos: `nombres`, `telefono`, `turno`. Campos opcionales propagados: `gestorEmail`, `gestorNombre`, `tratamiento`, `sede`. Honeypot oculto: `website`.
2) Hook `useLeadForm` valida con `formLeadsSchema` (zod) y llama a `submitLead`.
3) `submitLead` hace `fetch` a `/api/leads` (API route server-side).
4) `/api/leads`:
   - Valida zod.
   - Honeypot: si `website` viene lleno, responde ok y no envía nada.
   - Agrega `ip` y `userAgent`. (Turnstile si está configurado).
   - POST JSON al Apps Script (`GOOGLE_SHEETS_WEBAPP_URL`).
5) Apps Script escribe una fila en la hoja “Leads” y responde ok.
6) Frontend muestra toast; si éxito, limpia el form y redirige a WhatsApp con texto fijo: “Hola, quiero empezar mi tratamiento con Ondas de Choque. Los vi en Google.”

4. Estructura relevante del proyecto
------------------------------------
- `src/app/api/leads/route.ts` : endpoint para Sheets.
- `src/app/api/mail/route.ts` : envío de correos por SMTP.
- `src/features/lead-form/hooks/useLeadForm.ts` : lógica de submit y redirección a WhatsApp.
- `src/features/lead-form/api/submitLead.ts` : cliente para `/api/leads`.
- `src/features/lead-form/components/LeadForm.tsx` : formularios.
- `src/schemas/index.ts` : `formLeadsSchema` (nombres, telefono, turno, website?, gestorEmail?, gestorNombre?, tratamiento?, sede?).
- `src/features/whatsapp/utils/build-whatsapp-link.ts` : construye link de WhatsApp con texto único saneado.

5. Dónde se guardan los leads
-----------------------------
Google Sheet: https://docs.google.com/spreadsheets/d/1ktNffAwa7556XxASk9P2Xh4w1udiGZuth7PCxa0GPKQ/edit#gid=1635387982
- Pestaña: “Leads”.
- Columnas: timestamp, nombres, telefono, turno, gestorEmail, gestorNombre, tratamiento, sede, ip, userAgent.

6. Despliegue y notas de Apps Script
------------------------------------
- Debe estar desplegado como Web App: Execute as “Me”; Access “Anyone”.
- Implementa `doPost` (y opcional `doGet` para responder JSON simple).
- Si la URL `/exec` se abre en el navegador puede mostrar “Webhook listo”; es correcto.

7. Pruebas rápidas
------------------
- Completar formulario con datos válidos → toast éxito → WhatsApp abre con copy fijo → verificar nueva fila en Sheet.
- Honeypot: llenar `website` vía DevTools → no debe crear fila, respuesta ok. (Aún no se ha implementado)
- Sin `GOOGLE_SHEETS_WEBAPP_URL` → `/api/leads` devuelve error 500 indicando falta de variable.

