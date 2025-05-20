export default defineEventHandler(async (event) => {
  return sendRedirect(event, "/docs/TeohJiaJing.pdf", 302)
})
