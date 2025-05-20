<script lang="ts" setup>
useSeoMeta({
  title: "Astrophotography",
  description: "My astrophotography journey and some of my best shots",
})
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :enter="{ opacity: 1, y: 0 }"
    :duration="800"
  >
    <ParallaxDayMoon />
  </div>
</template>
