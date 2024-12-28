<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core"

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greaterOrEqual("sm")

const scale = computed(() => {
  if (smAndLarger.value) return 0.05
  return 0.04
})

const handleError = (error: Error) => {
  if (import.meta.dev) {
    console.log("TresJS: ", error)
  }
}
</script>

<template>
  <!-- TresJS throwing error when unmounting component -->
  <NuxtErrorBoundary @error="handleError">
    <TresCanvas>
      <TresPerspectiveCamera />
      <Suspense>
        <ObjectGLTF
          model-path="/models/saturn_planet_gltf/scene.gltf"
          :initial-position="[0, 0.55, 0]"
          :initial-rotation="[0, 0.3, 0.1]"
          :model-scale="scale"
        />
      </Suspense>
      <TresDirectionalLight
        :intensity="2"
        :position="[3, 3, 3]"
        cast-shadow
      />
      <Suspense>
        <Stars
          :rotation="[0, yRotation, 0]"
          :radius="50"
          :depth="50"
          :count="5000"
          :size="0.3"
          :size-attenuation="true"
        />
      </Suspense>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </NuxtErrorBoundary>
</template>
