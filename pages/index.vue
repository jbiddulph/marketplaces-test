<template>
  <div class="py-6">
    <div class="flex flex-col md:flex-row container mb-12">
      <div class="w-full md:w-1/2 md:px-0 md:pr-6">
        <h1 class="text-3xl mb-4">{{ caravanData.Title }}</h1>
        
        <span class="text-sm font-bold mt-4">
          ad ref: {{ caravanData.AdRef }}
        </span>
        <ul class="flex flex-row my-4">
          <li class="border-r-2 px-2"><UIcon name="mdi:map-marker" class="w-5 h-5" /><span class="pl-2 font-light">{{ caravanData.County }}, {{ caravanData.Region }}</span></li>
          <li class="px-2"><UIcon name="mdi:clock-time-three-outline" class="w-5 h-5" /><span class="pl-2 font-light">{{ formattedLastEdited }}</span></li>
        </ul>
        <h2 class="font-bold text-lg mb-4">Details</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <li>
            <span class="font-light">Category</span>
            <span class="ml-2 font-bold">{{ caravanData.Category || 'N/A' }}</span>
          </li>
          <li v-for="field in caravanData.DataFields" :key="field.key">
            <span class="font-light">{{ field.label }}</span>
            <span class="ml-2 font-bold">{{ field.value || 'N/A' }}</span>
          </li>
        </ul>
        <h2 class="font-bold text-lg">Description</h2>
        <h3 class="my-4 md:mb-6 md:mb-0 mb-2 font-normal">{{ cleanedDescription }}</h3>

      </div>
      <div class="w-full md:w-1/2 mb-[200px] md:mb-8">
        <div class="relative">
          <div class="absolute w-full mb-4 z-50 bg-caravan-blue rounded-tl-md rounded-tr-md">
            <div class="text-white px-4 py-2 ">
              <h3 class="font-bold text-2xl" v-html="caravanData.PriceCurrency"></h3>
            </div>
            <div class="absolute right-0 top-0">
              <ul class="flex flex-row text-white px-4 py-2">
                <li class="px-2"><NuxtLink class="cursor-pointer hover:text-red-500"><UIcon name="i-mdi-cards-heart-outline" class="w-8 h-8" /></NuxtLink></li>
                <li class="px-2"><NuxtLink class="cursor-pointer"><UIcon name="i-mdi-download" class="w-8 h-8" /></NuxtLink></li>
                <li class="px-2"><NuxtLink class="cursor-pointer"><UIcon name="i-mdi-warning-outline" class="w-8 h-8" /></NuxtLink></li>
              </ul>
            </div>
          </div>
          <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden" indicators arrows>
            <NuxtImg sizes="100vw sm:50vw md:400px" format="webp" :src="item" class="w-full h-auto rounded-lg" draggable="false" />
          </UCarousel>
        </div>
      </div>
      <FixedBottomBar :title="caravanData.Title" :price="caravanData.PriceCurrency" :photo="firstPhoto" :visible="isBarVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend Day.js with relative time functionality
dayjs.extend(relativeTime);
const items = ref([]);
const caravanData = ref({});
const cleanedDescription = ref('');
const firstPhoto = ref('');
const isBarVisible = ref(false);
const formattedLastEdited = computed(() => {
  return dayjs(caravanData.value.LastEdited).fromNow(); // Format LastEdited to relative time
});
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  isBarVisible.value = scrollPosition > 200; // Show the bar if the user scrolls more than 200px
};

onMounted(async () => {
  try {
    const response = await $fetch('/api/caravan-data'); // Fetch the metadata from the server
    caravanData.value = response.data;
    items.value = caravanData.value.Photos.map(photo => photo.PathBig);
    cleanedDescription.value = caravanData.value.Description.replace(/\\r\\n/g, ' ');

    // Extract the first photo and store it in the ref
    firstPhoto.value = caravanData.value.Photos.length > 0 ? caravanData.value.Photos[0].PathBig : '';
    useHead({
      title: caravanData.value.Title, // Dynamic title
      meta: [
        {
          name: 'description',
          content: cleanedDescription.value, // Dynamic description
        },
        {
          name: 'keywords',
          content: 'caravan, touring caravans, ' + caravanData.value.Title, // Dynamic keywords
        },
      ],
    });
    window.addEventListener('scroll', handleScroll);
  } catch (error) {
    console.error('Error fetching caravan data:', error);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll); 
});
</script>
