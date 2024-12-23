<script setup lang="ts">
const links = [
  [
    // {
    //   label: "General",
    //   icon: "i-heroicons-user-circle",
    // },
    // {
    //   label: "Members",
    //   icon: "i-heroicons-user-group",
    // },
    // {
    //   label: "Notifications",
    //   icon: "i-heroicons-bell",
    // },
  ],
  [
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
