<script>
  // @ts-nocheck

  import {
    Search,
    X,
    Calendar,
    Check,
    Plus,
    MapPin,
    Clock,
  } from "lucide-svelte";
  import Event from "$lib/components/+Event.svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import CreateUpdateModal from "$lib/components/events/+CreateUpdateModal.svelte";
  let { data } = $props();

  let filterCategory = $state("All");
  let searchQuery = $state("");
  let isModalOpen = $state(false);

  let formData = $state({
    title: "",
    description: "",
    thumbnailUrl: "",
    bannerUrl: "",
    date: "",
    startAt: "",
    endAt: "",
    location: "",
    points: 100,
    studyPoints: 0,
    maxParticipants: 0,
  });

  const events = data.events.data;
  const user = $page.data?.user;
  const eventLabels = $page.data?.eventLabels.data;
  eventLabels.unshift({category: 'All'});

  // Reactive Logic for Main Feed
  let filteredEvents = $derived(
    events.filter((event) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        event.title.toLowerCase().includes(query) ||
        (event.subtitle && event.subtitle.toLowerCase().includes(query));

      const matchesCategory =
        filterCategory === "All" ||
        (event.label?.category ?? "") === filterCategory;

      return matchesSearch && matchesCategory;
    }),
  );

  let registeredEvents = $derived(
    events.filter((event) =>
      user?.eventRegistrations?.some((reg) => reg.eventId === event.id),
    ),
  );

  const openModal = () => (isModalOpen = true);
  const closeModal = () => (isModalOpen = false);
</script>

<div
  class="flex flex-col space-y-6 pb-24 bg-stone-50 min-h-screen cursor-default"
>
  <header class="px-6 pt-10 pb-4 bg-white shadow-sm rounded-b-3xl">
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-4"
    >
      <div>
        <div
          class="text-xs uppercase tracking-widest text-green-700 font-bold mb-1"
        >
          Fruit Forest
        </div>
        <h1 class="font-serif text-4xl italic font-bold text-stone-900">
          Events
        </h1>
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto">
        <div
          class="flex-1 md:flex-none flex items-center bg-stone-100 rounded-lg p-2 md:w-64"
        >
          <Search class="w-4 h-4 text-stone-400 ml-1" />
          <input
            type="text"
            placeholder="Search events..."
            bind:value={searchQuery}
            class="bg-transparent border-none outline-none text-sm w-full text-stone-800 px-2 cursor-text"
          />
          {#if searchQuery}
            <button
              class="cursor-pointer p-1"
              onclick={() => (searchQuery = "")}
            >
              <X class="w-4 h-4 text-stone-400 hover:text-stone-600" />
            </button>
          {/if}
        </div>

        {#if user?.role === "GREEN_OFFICE_MEMBER"}
          <button
            onclick={openModal}
            class="p-2.5 rounded-lg bg-green-700 hover:bg-green-800 text-white transition-colors shadow-md cursor-pointer shrink-0"
            title="Create New Event"
          >
            <Plus class="w-5 h-5" />
          </button>
        {/if}
      </div>
    </div>

    <p
      class="text-stone-600 italic border-l-2 border-green-500 pl-3 py-1 text-sm md:text-base"
    >
      Join activities that protect nature & earn rewards.
    </p>

    <div class="flex overflow-x-auto space-x-2 mt-6 pb-1 scrollbar-hide">
      <!-- Filter Buttons -->
      {#each eventLabels as label}
        <button
          onclick={() => (filterCategory = label.category)}
          class={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border cursor-pointer ${
            filterCategory === label.category
              ? "bg-green-700 text-white border-green-700"
              : "bg-white text-stone-600 border-stone-200 hover:border-green-300"
          }`}
        >
          {label.category}
        </button>
      {/each}
    </div>
  </header>

  {#if registeredEvents.length > 0 && !searchQuery && filterCategory == "All"}
    <section
      class="px-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-serif text-2xl italic font-bold text-stone-800">
          Registered Events
        </h2>
        <span
          class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"
        >
          {registeredEvents.length} Registered
        </span>
      </div>

      <div
        class="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide -mx-2 px-2"
      >
        {#each registeredEvents as event (event.id)}
          <a
            href={`/events/${event.id}`}
            class="flex-shrink-0 w-72 bg-white rounded-2xl shadow-sm border border-stone-200 p-4 hover:shadow-md transition-shadow group"
          >
            <div class="flex gap-4">
              <div
                class="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0"
              >
                <img
                  src={event.thumbnail || "https://picsum.photos/200"}
                  alt={event.title}
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center text-green-700 gap-1 mb-1">
                  <Check class="w-3 h-3" />
                  <span class="text-[10px] font-black uppercase tracking-widest"
                    >Enrolled</span
                  >
                </div>
                <h3 class="font-bold text-stone-900 text-sm truncate">
                  {event.title}
                </h3>
                <div class="flex flex-col gap-1 mt-2 text-stone-500">
                  <div class="flex items-center gap-1.5 text-[11px]">
                    <Calendar class="w-3 h-3" />
                    <span>{event.date || event.startAt}</span>
                  </div>
                  {#if event.location}
                    <div class="flex items-center gap-1.5 text-[11px]">
                      <MapPin class="w-3 h-3" />
                      <span class="truncate">{event.location}</span>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    </section>
    <hr class="mx-6 border-stone-200" />
  {/if}

  <main class="px-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-serif text-2xl italic font-bold text-stone-800">
        {filterCategory == "All"
          ? "Explore Events"
          : `${filterCategory} Events`}
      </h2>
    </div>

    {#if filteredEvents.length === 0}
      <div
        class="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300"
      >
        <p class="text-stone-400">
          No events found matching "{searchQuery}" in {filterCategory}.
        </p>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredEvents as event (event.id)}
          <Event {event} />
        {/each}
      </div>
    {/if}
  </main>

  {#if isModalOpen}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
    >
      <form
        method="POST"
        action="?/create"
        class="w-full max-w-2xl"
        use:enhance={() => {
          return async ({ result }) => {
            if (result.type === "success") {
              location.reload();
            }
          };
        }}
      >
        <CreateUpdateModal {closeModal} {formData} action="Create" />
      </form>
    </div>
  {/if}
</div>
