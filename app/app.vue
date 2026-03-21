<script setup lang="ts">
import { Toaster } from "~/components/ui/sonner"

const {
  public: { umamiWebsiteId },
} = useRuntimeConfig()

const colorMode = useColorMode()
colorMode.preference = 'dark'

onMounted(() => {
  if (import.meta.env.PROD) {
    useHead({
      script: [
        {
          src: "https://umami.jjteoh.com/script.js",
          "data-website-id": umamiWebsiteId,
          defer: true,
        },
      ],
    })
  }
})
</script>

<template>
  <div>
    <Toaster />
    <NuxtRouteAnnouncer />
    <NavBar />
    <!-- Main content with bottom padding for tab bar -->
    <div class="pb-16 sm:pb-0">
      <NuxtPage />
    </div>
    <NavMobile />
  </div>
</template>
