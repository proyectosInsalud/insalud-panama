import { z } from "zod";
import { formLeadsSchema } from "@/schemas";

export type FormLeads = z.infer<typeof formLeadsSchema>;

export interface GestorData {
  gestor: string;
  email: string;
  whatsapp: string;
  message: string;
}
