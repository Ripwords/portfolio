<script lang="ts" setup>
import { projects } from '~/lib/data/projects'

const sectionId = 'projects'
const expandedId = ref<string | null>(null)

function toggle(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}
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
          class="cursor-pointer transition-colors hover:border-primary/30"
          @click="toggle(project.id)"
        >
          <CardHeader class="pb-3">
            <div class="flex items-center justify-between gap-2">
              <CardTitle class="text-lg">{{ project.title }}</CardTitle>
              <div class="flex items-center gap-2 shrink-0">
                <NuxtLink
                  v-if="project.github"
                  :to="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-muted-foreground hover:text-foreground transition-colors"
                  :aria-label="`${project.title} on GitHub`"
                  @click.stop
                >
                  <Icon name="line-md:github-loop" class="size-5" />
                </NuxtLink>
              </div>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <Badge variant="outline" class="rounded-md text-xs">
                {{ project.category }}
              </Badge>
              <p class="text-sm text-muted-foreground">
                {{ project.description }}
              </p>
            </div>
          </CardHeader>

          <CardContent class="pt-0 space-y-3">
            <div class="flex flex-wrap gap-1.5">
              <Badge
                v-for="tech in project.primaryStack"
                :key="tech.label"
                variant="secondary"
                class="rounded-md"
              >
                <Icon v-if="tech.icon" :name="tech.icon" class="size-4" />
                {{ tech.label }}
              </Badge>
              <span
                v-if="project.stack.length > project.primaryStack.length"
                class="text-xs text-muted-foreground self-center"
              >
                +{{ project.stack.length - project.primaryStack.length }} more
              </span>
            </div>

            <!-- Expandable detail -->
            <div
              v-show="expandedId === project.id"
              class="space-y-3 pt-2 border-t border-border"
            >
              <div>
                <p class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Problem</p>
                <p class="text-sm">{{ project.problem }}</p>
              </div>
              <div>
                <p class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Approach</p>
                <p class="text-sm">{{ project.approach }}</p>
              </div>
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
              <div class="border-l-2 border-primary/50 pl-3 text-sm font-medium text-foreground/90">
                {{ project.impact }}
              </div>
            </div>

            <!-- Expand hint -->
            <div class="flex justify-center">
              <Icon
                :name="expandedId === project.id ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                class="size-4 text-muted-foreground"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
