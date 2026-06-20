<script lang="ts" setup>
const focus = [
  {
    title: "Distributed systems",
    icon: "lucide:network",
    description: "Offline-first sync, edge computing, and data that survives bad networks.",
  },
  {
    title: "Full-stack product",
    icon: "lucide:layers",
    description: "End to end. Schema and API design through to a polished, shipped interface.",
  },
  {
    title: "Infrastructure",
    icon: "lucide:container",
    description: "Containers, pipelines, and the operational glue that keeps things alive in prod.",
  },
];
</script>

<template>
  <section id="about" class="py-24 md:py-32">
    <div class="container mx-auto max-w-6xl px-4">
      <SectionHeading title="About" />

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="600"
        class="legible max-w-2xl text-lg leading-relaxed text-foreground/90 md:text-xl"
      >
        I came to software from mechatronics. Control systems, embedded hardware, things that fail
        in the field. So I build software the way I'd build a machine: for failure modes and data
        flow, not just the happy path.
      </p>

      <!-- Focus areas: minimal, hairline-led, no boxy cards -->
      <div
        class="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] sm:grid-cols-3"
      >
        <div
          v-for="(item, index) in focus"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 110, duration: 600 } }"
          class="group bg-white/[0.015] p-7 transition-colors duration-500 hover:bg-white/[0.03]"
        >
          <Icon
            :name="item.icon"
            class="size-5 text-foreground/70 transition-colors duration-500 group-hover:text-foreground"
          />
          <h3 class="mt-5 text-base font-medium">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
