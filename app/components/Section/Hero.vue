<script lang="ts" setup>
// Hero — editorial split (treatment 3). Left: giant Space Grotesk type + clay
// CTA. Right: a tall living flow-field shader column that reacts to cursor/scroll.
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
      <div class="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14 lg:gap-20">
        <!-- Left: editorial type -->
        <div class="max-w-2xl">
          <p v-motion :initial="enter().initial" :enter="enter().enter" class="eyebrow">
            Software Engineer · AI · Infra
          </p>

          <h1
            v-motion
            :initial="enter(0.08).initial"
            :enter="enter(0.08).enter"
            class="heading mt-5 text-6xl leading-[0.92] sm:text-7xl lg:text-8xl xl:text-9xl"
            style="font-weight: 700; letter-spacing: -0.045em"
          >
            JJ Teoh
          </h1>

          <p
            v-motion
            :initial="enter(0.16).initial"
            :enter="enter(0.16).enter"
            class="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Mechatronics engineer turned software developer. I build reliable AI systems, SDKs, and
            self-hosted infrastructure.
          </p>

          <div
            v-motion
            :initial="enter(0.24).initial"
            :enter="enter(0.24).enter"
            class="mt-9 flex flex-wrap items-center gap-4"
          >
            <!-- Primary CTA -->
            <a
              href="#projects"
              class="focus-ring group inline-flex cursor-pointer items-center gap-3 rounded-full bg-primary py-2.5 pr-2.5 pl-6 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              View work
              <span
                class="flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <Icon name="lucide:arrow-up-right" class="size-4" />
              </span>
            </a>

            <!-- Secondary -->
            <a
              href="/resume"
              target="_blank"
              class="focus-ring group inline-flex cursor-pointer items-center gap-2 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              <Icon name="line-md:file-document" class="size-4" />
              Resume
            </a>
          </div>
        </div>

        <!-- Right: living flow-field shader column -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.96 }"
          :enter="{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 1000 } }"
          class="justify-self-center md:justify-self-end"
        >
          <div
            class="relative aspect-[4/5] w-[72vw] max-w-[300px] overflow-hidden rounded-2xl border border-border sm:max-w-[360px] lg:aspect-[3/4] lg:max-w-[420px]"
          >
            <ClientOnly>
              <ShaderFlowField />
              <template #fallback>
                <div class="ff-skeleton size-full" />
              </template>
            </ClientOnly>
            <!-- hairline inner frame -->
            <div class="pointer-events-none absolute inset-3 rounded-xl border border-border/60" />
            <p
              class="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase"
            >
              fig.01 — flow field
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ff-skeleton {
  background: radial-gradient(
    120% 90% at 50% 22%,
    color-mix(in oklch, var(--primary) 12%, transparent),
    transparent 70%
  );
}
</style>
