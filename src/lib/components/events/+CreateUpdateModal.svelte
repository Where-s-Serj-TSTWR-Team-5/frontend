<script>
  import { page } from "$app/stores";
  import {
    formatForDateInput,
    formatForTimeInput,
  } from "$lib/helpers/dateTimeFormatter";
  import {
    X,
    Calendar,
    Clock,
    MapPin,
    Image,
    TrendingUp,
    Users,
    DollarSign,
    Edit3,
    Sparkles,
  } from "lucide-svelte";

  let { closeModal, formData, action = "create", eventId = null } = $props();

  // Initialize state by formatting the prefilled dates/times correctly
  let localData = $state({
    ...formData,
    date: formData.date ? formatForDateInput(formData.date) : "",
    startAt: formData.startAt ? formatForTimeInput(formData.startAt) : "",
    endAt: formData.endAt ? formatForTimeInput(formData.endAt) : "",
    labelId: formData.labelId ? formData.labelId : "",
  });

  const eventLabels = $page.data.eventLabels.data;
  eventLabels.shift();

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };
</script>

<div
  id="modal-backdrop"
  class="text-start fixed inset-0 bg-blue-100/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 z-50 cursor-default"
  role="presentation"
  onclick={handleBackdropClick}
  onkeydown={(e) => {
    if (e.key === "Escape") closeModal();
  }}
>
  <div
    class="bg-white shadow-2xl shadow-gray-400 w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] rounded-xl overflow-hidden animate-in fade-in duration-300 flex flex-col h-full sm:h-auto cursor-default outline-none"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="0"
    onclick={handleModalContentClick}
    onkeydown={(e) => e.stopPropagation()}
  >
    {#if eventId}
      <input type="hidden" name="id" value={eventId} />
    {/if}

    <header
      class="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10 shrink-0"
    >
      <h2 id="modal-title" class="text-3xl font-extrabold text-gray-800">
        {action === "update" ? "Edit Event" : "New Event Details"}
      </h2>
      <button
        type="button"
        onclick={closeModal}
        class="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
        aria-label="Close modal"
      >
        <X class="w-6 h-6" />
      </button>
    </header>

    <div class="p-8 space-y-10 grow overflow-y-auto">
      <!-- Title & Description -->
      <section class="space-y-6">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex flex-col">
            <label for="title" class="font-semibold text-gray-700 mb-1"
              >Title <span class="text-red-500">*</span></label
            >
            <input
              name="title"
              id="title"
              type="text"
              bind:value={localData.title}
              required
              placeholder="Community Garden Clean-up"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div class="flex flex-col">
            <label for="description" class="font-semibold text-gray-700 mb-1"
              >Full Description</label
            >
            <textarea
              name="description"
              id="description"
              bind:value={localData.description}
              rows="4"
              placeholder="Event details and what participants should bring."
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Scheduling & Location -->
      <section class="space-y-6">
        <h3
          class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100"
        >
          <Calendar class="w-6 h-6 text-green-600" /> Scheduling & Location
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="flex flex-col">
            <label for="date" class="font-semibold text-gray-700 mb-1"
              >Date *</label
            >
            <input
              name="date"
              id="date"
              type="date"
              bind:value={localData.date}
              required
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div class="flex flex-col">
            <label for="startAt" class="font-semibold text-gray-700 mb-1"
              >Start Time *</label
            >
            <input
              name="startAt"
              id="startAt"
              type="time"
              bind:value={localData.startAt}
              required
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div class="flex flex-col">
            <label for="endAt" class="font-semibold text-gray-700 mb-1"
              >End Time</label
            >
            <input
              name="endAt"
              id="endAt"
              type="time"
              bind:value={localData.endAt}
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label
            for="location"
            class="font-semibold text-gray-700 mb-1 flex items-center gap-1"
          >
            <MapPin class="w-4 h-4 text-green-600" /> Location *
          </label>
          <input
            name="location"
            id="location"
            type="text"
            bind:value={localData.location}
            required
            placeholder="Fruit Forest, Central Park"
            class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
      </section>

      <!-- Label Selection -->
      <section class="space-y-6">
        <h3
          class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100"
        >
          <Sparkles class="w-6 h-6 text-green-600" /> Label
        </h3>
        <div class="flex flex-col">
          <label for="labelId" class="text-sm font-semibold text-gray-700 mb-1"
            >Event Label</label
          >
          <select
            name="labelId"
            id="labelId"
            bind:value={localData.labelId}
            class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          >
            <option value="">None</option>
            {#each eventLabels as label}
              <option value={label.id}>
                {label.category}
              </option>
            {/each}
          </select>
        </div>
      </section>

      <!-- Media -->
      <section class="space-y-6">
        <h3
          class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100"
        >
          <Image class="w-6 h-6 text-green-600" /> Media
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="thumbnailUrl" class="font-semibold text-gray-700 mb-1"
              >Thumbnail URL</label
            >
            <input
              name="thumbnailUrl"
              id="thumbnailUrl"
              type="url"
              bind:value={localData.thumbnailUrl}
              placeholder="Link for event thumbnail"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div class="flex flex-col">
            <label for="bannerUrl" class="font-semibold text-gray-700 mb-1"
              >Banner URL</label
            >
            <input
              name="bannerUrl"
              id="bannerUrl"
              type="url"
              bind:value={localData.bannerUrl}
              placeholder="Link for event banner"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
        </div>
      </section>

      <!-- Rewards & Capacity -->
      <section class="space-y-6">
        <h3
          class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100"
        >
          <DollarSign class="w-6 h-6 text-green-600" /> Rewards & Capacity
        </h3>
        <div class="grid grid-cols-3 gap-4">
          <div
            class="flex flex-col p-4 bg-yellow-50/50 border border-yellow-200 rounded-xl"
          >
            <label for="points" class="text-sm font-semibold text-gray-700 mb-1"
              >Points</label
            >
            <input
              name="points"
              id="points"
              type="number"
              bind:value={localData.points}
              class="w-full bg-transparent border-none p-0 focus:ring-0 text-lg font-mono"
            />
          </div>
          <div
            class="flex flex-col p-4 bg-cyan-50/50 border border-cyan-200 rounded-xl"
          >
            <label
              for="studyPoints"
              class="text-sm font-semibold text-gray-700 mb-1">EC's</label
            >
            <input
              name="studyPoints"
              id="studyPoints"
              type="number"
              step="0.5"
              bind:value={localData.studyPoints}
              class="w-full bg-transparent border-none p-0 focus:ring-0 text-lg font-mono"
            />
          </div>
          <div
            class="flex flex-col p-4 bg-green-50/50 border border-green-200 rounded-xl"
          >
            <label
              for="maxParticipants"
              class="text-sm font-semibold text-gray-700 mb-1">Max</label
            >
            <input
              name="maxParticipants"
              id="maxParticipants"
              type="number"
              bind:value={localData.maxParticipants}
              class="w-full bg-transparent border-none p-0 focus:ring-0 text-lg font-mono"
            />
          </div>
        </div>
      </section>
    </div>

    <div class="p-6 border-t border-gray-100 bg-white z-10 shrink-0">
      <button
        type="submit"
        class="w-full py-4 rounded-xl text-white font-extrabold text-xl bg-green-600 hover:bg-green-700 shadow-xl cursor-pointer transition-all active:scale-[0.98]"
      >
        {action === "update" ? "Save Changes" : "Create Event"}
      </button>
    </div>
  </div>
</div>
