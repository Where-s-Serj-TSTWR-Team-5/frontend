<script>
  import {
    ChevronLeft,
    Calendar,
    Clock,
    MapPin,
    Trophy,
    CreditCard,
  } from "lucide-svelte";

  let { data } = $props();
  let event = data.event.event;
</script>

<div
  class="flex flex-col h-full bg-stone-50 overflow-y-auto animate-in slide-in-from-right duration-300 pb-24"
>
  <!-- Event Image Header -->
  <div
    class="relative h-64 bg-green-100 flex items-center justify-center overflow-hidden shrink-0"
  >
    <img alt={event.title} class="w-full h-full object-cover opacity-90" />
    <button
      on:click={() => {
        window.history.back();
      }}
      class="absolute top-8 left-6 z-10 bg-black/50 text-white p-2 rounded-full shadow-lg hover:bg-black/70 transition"
    >
      <ChevronLeft class="w-6 h-6" />
    </button>
    <div
      class="absolute bottom-0 w-full h-16 bg-linear-to-t from-stone-50 to-transparent"
    ></div>
  </div>

  <!-- Event Content -->
  <div class="p-6 space-y-6">
    <!-- Title & Category -->
    <div class="pb-3 border-b border-stone-200">
      <span
        class="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full"
        >{event.category} Gardening</span
      >
      <h1 class="text-3xl font-serif font-bold text-stone-900 mt-2">
        {event.title}
      </h1>
      <p class="text-stone-500 font-medium italic">{event.subtitle}</p>
    </div>

    <!-- Event Details -->
    <div
      class="bg-white rounded-2xl p-5 shadow-sm border border-stone-200 space-y-4"
    >
      <h3 class="font-bold text-stone-800 border-b border-stone-100 pb-2 mb-3">
        Event Details
      </h3>

      <div class="flex items-center space-x-3">
        <Calendar class="w-5 h-5 text-green-600 shrink-0" />
        <span class="text-stone-800">{event.date}</span>
      </div>

      <div class="flex items-center space-x-3">
        <Clock class="w-5 h-5 text-green-600 shrink-0" />
        <span class="text-stone-800">{event.startAt}</span>
      </div>

      <div class="flex items-center space-x-3">
        <MapPin class="w-5 h-5 text-green-600 shrink-0" />
        <span class="text-stone-800">{event.location}</span>
      </div>

      <div class="pt-4 flex justify-between">
        <div class="flex items-center space-x-2">
          <Trophy class="w-5 h-5 text-yellow-600 shrink-0" />
          <span class="font-bold text-yellow-700">{event.xp} XP</span>
        </div>
        <div class="flex items-center space-x-2">
          <CreditCard class="w-5 h-5 text-cyan-600 shrink-0" />
          <span class="font-bold text-cyan-700"
            >{event.studyPoints} ECTS Credits</span
          >
        </div>
      </div>
    </div>

    <!-- Event Description -->
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-stone-200">
      <h3 class="font-bold text-stone-800 mb-2 border-b border-stone-100 pb-2">
        About this Event
      </h3>
      <p class="text-stone-600 text-sm leading-relaxed">{event.description}</p>
    </div>

    <!-- Registration Button -->
    <div class="sticky bottom-0 bg-stone-50 py-4">
      <button
        class="w-full py-3 rounded-full text-white font-bold text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition"
      >
        Register Now
      </button>
    </div>
  </div>
</div>
