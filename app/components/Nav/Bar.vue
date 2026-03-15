<script lang="ts" setup>
import { navLinks as links } from "~/lib/nav-links"
</script>

<template>
  <!-- Top bar: main links (desktop left), social links (desktop right) -->
  <nav
    class="w-full py-2 px-2 flex items-center justify-end sm:justify-between"
  >
    <!-- Main navigation links: desktop only -->
    <ul class="hidden sm:flex flex-row gap-2">
      <li
        v-for="item in links[0]"
        :key="item.to"
      >
        <NuxtLink
          :to="item.to"
          :target="item.target || '_self'"
          rel="noopener noreferrer"
          :external="item.external"
          class="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors"
          active-class="bg-accent text-accent-foreground"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
            class="mr-1 text-base"
          />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
    <!-- Social links: always top right -->
    <ul class="flex flex-row gap-2">
      <li
        v-for="item in links[1]"
        :key="item.to"
      >
        <NuxtLink
          :to="item.to"
          :target="item.target || '_blank'"
          rel="noopener noreferrer"
          :aria-label="item.label"
          class="inline-flex items-center justify-center rounded-md px-3 py-2 text-lg hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
            class="text-lg"
          />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
