<script lang="ts">
  export let reward: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    requiredPoints: number;
  };
  export let onBuy: (reward: typeof reward) => void;
  export let isPurchased: (id: string) => boolean;
</script>

<div class="card">
  <img src={reward.thumbnail} alt={reward.title} class="thumbnail" />
  <h2>{reward.title}</h2>
  <p>{reward.description}</p>
  <p>Cost: 🪙 {reward.requiredPoints}</p>

  <button
    class="buy-button"
    disabled={isPurchased(reward.id)}
    on:click={() => onBuy(reward)}
  >
    {isPurchased(reward.id) ? 'Purchased' : 'Buy'}
  </button>
</div>

<style>
.card {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.thumbnail {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.buy-button {
  margin-top: 0.8rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  background: #16a34a;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.buy-button:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}
</style>
