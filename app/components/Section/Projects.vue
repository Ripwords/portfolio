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

      <!-- Featured: editorial split rows, screenshot beside type, alternating -->
      <div class="mt-4 flex flex-col gap-20 md:gap-28">
        <article
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          v-motion
          :initial="{ opacity: 0, y: 40, filter: 'blur(6px)' }"
          :visible-once="{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { delay: index * 100, duration: 700 },
          }"
        >
          <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <!-- Media -->
            <div
              v-if="project.screenshot"
              class="group relative overflow-hidden rounded-2xl border border-border"
              :class="index % 2 === 1 ? 'lg:order-2' : ''"
            >
              <NuxtImg
                :src="project.screenshot.src"
                :alt="project.screenshot.alt"
                class="aspect-[16/10] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              <span
                class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5"
              />
            </div>

            <!-- Text -->
            <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
              <p class="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {{ project.category }}
              </p>
              <h3 class="heading mt-3 text-3xl leading-[1.05] md:text-4xl">
                {{ project.title }}
              </h3>
              <p class="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {{ project.description }}
              </p>

              <!-- Typographic spec stats — no boxes -->
              <dl
                v-if="project.metrics?.length"
                class="mt-7 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5"
              >
                <div
                  v-for="metric in project.metrics.slice(0, 4)"
                  :key="metric.label"
                  class="border-t border-border pt-3"
                >
                  <dt
                    class="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase"
                  >
                    {{ metric.label }}
                  </dt>
                  <dd class="mt-1.5 text-sm leading-snug font-medium text-foreground">
                    {{ metric.value }}
                  </dd>
                </div>
              </dl>

              <!-- Stack: quiet logo + label, no pills -->
              <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span
                  v-for="tech in project.primaryStack"
                  :key="tech.label"
                  class="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Icon v-if="tech.icon" :name="tech.icon" class="size-4" />
                  {{ tech.label }}
                </span>
              </div>

              <!-- Actions -->
              <div class="mt-8 flex flex-wrap items-center gap-6">
                <a
                  v-for="link in projectLinks(project)"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="focus-ring group inline-flex cursor-pointer items-center gap-2 border-b border-border pb-0.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon :name="link.icon" class="size-4" />
                  {{ link.label }}
                </a>
                <button
                  type="button"
                  class="focus-ring inline-flex cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  :aria-expanded="expandedId === project.id"
                  @click="toggle(project.id)"
                >
                  {{ expandedId === project.id ? "Hide detail" : "How it works" }}
                  <Icon
                    :name="expandedId === project.id ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                    class="size-4"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Expanded detail: full-width, hairline-separated columns (no boxes) -->
          <div
            v-show="expandedId === project.id"
            class="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-3"
          >
            <div
              v-for="block in [
                { k: 'Problem', v: project.problem },
                { k: 'Approach', v: project.approach },
                { k: 'Impact', v: project.impact },
              ]"
              :key="block.k"
            >
              <p class="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                {{ block.k }}
              </p>
              <p class="mt-3 text-sm leading-7 text-foreground/85">{{ block.v }}</p>
            </div>
          </div>
        </article>
      </div>

      <!-- Supporting: editorial index list, expands in place -->
      <div class="mt-24 border-t border-border md:mt-28">
        <p class="pt-8 text-sm text-muted-foreground">More work</p>
        <div>
          <div
            v-for="(project, index) in supportingProjects"
            :key="project.id"
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :visible-once="{
              opacity: 1,
              y: 0,
              transition: { delay: index * 50, duration: 450 },
            }"
            class="border-b border-border"
          >
            <button
              type="button"
              class="focus-ring group flex w-full cursor-pointer items-baseline gap-5 py-6 text-left"
              :aria-expanded="expandedId === project.id"
              @click="toggle(project.id)"
            >
              <Icon
                :name="project.displayIcon || 'lucide:boxes'"
                class="size-5 shrink-0 translate-y-0.5 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
              />
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h4 class="heading text-lg leading-tight text-foreground">{{ project.title }}</h4>
                  <span
                    class="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase"
                  >
                    {{ project.category }}
                  </span>
                </div>
                <p
                  class="mt-1.5 text-sm text-muted-foreground"
                  :class="expandedId === project.id ? '' : 'line-clamp-1'"
                >
                  {{ project.description }}
                </p>
              </div>
              <Icon
                name="lucide:chevron-down"
                class="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-foreground"
                :class="expandedId === project.id ? 'rotate-180' : ''"
              />
            </button>

            <div v-show="expandedId === project.id" class="space-y-4 pb-7 pl-10">
              <NuxtImg
                v-if="project.screenshot"
                :src="project.screenshot.src"
                :alt="project.screenshot.alt"
                class="aspect-video w-full max-w-2xl rounded-2xl border border-border object-cover"
                loading="lazy"
              />
              <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {{ project.approach }}
              </p>
              <p
                class="max-w-2xl border-l-2 border-primary/50 pl-3 text-sm leading-relaxed text-foreground/90"
              >
                {{ project.impact }}
              </p>
              <a
                v-if="projectLinks(project).length"
                :href="projectLinks(project)[0].href"
                target="_blank"
                rel="noopener noreferrer"
                class="focus-ring inline-flex cursor-pointer items-center gap-1.5 border-b border-border pb-0.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
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
