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
