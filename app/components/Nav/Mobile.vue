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
</script>

<template>
  <!-- Floating glass dock for mobile primary navigation -->
  <nav
    class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:hidden"
    style="padding-bottom: env(safe-area-inset-bottom)"
    aria-label="Primary"
  >
    <ul class="glass flex flex-row items-center gap-1 rounded-full px-2 py-1.5">
      <li v-for="item in mobileLinks" :key="item.to">
        <NuxtLink
          :to="item.to"
          :aria-label="item.label"
          class="relative flex size-11 flex-col items-center justify-center rounded-full transition-colors duration-300"
          :class="isActive(item.to) ? 'text-primary-foreground' : 'text-muted-foreground'"
        >
          <span
            v-if="isActive(item.to)"
            class="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_0_18px_-4px_var(--primary)]"
          />
          <Icon v-if="item.icon" :name="item.icon" class="text-xl" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
