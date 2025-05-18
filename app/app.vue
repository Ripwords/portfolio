<script setup lang="ts">
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
]

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
  <UApp
    :toaster="{
      position: 'top-right',
      duration: 3000,
    }"
  >
    <NuxtRouteAnnouncer />
    <UContainer>
      <UNavigationMenu
        :items="links"
        :external-icon="false"
      >
        <template #social-label="{ item }">
          <span :aria-label="item.label" />
        </template>
      </UNavigationMenu>
      <NuxtPage />
    </UContainer>
  </UApp>
</template>
