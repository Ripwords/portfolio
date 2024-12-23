export default defineEventHandler(async (event) => {
  await useCounter("resumeCounter")

  return sendRedirect(event, "/docs/TeohJiaJing.pdf", 302)
})
