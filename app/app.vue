<script setup lang="ts">
import { Toaster } from "~/components/ui/sonner"

const links = [
  [
    {
      label: "Home",
      icon: "line-md:home-md-twotone",
      to: "/",
    },
    {
      label: "Astro",
      icon: "line-md:sunny-outline-to-moon-alt-loop-transition",
      to: "/astrophotography",
    },
    {
      label: "Resume",
      icon: "line-md:file-document",
      to: "/resume",
      target: "_blank",
      external: true,
    },
  ],
  [
    {
      label: "LinkedIn",
      icon: "line-md:linkedin",
      to: "https://www.linkedin.com/in/jjteoh/",
      target: "_blank",
      slot: "social",
    },
    {
      label: "GitHub",
      icon: "line-md:github-loop",
      to: "https://github.com/Ripwords",
      target: "_blank",
      slot: "social",
    },
    {
      label: "X",
      icon: "line-md:twitter-x",
      to: "https://x.com/Ripwords_",
      target: "_blank",
      slot: "social",
    },
    {
      label: "Bluesky",
      icon: "meteor-icons:bluesky",
      to: "https://bsky.app/profile/ripwords.bsky.social",
      target: "_blank",
      slot: "social",
    },
  ],
] as {
  label: string
  icon: string
  to: string
  target?: string
  slot?: string
  external?: boolean
}[][]

onMounted(() => {
  if (import.meta.env.PROD) {
    useHead({
      script: [
        {
          src: "https://umami.jjteoh.com/script.js",
          "data-website-id": "206487a8-ebf4-4a35-bed7-572c3b0fa224",
          defer: true,
        },
      ],
    })
  }
  $fetch("/api/visit", { method: "POST" })
})
</script>

<template>
  <div>
    <Toaster />
    <NuxtRouteAnnouncer />
    <!-- Top bar: main links (desktop left), social links (desktop right) -->
    <nav class="w-full py-2 px-2 flex items-center justify-between">
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
    <!-- Main content with bottom padding for tab bar -->
    <div class="pb-16 sm:pb-0">
      <NuxtPage />
    </div>
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
          v-for="item in links[0]"
          :key="item.to"
        >
          <NuxtLink
            :to="item.to"
            :target="item.target || '_blank'"
            rel="noopener noreferrer"
            :external="item.external"
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
  </div>
</template>
