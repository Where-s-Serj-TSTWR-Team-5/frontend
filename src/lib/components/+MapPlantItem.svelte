<script>
  const { plant = {} } = $props();
  
  // --- Helpers ---
  const statusColors = {
    critical: 'bg-red-500',
    warning: 'bg-amber-400',
    healthy: 'bg-green-500',
  };
</script>

<button
  class="absolute"
  style="top: {plant.mapPosition.top}; left: {plant.mapPosition.left};"
>
  <div
    class="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm md:text-lg text-white {statusColors[
      plant.status
    ]}"
  >
    {plant.image}
  </div>
  <div
    class="absolute top-10 md:top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-[10px] md:text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none"
  >
    {plant.name}
  </div>
</button>
