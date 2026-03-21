<script lang="ts" setup>
import { skills } from "~/lib/data/skills";
</script>

<template>
  <section id="skills" class="py-16 md:py-24">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0 }"
        :duration="600"
        class="text-3xl md:text-4xl font-bold mb-8"
      >
        Skills & Technologies
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="(category, index) in skills"
          :key="category.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 100 + index * 80 } }"
          :duration="600"
        >
          <CardHeader>
            <div class="flex items-center gap-3">
              <Icon :name="category.icon" class="size-6 text-primary" />
              <CardTitle>{{ category.title }}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="skill in category.skills"
                :key="skill.label"
                variant="secondary"
                class="rounded-md"
              >
                <Icon
                  v-if="skill.icon"
                  :name="skill.icon"
                  class="size-4"
                  :class="skill.invertIcon ? 'dark:invert' : ''"
                />
                {{ skill.label }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
