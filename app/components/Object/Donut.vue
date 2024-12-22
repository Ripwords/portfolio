<script lang="ts" setup>
const donutRef = shallowRef()

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  if (donutRef.value) {
    donutRef.value.rotation.y += delta
    donutRef.value.rotation.z = elapsed * 0.2
  }
})
</script>

<template>
  <TresMesh ref="donutRef">
    <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
    <TresMeshBasicMaterial color="orange" />
  </TresMesh>
</template>
