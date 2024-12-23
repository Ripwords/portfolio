import { z } from "zod"

export const stateSchema = z.object({
  resumeCounter: z.number().default(0),
  visitCounter: z.number().default(0),
})
export type TStateSchema = z.infer<typeof stateSchema>
