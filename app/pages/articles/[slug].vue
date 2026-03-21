<script lang="ts" setup>
const route = useRoute();

const { data: article } = await useAsyncData(`article-${route.params.slug}`, () =>
  queryCollection("content").path(`/articles/${route.params.slug}`).first(),
);

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: "Article not found" });
}

useSeoMeta({
  title: article.value.title,
  description: article.value.description,
});
</script>

<template>
  <div class="py-16 md:py-24">
    <div class="container mx-auto px-4 max-w-3xl">
      <NuxtLink
        to="/#writing"
        class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <Icon name="lucide:arrow-left" class="size-4" />
        Back to writing
      </NuxtLink>

      <article v-if="article">
        <header class="mb-8">
          <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {{ article.title }}
          </h1>
          <p v-if="article.description" class="text-lg text-muted-foreground mb-4">
            {{ article.description }}
          </p>
          <time v-if="article.date" class="text-sm text-muted-foreground">
            {{
              new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </time>
        </header>

        <ContentRenderer :value="article" class="prose dark:prose-invert max-w-none" />
      </article>
    </div>
  </div>
</template>
