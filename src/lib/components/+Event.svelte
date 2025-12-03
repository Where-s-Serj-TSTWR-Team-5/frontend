<script>
  import { Trophy, Leaf, Calendar } from "lucide-svelte";

  let { event } = $props();
</script>

<a
  href={`/events/${event.id}`}
  class="w-full text-left bg-white rounded-3xl overflow-hidden shadow-lg border border-stone-200 cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all group"
>
  <div class="flex flex-col bg-white">
    <!-- Image -->
    <div class="h-40 relative overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col justify-between space-y-3">
      <div>
        <h3 class="font-serif text-lg font-bold leading-tight text-stone-900">
          {event.title}
        </h3>
        <p class="text-xs text-stone-600 line-clamp-2 italic mt-1">
          {event.subtitle}
        </p>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between">
        <button
          class="bg-green-600 text-white text-[11px] tracking-wide px-4 py-1.5 rounded-full font-semibold shadow group-hover:bg-green-700 transition"
        >
          Register
        </button>

        <div class="text-[10px] text-stone-500 font-mono text-right space-y-0.5">
          <div class="flex items-center justify-end space-x-1">
            <Calendar class="w-3 h-3" />
            <span>{event.date}</span>
          </div>
          <div class="text-green-700 font-bold">★ XP: {event.xp}</div>
        </div>
      </div>
    </div>
  </div>
</a>
