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

      <!-- Articles list -->
      <div v-if="articles?.length" class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NuxtLink
          v-for="(article, index) in articles"
          :key="article.path"
          :to="article.path"
          class="focus-ring group block rounded-2xl"
        >
          <Card
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }"
            class="surface h-full rounded-2xl transition-all duration-300 group-hover:border-primary/50"
          >
            <CardHeader>
              <CardTitle class="heading text-xl">{{ article.title }}</CardTitle>
              <CardDescription v-if="article.date">
                {{ formatDate(article.date) }}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p v-if="article.description" class="text-sm text-muted-foreground">
                {{ article.description }}
              </p>
              <span class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read more
                <Icon name="lucide:arrow-right" class="size-4" />
              </span>
            </CardContent>
          </Card>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
