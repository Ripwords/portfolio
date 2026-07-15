<script lang="ts" setup>
import { useActiveSection } from "~/composables/useActiveSection";

const { observeSections } = useActiveSection();
const colorMode = useColorMode();

// The snake SVG ships in a light + dark variant — pick to match the mode so it
// reads correctly in both Paper and Ink.
const contributionSnake = computed(() =>
  colorMode.value === "dark"
    ? "https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake-dark.svg"
    : "https://raw.githubusercontent.com/Ripwords/Ripwords/output/github-contribution-grid-snake.svg",
);

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

    <ShaderDivider />
    <SectionProjects />

    <ShaderDivider />
    <SectionExperience />
    <SectionSkills />

    <ShaderDivider />
    <SectionWriting />
    <SectionArchitecture />

    <ShaderDivider />
    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :visible-once="{ opacity: 1, y: 0 }"
      :duration="800"
      class="container mx-auto px-4 max-w-6xl py-12"
    >
      <div class="surface rounded-2xl p-5 sm:p-7">
        <p class="eyebrow mb-4">Contribution activity</p>
        <ClientOnly>
          <img
            alt="GitHub contribution grid snake animation"
            :src="contributionSnake"
            class="w-full"
          />
          <template #fallback>
            <div class="h-24 w-full animate-pulse rounded-lg bg-accent/40" />
          </template>
        </ClientOnly>
      </div>
    </div>

    <ShaderDivider />
    <section id="contact" class="py-16 md:py-24">
      <div class="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          title="Contact"
          lede="Have a system to build, a product to polish, or a technical problem that needs a reliable path forward?"
        />
        <ContactForm />
      </div>
    </section>

    <footer class="border-t border-border py-8">
      <div
        class="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-xs text-muted-foreground sm:flex-row"
      >
        <p class="font-mono tracking-wide">© {{ new Date().getFullYear() }} JJ Teoh</p>
        <p class="font-mono tracking-wide">
          Built with Nuxt. Photographs shot through my telescope.
        </p>
      </div>
    </footer>
  </div>
</template>
