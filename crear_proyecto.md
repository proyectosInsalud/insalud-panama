# RECREAR_PROYECTO_COMPLETO_V3.md

## Guia V3: crear `insalud-panama` desde 0 (paso a paso)

Este documento esta pensado para levantar el proyecto desde cero, sin depender del estado actual del repositorio.

Instalar dependencias (V3 escalable, sin Radix y con Framer Motion):

```bash
npm i react-hook-form zod @hookform/resolvers framer-motion nodemailer lucide-react sonner clsx tailwind-merge
npm i -D @types/nodemailer @tailwindcss/postcss
```

Decision UI para este V3:

- Se usara `Tailwind + componentes propios`.
- No se usaran Radix, Headless UI ni Ariakit.
- Prioridad: control total del markup y CSS.
- Requisito: implementar accesibilidad base manualmente (`label`, `aria-*`, foco visible, teclado, contraste).

Dependencias que NO se instalaran en este V3:
- `@radix-ui/*`
- `@headlessui/react`
- `ariakit`
- `gsap`
- `@gsap/react`
- `next-themes`
- `zustand`
- `react-icons`
- `tw-animate-css`
- `class-variance-authority`

## 3) Configurar entorno

Crear `.env.local`:

```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CDN_BASE=https://cdn.tudominio.com
NEXT_PUBLIC_WHATSAPP_NUMBER=50763719084

SMTP_HOST=smtp.tudominio.com
SMTP_PORT=465
SMTP_USER=usuario@tudominio.com
SMTP_PASS=tu_password
SMTP_FROM="Insalud Leads <no-reply@tudominio.com>"
```

## 4) Estructura inicial recomendada (escalable)

```txt
src/
  app/
    layout.tsx
    page.tsx
    contacto/
      [sede]/
        [tratamiento]/
          page.tsx
          loading.tsx
          error.tsx
    api/
      leads/
        route.ts

  domains/
    leads/
      model/
        lead.schema.ts
        lead.types.ts
      services/
        send-lead-email.ts
        build-lead-email-html.ts
    sedes/
      config/
        panama.ts
      model/
        sede.types.ts
    tratamientos/
      config/
        ondas-choque.ts
        prostatitis.ts
      model/
        tratamiento.types.ts

  features/
    lead-form/
      components/
        LeadForm.tsx
        TurnoField.tsx
      hooks/
        useLeadForm.ts
      api/
        submitLead.ts
    whatsapp/
      components/
        FloatingWhatsApp.tsx
      utils/
        build-whatsapp-link.ts
    faq/
      components/
        Questions.tsx

  shared/
    ui/
      Button.tsx
      Input.tsx
      Select.tsx
      RadioGroup.tsx
      Label.tsx
      Toaster.tsx
    lib/
      env/
        server.ts
        client.ts
      constants/
      utils/
    styles/
      globals.css
      tokens.css
    types/

  content/
    faqs/
      disfuncion.es.ts
      prostatitis.es.ts
```

Reglas de uso:
1. `app/` solo define rutas y composición de página.
2. `domains/` contiene reglas de negocio y contratos.
3. `features/` contiene casos de uso de UI reutilizables.
4. `shared/` solo utilidades y UI agnóstica al negocio.
5. Nada de lógica de negocio en componentes de página.
## 5) Archivos clave que debes implementar primero

### 5.1 `src/utils/cdn.ts`

```ts
export const cdn = (path: string) =>
  `${process.env.NEXT_PUBLIC_CDN_BASE || "https://cdn.insalud.pe"}${path}`;
```

### 5.2 `src/schemas/index.ts`

