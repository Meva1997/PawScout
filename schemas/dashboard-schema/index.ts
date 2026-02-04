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
