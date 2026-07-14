<script lang="ts" setup>
import { mobileLinks } from "~/lib/nav-links";
import { useActiveSection } from "~/composables/useActiveSection";

const { activeSection } = useActiveSection();
const route = useRoute();

function isActive(to: string) {
  if (to.startsWith("/#")) {
    return route.path === "/" && activeSection.value === to.slice(2);
  }
  return route.path === to;
}

// iOS in-app browsers (WhatsApp/Instagram WKWebView) pin `position: fixed` to the
// LAYOUT viewport, not the visual one — so on a long page a bottom-anchored dock
// rides up into the middle of the screen as you scroll. Compensate with the
// VisualViewport API: keep the dock 16px above the *visible* bottom edge.
// On standards-correct browsers the gap is 0, so this reduces to `bottom: 16px`.
const bottomOffset = ref(16);

function updateOffset() {
  const vv = window.visualViewport;
  if (!vv) return;
  const gap = window.innerHeight - (vv.height + vv.offsetTop);
  bottomOffset.value = Math.max(0, Math.round(gap)) + 16;
}

onMounted(() => {
  const vv = window.visualViewport;
  if (!vv) return;
  updateOffset();
  vv.addEventListener("resize", updateOffset, { passive: true });
  vv.addEventListener("scroll", updateOffset, { passive: true });
});

onBeforeUnmount(() => {
  const vv = window.visualViewport;
  if (!vv) return;
  vv.removeEventListener("resize", updateOffset);
  vv.removeEventListener("scroll", updateOffset);
});
</script>

<template>
  <!-- Floating glass dock for mobile primary navigation -->
  <nav
    class="fixed left-1/2 z-50 -translate-x-1/2 sm:hidden"
    :style="{ bottom: `${bottomOffset}px`, paddingBottom: 'env(safe-area-inset-bottom)' }"
    aria-label="Primary"
  >
    <ul class="glass flex flex-row items-center gap-1 rounded-full px-2 py-1.5">
      <li v-for="item in mobileLinks" :key="item.to">
        <NuxtLink
          :to="item.to"
          :aria-label="item.label"
          class="focus-ring interactive relative flex size-11 flex-col items-center justify-center rounded-full"
          :class="isActive(item.to) ? 'text-primary-foreground' : 'text-muted-foreground'"
        >
          <span
            v-if="isActive(item.to)"
            class="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_0_18px_-4px_var(--primary)]"
          />
          <Icon v-if="item.icon" :name="item.icon" class="text-xl" />
        </NuxtLink>
      </li>
      <li class="flex items-center">
        <span class="mx-0.5 h-6 w-px bg-border/70" />
        <NavModeToggle />
      </li>
    </ul>
  </nav>
</template>
