<script lang="ts">
  const { plant = {} } = $props();

  // --- Helpers ---
  const statusColors = {
    critical: 'bg-red-500',
    warning: 'bg-amber-400',
    healthy: 'bg-green-500',
  };

  const statusBorders = {
    critical: 'border-3 border-red-400',
    warning: 'border-3 border-amber-300',
    healthy: 'border-none',
  };
</script>

<button
  class="w-full bg-white rounded-full md:rounded-xl px-4 py-2 md:p-3 flex items-center space-x-3 shadow-sm cursor-pointer hover:shadow-md active:scale-95 transition {statusBorders[plant.status]}"
>
  <div
    class="w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base text-white {statusColors[plant.status]} shrink-0 border-2 md:border-4"
  >
    {plant.image}
  </div>
  <div class="text-left">
    <span class="block text-xs md:text-sm font-bold text-stone-800">{plant.name}</span>
    <span class="text-[10px] md:text-xs text-stone-500 line-clamp-1">{plant.statusDetails}</span>
  </div>
</button>
