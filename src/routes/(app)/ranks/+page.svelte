<script>
  // 1. SKIP the old hardcoded list. 
  // 2. ADD this to connect to +page.ts
  export let data;

  // This ensures that if the backend fails, the page still shows something.
  $: leaders = data?.leaders || [
    { rank: 1, initial: 'Y', name: 'Khat 0007', points: 1000, highlight: true }
  ];
</script>

<div class="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
  <header class="mb-8 text-center md:text-left">
    <p class="text-green-700 font-bold text-xs tracking-widest uppercase">Community</p>
    <h1 class="text-4xl md:text-5xl font-serif italic font-bold text-gray-900">Leaderboard</h1>
    <div class="md:border-l-2 border-green-500 md:pl-4 mt-2">
      <p class="text-gray-600 text-sm max-w-md mx-auto md:mx-0">
        Ranked by gardening points earned from tasks and events.
      </p>
    </div>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
    <div class="lg:col-span-2 order-2 lg:order-1">
      <h2 class="text-2xl font-serif italic font-bold mb-4 text-gray-800">Top Gardeners</h2>
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {#each leaders as player}
          <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-50 last:border-0 {player.highlight ? 'bg-green-50' : ''}">
            <div class="flex items-center gap-4">
              <span class="w-6 text-center font-bold {player.rank <= 3 ? 'text-yellow-600' : 'text-gray-400'}">{player.rank}</span>
              <div class="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-semibold border border-gray-200 uppercase">
                {player.initial}
              </div>
              <span class="font-bold text-gray-800">{player.name}</span>
            </div>
            <div class="flex items-center text-green-600 gap-1 font-bold">
               <span class="text-lg">⭐</span> {player.points} XP
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="lg:col-span-1 space-y-6 order-1 lg:order-2">
      <div class="bg-green-700 rounded-2xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-700 font-bold">Y</div>
             <span class="font-bold text-lg">You (You)</span>
          </div>
          <span class="text-2xl font-bold">#6</span>
        </div>
        <div class="border-t border-green-600 pt-4 flex justify-between items-end">
          <span class="text-xs uppercase opacity-80">Current Streak</span>
          <span class="text-2xl font-bold">28 🔥</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 class="text-xl font-serif italic font-bold mb-4 text-gray-800">How to Climb</h2>
        <div class="space-y-4">
          <div class="flex gap-3 text-sm">
            <span class="text-green-500 font-bold">✓</span>
            <p><strong class="text-gray-800">Daily Tasks</strong> Watering and pruning add to your streak.</p>
          </div>
          <div class="flex gap-3 text-sm">
            <span class="text-yellow-600 font-bold">🏆</span>
            <p><strong class="text-gray-800">Earn XP</strong> Attend events and complete modules.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>