import { z } from "zod";

export const SettingsSchema = z.object({
  id: z.number().optional(),
  city: z.string().nullable().optional(),
  logo_public_id: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  shelter_address: z.string().nullable().optional(),
  shelter_email: z.string().email().nullable().optional(),
  shelter_name: z.string().nullable().optional(),
  shelter_phone: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  zip_code: z.string().nullable().optional(),
  updated_at: z.string().optional(),
});

export type Settings = z.infer<typeof SettingsSchema>;
