<script lang="ts" setup>
import { skills } from "~/lib/data/skills";

// Brand marks (devicon / logos / skill-icons) render as multicolor SVGs, so they
// are held to a monochrome grayscale in the Paper & Ink system. Lucide marks draw
// with currentColor, so they can take the foreground tone and a clay hover tint.
function iconTone(icon?: string): string {
  return icon?.startsWith("lucide:")
    ? "text-foreground/70 group-hover:text-primary"
    : "grayscale opacity-80";
}
</script>

<template>
  <section id="skills" class="py-24 md:py-32">
    <div class="container mx-auto max-w-6xl px-4">
      <SectionHeading
        title="Toolkit"
        lede="A practical stack for full-stack systems, AI product surfaces, SDKs, and infrastructure."
      />

      <div class="border-t border-border">
        <div
          v-for="(category, index) in skills"
          :key="category.title"
          v-motion
          :initial="{ opacity: 0, y: 28 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 90, duration: 600 } }"
          class="grid grid-cols-1 gap-x-10 gap-y-5 border-b border-border py-8 md:grid-cols-[minmax(0,14rem)_1fr]"
        >
          <div class="flex items-center gap-2.5 md:pt-1">
            <Icon :name="category.icon" class="size-4 shrink-0 text-foreground/70" />
            <span class="eyebrow">{{ category.title }}</span>
          </div>

          <ul class="flex flex-wrap gap-2">
            <li
              v-for="skill in category.skills"
              :key="skill.label"
              class="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <Icon
                v-if="skill.icon"
                :name="skill.icon"
                class="size-3.5 shrink-0 transition-colors"
                :class="[iconTone(skill.icon), skill.invertIcon ? 'dark:invert' : '']"
              />
              {{ skill.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
