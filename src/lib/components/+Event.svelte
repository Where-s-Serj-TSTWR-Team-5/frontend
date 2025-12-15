<script>
  import { Trophy, Leaf, Calendar, Sparkles } from "lucide-svelte";
  let { event } = $props();
</script>

<a
  href={`/events/${event.id}`}
  class="group w-full text-left bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-2xl transition-all duration-300 active:scale-[0.98]"
>
  <!-- Image -->
  <div class="relative h-44 overflow-hidden">
    <img
      src={event.image}
      alt={event.title}
      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />

    <!-- Gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

    <!-- Floating Icon -->
    <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1 shadow">
      <Leaf class="w-4 h-4 text-green-600" />
      <span class="text-xs font-semibold text-stone-700">Eco Event</span>
    </div>

    <!-- XP Badge -->
    <div class="absolute top-3 right-3 bg-cyan-600 text-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
      <Sparkles class="w-4 h-4" />
      <span class="text-xs font-bold">{event.studyPoints} EC's</span>
    </div>
  </div>

  <!-- Content -->
  <div class="p-5 flex flex-col gap-4">
    <div>
      <h3 class="font-serif text-xl font-bold text-stone-900 leading-tight">
        {event.title}
      </h3>

      <p class="text-sm text-stone-600 italic mt-1 line-clamp-2">
        {event.subtitle}
      </p>
    </div>

    <!-- Info Row -->
    <div class="flex items-center justify-between">
      <!-- Date -->
      <div class="flex items-center gap-2 bg-stone-100 rounded-full px-3 py-1.5 text-sm text-stone-700 font-medium">
        <Calendar class="w-4 h-4 text-green-600" />
        <span>{event.date}</span>
      </div>

      <!-- Register -->
      <button
        class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg transition"
      >
        Register
      </button>
    </div>
  </div>
</a>