```ts
import { z } from "zod";

export const formLeadsSchema = z.object({
  nombres: z.string().min(1, { message: "El nombre es requerido" }),
  telefono: z
    .string()
    .min(1, { message: "El telefono es requerido" })
    .regex(/^\d+$/, { message: "Solo se permiten numeros" })
    .max(8, { message: "Debe tener maximo 8 digitos" })
    .regex(/^6\d{0,7}$/, { message: "Telefono invalido" }),
  turno: z.string().min(1, { message: "El turno es requerido" }),
  gestorEmail: z.string().optional(),
  gestorNombre: z.string().optional(),
  tratamiento: z.string().optional(),
  sede: z.string().optional(),
});
```

### 5.3 `src/types/index.ts`

```ts
import { z } from "zod";
import { formLeadsSchema } from "@/schemas";

export type FormLeads = z.infer<typeof formLeadsSchema>;

export interface GestorData {
  gestor: string;
  email: string;
  whatsapp: string;
  message: string;
}
```

### 5.4 `src/data/sedes/principal.ts`

```ts
export const principalData = {
  name: "Insalud",
  city: "Panama",
  country: "Panama",
  address: "Consultorio 1000 - Torre A - PANAMA - CLINIC",
  phone: "+507 6371 9084",
  email: "admision.panama@insalud.pe",
  socials: {
    instagram: "https://www.instagram.com/insaludpanama",
    tiktok: "https://www.tiktok.com/@insaludpanama",
    facebook: "https://www.facebook.com/insaludpanama",
  },
  landings: {
    ondasChoque: {
      gestor: "Lisset",
      email: "admision.panama@insalud.pe",
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50763719084",
      message: "Hola, quiero informacion sobre Ondas de Choque",
    },
    prostatitis: {
      gestor: "Lisset",
      email: "admision.panama@insalud.pe",
      whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50763719084",
      message: "Hola, quiero informacion sobre Prostatitis",
    },
  },
};
```

### 5.5 `src/app/api/mail/route.ts`

```ts
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
```

## 6) Formulario minimo funcional (recomendado)

- Construir un `LeadForm` reutilizable con `react-hook-form` + `zodResolver`.
- Campos requeridos: `nombres`, `telefono`, `turno`.
- Submit a `POST /api/mail`.
- Mostrar feedback con `sonner`.

## 7) Páginas mínimas para salir a producción

- `src/app/page.tsx` redirige a `/contacto/ondas-de-choque`
- `src/app/contacto/ondas-de-choque/page.tsx`
- `src/app/contacto/prostatitis/page.tsx`

Cada landing debe renderizar:
1. Hero
2. Formulario
3. Beneficios
4. FAQ
5. CTA WhatsApp
6. Footer

## 8) Configuración de estilos y UI

- Definir variables de color en `src/styles/globals.css`
- Cargar fuentes en `src/app/layout.tsx` (Nunito, Poppins, Roboto)
- Mantener clases utilitarias consistentes para botones y campos

## 8.1) Variables de diseño (colores) desde `index.css` / `globals.css`

Con base en tus capturas, define estos tokens en CSS para mantener consistencia visual y permitir cambios centralizados:

```css
:root {
  /* Paleta principal */
  --color-primary: #3277E1;
  --color-accent: #00BEB4;
  --color-navy: #13172C;

  /* Superficies */
  --color-bg: #F7FAFA;
  --color-white: #FFFFFF;
  --color-surface: #FFFFFF;

  /* CTA secundario */
  --color-warning: #FFB531;

  /* Texto */
  --color-text: #13172C;
  --color-text-soft: #3277E1;

  /* Bordes y estados */
  --color-border: #D9E4E8;
  --color-success: #00BEB4;
}
```

Si usas Tailwind v4 con `globals.css`, puedes mapearlos asi:

```css
@theme {
  --color-in-primary: var(--color-primary);
  --color-in-accent: var(--color-accent);
  --color-in-navy: var(--color-navy);
  --color-in-bg: var(--color-bg);
  --color-in-surface: var(--color-surface);
  --color-in-warning: var(--color-warning);
  --color-in-text: var(--color-text);
  --color-in-text-soft: var(--color-text-soft);
  --color-in-border: var(--color-border);
}
```

