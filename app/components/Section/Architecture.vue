<script lang="ts" setup>
const sectionId = "architecture";

const diagrams = [
  {
    title: "Edge Sync Architecture",
    caption: "Offline-first bidirectional sync with ElectricSQL between field devices and cloud",
    component: resolveComponent("DiagramEdgeSync"),
  },
  {
    title: "Multi-App Hospitality Platform",
    caption: "Monorepo with shared typed package connecting PMS, POS, and e-invoicing apps",
    component: resolveComponent("DiagramHospitalityPlatform"),
  },
  {
    title: "Multi-Agent AI Analytics",
    caption: "Specialized AI agents with MCP tool integration for financial data analysis",
    component: resolveComponent("DiagramAIAccounting"),
  },
];
</script>

<template>
  <section :id="sectionId" class="py-16 md:py-24">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="600"
        class="text-3xl font-bold tracking-tight mb-2"
      >
        Architecture & System Design
      </h2>
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
        class="text-muted-foreground mb-10"
      >
        Simplified views of system architectures I've designed and built.
      </p>

      <div class="space-y-8">
        <Card
          v-for="(diagram, index) in diagrams"
          :key="diagram.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 150, duration: 500 } }"
        >
          <CardHeader>
            <CardTitle>{{ diagram.title }}</CardTitle>
            <p class="text-sm text-muted-foreground">
              {{ diagram.caption }}
            </p>
          </CardHeader>
          <CardContent>
            <div class="overflow-x-auto">
              <div class="min-w-[600px]">
                <component :is="diagram.component" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
