<script lang="ts" setup>
// Paper / Ink toggle. Flips the color-mode preference and persists it.
const colorMode = useColorMode();
const isInk = computed(() => colorMode.value === "dark");

function toggle() {
  colorMode.preference = isInk.value ? "light" : "dark";
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="focus-ring interactive inline-flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
      :aria-label="isInk ? 'Switch to Paper (light) mode' : 'Switch to Ink (dark) mode'"
      :aria-pressed="isInk"
      @click="toggle"
    >
      <Icon :name="isInk ? 'lucide:sun' : 'lucide:moon'" class="size-4.5" />
    </button>
    <template #fallback>
      <span class="inline-flex size-9 items-center justify-center text-muted-foreground">
        <Icon name="lucide:sun-moon" class="size-4.5" />
      </span>
    </template>
  </ClientOnly>
</template>
