<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core"

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greaterOrEqual("sm")

const highlights = [
  "Distributed Systems",
  "Full-Stack",
  "Infrastructure",
  "Desktop Apps",
  "Cross-Platform Mobile",
]
</script>

<template>
  <section
    id="hero"
    class="relative min-h-[70vh] flex items-center py-16 md:py-24 overflow-hidden"
  >
    <!-- Desktop: 3D cube (v-if prevents mount + asset loading on mobile) -->
    <div
      v-if="isDesktop"
      class="absolute inset-0 left-1/3 opacity-50 pointer-events-none hero-cube-mask"
    >
      <LazyObjectCube />
    </div>

    <!-- Mobile: dot grid with pulse -->
    <div
      class="sm:hidden absolute inset-0 pointer-events-none hero-grid opacity-15"
    />

    <!-- Bottom fade to blend into next section -->
    <div
      class="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-linear-to-t from-background to-transparent z-20"
    />

    <!-- Mobile: animated gradient glow -->
    <div class="sm:hidden absolute inset-0 pointer-events-none overflow-hidden">
      <div class="hero-glow" />
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
          Mechatronics engineer turned software developer. I build reliable
          systems — from edge device sync engines and financial platforms to
          compliance infrastructure and developer tooling.
        </p>

        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
          :duration="600"
          class="flex flex-wrap gap-2"
        >
          <Badge
            v-for="highlight in highlights"
            :key="highlight"
            variant="secondary"
          >
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
          <Button
            as="a"
            href="#projects"
          >
            View Projects
          </Button>
          <Button
            as="a"
            href="#contact"
            variant="outline"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Desktop cube: fade left edge */
.hero-cube-mask {
  mask-image: linear-gradient(to right, transparent, black 30%);
}

/* Dot grid pattern */
.hero-grid {
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.5) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  mask-image: radial-gradient(
    ellipse 70% 60% at 50% 50%,
    black 20%,
    transparent 70%
  );
}

/* Animated gradient glow */
.hero-glow {
  position: absolute;
  width: 120%;
  height: 120%;
  top: 20%;
  left: -10%;
  background: radial-gradient(
    ellipse at 30% 60%,
    rgba(100, 120, 255, 0.12) 0%,
    rgba(80, 200, 255, 0.06) 30%,
    transparent 70%
  );
  animation: glow-drift 8s ease-in-out infinite alternate;
}

@keyframes glow-drift {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(5%, -8%) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translate(-5%, 5%) scale(0.95);
    opacity: 0.7;
  }
}
</style>
