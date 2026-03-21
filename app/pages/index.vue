<script lang="ts" setup>
import { useActiveSection } from "~/composables/useActiveSection";

const { observeSections } = useActiveSection();

useSeoMeta({
  title: "JJ Teoh — Software Developer",
  description:
    "Software developer specializing in distributed systems, full-stack applications, and infrastructure. From edge device sync engines to financial platforms and compliance systems.",
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
      :initial="{ opacity: 0 }"
      :visible-once="{ opacity: 1 }"
      :duration="800"
      class="container mx-auto px-4 max-w-6xl py-8"
    >
      <picture>
        <source
          media="(prefers-color-scheme: dark)"
          srcset="
            https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake-dark.svg
          "
        />
        <source
          media="(prefers-color-scheme: light)"
          srcset="
            https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake.svg
          "
        />
        <img
          alt="GitHub contribution grid snake animation"
          src="https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake-dark.svg"
          class="w-full opacity-60"
        />
      </picture>
    </div>

    <section id="contact" class="py-16 md:py-24">
      <div class="container mx-auto px-4 max-w-6xl">
        <ContactForm />
      </div>
    </section>

    <footer class="border-t border-border py-6">
      <div class="container mx-auto px-4 max-w-6xl text-xs text-muted-foreground">
        <p>
          3D model
          <a
            href="https://sketchfab.com/3d-models/smart-cube-93c9330b3eba470c9c2f26fad0e1d8f7"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-foreground"
            >"Smart Cube"</a
          >
          by
          <a
            href="https://sketchfab.com/ABSoln"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-foreground"
            >ABSoln</a
          >
          is licensed under
          <a
            href="http://creativecommons.org/licenses/by-nc/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-foreground"
            >CC-BY-NC-4.0</a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>
