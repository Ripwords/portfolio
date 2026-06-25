<script setup lang="ts">
import type { CSSProperties } from "vue";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { usePreferredReducedMotion } from "@vueuse/core";

const colorMode = useColorMode();
const target = ref();
const reduced = usePreferredReducedMotion();

const bannerImage = computed(() =>
  colorMode.value === "dark"
    ? "/img/astro/morning-moon-banner.webp"
    : "/img/astro/night-moon-banner.webp",
);

const bannerAlt = computed(() => (colorMode.value === "dark" ? "morning moon" : "night moon"));

const parallax = reactive(useParallax(target));
const tilt = computed(() => (Number.isFinite(parallax.tilt) ? parallax.tilt : 0));
const roll = computed(() => (Number.isFinite(parallax.roll) ? parallax.roll : 0));

const targetStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: ".3s ease-out all",
};
const cardWindowStyle: CSSProperties = {
  overflow: "hidden",
  fontSize: "6rem",
  position: "absolute",
  top: "calc(50% - 1em)",
  left: "calc(50% - 2.33em/2)",
  height: "2em",
  width: "2.33em",
};
const layerBase: CSSProperties = {
  position: "absolute",
  height: "100%",
  width: "100%",
  transition: ".3s ease-out all",
};
const containerStyle: CSSProperties = {
  margin: "2em auto",
  perspective: "400px",
};

const layer0 = computed(() => ({
  ...layerBase,
  transform:
    reduced.value === "reduce"
      ? "scale(1.20)"
      : `translateX(${tilt.value * 10}px) translateY(${roll.value * 10}px) scale(1.20)`,
}));

const layer1 = computed(() => ({
  ...layerBase,
  transform:
    reduced.value === "reduce"
      ? "scale(1.33)"
      : `translateX(${tilt.value * 15}px) translateY(${roll.value * 15}px) scale(1.33)`,
}));

const cardStyle = computed(() => ({
  background: "var(--card)",
  height: "13rem",
  width: "15rem",
  position: "relative",
  borderRadius: "1.25rem",
  border: "1px solid var(--border)",
  overflow: "hidden",
  transition: ".3s ease-out all",
  boxShadow: "0 24px 60px -34px rgb(0 0 0 / 0.7)",
  transform:
    reduced.value === "reduce"
      ? "none"
      : `rotateX(${roll.value * 20}deg) rotateY(${tilt.value * 20}deg)`,
}));
</script>

<template>
  <div class="w-full">
    <Card
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="800"
      class="surface w-full overflow-hidden rounded-[1.5rem]"
    >
      <CardHeader class="p-0">
        <img
          :src="bannerImage"
          loading="lazy"
          :alt="bannerAlt"
          class="object-cover overflow-hidden w-full h-[300px]"
        />
      </CardHeader>
      <CardContent
        v-motion
        :initial="{ opacity: 0, x: 40 }"
        :enter="{ opacity: 1, x: 0 }"
        :duration="1000"
      >
        <div class="flex flex-col md:gap-10 md:flex-row md:items-center">
          <div ref="target" :style="targetStyle">
            <div :style="containerStyle">
              <div :style="cardStyle">
                <div :style="cardWindowStyle">
                  <img
                    :style="layer0"
                    loading="lazy"
                    src="/img/astro/lagoon-parallax.webp"
                    alt=""
                    aria-hidden="true"
                  />
                  <img
                    :style="layer1"
                    loading="lazy"
                    src="/img/astro/lagoon-parallax-cutout.webp"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col gap-4 py-8">
              <p class="leading-relaxed text-muted-foreground">
                My journey with astrophotography started with a fascination with the stars. How the
                universe makes us feel small and insignificant.
              </p>
              <p class="leading-relaxed text-muted-foreground">
                In 2020, I bought my first telescope, and started imaging the night sky, and here
                are some of my favorite images.
              </p>
              <p class="leading-relaxed text-muted-foreground">
                The process of capturing these images required a lot of learning and patience,
                learning the software required to process the images and the hardware required to
                capture the images.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
