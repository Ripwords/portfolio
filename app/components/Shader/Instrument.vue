<script lang="ts" setup>
// The Instrument — an interactive 3D "specimen" presented editorially.
// Drag to rotate; gentle auto-spin at rest. Matte, near-monochrome, lit with a
// clay rim so it belongs to the Paper & Ink system in both modes.
import { usePreferredReducedMotion } from "@vueuse/core";

const reduced = usePreferredReducedMotion();
const colorMode = useColorMode();

const isInk = computed(() => colorMode.value === "dark");
// matte base reads as charcoal on paper, soft pewter on ink
const baseColor = computed(() => (isInk.value ? "#c4cad6" : "#28282c"));
const animate = computed(() => reduced.value !== "reduce");
</script>

<template>
  <figure class="flex flex-col items-center">
    <div class="bezel relative aspect-square w-full max-w-[360px] overflow-hidden rounded-2xl">
      <ClientOnly>
        <NuxtErrorBoundary>
          <TresCanvas :alpha="true" clear-color="#00000000" :dpr="[1, 1.5]">
            <TresPerspectiveCamera :position="[0, 0, 4.2]" :fov="45" />
            <OrbitControls
              :enable-zoom="false"
              :enable-pan="false"
              :auto-rotate="animate"
              :auto-rotate-speed="0.6"
              :enable-damping="true"
            />
            <TresAmbientLight :intensity="1.6" />
            <TresDirectionalLight :intensity="3" :position="[3, 3, 4]" />
            <!-- clay rim light -->
            <TresDirectionalLight :intensity="2.4" :position="[-3, -1, -2]" color="#e08865" />
            <TresMesh>
              <TresTorusKnotGeometry :args="[0.85, 0.27, 220, 32]" />
              <TresMeshStandardMaterial :color="baseColor" :roughness="0.6" :metalness="0.15" />
            </TresMesh>
          </TresCanvas>
          <template #error>
            <div class="instrument-fallback size-full" />
          </template>
        </NuxtErrorBoundary>
        <template #fallback>
          <div class="instrument-fallback size-full" />
        </template>
      </ClientOnly>
      <div class="pointer-events-none absolute inset-3 rounded-xl border border-border/50" />
    </div>
    <figcaption class="eyebrow mt-4 text-center">
      <slot>fig.02 — instrument · drag to rotate</slot>
    </figcaption>
  </figure>
</template>

<style scoped>
.instrument-fallback {
  background:
    radial-gradient(
      60% 60% at 40% 35%,
      color-mix(in oklch, var(--primary) 22%, transparent),
      transparent 70%
    ),
    radial-gradient(
      50% 50% at 65% 70%,
      color-mix(in oklch, var(--foreground) 8%, transparent),
      transparent 70%
    );
}
</style>
