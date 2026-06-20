<script lang="ts" setup>
const sectionId = "architecture";

const diagrams = [
  {
    title: "AI Trading Copilot",
    caption:
      "Tool-calling chat, streaming research runs, LangGraph decision pipeline, and gated broker execution.",
    component: resolveComponent("DiagramAITrader"),
  },
  {
    title: "Repro Feedback Platform",
    caption:
      "Framework-agnostic widget capture flowing into a self-hosted intake API and triage dashboard.",
    component: resolveComponent("DiagramRepro"),
  },
  {
    title: "Edge Sync Engine",
    caption:
      "Offline-first local state, ElectricSQL shape sync, Hono API routes, and Postgres-backed convergence.",
    component: resolveComponent("DiagramEdgeSync"),
  },
];
</script>

<template>
  <section :id="sectionId" class="py-24 md:py-32">
    <div class="container mx-auto px-4 max-w-6xl">
      <SectionHeading
        title="System design"
        lede="A cleaner slice through the data flows and integration boundaries behind the work."
      />

      <div class="space-y-6">
        <div
          v-for="(diagram, index) in diagrams"
          :key="diagram.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 150, duration: 500 } }"
          class="surface overflow-hidden rounded-2xl"
        >
          <div class="border-b border-white/[0.06] p-6">
            <h3 class="text-lg font-medium">{{ diagram.title }}</h3>
            <p class="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {{ diagram.caption }}
            </p>
          </div>
          <div class="overflow-x-auto">
            <div class="min-w-[820px] p-3 md:p-5">
              <component :is="diagram.component" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
