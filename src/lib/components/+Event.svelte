<script>
  import {
    Trophy,
    Leaf,
    Calendar,
    Sparkles,
    Users,
    Edit,
    Pen,
  } from "lucide-svelte";
  import { formatCardDate } from "$lib/helpers/dateTimeFormatter.js";
  import { enhance } from "$app/forms";
  import CreateUpdateModal from "./events/+CreateUpdateModal.svelte";
  import DeleteModal from "./DeleteModal.svelte";

  let { event } = $props();

  const displayDate = formatCardDate(event.date || event.startAt);
  const spotsLeft = event.maxParticipants | 0;
  const isFull = event.maxParticipants && spotsLeft === 0;

  let formData = $state({
    id: event.id || null,
    title: event.title || "",
    description: event.description || "",
    thumbnailUrl: event.thumbnail || "",
    bannerUrl: event.banner || "",
    date: event.date || "",
    startAt: event.startAt || "",
    endAt: event.endAt || "",
    location: event.location || "",
    points: event.points || 100,
    studyPoints: event.studyPoints || 0,
    maxParticipants: event.maxParticipants || 0,
  });

  let isModalOpen = $state(false);
  const openModal = () => (isModalOpen = true);
  const closeModal = () => (isModalOpen = false);

  let isDeleteModalOpen = $state(false);
  const openDeleteModal = () => (isDeleteModalOpen = true);
  const closeDeleteModal = () => (isDeleteModalOpen = false);
  function handleDeleted(event) {
    location.reload();
  }
</script>

<a
  href={`/events/${event.id}`}
  class="group block w-full text-left bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 active:scale-[0.98] cursor-pointer"
>
  <div class="relative h-44 overflow-hidden">
    <img
      src={event.thumbnail || "https://picsum.photos/500/700"}
      alt={event.title}
      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <div
      class="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent"
    ></div>

    <div
      class="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 shadow"
    >
      <Leaf class="w-4 h-4 text-green-600" />
      <span class="text-xs font-semibold text-stone-700"
        >{event.category || "Eco Event"}</span
      >
    </div>

    <div class="absolute top-3 right-3 flex flex-col gap-2 items-end">
      <div
        class="bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 shadow-lg"
      >
        <Sparkles class="w-4 h-4 text-cyan-600" />
        <span class="text-xs font-bold">{event.studyPoints} EC's</span>
      </div>
    </div>
    <div class="absolute bottom-3 right-3 flex flex-row gap-2 items-end">
      <button
        type="button"
        onclick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          openModal();
        }}
        class="p-2 rounded-md bg-white/90 backdrop-blur-md text-yellow-600 hover:bg-white transition-all shadow-lg active:scale-90 cursor-pointer hover:ring-2 hover:ring-amber-500"
        title="Edit Event"
      >
        <Pen class="w-4 h-4" />
      </button>
      <button
        type="button"
        onclick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          openDeleteModal();
        }}
        class="p-2 rounded-md bg-white/90 backdrop-blur-md text-red-600 hover:bg-red- transition-all shadow-lg active:scale-90 cursor-pointer hover:ring-2 hover:ring-red-500"
        title="Delete Event"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 6h18M19 6l-1 14H6L5 6m5 0V4h4v2" />
        </svg>
      </button>
    </div>
  </div>

  <div class="p-5 flex flex-col gap-4">
    <div>
      <h3 class="font-serif text-xl font-bold text-stone-900 leading-tight">
        {event.title}
      </h3>
      <p class="text-sm text-stone-600 italic mt-1 line-clamp-2">
        {event.subtitle}
      </p>
    </div>

    <div
      class="flex items-center justify-between border-b border-stone-100 pb-3"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex items-center gap-2 text-sm text-stone-700 font-medium shrink-0"
        >
          <Calendar class="w-4 h-4 text-green-600" />
          <span class="font-semibold">{displayDate}</span>
        </div>
        <div
          class="flex items-center gap-2 text-sm text-stone-700 font-medium shrink-0"
        >
          <Trophy class="w-4 h-4 text-yellow-600" />
          <span class="font-bold text-yellow-700"
            >{event.points || 0} Points</span
          >
        </div>
      </div>

      {#if event.maxParticipants}
        <div
          class={`flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold shrink-0 ${isFull ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          <Users class="w-3 h-3" />
          <span>{isFull ? "Full" : `${spotsLeft} Spots`}</span>
        </div>
      {/if}
    </div>

    <div class="pt-1">
      <div
        class="relative z-10 w-full flex items-center justify-center px-5 py-2 rounded-full text-base font-semibold shadow-lg transition-all duration-200 cursor-pointer
        {isFull
          ? 'bg-red-700 text-white opacity-80'
          : 'bg-green-600 text-white group-hover:bg-green-700 group-hover:-translate-y-0.5'}"
      >
        {isFull ? "Full" : "Register Now"}
      </div>
    </div>
  </div>
</a>

{#if isModalOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
  >
    <div class="w-full max-w-2xl p-4" onclick={(e) => e.stopPropagation()}>
      <form
        method="POST"
        action="events?/update"
        use:enhance={() => {
          return async ({ result }) => {
            if (result.type === "success") {
              location.reload();
            }
          };
        }}
      >
        <CreateUpdateModal
          {closeModal}
          {formData}
          action="update"
          eventId={event.id}
        />
      </form>
    </div>
  </div>
{/if}
<!-- Delete Modal -->
{#if isDeleteModalOpen}
  <DeleteModal
    eventId={event.id}
    eventTitle={event.title}
    closeModal={closeDeleteModal}
    on:deleted={handleDeleted}
  />
{/if}
