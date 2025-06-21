<script lang="ts" setup>
// Page Meta
useHead({
  title: 'Posts',
  meta: [
    { name: 'description', content: 'Page to fetch posts with infinity scroll' }
  ]
});
definePageMeta({keepalive: true});

// Types
import type { FetchPostListResponse, PostBase } from '~/types/posts';

// Get Page Data
const currentPage = ref(1);
const lastPage = ref(10);
const paramsObj = computed(() => {
  return {
    page: currentPage.value,
  }
});

const { data: posts, execute, status } = await baseUseFetch<FetchPostListResponse>(
  'http://13.60.56.112/api/posts', 
  {
    method: 'GET', 
    params: paramsObj
  }
);
// Set Paginations Values
currentPage.value = posts.value?.current_page || 1;
lastPage.value = posts.value?.last_page || 10;

const postsList = ref<PostBase[]>([...(posts.value?.data || [])]);
watch(posts, () => {
  postsList.value = [...postsList.value, ...(posts.value?.data || [])]
});

// Infinity Scroll Feature
function isAtBottomOfPage() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight || window.innerHeight;

  return (scrollTop + clientHeight) === scrollHeight;
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (isAtBottomOfPage() && currentPage.value != lastPage.value) {
      currentPage.value++;
    }
  });
});

// Search Feature
const keyword = ref('');
const searchResult = ref([...postsList.value]);
const fireSearch = () => {
  if(keyword.value.length > 0) {
    searchResult.value = postsList.value.filter(item => item.title.includes(keyword.value));
  }
};

// Save scroll position when leaving the page
onBeforeRouteLeave(() => {
  sessionStorage.setItem('feedScrollPosition', window.scrollY.toString());
  sessionStorage.setItem('cachedCurrentPage', currentPage.value.toString());
  sessionStorage.setItem('cachedPostsList', JSON.stringify(postsList.value));
});

onMounted(async () => {
  const savedPosition = sessionStorage.getItem('feedScrollPosition');
  const cachedCurrentPage = sessionStorage.getItem('cachedCurrentPage');
  const cachedPostsList = sessionStorage.getItem('cachedPostsList');

  if(cachedPostsList && cachedCurrentPage) {
    currentPage.value =  parseInt(cachedCurrentPage);
    postsList.value =  JSON.parse(cachedPostsList);

    sessionStorage.removeItem('cachedCurrentPage');
    sessionStorage.removeItem('cachedPostsList');
  }

  if (savedPosition) {
    // Restore scroll position
    window.scrollTo(0, Number(savedPosition));
    sessionStorage.removeItem('feedScrollPosition');
  }
});
</script>

<template>
  <VContainer>
    <v-text-field 
      placeholder="Search..." 
      variant="solo-filled" 
      class="!w-1/3"
      v-model="keyword"
      @input="fireSearch"
    />

    <template v-if="keyword.length === 0">
      <PostCard
        v-for="item in postsList || []"
        :key="item.id"
        :post="item"
      />
    </template>

    <template v-else>
      <PostCard
        v-for="item in searchResult || []"
        :key="item.id"
        :post="item"
      />
    </template>

    <VProgressCircular
      v-if="status === 'pending'"
      class="!block mx-auto mb-10"
      color="indigo-darken-4" 
      :size="57"
      indeterminate 
    />

    <h1 
      v-if="currentPage == lastPage"
      class="mt-4 py-4 text-center !text-xl text-indigo-darken-4 !font-semibold bg-indigo-lighten-5 rounded"
    >
      No more posts
    </h1>
  </VContainer>
</template>
