<script lang="ts" setup>
const sectionId = "writing";

const { data: articles } = await useAsyncData("articles", () =>
  queryCollection("content").order("date", "DESC").all(),
);

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<template>
  <section v-if="articles?.length" :id="sectionId" class="py-24 md:py-32">
    <div class="container mx-auto max-w-6xl px-4">
      <SectionHeading
        title="Writing"
        lede="Notes from building things, mostly the parts that bit me."
      />

      <!-- Editorial index -->
      <div v-if="articles?.length" class="mt-12 border-t border-border">
        <NuxtLink
          v-for="(article, index) in articles"
          :key="article.path"
          :to="article.path"
          class="focus-ring group block border-b border-border py-8 md:py-10"
        >
          <article
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 80, duration: 500 } }"
            class="grid gap-3 md:grid-cols-[10rem_1fr] md:gap-8"
          >
            <p v-if="article.date" class="eyebrow pt-1.5">
              {{ formatDate(article.date) }}
            </p>
            <div class="min-w-0">
              <h3
                class="heading text-2xl leading-tight transition-colors duration-300 group-hover:text-primary md:text-3xl"
              >
                {{ article.title }}
              </h3>
              <p
                v-if="article.description"
                class="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground"
              >
                {{ article.description }}
              </p>
              <span
                class="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 group-hover:text-primary"
              >
                Read
                <Icon
                  name="lucide:arrow-right"
                  class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </article>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
