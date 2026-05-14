<script lang="ts" setup>
import { projects, type Project } from "~/lib/data/projects";

const sectionId = "projects";
const expandedId = ref<string | null>("ai-trader");

const featuredProjects = computed(() => projects.filter((project) => project.featured));
const supportingProjects = computed(() => projects.filter((project) => !project.featured));

function toggle(id: string) {
  expandedId.value = expandedId.value === id ? null : id;
}

function projectLinks(project: Project) {
  if (project.links?.length) {
    return project.links;
  }

  return project.github
    ? [
        {
          label: "Source",
          href: project.github,
          icon: "line-md:github-loop",
        },
      ]
    : [];
}
</script>

<template>
  <section :id="sectionId" class="relative py-16 md:py-24 overflow-hidden">
    <div
      class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
    />
    <div class="absolute inset-x-0 top-16 h-40 bg-primary/[0.025] blur-3xl" />

    <div class="container mx-auto px-4 max-w-6xl relative">
      <div class="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Badge
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0 }"
            :duration="500"
            variant="outline"
            class="rounded-md mb-4"
          >
            Systems worth opening in an interview
          </Badge>
          <h2
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0 }"
            :duration="600"
            class="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Featured Projects
          </h2>
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
            class="mt-3 max-w-2xl text-muted-foreground leading-relaxed"
          >
            Complex, self-hosted builds with real integrations, typed backends, durable storage, and
            enough edge cases to show how I think through systems.
          </p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: 150, duration: 500 } }"
          class="grid grid-cols-3 gap-2 text-center"
        >
          <div class="rounded-md border bg-card/70 px-3 py-2 shadow-sm">
            <p class="text-lg font-semibold">2</p>
            <p class="text-[11px] text-muted-foreground">flagship builds</p>
          </div>
          <div class="rounded-md border bg-card/70 px-3 py-2 shadow-sm">
            <p class="text-lg font-semibold">AI</p>
            <p class="text-[11px] text-muted-foreground">agents + tools</p>
          </div>
          <div class="rounded-md border bg-card/70 px-3 py-2 shadow-sm">
            <p class="text-lg font-semibold">OSS</p>
            <p class="text-[11px] text-muted-foreground">SDK mindset</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 120, duration: 550 } }"
          class="group relative gap-0 overflow-hidden rounded-md py-0 bg-card/85 border-border/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
        >
          <div
            class="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/80 via-primary/25 to-transparent"
          />

          <CardHeader class="p-5 pb-0">
            <div class="flex items-start justify-between gap-5">
              <div class="min-w-0 space-y-3">
                <div class="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" class="rounded-md text-xs">
                    {{ project.category }}
                  </Badge>
                  <Badge variant="secondary" class="rounded-md text-xs">Flagship</Badge>
                </div>

                <div class="space-y-2">
                  <CardTitle class="text-xl leading-tight md:text-2xl">
                    {{ project.title }}
                  </CardTitle>
                  <CardDescription class="text-sm leading-relaxed md:text-[15px]">
                    {{ project.description }}
                  </CardDescription>
                </div>
              </div>

              <div
                class="flex size-12 shrink-0 items-center justify-center rounded-md border bg-muted/40 text-primary transition-transform duration-300 group-hover:scale-105"
              >
                <Icon :name="project.displayIcon || 'lucide:boxes'" class="size-6" />
              </div>
            </div>
          </CardHeader>

          <CardContent class="p-5 space-y-5">
            <div v-if="project.metrics?.length" class="grid grid-cols-2 gap-2">
              <div
                v-for="metric in project.metrics"
                :key="`${project.id}-${metric.label}`"
                class="rounded-md border bg-muted/25 p-3"
              >
                <div class="mb-2 flex items-center gap-2 text-muted-foreground">
                  <Icon v-if="metric.icon" :name="metric.icon" class="size-4" />
                  <span class="text-[11px] uppercase tracking-wide">{{ metric.label }}</span>
                </div>
                <p class="text-sm font-semibold leading-tight">{{ metric.value }}</p>
              </div>
            </div>

            <ul v-if="project.highlights?.length" class="space-y-2">
              <li
                v-for="highlight in project.highlights"
                :key="highlight"
                class="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <Icon name="lucide:check-circle-2" class="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{{ highlight }}</span>
              </li>
            </ul>

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
            </div>

            <div v-show="expandedId === project.id" class="space-y-4 border-t border-border pt-4">
              <div class="grid gap-4 sm:grid-cols-3">
                <div>
                  <p class="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Problem
                  </p>
                  <p class="text-sm leading-relaxed">{{ project.problem }}</p>
                </div>
                <div>
                  <p class="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Approach
                  </p>
                  <p class="text-sm leading-relaxed">{{ project.approach }}</p>
                </div>
                <div>
                  <p class="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Impact
                  </p>
                  <p class="text-sm leading-relaxed">{{ project.impact }}</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-1.5">
                <Badge
                  v-for="tech in project.stack"
                  :key="tech.label"
                  variant="outline"
                  class="rounded-md bg-background/60"
                >
                  <Icon v-if="tech.icon" :name="tech.icon" class="size-4" />
                  {{ tech.label }}
                </Badge>
              </div>
            </div>

            <div
              class="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4"
            >
              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="link in projectLinks(project)"
                  :key="link.href"
                  as="a"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                >
                  <Icon :name="link.icon" class="size-4" />
                  {{ link.label }}
                </Button>
              </div>

              <Button type="button" variant="ghost" size="sm" @click="toggle(project.id)">
                <Icon
                  :name="expandedId === project.id ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                  class="size-4"
                />
                {{ expandedId === project.id ? "Less detail" : "More detail" }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="mt-10">
        <div class="mb-4 flex items-center justify-between gap-4">
          <h3 class="text-lg font-semibold tracking-tight">More Systems Work</h3>
          <div class="h-px flex-1 bg-border" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            v-for="(project, index) in supportingProjects"
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { delay: 100 + index * 70, duration: 450 },
            }"
            class="gap-0 rounded-md py-0 bg-card/70 border-border/75 transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
          >
            <CardHeader class="p-4 pb-0">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 space-y-2">
                  <Badge variant="outline" class="rounded-md text-xs">
                    {{ project.category }}
                  </Badge>
                  <CardTitle class="text-base leading-tight">{{ project.title }}</CardTitle>
                  <CardDescription class="line-clamp-2 text-sm leading-relaxed">
                    {{ project.description }}
                  </CardDescription>
                </div>

                <Button
                  v-if="projectLinks(project).length"
                  as="a"
                  :href="projectLinks(project)[0].href"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="icon"
                  :aria-label="`${project.title} source`"
                  class="size-8 shrink-0"
                >
                  <Icon :name="projectLinks(project)[0].icon" class="size-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent class="p-4 space-y-4">
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
              </div>

              <div v-show="expandedId === project.id" class="space-y-3 border-t border-border pt-4">
                <p class="text-sm leading-relaxed text-muted-foreground">
                  {{ project.approach }}
                </p>
                <div class="border-l-2 border-primary/50 pl-3 text-sm font-medium">
                  {{ project.impact }}
                </div>
              </div>

              <div class="flex justify-end">
                <Button type="button" variant="ghost" size="sm" @click="toggle(project.id)">
                  <Icon
                    :name="expandedId === project.id ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                    class="size-4"
                  />
                  {{ expandedId === project.id ? "Less" : "Details" }}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>
