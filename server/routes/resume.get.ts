export default defineEventHandler(async (event) => {
  await useCounter(event, "resumeCounter")

  return sendRedirect(event, "/docs/TeohJiaJing.pdf", 302)
})
