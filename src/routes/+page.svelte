<script lang="ts">
  import { 
    Trophy, 
    Leaf, 
    Calendar, 
  } from 'lucide-svelte';

  import Event from '$lib/components/+Event.svelte';

  // State to manage the active tab/screen
  let activeTab: 'home' | 'events' | 'ranks' | 'shop' = 'home';

  let { data } = $props();

  // --- Mock Data ---
  const PLANTS = [
    { 
      id: 1, 
      name: 'Mango', 
      type: 'Fruit Tree',
      status: 'critical', 
      image: '🥭',
      statusDetails: 'Water: Sufficient, Sunlight: Critical',
      mapPosition: { top: '65%', left: '30%' }
    },
    { 
      id: 2, 
      name: 'Carrot', 
      type: 'Root Vegetable',
      status: 'warning', 
      image: '🥕',
      statusDetails: 'Water: Sufficient, Sunlight: Insufficient',
      mapPosition: { top: '35%', left: '70%' }
    },
    { 
      id: 3, 
      name: 'Tomato', 
      type: 'Heritage Beefsteak',
      status: 'healthy', 
      image: '🍅',
      statusDetails: 'Water: Sufficient, Sunlight: Sufficient',
      mapPosition: { top: '50%', left: '45%' }
    },
    { 
      id: 4, 
      name: 'Pear', 
      type: 'Fruit Tree',
      status: 'healthy', 
      image: '🍐',
      statusDetails: 'Water: Sufficient, Sunlight: Sufficient',
      mapPosition: { top: '40%', left: '25%' }
    },
    { 
      id: 5, 
      name: 'Basil', 
      type: 'Herb',
      status: 'healthy', 
      image: '🌿',
      statusDetails: 'Water: Sufficient, Sunlight: Sufficient',
      mapPosition: { top: '70%', left: '60%' }
    }
  ];

  // --- Helpers ---
  const statusColors: Record<string, string> = {
    critical: 'bg-red-500',
    warning: 'bg-amber-400',
    healthy: 'bg-green-500',
  };

  const statusBorders: Record<string, string> = {
    critical: 'border-red-400',
    warning: 'border-amber-300',
    healthy: 'border-stone-200'
  };
</script>

  <div class="max-w-7xl mx-auto w-full">
      <header class="flex justify-between items-center px-6 pt-8 pb-6 md:pb-10">
        <div>
          <h1 class="font-serif text-4xl md:text-5xl italic font-bold text-stone-900">Home</h1>
          <p class="text-stone-500 hidden md:block mt-2">Welcome back to your digital forest.</p>
        </div>
        <a href="/ranks" class="flex items-center space-x-2 bg-stone-200 px-3 py-1 md:px-5 md:py-2 rounded-full transition hover:bg-stone-300 cursor-pointer">
          <Trophy class="w-4 h-4 md:w-5 md:h-5 text-stone-600" />
          <span class="font-serif font-bold text-stone-800 text-sm md:text-base">Rank: #6</span>
        </a>
      </header>
      
      <main class="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 pb-12">
        
        <section class="space-y-4 lg:col-span-8">
          <div class="flex items-center space-x-2">
            <Leaf class="w-6 h-6 text-stone-800 fill-current" />
            <h2 class="font-serif text-2xl italic font-bold text-stone-800">Your plants</h2>
          </div>
      
          <div class="relative overflow-hidden bg-stone-200 rounded-xl shadow-lg border border-stone-200 min-h-[300px] md:min-h-[500px]">
            <img 
              src="https://media.istockphoto.com/id/1322626419/photo/garden-with-walkways-and-green-grass-photo-taken-from-above-drone.jpg?s=612x612&w=0&k=20&c=qUGuF4V5_NMH5yKai_vxgx7oL7_3gYd3PzLVhjWWzDQ=" 
              class="w-full h-full object-cover opacity-90" 
              alt="Garden Map"
            />
            
            {#each PLANTS as plant}
              <button
                class="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 transition-transform hover:scale-110"
                style="top: {plant.mapPosition.top}; left: {plant.mapPosition.left};"
              >
                <div class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm md:text-lg text-white {statusColors[plant.status]}">
                  {plant.image}
                </div>
                <div class="absolute top-10 md:top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none">
                  {plant.name}
                </div>
              </button>
            {/each}
          </div>
      
          <div class="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-2 xl:grid-cols-3 gap-3 md:overflow-visible scrollbar-hide">
            {#each PLANTS as plant}
              <button class="flex-shrink-0 w-auto md:w-full bg-white rounded-full md:rounded-xl px-4 py-2 md:p-3 flex items-center space-x-3 shadow-sm border cursor-pointer hover:shadow-md active:scale-95 transition {statusBorders[plant.status]}">
                <div class="w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base text-white {statusColors[plant.status]} shrink-0">
                  {plant.image}
                </div>
                <div class="text-left">
                  <span class="block text-xs md:text-sm font-bold text-stone-800">{plant.name}</span>
                  <span class="text-[10px] md:text-xs text-stone-500 whitespace-nowrap md:whitespace-normal line-clamp-1">{plant.statusDetails}</span>
                </div>
              </button>
            {/each}
          </div>
        </section>
      
        <section class="space-y-4 lg:col-span-4">
          <div class="flex items-center space-x-2">
            <Calendar class="w-6 h-6 text-stone-800" />
            <h2 class="font-serif text-2xl italic font-bold text-stone-800">Upcoming Events</h2>
          </div>
      
          <div class="space-y-4">
            {#each data.events.data.slice(0, 5) as event}
              <Event {event}/>
            {/each}
          </div>
          
          <button on:click={() => activeTab = 'events'} class="hidden lg:block w-full py-2 text-center text-sm font-bold text-stone-500 hover:text-green-700 transition">
            View all events →
          </button>
        </section>
      </main>
  </div>