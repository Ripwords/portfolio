<script lang="ts" setup>
useSeoMeta({
  description:
    "Hi! 👋 I am JJ Teoh, a Mechatronics Engineer, driven by a passion for software and experience in modern web technologies.",
})
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :enter="{ opacity: 1, y: 0 }"
    :duration="800"
  >
    <ContactForm />
  </div>
</template>
