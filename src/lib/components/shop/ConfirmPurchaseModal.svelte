<script lang="ts">
  import type { Reward } from '$lib/types';

  export let reward: Reward;
  export let userPoints: number;
  export let onCancel: () => void;
  export let onConfirm: () => void;

  let loading = false;
  let error = '';

  $: canBuy = Number(userPoints) >= Number(reward.requiredPoints);

  async function handleConfirm() {
    if (!canBuy || loading) return;

    loading = true;
    error = '';

    try {
      await onConfirm();
    } catch (e: any) {
      error = e?.message ?? 'Purchase failed';
    } finally {
      loading = false;
    }
  }
</script>

<div class="overlay">
  <div class="modal">
    <h2>Confirm Purchase</h2>

    <p>
      Do you want to purchase
      <strong>{reward.title}</strong>
      for {reward.requiredPoints} points?
    </p>

    {#if !canBuy}
      <p class="error">You do not have enough points.</p>
    {/if}

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <div class="actions">
      <button class="cancel" on:click={onCancel}>Cancel</button>

      <button
        class="confirm {canBuy && !loading ? 'active' : ''}"
        disabled={!canBuy || loading}
        on:click={handleConfirm}
      >
        {#if loading}Processing...{:else}Confirm ({reward.requiredPoints} 🪙){/if}
      </button>
    </div>
  </div>
</div>

<style>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: grid;
  place-items: center;
  z-index: 50;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 18px;
  max-width: 420px;
  width: 90%;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.cancel {
  background: #e5e7eb;
  color: black;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
}

.confirm {
  background: #9ca3af;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1.2rem;
  transition: background 0.2s ease, transform 0.1s ease;
}

.confirm.active {
  background: #16a34a;
  cursor: pointer;
}

.confirm.active:hover {
  background: #15803d;
  transform: scale(1.02);
}

.confirm:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.error {
  margin-top: 1rem;
  color: #dc2626;
}
</style>
