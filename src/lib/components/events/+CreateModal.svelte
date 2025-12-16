<script>
  import { X, Calendar, Clock, MapPin, Tag, Image, DollarSign, Plus } from "lucide-svelte";

  let { closeModal } = $props();

  let formData = $state({
    title: "",
    subtitle: "",
    description: "",
    category: "Gardening",
    date: "",
    time: "",
    location: "",
    xp: 100,
    studyPoints: 0,
    imageUrl: "",
  });

  const categories = ["Gardening", "Sustainability", "Workshops", "Clean-up"];

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  };
</script>

<div
  id="modal-backdrop"
  class="relative w-full h-full p-4 sm:p-8 pb-20 sm:pb-8"
  role="button"
  tabindex="0"
  onclick={handleBackdropClick}
  onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") handleBackdropClick(e); }}
>
  <div class="bg-white shadow-2xl w-full mx-auto max-w-2xl max-h-[95vh] sm:max-h-[90vh] sm:rounded-3xl overflow-y-auto animate-in fade-in zoom-in-95 duration-300 flex flex-col h-full sm:h-auto"
    role="dialog" aria-modal="true"
  >
    <header class="sticky top-0 bg-white p-6 border-b border-stone-100 flex items-center justify-between z-10 shrink-0">
      <h2 class="font-serif text-3xl font-bold text-green-800">Create New Event</h2>
      <button onclick={closeModal} class="p-2 rounded-full text-stone-500 hover:bg-stone-100 transition" aria-label="Close modal">
        <X class="w-6 h-6" />
      </button>
    </header>

    <div class="p-6 space-y-8 grow overflow-y-auto">
      <!-- Basic Details -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold text-stone-700 flex items-center gap-2">
          <Plus class="w-5 h-5 text-green-600" /> Basic Details
        </h3>
        <div class="flex flex-col">
          <label for="title" class="font-medium text-stone-600 mb-1">Title <span class="text-red-500">*</span></label>
          <input id="title" type="text" name="title" bind:value={formData.title} required placeholder="Community Garden Clean-up" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"/>
        </div>
        <div class="flex flex-col">
          <label for="subtitle" class="font-medium text-stone-600 mb-1">Short Description</label>
          <input id="subtitle" type="text" name="subtitle" bind:value={formData.subtitle} placeholder="A quick summary" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"/>
        </div>
        <div class="flex flex-col">
          <label for="description" class="font-medium text-stone-600 mb-1">Full Description</label>
          <textarea id="description" name="description" bind:value={formData.description} rows="4" placeholder="Event details" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition resize-none"></textarea>
        </div>
        <div class="flex flex-col">
          <label for="category" class="font-medium text-stone-600 mb-1 flex items-center gap-1"><Tag class="w-4 h-4 text-green-600"/> Category</label>
          <select id="category" name="category" bind:value={formData.category} class="px-4 py-2 border border-stone-300 rounded-lg bg-white focus:ring-green-500 focus:border-green-500 transition">
            {#each categories as cat}
              <option value={cat}>{cat}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Time & Place -->
      <div class="space-y-4 pt-4 border-t border-stone-100">
        <h3 class="text-xl font-semibold text-stone-700 flex items-center gap-2"><Calendar class="w-5 h-5 text-green-600"/> Time & Place</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="date" class="font-medium text-stone-600 mb-1">Date <span class="text-red-500">*</span></label>
            <input id="date" type="date" name="date" bind:value={formData.date} required class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"/>
          </div>
          <div class="flex flex-col">
            <label for="time" class="font-medium text-stone-600 mb-1">Start Time <span class="text-red-500">*</span></label>
            <input id="time" type="time" name="time" bind:value={formData.time} required class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"/>
          </div>
        </div>
        <div class="flex flex-col">
          <label for="location" class="font-medium text-stone-600 mb-1 flex items-center gap-1"><MapPin class="w-4 h-4 text-green-600"/> Location <span class="text-red-500">*</span></label>
          <input id="location" type="text" name="location" bind:value={formData.location} required placeholder="Fruit Forest, Central Park" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"/>
        </div>
      </div>

      <!-- Rewards -->
      <div class="space-y-4 pt-4 border-t border-stone-100">
        <h3 class="text-xl font-semibold text-stone-700 flex items-center gap-2"><DollarSign class="w-5 h-5 text-green-600"/> Rewards</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="xp" class="font-medium text-stone-600 mb-1">Experience Points (XP)</label>
            <input id="xp" type="number" name="xp" min="0" bind:value={formData.xp} placeholder="100" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition"/>
          </div>
          <div class="flex flex-col">
            <label for="studyPoints" class="font-medium text-stone-600 mb-1">ECTS Credits</label>
            <input id="studyPoints" type="number" name="studyPoints" min="0" step="0.5" bind:value={formData.studyPoints} placeholder="1.5" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"/>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div class="space-y-4 pt-4 border-t border-stone-100">
        <h3 class="text-xl font-semibold text-stone-700 flex items-center gap-2"><Image class="w-5 h-5 text-green-600"/> Event Image</h3>
        <div class="flex flex-col">
          <label for="imageUrl" class="font-medium text-stone-600 mb-1">Image URL</label>
          <input id="imageUrl" type="url" name="imageUrl" bind:value={formData.imageUrl} placeholder="Link to event image" class="px-4 py-2 border border-stone-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"/>
        </div>
      </div>

      <div class="pt-6 shrink-0">
        <button type="submit" class="w-full py-3 rounded-full text-white font-bold text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition disabled:bg-green-400 disabled:shadow-none flex items-center justify-center gap-2">
          Create Event
        </button>
      </div>
    </div>
  </div>
</div>
