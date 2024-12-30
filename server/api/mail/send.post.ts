import { z } from "zod"

const config = useRuntimeConfig()

const bodySchema = z.object({
  from: z.string().email(),
  name: z.string(),
  subject: z.string(),
  content: z.string(),
})
type TBody = z.infer<typeof bodySchema>

const sendEmail = async (body: TBody) => {
  return await $fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": config.brevoKey,
    },
    body: {
      sender: {
        email: "contact@jjteoh.com",
        name: "JJ Teoh",
      },
      to: [{ email: "contact@jjteoh.com", name: "JJ Teoh" }],
      replyTo: {
        name: body.name,
        email: body.from,
      },
      subject: body.subject,
      htmlContent: body.content,
    },
  })
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse)
  const response = await sendEmail(body)
  return response
})
