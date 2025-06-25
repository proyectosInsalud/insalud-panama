import { z } from "zod";

export const formLeadsSchema = z.object({
    nombres: z.string().min(1, { message: "El nombre es requerido" }),
    telefono: z.string()
        .min(1, { message: "El teléfono es requerido" })
        .regex(/^\d+$/, { message: "Solo se permiten números" })
        .min(8, { message: "Debe tener 8 dígitos" })
        .max(8, { message: "Debe tener 8 dígitos" })
        .regex(/^[6-9]\d{7}$/, { message: "Número de teléfono panameño inválido" }),
    turno: z.string().min(1, { message: "El turno es requerido" }),
    // Campos opcionales para el gestor
    gestorEmail: z.string().optional(),
    gestorNombre: z.string().optional(),
    tratamiento: z.string().optional(),
    sede: z.string().optional(),
})

