<script>
  let { plant = {} } = $props();

  const getLatestPlanted = (p) => {
    const arr = p?.plantedPlants;
    if (!Array.isArray(arr) || arr.length === 0) return null;

    return [...arr].sort((a, b) => {
      const aTime = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (aTime !== bTime) return bTime - aTime;
      return (b?.id ?? 0) - (a?.id ?? 0);
    })[0];
  };

  const toCss = (v) => {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "string") return v;
    if (typeof v === "number") return `${v}%`; 
    return null;
  };

  const latest = getLatestPlanted(plant);
  const top = toCss(latest?.mapY) ?? plant?.mapPosition?.top ?? "50%";
  const left = toCss(latest?.mapX) ?? plant?.mapPosition?.left ?? "50%";

  
  const img = plant?.image;
  const looksLikeUrl = typeof img === "string" && img.startsWith("http");
  const markerText = looksLikeUrl
    ? (plant?.name?.[0] ?? "P").toUpperCase()
    : (img ?? (plant?.name?.[0] ?? "P").toUpperCase());

  const toLevel = (v) => {
    const n = Number(v);
    return n === 0 || n === 1 || n === 2 ? n : 0;
  };

  const getStatus = (p) => {
    const latest = p?.plantedPlants?.[0];
    const water = toLevel(latest?.waterLevel ?? 0);
    const sun = toLevel(latest?.sunlightLevel ?? 0);

    if (water === 2 || sun === 2) return "critical";
    if (water === 1 || sun === 1) return "warning";
    return "healthy";
  };

  const status = plant?.status ?? getStatus(plant);

  const statusColors = {

    critical: "bg-red-500",
    warning: "bg-amber-400",
    healthy: "bg-green-500"
  };

  const statusClass = statusColors[status] ?? "bg-green-500";
</script>
  
<a
  href={`/plants/${plant.id}`}
  class="absolute group z-20"
  style={`top:${top}; left:${left}; transform: translate(-50%, -50%);`}
  aria-label={`Open plant ${plant.name ?? ''}`}
>
  <div
    class={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-lg
            flex items-center justify-center text-sm md:text-lg text-white
            ${statusClass}`}
  >
    {markerText}
  </div>

  <div
    class="absolute top-10 md:top-12 left-1/2 -translate-x-1/2
           bg-black/80 text-white text-[10px] md:text-xs px-2 py-1 rounded
           opacity-0 group-hover:opacity-100 transition whitespace-nowrap
           z-30 pointer-events-none"
  >
    {plant.name}
  </div>
</a>

