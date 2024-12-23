export default defineEventHandler((event) => {
  return sendRedirect(event, "/docs/TeohJiaJing.pdf", 302)
})
