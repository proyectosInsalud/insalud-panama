import { z } from "zod";

export const formLeadsSchema = z.object({
    nombres: z.string().min(1, { message: "El nombre es requerido" }),
    telefono: z.string()
        .min(1, { message: "El teléfono es requerido" })
        .regex(/^\d+$/, { message: "Solo se permiten números" })
        .max(8, { message: "Debe tener máximo 8 dígitos" })
        .regex(/^6\d{0,7}$/, { message: "Teléfono inválido" }),
    turno: z.string().min(1, { message: "El turno es requerido" }),
    // Campos opcionales para el gestor
    gestorEmail: z.string().optional(),
    gestorNombre: z.string().optional(),
    tratamiento: z.string().optional(),
    sede: z.string().optional(),
})

