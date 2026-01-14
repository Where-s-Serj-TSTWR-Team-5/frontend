<!-- src/routes/plants/[id]/+page.svelte -->
<script lang="ts">
  import LogoutModal from '$lib/components/LogoutModal.svelte';
  import { page } from '$app/stores';

  import {
    ChevronLeft,
    Leaf,
    Info,
    Sun,
    Droplets,
    Tag,
    Calendar,
    MapPin,
    Pencil,
    Trash2,
    CheckCircle
  } from 'lucide-svelte';

  export let data;
  const { user, plant, token } = data;

  let showDeleteConfirm = false;
  let showWaterConfirm = false;

  // TEMP: everyone can see all plant actions for now
  const isOwner = true;

  // DELETE
  async function deletePlant() {
    const res = await fetch(`/api/plants/${plant.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert('Delete failed. Please try again.');
      return;
    }

    window.location.href = '/';
  }

  function goToEdit() {
    window.location.href = `/plants/${plant.id}/edit`;
  }

  async function wateredToday() {
    const res = await fetch(`/api/plants/${plant.id}/watered-today`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert("Couldn't save watering. Hook up the endpoint and try again.");
      return;
    }

    alert('Saved: watered today ✅');
  }

  const displayCreatedAt = plant?.createdAt
  ? new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(plant.createdAt))
  : '—';

  // If your API returns plantType relation later, this will work automatically
  const plantTypeName = plant?.plantType?.name ?? 'Unknown';
</script>

<div class="flex flex-col h-full bg-stone-50 overflow-y-auto animate-in slide-in-from-right duration-300 pb-8 cursor-default">
  <!-- HERO -->
  <div class="relative h-72 md:h-96 w-full shrink-0">
    <img
      alt={plant?.name ?? 'Plant'}
      src={plant?.image || 'https://picsum.photos/1200/800'}
      class="w-full h-full object-cover"
    />

    <button
      on:click={() => window.history.back()}
      class="absolute top-8 left-6 z-20 bg-black/50 text-white p-3 rounded-full shadow-xl hover:bg-black/70 transition duration-300 ease-in-out cursor-pointer"
      aria-label="Go back"
    >
      <ChevronLeft class="w-6 h-6" />
    </button>

    <div class="absolute inset-0 bg-linear-to-t from-stone-50 via-stone-50/50 to-transparent"></div>

    <div class="absolute bottom-0 left-0 right-0 p-6 pt-10">
      <span class="text-sm font-bold tracking-wider text-green-700 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md inline-flex items-center gap-2">
        <Leaf class="w-4 h-4" />
        {plantTypeName}
      </span>

      <h1 class="text-4xl lg:text-5xl font-extrabold text-stone-900 mt-2 leading-tight drop-shadow-lg">
        {plant?.name ?? 'Plant'}
      </h1>

      <p class="text-lg text-stone-700 font-medium italic mt-1">
        {plant?.scientificName ?? ''}
      </p>
    </div>
  </div>

  <!-- BODY -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto w-full">
    <!-- LEFT -->
    <div class="lg:col-span-2 space-y-8">
      <!-- About -->
      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200">
        <h2 class="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-3">
          <Info class="w-6 h-6 text-green-600" /> About this Plant
        </h2>

        <p class="text-stone-600 text-base leading-relaxed whitespace-pre-wrap">
          {plant?.description || 'No description available for this plant yet.'}
        </p>
      </div>

      <!-- Key details -->
      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-5">
        <h2 class="text-2xl font-bold text-stone-800 flex items-center gap-3">
          <Tag class="w-6 h-6 text-green-600" /> Key Plant Details
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-100 pt-5">
          <div class="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl">
            <Tag class="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <span class="text-xs font-semibold uppercase text-stone-500">Type</span>
              <p class="font-medium text-stone-800">{plantTypeName}</p>
            </div>
          </div>

          <div class="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl">
            <Calendar class="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <span class="text-xs font-semibold uppercase text-stone-500">Added</span>
              <p class="font-medium text-stone-800">{displayCreatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="lg:col-span-1 space-y-8 sticky top-6 self-start">
      <!-- Care card -->
      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-5">
        <h2 class="text-2xl font-bold text-stone-800 flex items-center gap-3">
          <Leaf class="w-6 h-6 text-green-600" /> Care
        </h2>

        <div class="space-y-4">
          <div class="flex justify-between items-center border-b border-stone-100 pb-3">
            <div class="flex items-center space-x-3">
              <Sun class="w-5 h-5 text-yellow-600 shrink-0" />
              <span class="text-stone-700 font-medium">Sunlight</span>
            </div>
            <span class="font-bold text-lg text-yellow-700">{plant?.sunlightRequirement ?? 0}</span>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <Droplets class="w-5 h-5 text-cyan-600 shrink-0" />
              <span class="text-stone-700 font-medium">Water</span>
            </div>
            <span class="font-bold text-lg text-cyan-700">{plant?.waterNeeds ?? 0}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-5">
        <h2 class="text-2xl font-bold text-stone-800 flex items-center gap-3">
          <CheckCircle class="w-6 h-6 text-green-600" /> Actions
        </h2>

        <div class="space-y-3 pt-1">
          <button
            on:click={() => (showWaterConfirm = true)}
            class="w-full py-3 rounded-xl text-white font-extrabold text-lg shadow-xl transition flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 shadow-green-300/60 cursor-pointer"
          >
            <Droplets class="w-5 h-5" />
            Watered today
          </button>

          {#if isOwner}
            <button
              on:click={goToEdit}
              class="w-full py-3 rounded-xl font-extrabold text-lg shadow-md transition flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-900 text-white cursor-pointer"
            >
              <Pencil class="w-5 h-5" />
              Edit
            </button>

            <button
              on:click={() => (showDeleteConfirm = true)}
              class="w-full py-3 rounded-xl font-extrabold text-lg shadow-md transition flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white cursor-pointer"
            >
              <Trash2 class="w-5 h-5" />
              Delete
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm: delete -->
  <LogoutModal
    open={showDeleteConfirm}
    title="Delete plant?"
    message="Are you sure you want to delete this plant? This can't be undone."
    confirmText="Delete"
    cancelText="Cancel"
    onConfirm={() => {
      showDeleteConfirm = false;
      deletePlant();
    }}
    onCancel={() => (showDeleteConfirm = false)}
  />

  <!-- Confirm: watered today -->
  <LogoutModal
    open={showWaterConfirm}
    title="Mark as watered?"
    message="Do you want to mark this plant as watered today?"
    confirmText="Yes"
    cancelText="Cancel"
    onConfirm={() => {
      showWaterConfirm = false;
      wateredToday();
    }}
    onCancel={() => (showWaterConfirm = false)}
  />
</div>
