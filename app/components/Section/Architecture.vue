<script lang="ts" setup>
const sectionId = 'architecture'

const placeholders = [
  { title: 'Edge Sync Architecture', caption: 'Offline-first sync engine with CRDT-based conflict resolution' },
  { title: 'Multi-Tenant Platform', caption: 'Shared application shell with isolated tenant data layers' },
  { title: 'E-Invoicing Pipeline', caption: 'End-to-end document signing and tax authority submission flow' },
  { title: 'CI/CD & Deployment', caption: 'Automated build, test, and deployment pipeline architecture' },
]
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
        Visual documentation of system architectures I've designed. Diagrams coming soon.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="(item, index) in placeholders"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }"
        >
          <CardHeader>
            <CardTitle>{{ item.title }}</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="aspect-video border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Icon name="lucide:image" class="size-10 opacity-50" />
              <span class="text-sm">Diagram coming soon</span>
            </div>
            <p class="text-sm text-muted-foreground">
              {{ item.caption }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
