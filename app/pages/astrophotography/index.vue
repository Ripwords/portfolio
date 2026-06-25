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

const categories = ["All", ...new Set(astroImages.map((image) => image.category))];
const activeCategory = ref("All");
const filteredImages = computed(() =>
  activeCategory.value === "All"
    ? astroImages
    : astroImages.filter((image) => image.category === activeCategory.value),
);

useSeoMeta({
  title: "Astrophotography",
  description:
    "A portfolio gallery of my lunar, planetary, widefield, and deep-sky astrophotography",
});
</script>

<template>
  <div class="min-h-screen">
    <section class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-28 pb-10 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="700"
        class="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] lg:items-end"
      >
        <div class="space-y-5">
          <p class="eyebrow">Astrophotography</p>
          <div class="space-y-4">
            <h1 class="heading legible max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
              Night sky portfolio
            </h1>
            <p class="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Lunar, planetary, widefield, and deep-sky captures collected from my telescope and
              camera work since 2020.
            </p>
          </div>
        </div>

        <div class="surface overflow-hidden rounded-[1.5rem]">
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
      <div class="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="heading text-2xl">Gallery</h2>
          <p class="mt-2 text-sm text-muted-foreground">
            {{ filteredImages.length }} optimized WebP images
          </p>
        </div>
        <div class="flex flex-wrap gap-2" aria-label="Astrophotography category filters">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="focus-ring cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            :class="
              activeCategory === category
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card/70 text-muted-foreground hover:bg-accent hover:text-foreground'
            "
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="grid auto-rows-[260px] grid-cols-1 gap-4 md:grid-cols-3 lg:auto-rows-[300px]">
        <article
          v-for="(image, index) in filteredImages"
          :key="image.src"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :duration="650"
          :delay="Math.min(index * 45, 360)"
          class="surface group relative overflow-hidden rounded-2xl"
          :class="image.class"
        >
          <img
            :src="image.src"
            :alt="`${image.title} astrophotography`"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div
            class="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 via-background/55 to-transparent p-4 text-foreground"
          >
            <div class="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 class="heading text-lg">{{ image.title }}</h3>
                <p class="text-sm text-muted-foreground">{{ image.object }}</p>
              </div>
              <span class="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
                {{ image.category }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
