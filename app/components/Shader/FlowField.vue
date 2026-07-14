<script lang="ts" setup>
// Signature hero shader panel. A cursor/scroll-reactive ink flow field.
// The CSS gradient base guarantees an intentional look before the canvas
// paints (or if WebGL is unavailable); the canvas overlays the living current.
import { flowFieldFrag } from "~/lib/shaders/flow-field.glsl";

const host = ref<HTMLElement | null>(null);
const { canvasRef, setMouse } = useShaderCanvas({ fragmentShader: flowFieldFrag });

function onMove(e: PointerEvent) {
  const el = host.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = 1 - (e.clientY - rect.top) / rect.height;
  setMouse(x, y);
}

onMounted(() => window.addEventListener("pointermove", onMove, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("pointermove", onMove));
</script>

<template>
  <div ref="host" class="ff-host relative h-full w-full overflow-hidden" aria-hidden="true">
    <canvas ref="canvasRef" class="block h-full w-full" />
  </div>
</template>

<style scoped>
.ff-host {
  background: radial-gradient(
    120% 90% at 50% 22%,
    color-mix(in oklch, var(--primary) 14%, transparent),
    transparent 70%
  );
}
</style>
