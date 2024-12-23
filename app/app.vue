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
      icon: "line-md:linkedin",
      to: "https://www.linkedin.com/in/jjteoh/",
      target: "_blank",
    },
    {
      icon: "line-md:github-loop",
      to: "https://github.com/Ripwords",
      target: "_blank",
    },
    {
      icon: "line-md:twitter-x",
      to: "https://x.com/Ripwords_",
      target: "_blank",
    },
    {
      icon: "meteor-icons:bluesky",
      to: "https://bsky.app/profile/ripwords.bsky.social",
      target: "_blank",
    },
  ],
]
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UContainer>
      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>
      <NuxtPage />
    </UContainer>
    <UNotifications />
  </div>
</template>
