<script lang="ts" setup>
const sectionId = "philosophy";

const tenets = [
  {
    title: "Build for failure",
    description:
      "Systems fail. I design with that assumption: graceful degradation, retry logic, and clear error boundaries are architectural requirements, not afterthoughts.",
    icon: "shield-alert",
  },
  {
    title: "Prefer simplicity",
    description:
      "The best code is the code you don't write. I reach for the simplest solution that solves the actual problem, and resist complexity until it's earned.",
    icon: "minimize-2",
  },
  {
    title: "Design for maintainability",
    description:
      "Code is read far more than it's written. I optimize for clarity, explicit contracts, and the developer who inherits the codebase six months from now.",
    icon: "book-open",
  },
];
</script>

<template>
  <section :id="sectionId" class="py-16 md:py-24">
    <div class="container mx-auto max-w-6xl px-4">
      <SectionHeading
        title="Engineering philosophy"
        lede="The principles I use when systems need to be understandable, resilient, and maintainable."
      />

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card
          v-for="(tenet, index) in tenets"
          :key="tenet.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 150 } }"
          :duration="600"
          class="surface rounded-2xl"
        >
          <CardHeader>
            <div class="flex items-center gap-3">
              <Icon :name="`lucide:${tenet.icon}`" class="size-5 shrink-0 text-primary" />
              <CardTitle class="heading text-lg">{{ tenet.title }}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p class="leading-relaxed text-muted-foreground">
              {{ tenet.description }}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
