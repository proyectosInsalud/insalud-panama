import { z } from "zod";

export const formLeadsSchema = z.object({
    nombres: z.string().min(1, { message: "El nombre es requerido" }),
    telefono: z.string()
        .min(1, { message: "El teléfono es requerido" })
        .regex(/^\d+$/, { message: "Solo se permiten números" })
        .min(10, { message: "Debe tener 10 dígitos" })
        .max(10, { message: "Debe tener 10 dígitos" })
        .regex(/^09\d{8}$/, { message: "Debe iniciar con 09 (celular ecuatoriano)" }),
    turno: z.string().min(1, { message: "El turno es requerido" }),
    // Campos opcionales para el gestor
    gestorEmail: z.string().optional(),
    gestorNombre: z.string().optional(),
    tratamiento: z.string().optional(),
    sede: z.string().optional(),
})

