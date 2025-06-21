<script lang="ts" setup>
// Types
import type { FetchPostListResponse } from '~/types/posts';

// Router
const route = useRoute();

// Post Details
const post = computed(() => {
  const postQuery = route.query.post;
  return typeof postQuery === 'string' ? JSON.parse(postQuery) : null;
});

// Format Date String
import formatDate from '~/utils/dateFormatter';

// Page Meta
useHead({
  title: post.value.title,
  meta: [
    { name: 'description', content: 'Post details page' }
  ]
});
</script>

<template>
  <VContainer>
    <VCard 
      :title="post.title" 
      color="indigo-darken-4"
      variant="tonal"
      class="mb-6 py-10 text-center"
    />

    <p class="mb-6 text-xl text-gray-600">
      {{post.description}}
    </p>

    <span class="text-lg text-indigo-800">
      <span class="font-semibold">published: </span>
      {{ formatDate(post.created_at) }}
    </span>
  </VContainer>
</template>