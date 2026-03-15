<script lang="ts" setup>
import { useActiveSection } from "~/composables/useActiveSection"

const { observeSections } = useActiveSection()

useSeoMeta({
  title: "JJ Teoh — Software Developer",
  description:
    "Software developer specializing in distributed systems, full-stack applications, and infrastructure. From edge device sync engines to financial platforms and compliance systems.",
})

onMounted(() => {
  observeSections()
})
</script>

<template>
  <div>
    <SectionHero />
    <SectionAbout />
    <SectionProjects />
    <SectionSkills />
    <SectionArchitecture />
    <SectionWriting />
    <SectionExperience />
    <SectionPhilosophy />

    <div
      v-motion
      :initial="{ opacity: 0 }"
      :visible-once="{ opacity: 1 }"
      :duration="800"
      class="container mx-auto px-4 max-w-6xl py-8"
    >
      <picture>
        <source
          media="(prefers-color-scheme: dark)"
          srcset="https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake-dark.svg"
        />
        <source
          media="(prefers-color-scheme: light)"
          srcset="https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake.svg"
        />
        <img
          alt="GitHub contribution grid snake animation"
          src="https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake-dark.svg"
          class="w-full opacity-60"
        />
      </picture>
    </div>

    <section
      id="contact"
      class="py-16 md:py-24"
    >
      <div class="container mx-auto px-4 max-w-6xl">
        <ContactForm />
      </div>
    </section>
  </div>
</template>
