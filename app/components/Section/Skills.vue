<script lang="ts" setup>
import { skills } from "~/lib/data/skills";
</script>

<template>
  <section id="skills" class="py-24 md:py-32">
    <div class="container mx-auto max-w-6xl px-4">
      <SectionHeading
        title="Toolkit"
        lede="A practical stack for full-stack systems, AI product surfaces, SDKs, and infrastructure."
      />

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(category, index) in skills"
          :key="category.title"
          v-motion
          :initial="{ opacity: 0, y: 28 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 90, duration: 600 } }"
          class="surface surface-hover rounded-2xl p-6"
        >
          <div class="mb-5 flex items-center gap-3">
            <Icon :name="category.icon" class="size-5 text-foreground/70" />
            <h3 class="heading text-base">{{ category.title }}</h3>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="skill in category.skills"
              :key="skill.label"
              class="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-accent/30 px-2.5 py-1 text-xs text-muted-foreground"
            >
              <Icon
                v-if="skill.icon"
                :name="skill.icon"
                class="size-3.5"
                :class="skill.invertIcon ? 'dark:invert' : ''"
              />
              {{ skill.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
