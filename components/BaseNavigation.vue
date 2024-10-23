<template>
  <header class="py-4 border-b">
    <nav class="flex container items-center">
      <NuxtLink to="/" title="Caravans For Sale" class="flex gap-1 items-center">
        <img src="/public/img/home-logo-colour-svg_0.svg" alt="Caravans For Sale" class="w-[120px] md:w-full">
      </NuxtLink>
      <ul class="flex gap-6 ml-auto text-md font-bold capitalize">
        <li>
          <NuxtLink to="/">
            <UButton label="Sell My Motorhome" class="bg-secondary rounded-md text-white px-4 py-2 hover:bg-secondary-hover" icon="i-mdi-plus-box-outline" trailing />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">

</script>