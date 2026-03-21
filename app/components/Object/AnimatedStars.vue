<script lang="ts" setup>
const yRotation = shallowRef(0);
const { onBeforeRender } = useLoop();
onBeforeRender(() => {
  yRotation.value += 0.001;
});
</script>

<template>
  <Stars
    :rotation="[0, yRotation, 0]"
    :radius="50"
    :depth="50"
    :count="5000"
    :size="0.3"
    :size-attenuation="true"
  />
</template>
