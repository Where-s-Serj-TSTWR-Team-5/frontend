<script lang="ts">
  import { Search, X, Plus, Leaf } from 'lucide-svelte';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import Plant from '$lib/components/+Plant.svelte';
  import CreateUpdateModal from '$lib/components/plants/+CreateUpdateModal.svelte';


  export let data: any;

  let searchQuery = '';
  let isModalOpen = false;

  // adjust based on your API shape: either data.plants.data or data.plants
  const plants = data?.plants ?? [];
  const user = $page.data?.user;

  let formData = {
    id: '',
    name: '',
    scientificName: '',
    description: '',
    image: '',
    plantTypeID: 1
  };

  const openModal = () => (isModalOpen = true);
  const closeModal = () => (isModalOpen = false);

  $: filteredPlants = plants.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.scientificName?.toLowerCase().includes(q)
    );
  });
</script>

<div class="flex flex-col space-y-6 pb-24 bg-stone-50 min-h-screen cursor-default">
  <header class="px-6 pt-10 pb-4 bg-white shadow-sm rounded-b-3xl">
    <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-4">
      <div>
        <div class="text-xs uppercase tracking-widest text-green-700 font-bold mb-1">
          Food Forest
        </div>
        <h1 class="font-serif text-4xl italic font-bold text-stone-900">
          Plants
        </h1>
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto">
        <div class="flex-1 md:flex-none flex items-center bg-stone-100 rounded-lg p-2 md:w-64">
          <Search class="w-4 h-4 text-stone-400 ml-1" />
          <input
            type="text"
            placeholder="Search plants..."
            bind:value={searchQuery}
            class="bg-transparent border-none outline-none text-sm w-full text-stone-800 px-2 cursor-text"
          />
          {#if searchQuery}
            <button class="cursor-pointer p-1" on:click={() => (searchQuery = '')}>
              <X class="w-4 h-4 text-stone-400 hover:text-stone-600" />
            </button>
          {/if}
        </div>

        {#if user?.role === 'GREEN_OFFICE_MEMBER'}
          <button
            on:click={openModal}
            class="p-2.5 rounded-lg bg-green-700 hover:bg-green-800 text-white transition-colors shadow-md cursor-pointer shrink-0"
            title="Create New Plant"
          >
            <Plus class="w-5 h-5" />
          </button>
        {/if}
      </div>
    </div>

    <p class="text-stone-600 italic border-l-2 border-green-500 pl-3 py-1 text-sm md:text-base">
      Add plants, manage details, and track ownership.
    </p>
  </header>

  <main class="px-6">
  {#if filteredPlants.length === 0}
    <div class="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
      <p class="text-stone-400">No plants found matching "{searchQuery}".</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredPlants as plant (plant.id)}
            <Plant {plant} />
        {/each}
    </div>
  {/if}
</main>


  {#if isModalOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <form
        method="POST"
        action="?/create"
        class="w-full max-w-2xl"
        use:enhance={() => {
          return async ({ result }) => {
            if (result.type === 'success') {
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
