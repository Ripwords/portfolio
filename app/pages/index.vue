<script lang="ts" setup>
import { useActiveSection } from "~/composables/useActiveSection";

const { observeSections } = useActiveSection();

useSeoMeta({
  title: "JJ Teoh — Software Developer",
  description:
    "Software developer building complex AI systems, SDKs, self-hosted products, distributed infrastructure, and full-stack platforms.",
});

onMounted(() => {
  observeSections();
});
</script>

<template>
  <div>
    <SectionHero />
    <SectionAbout />
    <SectionProjects />
    <SectionExperience />
    <SectionSkills />
    <SectionWriting />
    <SectionArchitecture />

    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :visible-once="{ opacity: 1, y: 0 }"
      :duration="800"
      class="container mx-auto px-4 max-w-6xl py-12"
    >
      <div class="glass rounded-[1.75rem] p-5 sm:p-7">
        <p class="eyebrow mb-4">Contribution activity</p>
        <!-- Site is force-dark, so always use the dark SVG (OS prefers-color-scheme is unreliable here) -->
        <img
          alt="GitHub contribution grid snake animation"
          src="https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake-dark.svg"
          class="w-full"
        />
      </div>
    </div>

    <section id="contact" class="py-16 md:py-24">
      <div class="container mx-auto px-4 max-w-6xl">
        <ContactForm />
      </div>
    </section>

    <footer class="border-t border-border/60 py-8">
      <div
        class="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs text-muted-foreground sm:flex-row"
      >
        <p>© {{ new Date().getFullYear() }} JJ Teoh</p>
        <p class="font-mono tracking-wide">Built with Nuxt. Backdrop shot through my telescope.</p>
      </div>
    </footer>
  </div>
</template>
