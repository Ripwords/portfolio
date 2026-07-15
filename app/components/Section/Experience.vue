<script lang="ts" setup>
import { experience } from "~/lib/data/experience";

const sectionId = "experience";
</script>

<template>
  <section :id="sectionId" class="py-24 md:py-32">
    <div class="container mx-auto max-w-6xl px-4">
      <SectionHeading
        title="Experience"
        lede="Production work across backend systems, internal tools, platform integrations, and field-ready software."
      />

      <div class="flex flex-col border-t border-border">
        <article
          v-for="(entry, index) in experience"
          :key="entry.role + entry.period"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 150 } }"
          :duration="600"
          class="grid gap-y-6 border-b border-border py-10 md:grid-cols-[9rem_1fr] md:gap-x-12 md:py-14"
        >
          <p class="eyebrow pt-1 md:pt-2">{{ entry.period }}</p>

          <div>
            <div class="flex items-start gap-4">
              <NuxtImg
                :src="entry.logo"
                :alt="`${entry.company} logo`"
                class="mt-1 size-11 shrink-0 rounded-md object-contain"
              />
              <div>
                <h3 class="heading text-xl md:text-2xl">{{ entry.role }}</h3>
                <p class="mt-1.5 text-sm text-foreground">{{ entry.company }} · {{ entry.type }}</p>
                <p class="mt-1 text-xs text-muted-foreground">
                  {{ entry.location }}
                </p>
              </div>
            </div>

            <ul
              class="mt-6 list-disc space-y-2.5 pl-5 text-muted-foreground marker:text-primary/60"
            >
              <li
                v-for="highlight in entry.highlights"
                :key="highlight"
                class="pl-1 leading-relaxed"
              >
                {{ highlight }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
