<script lang="ts">
  import { Calendar, Home, Trophy, Sprout, ShoppingBag } from 'lucide-svelte';
  import type { PageData } from './$types';
  export let data: PageData; 
  const plants = data.plants || []; 
</script>

<div class="min-h-screen bg-[#F5F0E8] pb-30 px-9">
  <header class="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif italic">Plants</h1>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="text-gray-600 italic">Plants page - Coming soon</p>
  </div>

  {#if plants.length > 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each plants as plant}
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
          {#if plant.image}
            <img src={plant.image} alt={plant.name} class="w-full h-48 object-cover"/>
          {/if}
          <div class="p-4">
            <h2 class="text-xl font-semibold">{plant.name}</h2>
            {#if plant.scientificName}
              <p class="italic text-gray-500">{plant.scientificName}</p>
            {/if}
            {#if plant.description}
              <p class="mt-2 text-gray-700">{plant.description}</p>
            {/if}
            <div class="mt-4 flex justify-between text-sm text-gray-600">
              <span>☀️ Sun: {plant.sunlightRequirement ?? 'N/A'}</span>
              <span>💧 Water: {plant.waterNeeds ?? 'N/A'}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-500">No plants found.</p>
  {/if}


  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black">
    <div class="flex items-center justify-around py-3 px-2 max-w-7xl mx-auto">
      <a href="/" class="flex flex-col items-center gap-1 hover:text-[#2DD4BF] transition-colors">
        <div class="p-2 sm:p-3">
          <Home class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <span class="text-xs font-bold">Home</span>
      </a>
      
      <a href="/events" class="flex flex-col items-center gap-1 hover:text-[#2DD4BF] transition-colors">
        <div class="p-2 sm:p-3">
          <Calendar class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <span class="text-xs font-bold">Events</span>
      </a>
      
      <a href="/plants" class="flex flex-col items-center gap-1 text-[#2DD4BF]">
        <div class="bg-[#2DD4BF] p-2 sm:p-3 rounded-xl">
          <Sprout class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <span class="text-xs font-bold">Plants</span>
      </a>
      
      <a href="/ranks" class="flex flex-col items-center gap-1 hover:text-[#2DD4BF] transition-colors">
        <div class="p-2 sm:p-3">
          <Trophy class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <span class="text-xs font-bold">Ranks</span>
      </a>
      
      <a href="/shop" class="flex flex-col items-center gap-1 hover:text-[#2DD4BF] transition-colors">
        <div class="p-2 sm:p-3">
          <ShoppingBag class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <span class="text-xs font-bold">Shop</span>
      </a>
    </div>
  </nav>
</div>
