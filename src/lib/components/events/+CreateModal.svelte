<script>
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

  let { closeModal, formData } = $props();

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  };
</script>

<div
  id="modal-backdrop"
  class="fixed inset-0 bg-blue-100/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
  role="button"
  tabindex="0"
  onclick={handleBackdropClick}
  onkeydown={(e) => {
    if (e.key === "Escape" || e.key === " ") handleBackdropClick(e);
  }}
>
  <div
    class="bg-white shadow-2xl shadow-gray-400 w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] rounded-xl overflow-hidden animate-in fade-in duration-300 flex flex-col h-full sm:h-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <header
      class="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10 shrink-0"
    >
      <h2 id="modal-title" class="text-3xl font-extrabold text-gray-800">
        New Event Details
      </h2><button
        onclick={closeModal}
        class="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label="Close modal"
      >
        <X class="w-6 h-6" />
      </button>
    </header>
    <div class="p-8 space-y-10 grow overflow-y-auto">
      <section class="space-y-6">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex flex-col">
            <label for="title" class="font-semibold text-gray-700 mb-1"
              >Title <span class="text-red-500">*</span></label
            >
            <input
              id="title"
              type="text"
              name="title"
              bind:value={formData.title}
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
              id="description"
              name="description"
              bind:value={formData.description}
              rows="4"
              placeholder="Event details and what participants should bring."
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
            ></textarea>
          </div>
        </div>
      </section>
      <section class="space-y-6">
        <h3
          class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100"
        >
          <Calendar class="w-6 h-6 text-green-600" /> Scheduling & Location
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="flex flex-col">
            <label for="date" class="font-semibold text-gray-700 mb-1"
              >Date <span class="text-red-500">*</span></label
            >
            <input
              id="date"
              type="date"
              name="startDate"
              bind:value={formData.startDate}
              required
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div class="flex flex-col">
            <label for="startTime" class="font-semibold text-gray-700 mb-1"
              >Start Time <span class="text-red-500">*</span></label
            >
            <input
              id="startTime"
              type="time"
              name="startTime"
              bind:value={formData.startTime}
              required
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div class="flex flex-col">
            <label for="endTime" class="font-semibold text-gray-700 mb-1"
              >End Time</label
            >
            <input
              id="endTime"
              type="time"
              name="endTime"
              bind:value={formData.endTime}
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label
            for="location"
            class="font-semibold text-gray-700 mb-1 flex items-center gap-1"
            ><MapPin class="w-4 h-4 text-green-600" /> Location
            <span class="text-red-500">*</span></label
          >
          <input
            id="location"
            type="text"
            name="location"
            bind:value={formData.location}
            required
            placeholder="Fruit Forest, Central Park"
            class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
      </section>
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
              id="thumbnailUrl"
              type="url"
              name="thumbnailUrl"
              bind:value={formData.thumbnailUrl}
              placeholder="Link for event thumbnail"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
          <div class="flex flex-col">
            <label for="bannerUrl" class="font-semibold text-gray-700 mb-1"
              >Banner URL</label
            >
            <input
              id="bannerUrl"
              type="url"
              name="bannerUrl"
              bind:value={formData.bannerUrl}
              placeholder="Link for event banner (e.g., social media)"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
        </div>
      </section>
      <section class="space-y-6">
        <h3
          class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100"
        >
          <DollarSign class="w-6 h-6 text-green-600" /> Rewards & Capacity
        </h3>
        <div class="grid grid-cols-3 gap-4">
          <div
            class="flex flex-col p-4 bg-yellow-50/50 border border-yellow-200 rounded-xl shadow-sm"
          >
            <label
              for="points"
              class="font-semibold text-gray-700 mb-1 flex items-center gap-1"
              ><TrendingUp class="w-4 h-4 text-yellow-600" /> Points</label
            >
            <input
              id="points"
              type="number"
              name="points"
              min="0"
              bind:value={formData.points}
              placeholder="100"
              class="px-3 py-2 border border-yellow-300 rounded-lg focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 transition text-lg font-mono"
            />
          </div>
          <div
            class="flex flex-col p-4 bg-cyan-50/50 border border-cyan-200 rounded-xl shadow-sm"
          >
            <label
              for="studyPoints"
              class="font-semibold text-gray-700 mb-1 flex items-center gap-1"
              ><Sparkles class="w-4 h-4 text-cyan-600" /> Study Points</label
            >
            <input
              id="studyPoints"
              type="number"
              name="studyPoints"
              min="0"
              step="0.5"
              bind:value={formData.studyPoints}
              placeholder="1.5"
              class="px-3 py-2 border border-cyan-300 rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition text-lg font-mono"
            />
          </div>
          <div
            class="flex flex-col p-4 bg-green-50/50 border border-green-200 rounded-xl shadow-sm"
          >
            <label
              for="maxParticipants"
              class="font-semibold text-gray-700 mb-1 flex items-center gap-1"
              ><Users class="w-4 h-4 text-green-600" /> Max Participants</label
            >
            <input
              id="maxParticipants"
              type="number"
              name="maxParticipants"
              min="1"
              bind:value={formData.maxParticipants}
              placeholder="100"
              class="px-3 py-2 border border-green-300 rounded-lg focus:ring-1 focus:ring-green-500 focus:border-green-500 transition text-lg font-mono"
            />
          </div>
        </div>
      </section>
      <div class="pt-4 shrink-0">
        <button
          type="submit"
          class="w-full py-4 rounded-xl text-white font-extrabold text-xl bg-green-600 hover:bg-green-700 shadow-xl shadow-green-300/60 transition disabled:bg-green-400 disabled:shadow-none flex items-center justify-center gap-2"
        >
          Create Event
        </button>
      </div>
    </div>
  </div>
</div>
