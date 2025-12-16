<script>
  import { Search, X, Calendar, Check, Plus } from "lucide-svelte";
  import Event from "$lib/components/+Event.svelte";
  import CreateModal from "$lib/components/events/+CreateModal.svelte";

  // Assuming this component uses SvelteKit's page data
  let { data } = $props(); // TODO: Implement filter and search

  let filter = $state("All"); // Making filter reactive (good practice)
  let searchQuery = $state(""); // Making searchQuery reactive (good practice)
  let isSearchOpen = $state(false); // Making isSearchOpen reactive (good practice)

  // State variable to control modal visibility
  let isModalOpen = $state(false); // *** THE ESSENTIAL FIX: Use $state() for reactivity! ***

  const filters = [
    "All",
    "Gardening",
    "Sustainability",
    "Workshops",
    "Clean-up",
  ];

  const events = data.events.data; // TODO: Correctly initiate isRegistered with logged in user
  const registeredEvents = events.filter((event) => event.isRegistered);

  const openModal = () => {
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
  };
</script>

<div class="flex flex-col space-y-6 pb-24 bg-stone-50 min-h-screen">
  <header class="px-6 pt-10 pb-4 bg-white shadow-sm rounded-b-3xl">
    <div class="flex justify-between items-start mb-4 h-12">
      <div class={isSearchOpen ? "hidden" : "block"}>
        <div
          class="text-xs uppercase tracking-widest text-green-700 font-bold mb-1"
        >
          Fruit Forest
        </div>
        <h1 class="font-serif text-4xl italic font-bold text-stone-900">
          Events
        </h1>
      </div>
      <div class="flex items-center space-x-2">
        {#if !isSearchOpen}
          <button
            on:click={openModal}
            class="p-2 rounded-full bg-green-700 hover:bg-green-800 text-white transition-colors shadow-md"
            title="Create New Event"
          >
            <Plus class="w-5 h-5" />
          </button>
        {/if}
        <div
          class={`flex items-center transition-all duration-300 ${
            isSearchOpen
              ? "w-full bg-stone-100 rounded-lg p-2"
              : "bg-stone-100 p-2 rounded-full w-10"
          }`}
        >
          <Search
            class="w-5 h-5 text-stone-500 cursor-pointer"
            on:click={() => (isSearchOpen = true)}
          />

          {#if isSearchOpen}
            <div class="flex-1 flex items-center ml-2">
              <input
                type="text"
                placeholder="Search events..."
                bind:value={searchQuery}
                class="bg-transparent border-none outline-none text-sm w-full text-stone-800"
                on:blur={() => !searchQuery && (isSearchOpen = false)}
              />
              <button
                on:click={() => {
                  searchQuery = "";
                  isSearchOpen = false;
                }}
              >
                <X class="w-4 h-4 text-stone-400" />
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>

    {#if !isSearchOpen}
      <p class="text-stone-600 italic border-l-2 border-green-500 pl-3 py-1">
        Join activities that protect nature & earn rewards.
      </p>
    {/if}
    <div class="flex overflow-x-auto space-x-2 mt-6 pb-1 scrollbar-hide">
      {#each filters as f}
        <button
          on:click={() => (filter = f)}
          class={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
            filter === f
              ? "bg-green-700 text-white border-green-700"
              : "bg-white text-stone-600 border-stone-200 hover:border-green-300"
          }`}
        >
          {f}
        </button>
      {/each}
    </div>
  </header>
  <div class="px-6">
    {#if events.length === 0}
      <div class="text-center py-10 text-stone-400">
        <p>No events available.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each events as event (event.id)}
          <Event {event} />
        {/each}
      </div>
    {/if}
  </div>

  {#if registeredEvents.length > 0}
    <div class="px-6 mt-10">
      <h2 class="font-serif text-2xl italic font-bold text-stone-800 mb-4">
        My Registrations ({registeredEvents.length})
      </h2>
      <div class="space-y-4">
        {#each registeredEvents as event (event.id)}
          <div
            class="flex items-center p-3 bg-green-50 rounded-xl shadow-sm border border-green-100"
          >
            <div class="text-xl mr-3">
              {event.image?.substring(0, 1)}
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-green-800">
                {event.title}
              </p>
              <p class="text-xs text-green-600 flex items-center space-x-1">
                <Calendar class="w-3 h-3" /> <span>{event.date}</span>
              </p>
            </div>
            <Check class="w-5 h-5 text-green-700" />
          </div>
        {/each}
      </div>
    </div>
  {/if}

{#if isModalOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" 
  >
    <CreateModal on:close={closeModal} />
  </div>
{/if}
</div>
