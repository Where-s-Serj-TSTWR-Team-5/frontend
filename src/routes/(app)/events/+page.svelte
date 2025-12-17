<script>
  import { Search, X, Calendar, Check } from "lucide-svelte";
  import Event from "$lib/components/+Event.svelte";

  let { data } = $props();

  // 1. Use $state so Svelte tracks changes to this variable
  let searchQuery = $state("");

  const filters = ["All", "Gardening", "Sustainability", "Workshops", "Clean-up"];

  const events = data.events.data;

  // 2. Use $derived to create a reactive list that updates automatically
  let filteredEvents = $derived(
    events.filter((event) => {
      const query = searchQuery.toLowerCase();
      // Check title and subtitle (safely)
      return (
        event.title.toLowerCase().includes(query) ||
        (event.subtitle && event.subtitle.toLowerCase().includes(query))
      );
    })
  );

  const registeredEvents = events.filter((event) => event.isRegistered);
</script>

<div class="flex flex-col space-y-6 pb-24 bg-stone-50 min-h-screen">
  <!-- Header -->
  <header class="px-6 pt-10 pb-4 bg-white shadow-sm rounded-b-3xl">
    <div class="flex justify-between items-start mb-4 h-12">
      <div>
        <div class="text-xs uppercase tracking-widest text-green-700 font-bold mb-1">
          Fruit Forest
        </div>
        <h1 class="font-serif text-4xl italic font-bold text-stone-900">
          Events
        </h1>
      </div>

      <!-- Search -->
      <div class="flex items-center w-full sm:w-96 bg-stone-100 rounded-lg p-2">
        <Search class="w-5 h-5 text-stone-500" />
        <input
          type="text"
          placeholder="Search events..."
          bind:value={searchQuery}
          class="bg-transparent border-none outline-none text-sm w-full text-stone-800 ml-2"
        />
        <!-- Only show clear button if there is text -->
        {#if searchQuery}
          <button onclick={() => (searchQuery = "")}>
            <X class="w-4 h-4 text-stone-400 hover:text-stone-600" />
          </button>
        {/if}
      </div>
    </div>

    <p class="text-stone-600 italic border-l-2 border-green-500 pl-3 py-1">
      Join activities that protect nature & earn rewards.
    </p>

    <!-- Filters -->
    <div class="flex overflow-x-auto space-x-2 mt-6 pb-1 scrollbar-hide">
      {#each filters as f}
        <!-- <button ... > {f} </button> -->
      {/each}
    </div>
  </header>

  <!-- Events Grid -->
  <div class="px-6">
    <!-- 3. Use filteredEvents here instead of events -->
    {#if filteredEvents.length === 0}
      <div class="text-center py-10 text-stone-400">
        <p>No events found matching "{searchQuery}".</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each filteredEvents as event (event.id)}
          <Event {event} />
        {/each}
      </div>
    {/if}
  </div>

  <!-- My Registrations -->
  {#if registeredEvents.length > 0}
    <div class="px-6 mt-10">
      <h2 class="font-serif text-2xl italic font-bold text-stone-800 mb-4">
        My Registrations ({registeredEvents.length})
      </h2>

      <div class="space-y-4">
        {#each registeredEvents as event (event.id)}
          <div class="flex items-center p-3 bg-green-50 rounded-xl shadow-sm border border-green-100">
            <div class="text-xl mr-3">
              {event.image?.substring(0, 1)}
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-green-800">{event.title}</p>
              <p class="text-xs text-green-600 flex items-center space-x-1">
                <Calendar class="w-3 h-3" />
                <span>{event.date}</span>
              </p>
            </div>
            <Check class="w-5 h-5 text-green-700" />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>