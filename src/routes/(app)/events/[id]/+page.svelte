<script>
  import {
    ChevronLeft,
    Calendar,
    Clock,
    MapPin,
    Trophy,
    Sparkles,
    Users,
    TrendingUp,
    Star,
    Mail,
    Eye,
    X,
  } from "lucide-svelte";

  import {
    formatFullDate,
    formatTime,
  } from "$lib/helpers/dateTimeFormatter.js";
  import { toggleRegistration } from "../../../../lib/helpers/events/toggleEvents.js";
  import { page } from "$app/stores";

  let { data } = $props();
  let event = data.event.event;

  const user = $page.data?.user;

  // Check if current user is the organizer
  const isOrganizer = user?.id === event.organizerId;

  const displayDate = formatFullDate(event.date || event.startAt, "Date TBD");
  const displayStartTime = formatTime(event.startAt, "Time TBD");
  const displayEndTime = formatTime(event.endAt, "Time TBD");

  // Local reactive state
  let currentParticipants = event.currentParticipants;
  let isRegistered =
    user?.eventRegistrations?.some((r) => r.eventId === event.id) ?? false;

  // State for showing the participant modal
  let showParticipants = $state(false);

  const getParticipantStatus = () => {
    if (currentParticipants >= event.maxParticipants) {
      return {
        text: "Fully Booked",
        color: "text-red-700 bg-red-100 border-red-200",
      };
    } else if (currentParticipants / event.maxParticipants > 0.75) {
      return {
        text: "Almost Full",
        color: "text-amber-700 bg-amber-100 border-amber-200",
      };
    }
    return {
      text: "Seats Available",
      color: "text-green-700 bg-green-100 border-green-200",
    };
  };

  let participantStatus = getParticipantStatus();
  let isFull = currentParticipants >= event.maxParticipants;

  const handleToggleRegistration = async () => {
    // Prevent action if not logged in, if full, or if the user is the organizer
    if (!user || isFull || isOrganizer) return;
    const token = $page.data?.token;
    await toggleRegistration(event.id, token);

    window.location.reload();
  };
</script>

<div
  class="flex flex-col h-full bg-stone-50 overflow-y-auto animate-in slide-in-from-right duration-300 pb-8 cursor-default"
