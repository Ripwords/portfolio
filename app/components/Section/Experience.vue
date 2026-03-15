<script lang="ts" setup>
import { experience } from '~/lib/data/experience'

const sectionId = 'experience'
</script>

<template>
  <section :id="sectionId" class="py-16 md:py-24">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="600"
        class="text-3xl md:text-4xl font-bold tracking-tight mb-10"
      >
        Experience
      </h2>

      <div class="flex flex-col gap-6">
        <template v-for="(entry, index) in experience" :key="entry.role + entry.period">
          <Separator v-if="index > 0" />

          <Card
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 150 } }"
            :duration="600"
            class="border-none shadow-none"
          >
            <CardHeader>
              <div class="flex items-start gap-4">
                <NuxtImg
                  :src="entry.logo"
                  :alt="`${entry.company} logo`"
                  class="size-12 sm:size-14 rounded-lg object-contain shrink-0 mt-1"
                />
                <div class="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <CardTitle class="text-xl font-bold">{{ entry.role }}</CardTitle>
                    <CardDescription class="mt-1">
                      {{ entry.company }} · {{ entry.type }}
                    </CardDescription>
                    <p class="text-xs text-muted-foreground mt-0.5">
                      {{ entry.location }}
                    </p>
                  </div>
                  <span class="text-sm text-muted-foreground shrink-0">
                    {{ entry.period }}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul class="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed">
                <li v-for="highlight in entry.highlights" :key="highlight">
                  {{ highlight }}
                </li>
              </ul>
            </CardContent>
          </Card>
        </template>
      </div>
    </div>
  </section>
</template>
