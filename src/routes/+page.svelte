<script lang="ts">
  import { Camera, Calendar, Home, Trophy, Sprout, ShoppingBag, AlertTriangle, Video } from 'lucide-svelte';
  
  let plants = [
    {
      name: 'Mango',
      water: 'VERY LOW',
      due: 'Stable',
      bgColor: 'bg-[#FF6B6B]',
      emoji: '🥭'
    },
    {
      name: 'Carrot',
      water: 'Stable',
      due: 'Low',
      bgColor: 'bg-[#FFA94D]',
      emoji: '🥕'
    },
    {
      name: 'Tomato',
      water: 'Stable',
      due: 'Stable',
      bgColor: 'bg-[#F5F0E8]',
      emoji: '🍅'
    },
    {
      name: 'Pear',
      water: 'Stable',
      due: 'Stable',
      bgColor: 'bg-[#F5F0E8]',
      emoji: '🍐'
    },
    {
      name: 'Basil',
      water: 'Good',
      due: 'Stable',
      bgColor: 'bg-[#A8E6CF]',
      emoji: '🌿'
    }
  ];

  let events = [
    {
      title: 'Nature Three Days: Connecting with Nature to Inspire Future Action',
      description: 'From 23 to 25 May, NZ students immersed themselves in the MDT Rotoehuee project—a unique three-day experience designed to help them connect with nature and reflect on its place in their personal and professional lives.',
      image: '/event-1.jpg',
      date: 'June 21-23 2025',
      time: '05:00PM',
      attendees: '0.8k'
    },
    {
      title: 'Urban Gardening Workshop: Growing Food in Small Spaces',
      description: 'Join us for a hands-on workshop where you will learn essential techniques for maximizing yield in limited spaces. Perfect for apartment dwellers and urban farmers looking to grow their own fresh produce.',
      image: '/event-2.jpg',
      date: 'July 10 2025',
      time: '02:00PM',
      attendees: '1.2k'
    },
    {
      title: 'Sustainable Farming Conference 2025',
      description: 'A two-day conference bringing together farmers, researchers, and sustainability advocates to discuss innovative farming practices, climate adaptation strategies, and the future of agriculture in a changing world.',
      image: '/event-3.jpg',
      date: 'Aug 15-16 2025',
      time: '09:00AM',
      attendees: '2.5k'
    }
  ];
</script>

<div class="min-h-screen bg-[#F5F0E8] pb-20">
  <header class="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-serif italic">Home</h1>
    <div class="flex items-center gap-2">
      <Trophy class="w-5 h-5 sm:w-6 sm:h-6" />
      <span class="text-base sm:text-lg italic">Rank: #6</span>
    </div>
  </header>

  <div class="max-w-7xl mx-auto">
    <div class="px-4 sm:px-6 lg:px-8 mb-4">
      <div class="flex items-center gap-2 mb-1">
        <Video class="w-5 h-5" />
        <span class="font-bold">Duckbot live</span>
        <div class="w-2 h-2 bg-red-500 rounded-full"></div>
      </div>
      <p class="text-sm italic text-gray-700">Current task: check tomato plant #2's health</p>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 mb-6">
      <div class="relative rounded-3xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <video 
          class="w-full h-48 sm:h-64 lg:h-80 object-cover bg-gray-900"
          poster=""
          controls
        >
          <track kind="captions" />
        </video>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <Sprout class="w-6 h-6" />
        <h2 class="text-xl sm:text-2xl font-bold italic">Your plants ({plants.length})</h2>
        <AlertTriangle class="w-5 h-5 text-red-500" />
      </div>
      
      <div class="flex lg:grid lg:grid-cols-5 gap-3 overflow-x-auto lg:overflow-x-visible pb-2 scrollbar-hide">
        {#each plants as plant}
          <div class="{plant.bgColor} rounded-2xl p-4 min-w-[140px] lg:min-w-0 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div class="flex items-start gap-2 mb-2">
              {#if plant.name === 'Mango' || plant.name === 'Carrot'}
                <AlertTriangle class="w-4 h-4 text-red-600" />
              {/if}
              <span class="font-bold text-sm sm:text-base">{plant.name}</span>
            </div>
            <div class="text-4xl mb-3 text-center">{plant.emoji}</div>
            <div class="text-xs sm:text-sm">
              <div class="mb-1">
                <span class="italic">Water: </span>
                <span class="font-bold {plant.water === 'VERY LOW' ? 'text-red-700' : ''}">{plant.water}</span>
              </div>
              <div>
                <span class="italic">Due: </span>
                <span class="font-bold {plant.due === 'Low' ? 'text-yellow-700' : ''}">{plant.due}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <Calendar class="w-6 h-6" />
        <h2 class="text-xl sm:text-2xl font-bold italic">Upcoming Events</h2>
      </div>

      <div class="space-y-4">
        {#each events as event}
          <div class="bg-white rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div class="p-4">
              <div class="flex gap-4 mb-3">
                <div class="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={event.image || "/placeholder.svg"} alt="Event" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-sm sm:text-base mb-2 leading-tight">{event.title}</h3>
                  <p class="text-xs sm:text-sm leading-tight text-gray-700 line-clamp-3">{event.description}</p>
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <button class="bg-[#2DD4BF] hover:bg-[#14B8A6] text-black font-bold px-6 py-2 rounded-lg text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                  Register now
                </button>
                
                <div class="flex items-center gap-3 text-xs">
                  <div class="flex items-center gap-1">
                    <Calendar class="w-3 h-3" />
                    <span>{event.date}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span>🕐</span>
                    <span>{event.time}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span>👥</span>
                    <span>{event.attendees}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black">
    <div class="flex items-center justify-around py-3 px-2 max-w-7xl mx-auto">
      <a href="/" class="flex flex-col items-center gap-1 text-[#2DD4BF]">
        <div class="bg-[#2DD4BF] p-2 sm:p-3 rounded-xl">
          <Home class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
