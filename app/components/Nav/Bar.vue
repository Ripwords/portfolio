<script lang="ts" setup>
import { sectionLinks, pageLinks, socialLinks } from "~/lib/nav-links";
import { useActiveSection } from "~/composables/useActiveSection";

const { activeSection } = useActiveSection();
const route = useRoute();
const isHome = computed(() => route.path === "/");

function isActive(to: string) {
  return isHome.value && activeSection.value === to.slice(1);
}
</script>

<template>
  <!-- Floating glass dock — detached from the top, centered, single line -->
  <nav class="fixed top-4 left-1/2 z-50 hidden -translate-x-1/2 sm:block" aria-label="Primary">
    <div class="glass flex items-center gap-1 rounded-full px-2 py-1.5">
      <NuxtLink
        to="/"
        aria-label="Home"
        class="focus-ring interactive mr-1 inline-flex items-center rounded-full p-1 hover:bg-accent/70"
      >
        <img
          src="/img/logo/logo.png"
          alt="JJ Teoh"
          class="size-8 shrink-0 rounded-full object-contain"
        />
      </NuxtLink>

      <span class="mx-1 h-5 w-px bg-border/70" />

      <ul class="flex flex-row items-center gap-0.5">
        <li v-for="item in sectionLinks" :key="item.to">
          <NuxtLink
            :to="isHome ? item.to : `/${item.to}`"
            class="focus-ring interactive group relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium"
            :class="
              isActive(item.to)
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            "
          >
            <span
              v-if="isActive(item.to)"
              class="absolute inset-0 -z-10 rounded-full bg-primary shadow-[0_0_20px_-4px_var(--primary)]"
            />
            <Icon v-if="item.icon" :name="item.icon" class="text-base" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </li>

        <li v-for="item in pageLinks" :key="item.to">
          <NuxtLink
            :to="item.to"
            :target="item.target || '_self'"
            rel="noopener noreferrer"
            :external="item.external"
            class="focus-ring interactive inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/60 hover:text-foreground"
            active-class="text-foreground"
          >
            <Icon v-if="item.icon" :name="item.icon" class="text-base" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>

      <span class="mx-1 h-5 w-px bg-border/70" />

      <ul class="flex flex-row items-center gap-0.5 pr-1">
        <li v-for="item in socialLinks" :key="item.to">
          <NuxtLink
            :to="item.to"
            :target="item.target || '_blank'"
            rel="noopener noreferrer"
            :aria-label="item.label"
            class="focus-ring interactive inline-flex size-9 items-center justify-center rounded-full text-base text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Icon v-if="item.icon" :name="item.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
