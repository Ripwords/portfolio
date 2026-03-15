<script lang="ts" setup>
import { projects } from '~/lib/data/projects'

const sectionId = 'projects'
</script>

<template>
  <section :id="sectionId" class="py-16 md:py-24">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="600"
        class="text-3xl font-bold tracking-tight mb-10"
      >
        Featured Projects
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="(project, index) in projects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }"
        >
          <CardHeader>
            <CardTitle>{{ project.title }}</CardTitle>
            <p class="text-sm text-muted-foreground">
              {{ project.problem }}
            </p>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-sm">
              {{ project.approach }}
            </p>

            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="tech in project.stack"
                :key="tech.label"
                variant="secondary"
                class="rounded-md"
              >
                <Icon v-if="tech.icon" :name="tech.icon" class="size-4" />
                {{ tech.label }}
              </Badge>
            </div>

            <div class="flex items-center justify-between gap-4">
              <div class="border-l-2 border-primary/50 pl-3 text-sm font-medium text-foreground/90">
                {{ project.impact }}
              </div>
              <NuxtLink
                v-if="project.github"
                :to="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                :aria-label="`${project.title} on GitHub`"
              >
                <Icon name="line-md:github-loop" class="size-5" />
              </NuxtLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
