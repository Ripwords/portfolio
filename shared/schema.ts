import { z } from "zod"

const counterSchema = z.record(
  z.string(),
  z.object({
    lastVisit: z.number(),
    count: z.number().default(0),
  })
)
export type TCounterSchema = z.infer<typeof counterSchema>

export const stateSchema = z.object({
  counter: counterSchema,
})
export type TStateSchema = z.infer<typeof stateSchema>
