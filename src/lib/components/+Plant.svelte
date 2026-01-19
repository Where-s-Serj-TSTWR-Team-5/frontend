<script lang='ts'>
  const { plant = {} } = $props();


  type Status = 'critical' | 'warning' | 'healthy';

  const toLevel = (v: unknown) => {
    const n = Number(v);
    return n === 0 || n === 1 || n === 2 ? n : 0;
  };

  const getStatus = (p: any): Status => {
    const latest = p?.plantedPlants?.[0];
    const water = toLevel(latest?.waterLevel ?? 0);
    const sun = toLevel(latest?.sunlightLevel ?? 0);

    if (water === 2 || sun === 2) return 'critical';
    if (water === 1 || sun === 1) return 'warning';
    return 'healthy';
  };

  const statusRing: Record<Status, string> = {
    critical: 'ring-2 ring-red-300 border-red-200',
    warning: 'ring-2 ring-amber-200 border-amber-200',
    healthy: 'ring-1 ring-green-100 border-stone-200'
  };

  const badgeClasses: Record<Status, string> = {
    critical: 'bg-red-100 text-red-800 ring-1 ring-red-200',
    warning: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200',
    healthy: 'bg-green-100 text-green-800 ring-1 ring-green-200'
  };

  const statusText: Record<Status, string> = {
    critical: 'Critical',
    warning: 'Needs care',
    healthy: 'Healthy'
  };

  // Svelte 5 reactive derived values
  const status = $derived((plant?.status as Status) ?? getStatus(plant));
  const subtitle = $derived(
    plant?.statusDetails ??
      plant?.scientificName ??
      `Status: ${statusText[status]}`
  );

  const image = $derived(plant?.image || 'https://picsum.photos/600/400');
  const typeName = $derived(plant?.plantType?.name ?? '');
</script>

<a
  href={`/plants/${plant.id}`}
  class='group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden block border {statusRing[status]}'
>
  <!-- image -->
  <div class='relative w-full h-44 bg-stone-100 overflow-hidden'>
    <img
      src={image}
      alt={plant?.name ?? 'Plant'}
      class='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
    />

    <!-- status badge -->
    <span
      class={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${badgeClasses[status]}`}
    >
      {statusText[status]}
    </span>
  </div>

  <!-- content -->
  <div class='p-4'>
    {#if typeName}
      <div class='text-[10px] font-black uppercase tracking-widest text-green-700 mb-1'>
        {typeName}
      </div>
    {/if}

    <h3 class='font-bold text-stone-900 text-base truncate'>
      {plant?.name ?? 'Plant'}
    </h3>

    {#if subtitle}
      <p class='text-[12px] text-stone-500 truncate italic mt-1'>
        {subtitle}
      </p>
    {/if}
  </div>
</a>
