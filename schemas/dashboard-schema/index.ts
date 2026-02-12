import { z } from "zod";

export const dashboardSchema = z.object({
  message: z.string(),
  stats: z.object({
    total_users: z.number(),
    total_animals: z.number(),
    total_adoptions: z.number(),
    total_volunteers: z.number(),
  }),
});

export type DashboardSchema = z.infer<typeof dashboardSchema>;

export const createAnimalSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  type: z.string().min(1, "El tipo de animal es obligatorio"),

  breed: z
    .string()
    .min(1, "La raza es obligatoria")
    .max(100, "La raza no puede exceder 100 caracteres"),

  age: z
    .number()
    .min(0, "La edad no puede ser negativa")
    .max(30, "La edad no puede exceder 30 años"),

  gender: z.string().min(1, "El género es obligatorio"),

  size: z.string().min(1, "El tamaño es obligatorio"),

  shortDescription: z
    .string()
    .min(1, "La descripción corta es obligatoria")
    .max(200, "La descripción corta no puede exceder 200 caracteres"),

  longDescription: z
    .string()
    .min(1, "La descripción completa es obligatoria")
    .max(2000, "La descripción completa no puede exceder 2000 caracteres"),

  goodWithKids: z.boolean(),

  goodWithDogs: z.boolean(),

  homeTrained: z.boolean(),

  availableForAdoption: z.string().default("available"),

  media: z
    .array(
      z.object({
        url: z.url("URL de imagen inválida"),
        public_id: z.string(),
        resource_type: z.string(),
      }),
    )
    .optional()
    .nullable(),
});

export type CreateAnimalFormData = z.infer<typeof createAnimalSchema>;
