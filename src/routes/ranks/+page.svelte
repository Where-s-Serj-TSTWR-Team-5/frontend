<script lang="ts">
  import { Home, Calendar, Sprout, Trophy, ShoppingBag } from 'lucide-svelte';
</script>

<div class="min-h-screen bg-[#F5F0E8] pb-20">
  <header class="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif italic">Ranks</h1>
  </header>

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
      
      <a href="/plants" class="flex flex-col items-center gap-1 hover:text-[#2DD4BF] transition-colors">
        <div class="p-2 sm:p-3">
          <Sprout class="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <span class="text-xs font-bold">Plants</span>
      </a>
      
      <a href="/ranks" class="flex flex-col items-center gap-1 text-[#2DD4BF]">
        <div class="bg-[#2DD4BF] p-2 sm:p-3 rounded-xl">
          <Trophy class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
