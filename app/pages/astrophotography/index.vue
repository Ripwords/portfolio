<script lang="ts" setup>
const astroImages = [
  {
    title: "Lagoon Nebula",
    object: "M8",
    category: "Deep sky",
    src: "/img/astro/lagoon-nebula.webp",
    class: "md:col-span-2",
  },
  {
    title: "Eagle Nebula",
    object: "M16",
    category: "Deep sky",
    src: "/img/astro/eagle-nebula.webp",
  },
  {
    title: "Veil Nebula",
    object: "Cygnus Loop",
    category: "Deep sky",
    src: "/img/astro/veil-nebula.webp",
    class: "md:col-span-2",
  },
  {
    title: "Trifid Nebula",
    object: "M20",
    category: "Deep sky",
    src: "/img/astro/trifid-nebula.webp",
  },
  {
    title: "Orion Nebula",
    object: "M42",
    category: "Deep sky",
    src: "/img/astro/orion-nebula.webp",
  },
  {
    title: "Orion Widefield",
    object: "Orion region",
    category: "Deep sky",
    src: "/img/astro/orion-widefield.webp",
  },
  {
    title: "Pleiades",
    object: "M45",
    category: "Star cluster",
    src: "/img/astro/pleiades.webp",
  },
  {
    title: "Milky Way Core",
    object: "Galactic center",
    category: "Widefield",
    src: "/img/astro/milky-way-core.webp",
    class: "md:col-span-2",
  },
  {
    title: "Milky Way Panorama",
    object: "Widefield stack",
    category: "Widefield",
    src: "/img/astro/milky-way-panorama.webp",
    class: "md:col-span-2",
  },
  {
    title: "Night Sky",
    object: "Widefield",
    category: "Widefield",
    src: "/img/astro/night-sky-widefield.webp",
  },
  {
    title: "Waxing Moon",
    object: "Lunar surface",
    category: "Lunar",
    src: "/img/astro/waxing-moon.webp",
  },
  {
    title: "Moon Highlands",
    object: "Lunar surface",
    category: "Lunar",
    src: "/img/astro/moon-highlands.webp",
  },
  {
    title: "Moon Terminator",
    object: "Lunar surface",
    category: "Lunar",
    src: "/img/astro/moon-terminator.webp",
  },
  {
    title: "Morning Moon",
    object: "Lunar surface",
    category: "Lunar",
    src: "/img/astro/morning-moon.webp",
  },
  {
    title: "Lunar Frame",
    object: "Planetary capture",
    category: "Lunar",
    src: "/img/astro/planetary-lunar-frame.webp",
  },
  {
    title: "Jupiter",
    object: "Gas giant",
    category: "Planetary",
    src: "/img/astro/jupiter.webp",
  },
  {
    title: "Saturn",
    object: "Ringed planet",
    category: "Planetary",
    src: "/img/astro/saturn.webp",
  },
  {
    title: "Widefield Stars",
    object: "Star field",
    category: "Widefield",
    src: "/img/astro/widefield-stars.webp",
  },
  {
    title: "Constellation Field",
    object: "Widefield",
    category: "Widefield",
    src: "/img/astro/widefield-constellation.webp",
    class: "md:col-span-2",
  },
];

useSeoMeta({
  title: "Astrophotography",
  description:
    "A portfolio gallery of my lunar, planetary, widefield, and deep-sky astrophotography",
});
</script>

<template>
  <div class="min-h-screen">
    <section class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="700"
        class="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] lg:items-end"
      >
        <div class="space-y-5">
          <p class="text-sm font-medium uppercase text-muted-foreground">Astrophotography</p>
          <div class="space-y-4">
            <h1 class="max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              Night sky portfolio
            </h1>
            <p class="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Lunar, planetary, widefield, and deep-sky captures collected from my telescope and
              camera work since 2020.
            </p>
          </div>
        </div>

        <div class="overflow-hidden rounded-md border bg-card shadow-sm">
          <img
            src="/img/astro/lagoon-nebula-wide.webp"
            alt="Lagoon Nebula widefield astrophotography"
            class="h-[260px] w-full object-cover sm:h-[340px] lg:h-[430px]"
            fetchpriority="high"
          />
        </div>
      </div>

      <ParallaxDayMoon />
    </section>

    <section class="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold tracking-normal">Gallery</h2>
          <p class="mt-2 text-sm text-muted-foreground">
            {{ astroImages.length }} optimized WebP images
          </p>
        </div>
      </div>

      <div class="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-3 lg:auto-rows-[300px]">
        <article
          v-for="(image, index) in astroImages"
          :key="image.src"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :duration="650"
          :delay="Math.min(index * 45, 360)"
          class="group relative overflow-hidden rounded-md border bg-card shadow-sm"
          :class="image.class"
        >
          <img
            :src="image.src"
            :alt="`${image.title} astrophotography`"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div
            class="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/35 to-transparent p-4 text-white"
          >
            <div class="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 class="text-lg font-semibold tracking-normal">{{ image.title }}</h3>
                <p class="text-sm text-white/75">{{ image.object }}</p>
              </div>
              <span class="rounded-sm bg-white/15 px-2 py-1 text-xs font-medium text-white/85">
                {{ image.category }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
