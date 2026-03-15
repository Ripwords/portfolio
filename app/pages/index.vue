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
