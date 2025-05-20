<script setup lang="ts">
import type { CSSProperties } from "vue"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const target = ref()

const parallax = reactive(useParallax(target))

const targetStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: ".3s ease-out all",
}
const cardWindowStyle: CSSProperties = {
  overflow: "hidden",
  fontSize: "6rem",
  position: "absolute",
  top: "calc(50% - 1em)",
  left: "calc(50% - 2.33em/2)",
  height: "2em",
  width: "2.33em",
}
const layerBase: CSSProperties = {
  position: "absolute",
  height: "100%",
  width: "100%",
  transition: ".3s ease-out all",
}
const containerStyle: CSSProperties = {
  margin: "2em auto",
  perspective: "400px",
}

const layer0 = computed(() => ({
  ...layerBase,
  transform: `translateX(${parallax.tilt * 10}px) translateY(${
    parallax.roll * 10
  }px) scale(1.20)`,
}))

const layer1 = computed(() => ({
  ...layerBase,
  transform: `translateX(${parallax.tilt * 15}px) translateY(${
    parallax.roll * 15
  }px) scale(1.33)`,
}))

const cardStyle = computed(() => ({
  background: "#fff",
  height: "13rem",
  width: "15rem",
  borderRadius: "5px",
  border: "1px solid #cdcdcd",
  overflow: "hidden",
  transition: ".3s ease-out all",
  boxShadow: "0 0 20px 0 rgba(255, 255, 255, 0.25)",
  transform: `rotateX(${parallax.roll * 20}deg) rotateY(${
    parallax.tilt * 20
  }deg)`,
}))
</script>

<template>
  <div class="p-4 w-full flex justify-center">
    <Card
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0 }"
      :duration="800"
      class="w-full max-w-3xl"
    >
      <CardHeader class="p-0">
        <NuxtImg
          src="/img/morning_moon.jpeg"
          loading="lazy"
          alt="morning moon"
          class="object-cover overflow-hidden w-full h-[300px]"
        />
      </CardHeader>
      <CardContent
        v-motion
        :initial="{ opacity: 0, x: 40 }"
        :enter="{ opacity: 1, x: 0 }"
        :duration="1000"
      >
        <div class="flex flex-col md:gap-10 md:flex-row">
          <div
            ref="target"
            :style="targetStyle"
          >
            <div :style="containerStyle">
              <div :style="cardStyle">
                <div :style="cardWindowStyle">
                  <NuxtImg
                    :style="layer0"
                    loading="lazy"
                    src="/img/lagoon.jpeg"
                    alt="morning moon"
                  />
                  <NuxtImg
                    :style="layer1"
                    loading="lazy"
                    src="/img/lagoon_no_bg.png"
                    alt="lagoon no background"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col gap-4 py-8">
              <p>
                My journey with astrophotography started with a fascination with
                the stars. How the universe makes us feel small and
                insignificant.
              </p>
              <p>
                In 2020, I bought my first telescope, and started imaging the
                night sky, and here are some of my favorite images.
              </p>
              <p>
                The process of capturing these images required a lot of learning
                and patience, learning the software required to process the
                images and the hardware required to capture the images.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
