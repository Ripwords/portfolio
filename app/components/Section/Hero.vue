<script lang="ts" setup>
// Hero: editorial split. Left = type + CTAs. Right = real astrophotography
// (Lagoon Nebula, shot by JJ) framed in a concentric "observation panel".
const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  enter: { opacity: 1, y: 0, filter: "blur(0px)", transition: { delay, duration: 700 } },
});
</script>

<template>
  <section
    id="hero"
    class="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-20 md:pt-24 md:pb-24"
  >
    <div class="container mx-auto max-w-6xl px-4">
      <div class="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <!-- Left: editorial type -->
        <div class="max-w-xl">
          <p
            v-motion
            :initial="enter().initial"
            :enter="enter().enter"
            class="legible font-display text-lg italic text-muted-foreground"
          >
            Hello, world. I'm
          </p>

          <h1
            v-motion
            :initial="enter(0.08).initial"
            :enter="enter(0.08).enter"
            class="legible mt-2 font-display text-6xl font-semibold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
          >
            JJ Teoh
          </h1>

          <p
            v-motion
            :initial="enter(0.16).initial"
            :enter="enter(0.16).enter"
            class="legible mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Mechatronics engineer turned software developer. I build reliable AI systems, SDKs, and
            self-hosted infrastructure.
          </p>

          <div
            v-motion
            :initial="enter(0.24).initial"
            :enter="enter(0.24).enter"
            class="mt-9 flex flex-wrap items-center gap-3"
          >
            <!-- Primary CTA with nested button-in-button arrow -->
            <a
              href="#projects"
              class="group inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-medium text-primary-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]"
            >
              View my work
              <span
                class="flex size-8 items-center justify-center rounded-full bg-background/20 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <Icon name="lucide:arrow-up-right" class="size-4" />
              </span>
            </a>

            <!-- Secondary CTA -->
            <a
              href="/resume"
              target="_blank"
              class="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Icon name="line-md:file-document" class="size-4" />
              Resume
            </a>
          </div>
        </div>

        <!-- Right: interactive procedural galaxy (three.js), frameless to blend with the starfield -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.92 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 1100 } }"
          class="relative justify-self-center md:justify-self-end"
        >
          <div
            class="galaxy-stage relative aspect-square w-[78vw] max-w-[300px] sm:max-w-[440px] lg:max-w-[520px]"
          >
            <ClientOnly>
              <LazyObjectGalaxy />
              <template #fallback>
                <div class="size-full animate-pulse rounded-full bg-primary/5" />
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.galaxy-stage {
  filter: drop-shadow(0 0 60px color-mix(in oklch, var(--primary) 18%, transparent));
}
</style>
