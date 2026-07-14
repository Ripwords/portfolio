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
        class="max-w-3xl text-2xl leading-snug tracking-tight text-foreground md:text-3xl"
      >
        I came to software from mechatronics. Control systems, embedded hardware, things that fail
        in the field. So I build software the way I'd build a machine: for failure modes and data
        flow, not just the happy path.
      </p>

      <!-- Focus areas: hairline-divided editorial cells -->
      <div
        class="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
      >
        <div
          v-for="(item, index) in focus"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 110, duration: 600 } }"
          class="group bg-card p-8 transition-colors duration-500 md:p-10"
        >
          <Icon
            :name="item.icon"
            class="size-5 text-foreground/70 transition-colors duration-500 group-hover:text-primary"
          />
          <h3 class="heading mt-6 text-base">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ item.description }}</p>
        </div>
      </div>

      <!-- Editorial interlude: 3D specimen -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="600"
        class="mt-20 flex justify-center md:mt-24"
      >
        <ShaderInstrument>fig.02 — instrument · drag to rotate</ShaderInstrument>
      </div>
    </div>
  </section>
</template>
