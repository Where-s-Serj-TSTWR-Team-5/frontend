<script>
  import { Trophy, Leaf, Calendar, Sparkles, Users } from "lucide-svelte";
  import { formatCardDate } from "$lib/helpers/dateTimeFormatter.js";
  let { event } = $props();

  const displayDate = formatCardDate(event.date || event.startAt);
  const spotsLeft = event.maxParticipants | 0;
  const isFull = event.maxParticipants && spotsLeft === 0;
</script>

<a
  href={`/events/${event.id}`}
  class="group w-full text-left bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 active:scale-[0.98]"
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
    <div
      class="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 flex items-center gap-1 shadow-lg"
    >
      <Sparkles class="w-4 h-4 text-cyan-600" />
      <span class="text-xs font-bold">{event.studyPoints} EC's</span>
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
          class={`flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold shrink-0 ${
            isFull ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          <Users class="w-3 h-3" />
          <span>{isFull ? "Full" : `${spotsLeft} Spots`}</span>
        </div>
      {/if}
    </div>
    <div class="pt-1">
      <button
        class="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-base font-semibold shadow-lg transition disabled:bg-red-700 disabled:hover:bg-red-700 disabled:shadow-none"
        disabled={isFull}
      >
        {isFull ? "Full" : "Register Now"}
      </button>
    </div>
  </div>
</a>
