<script>
  import { Trophy, Leaf, Calendar } from "lucide-svelte";

  import Event from "$lib/components/+Event.svelte";
  import Plant from "$lib/components/+Plant.svelte";
  import MapPlantItem from "$lib/components/+MapPlantItem.svelte";

  let { data } = $props();

  // --- Mock Data ---
  const PLANTS = [
    {
      id: 1,
      name: "Mango",
      type: "Fruit Tree",
      status: "critical",
      image: "🥭",
      statusDetails: "Water: Sufficient, Sunlight: Critical",
      mapPosition: { top: "65%", left: "30%" },
    },
    {
      id: 2,
      name: "Carrot",
      type: "Root Vegetable",
      status: "warning",
      image: "🥕",
      statusDetails: "Water: Sufficient, Sunlight: Insufficient",
      mapPosition: { top: "35%", left: "70%" },
    },
    {
      id: 3,
      name: "Tomato",
      type: "Heritage Beefsteak",
      status: "healthy",
      image: "🍅",
      statusDetails: "Water: Sufficient, Sunlight: Sufficient",
      mapPosition: { top: "50%", left: "45%" },
    },
    {
      id: 4,
      name: "Pear",
      type: "Fruit Tree",
      status: "healthy",
      image: "🍐",
      statusDetails: "Water: Sufficient, Sunlight: Sufficient",
      mapPosition: { top: "40%", left: "25%" },
    },
    {
      id: 5,
      name: "Basil",
      type: "Herb",
      status: "healthy",
      image: "🌿",
      statusDetails: "Water: Sufficient, Sunlight: Sufficient",
      mapPosition: { top: "70%", left: "60%" },
    },
  ];
</script>

<div class="max-w-7xl mx-auto w-full">
  <header class="flex justify-between items-center px-6 pt-8 pb-6 md:pb-10">
    <div>
      <h1
        class="font-serif text-4xl md:text-5xl italic font-bold text-stone-900"
      >
        Home
      </h1>
      <p class="text-stone-500 hidden md:block mt-2">
        Welcome back to your digital forest.
      </p>
    </div>
    <a
      href="/ranks"
      class="flex items-center space-x-2 bg-stone-200 px-3 py-1 md:px-5 md:py-2 rounded-full transition hover:bg-stone-300 cursor-pointer"
    >
      <Trophy class="w-4 h-4 md:w-5 md:h-5 text-stone-600" />
      <span class="font-serif font-bold text-stone-800 text-sm md:text-base"
        >Rank: #6</span
      >
    </a>
  </header>

  <main class="grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 pb-12">
    <section class="space-y-4 lg:col-span-8">
      <div class="flex items-center space-x-2">
        <Leaf class="w-6 h-6 text-stone-800 fill-current" />
        <h2 class="font-serif text-2xl italic font-bold text-stone-800">
          Your plants
        </h2>
      </div>

      <!-- Garden map -->
      <div
        class="relative overflow-hidden bg-stone-200 rounded-xl shadow-lg border border-stone-200 min-h-[200px] md:min-h-[500px] w-full"
      >
        <img
          src="https://media.istockphoto.com/id/1322626419/photo/garden-with-walkways-and-green-grass-photo-taken-from-above-drone.jpg?s=612x612&w=0&k=20&c=qUGuF4V5_NMH5yKai_vxgx7oL7_3gYd3PzLVhjWWzDQ="
          class="w-full h-full object-cover opacity-90"
          alt="Garden Map"
        />

        <!-- Plants -->
        {#each PLANTS as plant}
          <MapPlantItem {plant} />
        {/each}
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 pb-4"
      >
        {#each PLANTS as plant}
          <Plant {plant} />
        {/each}
      </div>
    </section>

    <section class="space-y-4 lg:col-span-4">
      <div class="flex items-center space-x-2">
        <Calendar class="w-6 h-6 text-stone-800" />
        <h2 class="font-serif text-2xl italic font-bold text-stone-800">
          Upcoming Events
        </h2>
      </div>

      <div class="space-y-4">
        {#each data.events.data.slice(0, 5) as event}
          <Event {event} />
        {/each}
      </div>

      <button
        class="hidden lg:block w-full py-2 text-center text-sm font-bold text-stone-500 hover:text-green-700 transition"
      >
        View all events →
      </button>
    </section>
  </main>
</div>
