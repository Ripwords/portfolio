<script lang="ts" setup>
import { projects, type Project } from "~/lib/data/projects";

const expandedId = ref<string | null>(null);

const featuredProjects = computed(() => projects.filter((project) => project.featured));
const supportingProjects = computed(() => projects.filter((project) => !project.featured));

function toggle(id: string) {
  expandedId.value = expandedId.value === id ? null : id;
}

function projectLinks(project: Project) {
  if (project.links?.length) return project.links;
  return project.github
    ? [{ label: "Source", href: project.github, icon: "line-md:github-loop" }]
    : [];
}
</script>

<template>
  <section id="projects" class="py-24 md:py-32">
    <div class="container mx-auto max-w-6xl px-4">
      <SectionHeading
        title="Selected work"
        lede="A few systems I've built end to end. Self-hosted, strongly typed, and full of the edge cases that show how I think."
      />

      <!-- Featured: two roomy cards, detail tucked behind expand -->
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 40, filter: 'blur(6px)' }"
          :visible-once="{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { delay: index * 120, duration: 650 },
          }"
          class="surface surface-hover group flex flex-col rounded-[1.5rem] p-7"
          :class="expandedId === project.id ? 'lg:col-span-2' : ''"
        >
          <div class="flex items-start justify-between gap-5">
            <div class="min-w-0">
              <p class="eyebrow">{{ project.category }}</p>
              <h3 class="heading mt-3 text-2xl leading-tight">
                {{ project.title }}
              </h3>
            </div>
            <Icon
              :name="project.displayIcon || 'lucide:boxes'"
              class="size-6 shrink-0 text-foreground/60 transition-colors duration-500 group-hover:text-foreground"
            />
          </div>

          <p class="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {{ project.description }}
          </p>

          <NuxtImg
            v-if="project.screenshot"
            :src="project.screenshot.src"
            :alt="project.screenshot.alt"
            class="mt-5 aspect-video w-full rounded-2xl border border-border/70 object-cover"
            loading="lazy"
          />

          <div
            v-if="project.metrics?.length"
            class="mt-5 grid grid-cols-2 gap-2"
            :class="expandedId === project.id ? 'lg:grid-cols-4' : 'lg:grid-cols-2'"
          >
            <div
              v-for="metric in project.metrics.slice(0, 4)"
              :key="metric.label"
              class="rounded-2xl border border-border/70 bg-accent/25 p-3"
            >
              <div class="flex items-center gap-2 text-primary">
                <Icon v-if="metric.icon" :name="metric.icon" class="size-4" />
                <p class="text-[11px] font-medium uppercase tracking-[0.18em]">
                  {{ metric.label }}
                </p>
              </div>
              <p class="mt-2 text-sm font-medium leading-tight text-foreground">
                {{ metric.value }}
              </p>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.primaryStack"
              :key="tech.label"
              class="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-accent/30 px-2.5 py-1 text-xs text-muted-foreground"
            >
              <Icon v-if="tech.icon" :name="tech.icon" class="size-3.5" />
              {{ tech.label }}
            </span>
          </div>

          <div
            v-show="expandedId === project.id"
            class="mt-6 grid gap-3 border-t border-border/60 pt-6 lg:grid-cols-3"
          >
            <div
              v-for="block in [
                { k: 'Problem', v: project.problem },
                { k: 'Approach', v: project.approach },
                { k: 'Impact', v: project.impact },
              ]"
              :key="block.k"
              class="rounded-2xl border border-border/60 bg-accent/20 p-4"
            >
              <p class="eyebrow mb-2">{{ block.k }}</p>
              <p class="text-sm leading-7 text-foreground/85">{{ block.v }}</p>
            </div>
          </div>

          <div class="mt-auto flex items-center justify-between gap-3 pt-7">
            <div class="flex flex-wrap gap-3">
              <a
                v-for="link in projectLinks(project)"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                <Icon :name="link.icon" class="size-4" />
                {{ link.label }}
              </a>
            </div>
            <button
              type="button"
              class="focus-ring inline-flex cursor-pointer items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
              @click="toggle(project.id)"
            >
              {{ expandedId === project.id ? "Less" : "How it works" }}
              <Icon
                :name="expandedId === project.id ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                class="size-4"
              />
            </button>
          </div>
        </article>
      </div>

      <!-- Supporting: quiet rows that expand in place for detail -->
      <div class="mt-12">
        <p class="eyebrow mb-5">More work</p>
        <div
          class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-border/70 md:grid-cols-2"
        >
          <div
            v-for="(project, index) in supportingProjects"
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { delay: index * 60, duration: 450 },
            }"
            class="bg-card/85 backdrop-blur-sm transition-colors duration-500"
            :class="[
              expandedId === project.id ? 'bg-card' : 'hover:bg-card',
              index === supportingProjects.length - 1 && supportingProjects.length % 2 === 1
                ? 'md:col-span-2'
                : '',
            ]"
          >
            <button
              type="button"
              class="focus-ring group flex w-full cursor-pointer items-start gap-4 rounded-none p-6 text-left"
              :aria-expanded="expandedId === project.id"
              @click="toggle(project.id)"
            >
              <span
                class="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-accent/30 text-foreground/70 transition-colors duration-500 group-hover:text-foreground"
              >
                <Icon :name="project.displayIcon || 'lucide:boxes'" class="size-5" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="eyebrow">{{ project.category }}</p>
                <h4 class="heading mt-2 leading-tight text-foreground">{{ project.title }}</h4>
                <p
                  class="mt-1.5 text-sm text-muted-foreground"
                  :class="expandedId === project.id ? '' : 'line-clamp-1'"
                >
                  {{ project.description }}
                </p>
              </div>
              <Icon
                name="lucide:chevron-down"
                class="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-500 group-hover:text-foreground"
                :class="expandedId === project.id ? 'rotate-180' : ''"
              />
            </button>

            <div v-show="expandedId === project.id" class="space-y-4 pb-6 pl-[3.75rem] pr-6">
              <NuxtImg
                v-if="project.screenshot"
                :src="project.screenshot.src"
                :alt="project.screenshot.alt"
                class="aspect-video w-full rounded-2xl border border-border/70 object-cover"
                loading="lazy"
              />
              <p class="text-sm leading-relaxed text-muted-foreground">{{ project.approach }}</p>
              <p class="border-l-2 border-border pl-3 text-sm leading-relaxed text-foreground/90">
                {{ project.impact }}
              </p>
              <a
                v-if="projectLinks(project).length"
                :href="projectLinks(project)[0].href"
                target="_blank"
                rel="noopener noreferrer"
                class="focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-md text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                <Icon :name="projectLinks(project)[0].icon" class="size-4" />
                {{ projectLinks(project)[0].label }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
