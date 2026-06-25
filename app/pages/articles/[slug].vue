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
  <div class="pt-28 pb-16 md:pb-24">
    <div class="container mx-auto max-w-3xl px-4">
      <NuxtLink
        to="/#writing"
        class="focus-ring mb-8 inline-flex cursor-pointer items-center gap-1 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon name="lucide:arrow-left" class="size-4" />
        Back to writing
      </NuxtLink>

      <article v-if="article">
        <header class="mb-8">
          <h1 class="heading mb-4 text-3xl md:text-4xl">
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

        <ContentRenderer :value="article" class="content" />
      </article>
    </div>
  </div>
</template>
