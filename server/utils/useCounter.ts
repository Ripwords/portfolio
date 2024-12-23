import type { TStateSchema } from "#shared/schema"

export const useCounter = async (key: keyof TStateSchema) => {
  if (!import.meta.dev) {
    const state = useStorage<TStateSchema>("state")
    const counter = await state.getItem(key)
    await state.setItem(key, (counter ?? 0) + 1)
  }
}
