

<script lang="ts">
  import { onMount } from 'svelte';
  import RewardCard from '$lib/components/shop/RewardCard.svelte';
  import ConfirmPurchaseModal from '$lib/components/shop/ConfirmPurchaseModal.svelte';
  import type { Reward } from '$lib/types';

  let userPoints = 0;
  let purchasedRewards: string[] = [];
  let rewards: Reward[] = [];
  let selectedReward: Reward | null = null;

  async function fetchUser() {
    const res = await fetch('/api/users');
    const data = await res.json();
    if (!data.error) {
      userPoints = data.points;
      purchasedRewards = data.purchasedRewards || [];
    }
  }

  async function fetchRewards() {
  try {
    const res = await fetch('http://localhost:3011/rewards'); // full backend URL
    if (!res.ok) throw new Error('Failed to fetch rewards');

    const data = await res.json();
    rewards = Array.isArray(data.data) ? data.data : data; // your backend wraps in `data` sometimes
    console.log('REWARDS', rewards);
  } catch (err) {
    console.error('Failed to fetch rewards:', err);
    rewards = [];
  }
}

  onMount(async () => {
  await fetchUser();
  await fetchRewards();
});

  function openModal(reward: Reward) {
    selectedReward = reward;
  }

  function closeModal() {
    selectedReward = null;
  }

  async function confirmPurchase() {
    if (!selectedReward) return;

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rewardId: selectedReward.id })
    });

    const data = await res.json();

    if (!data.error) {
      userPoints = data.points;
      purchasedRewards = data.purchasedRewards || [];
      selectedReward = null;
    } else {
      alert(data.error);
    }
  }

  function isPurchased(rewardId: string) {
    return purchasedRewards.includes(rewardId);
  }
</script>

<header class="header">
  <div>
    <small>FRUIT FOREST</small>
    <h1>Shop</h1>
    <p>Spend your hard-earned points on useful rewards!</p>
  </div>

  <div class="points">
    🪙 {userPoints}
  </div>
</header>

<section class="grid">
  {#each rewards as reward}
    <RewardCard
      {reward}
      {isPurchased}
      onBuy={openModal}
    />
  {/each}
</section>

{#if selectedReward}
  <ConfirmPurchaseModal
    reward={selectedReward}
    userPoints={userPoints}
    onCancel={closeModal}
    onConfirm={confirmPurchase}
  />
{/if}

<style>
.header {
  background: #14532d;
  color: white;
  padding: 1.5rem;
  border-radius: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.points {
  background: #facc15;
  color: black;
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  font-weight: bold;
}

.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
</style>
