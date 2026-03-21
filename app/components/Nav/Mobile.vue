<script lang="ts" setup>
import { mobileLinks } from "~/lib/nav-links"
</script>

<template>
  <!-- Bottom tab bar for main navigation (mobile only) -->
  <nav
    class="fixed bottom-0 left-0 w-full bg-background border-t border-border z-50 sm:hidden"
    style="
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    "
  >
    <ul class="flex flex-row justify-around items-center h-16">
      <li
        v-for="item in mobileLinks"
        :key="item.to"
      >
        <NuxtLink
          :to="item.to"
          class="flex flex-col items-center justify-center px-2 py-1 text-xs text-muted-foreground hover:text-accent-foreground transition-colors"
          active-class="text-primary"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
            class="text-xl mb-0.5"
          />
          <span class="text-xs">{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
