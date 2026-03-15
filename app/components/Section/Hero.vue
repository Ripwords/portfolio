<script lang="ts" setup>
const highlights = ['Distributed Systems', 'Full-Stack', 'Infrastructure', 'Desktop Apps', 'Cross-Platform Mobile']
</script>

<template>
  <section id="hero" class="relative min-h-[70vh] flex items-center py-16 md:py-24 overflow-hidden">
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <LazyObjectSaturn />
    </div>

    <div class="container mx-auto px-4 max-w-6xl relative z-10">
      <div class="max-w-3xl space-y-6">
        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :duration="600"
          class="text-4xl md:text-6xl font-bold tracking-tight"
        >
          JJ Teoh
        </h1>

        <p
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
          :duration="600"
          class="text-xl md:text-2xl font-medium text-muted-foreground"
        >
          Software Developer
        </p>

        <p
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
          :duration="600"
          class="text-lg md:text-xl text-muted-foreground"
        >
          Systems, Infrastructure & Full-Stack Applications
        </p>

        <p
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
          :duration="600"
          class="text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Mechatronics engineer turned software developer. I build reliable systems — from edge device sync engines and financial platforms to compliance infrastructure and developer tooling.
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          :duration="600"
          class="flex flex-wrap gap-2"
        >
          <Badge v-for="highlight in highlights" :key="highlight" variant="secondary">
            {{ highlight }}
          </Badge>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
          :duration="600"
          class="flex gap-4 pt-2"
        >
          <Button as="a" href="#projects">
            View Projects
          </Button>
          <Button as="a" href="#contact" variant="outline">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
