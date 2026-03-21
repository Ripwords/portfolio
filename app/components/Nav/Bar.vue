<script lang="ts" setup>
import { sectionLinks, pageLinks, socialLinks } from "~/lib/nav-links"
import { useActiveSection } from "~/composables/useActiveSection"

const { activeSection } = useActiveSection()
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <!-- Top bar: main links (desktop left), social links (desktop right) -->
  <nav
    class="w-full py-2 px-2 flex items-center justify-end sm:justify-between"
  >
    <!-- Logo + nav links -->
    <div class="hidden sm:flex items-center gap-1">
      <NuxtLink
        to="/"
        aria-label="Home"
        class="inline-flex items-center mr-2"
      >
        <NuxtImg
          src="/img/logo/logo.png"
          alt="JJ Teoh"
          class="h-10 w-auto"
        />
      </NuxtLink>

    <ul class="flex flex-row gap-1">
      <!-- Section anchor links -->
      <li
        v-for="item in sectionLinks"
        :key="item.to"
      >
        <NuxtLink
          :to="isHome ? item.to : `/${item.to}`"
          class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors"
          :class="isHome && activeSection === item.to.slice(1) ? 'bg-accent text-accent-foreground' : ''"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
            class="mr-1 text-base"
          />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </li>

      <!-- Page links -->
      <li
        v-for="item in pageLinks"
        :key="item.to"
      >
        <NuxtLink
          :to="item.to"
          :target="item.target || '_self'"
          rel="noopener noreferrer"
          :external="item.external"
          class="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors"
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
    </div>

    <!-- Color mode toggle + Social links: always top right -->
    <ul class="flex flex-row gap-2 items-center">
      <li
        v-for="item in socialLinks"
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
