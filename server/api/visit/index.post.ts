export default defineEventHandler(async () => {
  await useCounter("visitCounter")
})
