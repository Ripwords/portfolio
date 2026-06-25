<script setup lang="ts">
import { Toaster } from "~/components/ui/sonner";

const {
  public: { umamiWebsiteId },
} = useRuntimeConfig();

const colorMode = useColorMode();
colorMode.preference = "dark";

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
    });
  }
});
</script>

<template>
  <div>
    <a
      href="#main"
      class="focus-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      Skip to main content
    </a>
    <BackgroundCosmos />
    <ClientOnly>
      <CursorSplash />
    </ClientOnly>
    <Toaster />
    <NuxtRouteAnnouncer />
    <NavBar />
    <!-- Main content with bottom padding for tab bar -->
    <main id="main" class="relative z-10 pb-24 sm:pb-0">
      <NuxtPage />
    </main>
    <NavMobile />
  </div>
</template>
