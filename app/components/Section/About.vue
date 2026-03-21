<script lang="ts" setup>
const specializations = [
  {
    title: "Distributed Systems",
    icon: "lucide:network",
    description:
      "Building reliable data synchronization, offline-first architectures, and edge computing solutions that work in constrained environments.",
  },
  {
    title: "Full-Stack Product Engineering",
    icon: "lucide:layers",
    description:
      "End-to-end application development from database design and API architecture to polished user interfaces and deployment pipelines.",
  },
  {
    title: "Infrastructure & DevOps",
    icon: "lucide:container",
    description:
      "Container orchestration, CI/CD pipelines, monitoring, and the operational tooling that keeps systems running in production.",
  },
];
</script>

<template>
  <section id="about" class="py-16 md:py-24">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="600"
        class="text-3xl md:text-4xl font-bold mb-8"
      >
        About
      </h2>

      <p
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
        :duration="600"
        class="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12"
      >
        I started in mechatronics engineering — designing control systems and working with embedded
        hardware. That foundation in systems thinking shapes how I approach software: I think in
        terms of failure modes, data flow, and operational constraints, not just features and
        frameworks.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          v-for="(spec, index) in specializations"
          :key="spec.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200 + index * 100 } }"
          :duration="600"
        >
          <CardHeader>
            <div class="flex items-center gap-3">
              <Icon :name="spec.icon" class="size-6 text-primary" />
              <CardTitle>{{ spec.title }}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-sm leading-relaxed">
              {{ spec.description }}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
