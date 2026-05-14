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
  <section :id="sectionId" class="py-16 md:py-24">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="mb-10 max-w-3xl">
        <Badge
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :duration="500"
          variant="outline"
          class="rounded-md mb-4"
        >
          Architecture snapshots
        </Badge>
        <h2
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :duration="600"
          class="text-3xl md:text-4xl font-bold tracking-tight"
        >
          System Design
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
          class="mt-3 text-muted-foreground leading-relaxed"
        >
          Cleaner slices through the main data flows, integration boundaries, and persistence layers
          behind the project work.
        </p>
      </div>

      <div class="space-y-6">
        <Card
          v-for="(diagram, index) in diagrams"
          :key="diagram.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 150, duration: 500 } }"
          class="gap-0 overflow-hidden rounded-md py-0 bg-card/80"
        >
          <CardHeader class="border-b border-border/70 p-5">
            <CardTitle class="text-xl">{{ diagram.title }}</CardTitle>
            <p class="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {{ diagram.caption }}
            </p>
          </CardHeader>
          <CardContent class="p-0">
            <div class="overflow-x-auto">
              <div class="min-w-[820px] p-3 md:p-5">
                <component :is="diagram.component" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
