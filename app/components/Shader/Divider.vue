<script lang="ts" setup>
// Section divider — an editorial hairline with a slow clay glow sweep.
// Deliberately CSS-only (not a WebGL instance) so it can recur many times
// down the page with zero GPU cost. Respects reduced-motion via the global rule.
withDefaults(defineProps<{ label?: string }>(), { label: "" });
</script>

<template>
  <div class="mx-auto flex max-w-6xl items-center gap-4 px-4" aria-hidden="true">
    <span class="divider-line h-px flex-1" />
    <span
      v-if="label"
      class="font-mono text-[10px] tracking-[0.28em] text-muted-foreground/70 uppercase"
    >
      {{ label }}
    </span>
    <span class="divider-line h-px flex-1" />
  </div>
</template>

<style scoped>
.divider-line {
  background: linear-gradient(
    90deg,
    transparent,
    var(--border) 20%,
    var(--border) 80%,
    transparent
  );
  position: relative;
  overflow: hidden;
}
.divider-line::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in oklch, var(--primary) 70%, transparent),
    transparent
  );
  width: 33%;
  transform: translateX(-120%);
  animation: sweep 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes sweep {
  0% {
    transform: translateX(-120%);
  }
  55%,
  100% {
    transform: translateX(420%);
  }
}
</style>
