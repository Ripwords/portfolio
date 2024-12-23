import { formSchema } from "#shared/form"

export default defineEventHandler(async (event) => {
  const runtime = useRuntimeConfig()
  const {
    googleFormId,
    googleFormEmailId,
    googleFormSubjectId,
    googleFormTextId,
    googleFormNameId,
  } = runtime

  const body = await readValidatedBody(event, formSchema.parse)
  const { email, subject, text, name } = body

  const formUrl = `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`
  const urlEncodedData = new URLSearchParams({
    [`entry.${googleFormEmailId}`]: email,
    [`entry.${googleFormSubjectId}`]: subject,
    [`entry.${googleFormTextId}`]: text,
    [`entry.${googleFormNameId}`]: name,
  })

  const url = `${formUrl}?usp=pp_url&${urlEncodedData.toString()}`

  try {
    console.log(url)
    await $fetch(url, {
      method: "POST",
    })
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send message",
    })
  }
})
