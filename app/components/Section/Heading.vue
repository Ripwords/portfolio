<script lang="ts" setup>
// Unified editorial section heading: Playfair display title + optional concise
// lede, with a premium blur-fade-up reveal. Replaces the inconsistent plain-bold
// h2 blocks so every section shares the hero's typographic language.
withDefaults(
  defineProps<{
    title: string;
    lede?: string;
  }>(),
  { lede: "" },
);
</script>

<template>
  <div class="mb-10 max-w-2xl md:mb-14">
    <h2
      v-motion
      :initial="{ opacity: 0, y: 24, filter: 'blur(6px)' }"
      :visible-once="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :duration="700"
      class="heading legible text-4xl leading-[1.05] md:text-5xl"
    >
      {{ title }}
    </h2>
    <p
      v-if="lede"
      v-motion
      :initial="{ opacity: 0, y: 16 }"
      :visible-once="{ opacity: 1, y: 0, transition: { delay: 120, duration: 600 } }"
      class="legible mt-5 text-base leading-relaxed text-muted-foreground md:text-lg"
    >
      {{ lede }}
    </p>
  </div>
</template>
