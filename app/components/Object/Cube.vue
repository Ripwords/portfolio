<script lang="ts" setup>
import { breakpointsTailwind } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const smAndLarger = breakpoints.greaterOrEqual("sm");

const scale = computed(() => {
  if (smAndLarger.value) return 1.2;
  return 1;
});
</script>

<template>
  <!-- TresJS throwing error when unmounting component -->
  <NuxtErrorBoundary>
    <TresCanvas>
      <TresPerspectiveCamera />
      <Suspense>
        <ObjectGLTF
          model-path="/models/smart_cube/scene.gltf"
          :initial-position="[0, 0, 0]"
          :initial-rotation="[0, 0, 1]"
          :model-scale="scale"
        />
      </Suspense>
      <TresDirectionalLight :intensity="4" :position="[3, 3, 3]" cast-shadow />
      <TresDirectionalLight :intensity="2" :position="[-3, -1, -3]" />
      <Suspense>
        <ObjectAnimatedStars />
      </Suspense>
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </NuxtErrorBoundary>
</template>
