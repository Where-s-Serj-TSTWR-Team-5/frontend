<script lang="ts">
  import { 
    Trophy, 
    Leaf, 
    Calendar, 
  } from 'lucide-svelte';

  // State to manage the active tab/screen
  let activeTab: 'home' | 'events' | 'ranks' | 'shop' = 'home';

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

  const EVENTS = [
    {
      id: 1,
      title: "Nature Three Days: Connecting with Nature",
      subtitle: "A unique three-day experience designed to help students connect with nature.",
      date: "21-11-2025",
      time: "05:00 PM",
      xp: 50,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Students Gardening Workshop",
      subtitle: "A fun workshop for students to learn about gardening and plants care essentials.",
      date: "Mar 15, 2026",
      time: "10:00 AM",
      xp: 30,
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
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
            {#each EVENTS.slice(0, 2) as event}
              <button class="w-full text-left bg-white rounded-2xl overflow-hidden shadow-md border border-stone-100 cursor-pointer hover:shadow-lg active:scale-[0.98] transition group">
                <div class="flex lg:flex-col xl:flex-row">
                  <div class="w-1/3 lg:w-full xl:w-1/3 h-32 lg:h-40 xl:h-32 relative">
                    <img src={event.image} alt={event.title} class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  
                  <div class="w-2/3 lg:w-full xl:w-2/3 p-3 flex flex-col justify-between">
                    <div>
                      <h3 class="font-serif text-sm md:text-base font-bold leading-tight text-stone-800 mb-1">{event.title}</h3>
                      <p class="text-[10px] md:text-xs text-stone-500 line-clamp-2 italic">{event.subtitle}</p>
                    </div>
                    
                    <div class="flex items-center justify-between mt-3">
                      <span class="bg-black text-white text-[10px] px-3 py-1.5 rounded-full font-bold group-hover:bg-green-600 transition-colors">
                        Register
                      </span>
                      <div class="text-[9px] text-stone-500 font-mono space-y-0.5 text-right">
                         <div class="flex items-center justify-end space-x-1">
                           <Calendar class="w-3 h-3" /> <span>{event.date}</span>
                         </div>
                         <div class="text-green-600 font-bold">★ XP: {event.xp}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            {/each}
          </div>
          
          <button on:click={() => activeTab = 'events'} class="hidden lg:block w-full py-2 text-center text-sm font-bold text-stone-500 hover:text-green-700 transition">
            View all events →
          </button>
        </section>
      </main>
  </div>