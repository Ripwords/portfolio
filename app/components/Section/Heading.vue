<script lang="ts" setup>
// Unified editorial section heading: Space Grotesk display title + optional
// concise lede and mono kicker, with a premium blur-fade-up reveal. Keeps every
// section aligned to the "Paper & Ink" typographic language.
withDefaults(
  defineProps<{
    title: string;
    lede?: string;
    kicker?: string;
  }>(),
  { lede: "", kicker: "" },
);
</script>

<template>
  <div class="mb-10 max-w-2xl md:mb-14">
    <p
      v-if="kicker"
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      class="eyebrow mb-4 flex items-center gap-2 text-muted-foreground"
    >
      <span class="inline-block h-px w-6 bg-primary" aria-hidden="true" />
      {{ kicker }}
    </p>
    <h2
      v-motion
      :initial="{ opacity: 0, y: 24, filter: 'blur(6px)' }"
      :visible-once="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :duration="700"
      class="heading text-4xl leading-[1.05] tracking-tight md:text-5xl"
    >
      {{ title }}
    </h2>
    <p
      v-if="lede"
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :visible-once="{ opacity: 1, y: 0, transition: { delay: 120, duration: 600 } }"
      class="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg"
    >
      {{ lede }}
    </p>
  </div>
</template>