Ejemplo de uso en componentes propios:

```css
.page-bg { background: var(--color-bg); color: var(--color-text); }
.card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; }
.btn-primary { background: var(--color-accent); color: var(--color-white); }
.btn-dark { background: var(--color-navy); color: var(--color-white); }
.link-soft { color: var(--color-text-soft); }
```

Regla recomendada para V3:
1. No usar hex directo en componentes.
2. Todo color debe salir de variables CSS.
3. Mantener un solo archivo fuente de tokens (`src/styles/globals.css` o `src/styles/index.css`).
## 8.2) Propuesta `tokens.css` (escalable)

Para escalar el sistema de diseño, separa tokens en un archivo dedicado:

`src/styles/tokens.css`

```css
:root {
  /* Brand */
  --brand-primary: #3277E1;
  --brand-accent: #00BEB4;
  --brand-warning: #FFB531;

  /* Text */
  --text-primary: #13172C;
  --text-link: #3277E1;
  --text-on-dark: #FFFFFF;

  /* Surfaces */
  --surface-page: #F7FAFA;
  --surface-card: #FFFFFF;
  --surface-dark: #13172C;

  /* Borders */
  --border-default: #D9E4E8;
  --border-accent: #00BEB4;

  /* States */
  --state-success: #00BEB4;
  --state-focus: #3277E1;
}
```

Importalo en `src/styles/globals.css` al inicio:

```css
@import "./tokens.css";
```

Si usas Tailwind v4, mapea tokens en `@theme`:

```css
@theme {
  --color-brand-primary: var(--brand-primary);
  --color-brand-accent: var(--brand-accent);
  --color-brand-warning: var(--brand-warning);

  --color-text-primary: var(--text-primary);
  --color-text-link: var(--text-link);
  --color-text-on-dark: var(--text-on-dark);

  --color-surface-page: var(--surface-page);
  --color-surface-card: var(--surface-card);
  --color-surface-dark: var(--surface-dark);

  --color-border-default: var(--border-default);
  --color-border-accent: var(--border-accent);

  --color-state-success: var(--state-success);
  --color-state-focus: var(--state-focus);
}
```

Regla de mantenimiento:
1. `tokens.css` solo define variables, no clases.
2. `globals.css` define resets/utilidades.
3. Componentes consumen variables o utilidades, nunca hex hardcodeados.
## 9) Verificaciones obligatorias antes de deploy

```bash
npm run lint
npm run build
npm run start
```

Checklist:
- Form valida datos y muestra errores.
- API responde 200/400/500 correctamente.
- Correo llega al gestor asignado.
- Links de WhatsApp abren con mensaje precargado.
- Assets CDN cargan en mobile y desktop.

## 10) Deploy (Vercel recomendado)

1. Conectar repositorio a Vercel.
2. Configurar variables de entorno del punto 3.
3. Deploy.
4. Probar envio real de lead en produccion.

## 11) Plan de crecimiento (post-MVP)

1. Migrar a rutas dinamicas: `/contacto/[sede]/[tratamiento]`.
2. Unificar formularios en un solo feature (`features/lead-form`).
3. Separar dominio de leads (`domains/leads`) para facilitar CRM/DB.
4. Agregar rate limiting + anti-bot en API.

## 12) Definition of Done (crear desde cero)

Proyecto V3 completado cuando:
- Arranca local con `npm run dev`.
- Build de produccion exitosa.
- Las 2 landings renderizan correctamente.
- El endpoint envia correo real con SMTP.
- No hay secretos en el repositorio.
- Documentacion y variables estan alineadas.

# Guia de como debe quedar la pagina

![alt text](download.png)
![alt text](download-1.png)
![alt text](download-2.png)
![alt text](download-3.png)
![alt text](download-4.png)
![alt text](download-5.png)
![alt text](download-6.png)
![alt text](download-7.png)