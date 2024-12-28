import { z } from "zod"

export const rawStateSchema = z.object({
  count: z.number().default(0),
})
export type TRawStateSchema = z.infer<typeof rawStateSchema>

export const counterTypes = z.enum(["resumeCounter", "visitCounter"])
export type TCounterTypes = z.infer<typeof counterTypes>

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
