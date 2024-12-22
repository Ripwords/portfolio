<script lang="ts" setup>
import type { TresInstance } from "@tresjs/core"

const {
  initialPosition = [0, 0, 0],
  initialRotation = [0, 0, 0],
  modelScale = 0.05,
  modelPath,
} = defineProps<{
  initialPosition?: [number, number, number]
  initialRotation?: [number, number, number]
  modelScale?: number
  modelPath: string
}>()

const modelRef = shallowRef<TresInstance | null>(null)
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (modelRef.value) {
    modelRef.value.rotation.y += delta * 0.5
  }
})

watchOnce(modelRef, (value) => {
  if (modelRef.value && value) {
    modelRef.value.position.set(...initialPosition)
    modelRef.value.rotation.set(...initialRotation)
    modelRef.value.scale.set(modelScale, modelScale, modelScale)
  }
})
</script>

<template>
  <TresMesh ref="modelRef">
    <Suspense>
      <GLTFModel
        :path="modelPath"
        material="basic"
        :scale="modelScale"
        draco
      />
    </Suspense>
  </TresMesh>
</template>
