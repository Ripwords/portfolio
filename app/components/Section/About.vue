<script lang="ts" setup>
const focus = [
  {
    title: "Distributed systems",
    description: "Offline-first sync, edge computing, and data that survives bad networks.",
  },
  {
    title: "Full-stack product",
    description: "End to end. Schema and API design through to a polished, shipped interface.",
  },
  {
    title: "Infrastructure",
    description: "Containers, pipelines, and the operational glue that keeps things alive in prod.",
  },
];
</script>

<template>
  <section id="about" class="py-20 md:py-24">
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

      <!-- Focus areas: an open index, hairline-ruled rows, no boxes or icons -->
      <dl class="mt-16 border-b border-border md:mt-20">
        <div
          v-for="(item, index) in focus"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 110, duration: 600 } }"
          class="grid gap-3 border-t border-border py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-baseline md:gap-12 md:py-9"
        >
          <dt class="heading min-w-0 text-2xl leading-tight md:text-3xl">{{ item.title }}</dt>
          <dd class="max-w-xl text-base leading-relaxed text-muted-foreground">
            {{ item.description }}
          </dd>
        </div>
      </dl>

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
