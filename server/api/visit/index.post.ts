export default defineEventHandler(async (event) => {
  await useCounter(event, "visitCounter")
})
