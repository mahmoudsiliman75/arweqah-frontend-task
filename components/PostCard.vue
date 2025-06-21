<script lang="ts" setup>
// Props
import type {PostBase} from '~/types/posts';

defineProps({
  post: {
    type: Object as PropType<PostBase>,
    required: true,
  },
});

// Format Date String
import formatDate from '~/utils/dateFormatter';
</script>

<template>
  <NuxtLink 
    :to="`/post/${post.id}?post=${JSON.stringify(post)}`"
  >
    <VCard
      :title="post.title" 
      :text="post.description" 
      color="indigo-darken-4"
      variant="tonal"
      class="mb-4 hover:!bg-indigo-500 hover:!text-white transition-all duration-150 ease-in-out"
    >
      <v-card-text>
        <span class="font-semibold">published: </span>{{ formatDate(post.created_at) }}
      </v-card-text>
    </VCard>
  </NuxtLink>
</template>
