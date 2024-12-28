import type { TStateSchema, TCounterSchema } from "#shared/schema"
import type { H3Event } from "h3"

export const useCounter = async (event: H3Event, key: string) => {
  const clientIp =
    getHeader(event, "x-forwarded-for")?.split(",")[0]?.trim() ?? ""

  const state = useStorage<TStateSchema>("state")
  const rawState = useStorage<{ count: number }>("rawState")

  const rawStateItem = await rawState.getItem(key)
  if (!import.meta.dev) {
    await rawState.setItem(key, {
      count: (rawStateItem?.count ?? 0) + 1,
    })
  }

  if (!clientIp) return

  const stateItem = await state.getItem(key)
  if (!stateItem) {
    await state.setItem(key, {
      counter: {
        [clientIp]: {
          lastVisit: 0,
          count: 0,
        },
      },
    })
  }

  const records =
    stateItem?.counter[clientIp] ??
    ({
      lastVisit: 0,
      count: 0,
    } satisfies TCounterSchema[string])

  const now = Date.now()
  const ONE_DAY = 24 * 60 * 60 * 1000

  // Check if this IP has visited in the last 24 hours
  const lastVisit = records.lastVisit ?? 0
  const isNewDayVisit = now - lastVisit > ONE_DAY

  // Update the records
  records.lastVisit = now
  if (!import.meta.dev && isNewDayVisit) {
    records.count += 1
  }

  // Save updated records in a single operation
  await state.setItem(key, {
    ...stateItem,
    counter: { ...stateItem?.counter, [clientIp]: records },
  })
}