>
  <div class="relative h-72 md:h-96 w-full shrink-0">
    <img
      alt={event.title}
      src={event.banner || event.thumbnail || "https://picsum.photos/1200/800"}
      class="w-full h-full object-cover"
    />
    <button
      onclick={() => window.history.back()}
      class="absolute top-8 left-6 z-20 bg-black/50 text-white p-3 rounded-full shadow-xl hover:bg-black/70 transition duration-300 ease-in-out cursor-pointer"
      aria-label="Go back"
    >
      <ChevronLeft class="w-6 h-6" />
    </button>
    <div
      class="absolute inset-0 bg-linear-to-t from-stone-50 via-stone-50/50 to-transparent"
    ></div>
    <div class="absolute bottom-0 left-0 right-0 p-6 pt-10">
      <span
        class="text-sm font-bold tracking-wider text-green-700 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md"
      >
        {event.category || "Eco Event"}
      </span>
      <h1
        class="text-4xl lg:text-5xl font-extrabold text-stone-900 mt-2 leading-tight drop-shadow-lg"
      >
        {event.title}
      </h1>
      <p class="text-lg text-stone-700 font-medium italic mt-1">
        {event.subtitle}
      </p>
    </div>
  </div>

  <div
    class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 max-w-7xl mx-auto w-full"
  >
    <div class="lg:col-span-2 space-y-8">
      <div
        class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200"
      >
        <h2
          class="text-2xl font-bold text-stone-800 mb-4 flex items-center gap-3"
        >
          <TrendingUp class="w-6 h-6 text-green-600" /> About this Event
        </h2>
        <p class="text-stone-600 text-base leading-relaxed whitespace-pre-wrap">
          {event.description ||
            "No detailed description provided for this event."}
        </p>
      </div>

      <div
        class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-5"
      >
        <h2 class="text-2xl font-bold text-stone-800 flex items-center gap-3">
          <Calendar class="w-6 h-6 text-green-600" /> Key Event Details
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-100 pt-5"
        >
          <div class="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl">
            <Calendar class="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <span class="text-xs font-semibold uppercase text-stone-500"
                >Date</span
              >
              <p class="font-medium text-stone-800">{displayDate}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl">
            <Clock class="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <span class="text-xs font-semibold uppercase text-stone-500"
                >Time</span
              >
              <p class="font-medium text-stone-800">
                {displayStartTime}{#if event.endAt}
                  - {displayEndTime}{/if}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl">
            <MapPin class="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <span class="text-xs font-semibold uppercase text-stone-500"
                >Location</span
              >
              <p class="font-medium text-stone-800">
                {event.location || "Online / TBD"}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl">
            <Mail class="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <span class="text-xs font-semibold uppercase text-stone-500"
                >Organizer</span
              >
              <p class="font-medium">
                <a
                  href={`mailto:${event.organizer.email}`}
                  class="text-green-700 hover:text-green-800 hover:underline break-all"
                >
                  {event.organizer.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:col-span-1 space-y-8 sticky top-6 self-start">
      <div
        class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-5"
      >
        <h2 class="text-2xl font-bold text-stone-800 flex items-center gap-3">
          <Star class="w-6 h-6 text-green-600" /> Rewards
        </h2>
        <div class="space-y-4">
          <div
            class="flex justify-between items-center border-b border-stone-100 pb-3"
          >
            <div class="flex items-center space-x-3">
              <Trophy class="w-5 h-5 text-yellow-600 shrink-0" />
              <span class="text-stone-700 font-medium">Points</span>
            </div>
            <span class="font-bold text-lg text-yellow-700"
              >{event.points || 0} Points</span
            >
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <Sparkles class="w-5 h-5 text-cyan-600 shrink-0" />
              <span class="text-stone-700 font-medium">Study Credits</span>
            </div>
            <span class="font-bold text-lg text-cyan-700"
              >{event.studyPoints || 0} ECTS</span
            >
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200 space-y-5"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-stone-800 flex items-center gap-3">
            <Users class="w-6 h-6 text-green-600" /> Capacity
          </h2>
          {#if user.role === "GREEN_OFFICE_MEMBER"}
          <button
            onclick={() => (showParticipants = true)}
            class="text-xs font-bold uppercase py-1 px-3 rounded-lg bg-stone-100 text-stone-600 hover:bg-green-100 hover:text-green-700 transition flex items-center gap-1 cursor-pointer"
          >
            <Eye class="w-3 h-3" /> View List
          </button>
          {/if}
        </div>

        <div class={`p-4 rounded-xl border-2 ${participantStatus.color}`}>
          <p class="text-sm font-semibold uppercase">
            {participantStatus.text}
          </p>
          <div class="flex justify-between items-baseline mt-1">
            <span class="text-3xl font-extrabold text-stone-900 leading-none"
              >{currentParticipants}</span
            >
            <span class="text-lg text-stone-600 font-medium"
              >/ {event.maxParticipants || "∞"}</span
            >
          </div>
        </div>

        {#if event.maxParticipants}
          <div class="w-full bg-stone-200 rounded-full h-2.5">
            <div
              class="h-2.5 rounded-full bg-green-600 transition-all duration-500"
              style={`width: ${Math.min(100, (currentParticipants / event.maxParticipants) * 100) || 0}%`}
            ></div>
          </div>
        {/if}

        <div class="pt-4 border-t border-stone-100">
          {#if !isOrganizer}
            <button
              onclick={handleToggleRegistration}
              class="w-full py-3 rounded-xl text-white font-extrabold text-lg shadow-xl transition flex items-center justify-center gap-2
      {isFull && !isRegistered
                ? 'bg-red-700 cursor-not-allowed shadow-none'
                : isRegistered
                  ? 'bg-stone-700 hover:bg-stone-800'
                  : 'bg-green-600 hover:bg-green-700 shadow-green-300/60'}"
              disabled={isFull && !isRegistered}
            >
              {#if isRegistered}
                Deregister
              {:else if isFull}
                Full
              {:else}
                Register Now
              {/if}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

{#if showParticipants}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    role="presentation"
    onclick={() => (showParticipants = false)}
  >
    <div
      class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      role="dialog"
      onclick={(e) => e.stopPropagation()}
    >
      <header
        class="p-6 border-b border-stone-100 flex items-center justify-between"
      >
        <h3 class="text-xl font-bold text-stone-800 flex items-center gap-2">
          <Users class="w-5 h-5 text-green-600" /> Attendees
        </h3>
        <button
          onclick={() => (showParticipants = false)}
          class="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-600"
        >
          <X class="w-5 h-5" />
        </button>
      </header>

      <div class="max-h-[60vh] overflow-y-auto p-2">
        <table class="w-full text-left text-sm">
          <thead class="bg-stone-50 border-b border-stone-200">
            <tr>
              <th
                class="px-6 py-3 font-semibold text-stone-600 uppercase tracking-wider"
                >User Details</th
              >
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            {#if event.registrations && event.registrations.length > 0}
              {#each event.registrations as registration}
                <tr class="hover:bg-stone-50 transition-colors">
                  <td class="px-6 py-4 text-stone-700">
                    <div class="flex flex-col">
                      <span class="font-bold text-stone-900"
                        >{registration.user?.userName || "Anonymous"}</span
                      >
                      <span class="text-xs text-stone-500 italic break-all"
                        >{registration.user?.email || ""}</span
                      >
                    </div>
                  </td>
                </tr>
              {/each}
            {:else}
              <tr>
                <td class="px-6 py-12 text-center text-stone-400 italic">
                  No participants registered yet.
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>

      <footer class="p-4 bg-stone-50 border-t border-stone-100 text-center">
        <p class="text-xs text-stone-400 font-medium uppercase tracking-widest">
          {currentParticipants} / {event.maxParticipants || "∞"} Slots Filled
        </p>
      </footer>
    </div>
  </div>
{/if}
