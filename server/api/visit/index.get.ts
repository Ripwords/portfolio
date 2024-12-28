import type {
  TCounterTypes,
  TRawStateSchema,
  TStateSchema,
} from "#shared/schema"

export default defineEventHandler(async () => {
  const state = useStorage<TStateSchema>("state")
  const rawState = useStorage<TRawStateSchema>("rawState")

  const stateItems = await state.getItem("visitCounter" satisfies TCounterTypes)
  const rawStateItem = await rawState.getItem(
    "visitCounter" satisfies TCounterTypes
  )

  const visitCounter = stateItems?.counter
    ? Object.values(stateItems.counter).reduce(
        (acc, curr) => acc + curr.count,
        0
      )
    : 0

  return {
    visitCounter,
    rawVisitCounter: rawStateItem?.count ?? 0,
  }
})
