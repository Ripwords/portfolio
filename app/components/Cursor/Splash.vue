<script lang="ts" setup>
import { createSplashCursor } from "~/lib/splash-cursor";
import { usePreferredReducedMotion } from "@vueuse/core";

// joeee.dev-style WebGL fluid cursor (reactbits "Splash Cursor"), ported to Vue.
// Colorful fluid trails that follow the pointer. Disabled on touch + reduced motion.
const canvas = ref<HTMLCanvasElement | null>(null);
const reduced = usePreferredReducedMotion();
let cleanup: (() => void) | null = null;

onMounted(() => {
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (!fine || reduced.value === "reduce" || !canvas.value) return;
  cleanup = createSplashCursor(canvas.value, {
    DYE_RESOLUTION: 1024,
    DENSITY_DISSIPATION: 6.5, // trails fade quickly → subtle, not strong
    VELOCITY_DISSIPATION: 3,
    SPLAT_RADIUS: 0.1, // smaller splats
    SPLAT_FORCE: 2600, // gentler push
    CURL: 2, // calmer swirl
    COLOR_UPDATE_SPEED: 8,
    TRANSPARENT: true,
  });
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-[45] opacity-55" aria-hidden="true">
    <canvas ref="canvas" class="block h-full w-full" />
  </div>
</template>
