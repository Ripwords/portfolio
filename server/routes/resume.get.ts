import type { TStateSchema } from "#shared/schema"

export default defineEventHandler(async (event) => {
  if (!import.meta.dev) {
    const state = useStorage<TStateSchema>("state")
    const resumeCounter = await state.getItem("resumeCounter")
    await state.setItem("resumeCounter", (resumeCounter ?? 0) + 1)
  }

  return sendRedirect(event, "/docs/TeohJiaJing.pdf", 302)
})
