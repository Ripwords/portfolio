import { z } from "zod"

export const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  subject: z.string(),
  text: z.string(),
})
