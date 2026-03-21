<script lang="ts" setup>
const sectionId = 'writing'

const { data: articles } = await useAsyncData('articles', () =>
  queryCollection('content').order('date', 'DESC').all()
)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <section v-if="articles?.length" :id="sectionId" class="py-16 md:py-24">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :duration="600"
        class="text-3xl font-bold tracking-tight mb-2"
      >
        Writing
      </h2>
      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: 100, duration: 500 } }"
        class="text-muted-foreground mb-10"
      >
        Technical articles and engineering notes.
      </p>

      <!-- Articles list -->
      <div v-if="articles?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="(article, index) in articles"
          :key="article.path"
          :to="article.path"
          class="block group"
        >
          <Card
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 100, duration: 500 } }"
            class="h-full transition-colors group-hover:border-primary/50"
          >
            <CardHeader>
              <CardTitle>{{ article.title }}</CardTitle>
              <CardDescription v-if="article.date">
                {{ formatDate(article.date) }}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p v-if="article.description" class="text-sm text-muted-foreground">
                {{ article.description }}
              </p>
              <span class="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3">
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
