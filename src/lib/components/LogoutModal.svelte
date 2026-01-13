<script lang="ts">
  export let open = false;
  export let title = 'Are you sure?';
  export let message = '';
  export let confirmText = 'Confirm';
  export let cancelText = 'Cancel';

  export let onConfirm: () => void;
  export let onCancel: () => void;
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    on:click={onCancel}
  >
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
      on:click|stopPropagation
    >
      <h2 class="text-lg font-bold text-stone-900">
        {title}
      </h2>

      <p class="text-sm text-stone-600 mt-2">
        {message}
      </p>

      <div class="flex justify-end gap-3 mt-6">
        <button
          class="px-4 py-2 rounded-full bg-stone-200 text-stone-700 font-semibold hover:bg-stone-300"
          on:click={onCancel}
        >
          {cancelText}
        </button>

        <button
          class="px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-500"
          on:click={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </div>
  </div>
{/if}
