<template>
  <transition name="slide-up">
    <div
      v-if="visible"
      class="fixed bottom-0 left-0 w-full bg-gray-100 shadow-lg py-3 px-4  z-50 border-t-4 border-t-caravan-blue"
    >
      <div class="container w-full flex flex-col md:flex-row justify-between items-center">
        <div class="w-full flex flex-row">
          <img v-if="photo" :src="photo" alt="Caravan Image" class="w-16 h-16 object-cover rounded-lg mr-4" />
          <div class="flex flex-col ">
            <span class="text-md text-black" v-html="price"></span>
            <div class="text-lg font-semibold text-black">
              {{ title }}
            </div>
          </div>
        </div>
        <div class="text-lg font-bold text-black flex flex-col md:flex-row w-full text-center align-middle items-center justify-center md:justify-end mt-4 md:mt-0">
          <NuxtLink class="cursor-pointer hover:text-red-500">
            <UIcon name="mdi:cards-heart-outline" class="w-5 h-5 mr-0 md:mr-6" />
          </NuxtLink>
          <div class="flex flex-col md:flex-row justify-center items-center">
            <UButton icon="mdi:chat-processing-outline" size="lg" label="Message" class="p-2 mr-0 md:mr-4 mb-4 md:mb-0" :trailing="false" />
            <UButton icon="mdi:phone-in-talk" size="lg" label="Call" class="p-2" :trailing="false" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false, // Add this prop to control visibility
  },
});
</script>

<style scoped>
/* Transition for sliding up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s ease;
}
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>
