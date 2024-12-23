<script setup lang="ts">
const links = [
  [
    {
      label: "Resume",
      icon: "line-md:file-document",
      to: "/resume",
      target: "_blank",
    },
  ],
  [
    {
      label: "",
      icon: "line-md:linkedin",
      to: "https://www.linkedin.com/in/jjteoh/",
      target: "_blank",
    },
    {
      label: "",
      icon: "line-md:github-loop",
      to: "https://github.com/Ripwords",
      target: "_blank",
    },
    {
      label: "",
      icon: "line-md:twitter-x",
      to: "https://x.com/Ripwords_",
      target: "_blank",
    },
    {
      label: "",
      icon: "meteor-icons:bluesky",
      to: "https://bsky.app/profile/ripwords.bsky.social",
      target: "_blank",
    },
  ],
]

onMounted(() => $fetch("/api/visit", { method: "POST" }))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UContainer>
      <UHorizontalNavigation :links />
      <NuxtPage />
    </UContainer>
    <UNotifications />
  </div>
</template>
