<script lang="ts" setup>
const showStats = import.meta.dev

const yRotation = shallowRef(0)
useRenderLoop().onLoop(({ delta }) => {
  yRotation.value += 0.02 * delta
})
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <ObjectGLTF
      model-path="/models/saturn_planet_gltf/scene.gltf"
      :initial-position="[0, 0.55, 0]"
      :initial-rotation="[0, 0.3, 0.1]"
      :model-scale="0.05"
    />
    <TresDirectionalLight
      :intensity="2"
      :position="[3, 3, 3]"
      cast-shadow
    />
    <Stars
      :rotation="[0, yRotation, 0]"
      :radius="50"
      :depth="50"
      :count="5000"
      :size="0.3"
      :size-attenuation="true"
    />
    <TresGridHelper
      v-if="showStats"
      :args="[4, 4]"
    />
    <TresAmbientLight :intensity="1" />
    <StatsGl v-if="showStats" />
  </TresCanvas>
</template>
