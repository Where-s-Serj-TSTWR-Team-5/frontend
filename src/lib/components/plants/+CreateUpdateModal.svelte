<script>
  import { X, Leaf, Image, Tag, Info } from 'lucide-svelte';

  const { closeModal, formData, action = 'create', plantId = null } = $props();

  const localData = $derived({
    ...formData
  });

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') closeModal();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };
</script>

<div
  id="modal-backdrop"
  class="text-start fixed inset-0 bg-green-100/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 z-50 cursor-default"
  role="presentation"
  onclick={handleBackdropClick}
  onkeydown={(e) => {
    if (e.key === 'Escape') closeModal();
  }}
>
  <div
    class="bg-white shadow-2xl shadow-gray-400 w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] rounded-xl overflow-hidden animate-in fade-in duration-300 flex flex-col h-full sm:h-auto cursor-default outline-none"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="0"
    onclick={handleModalContentClick}
    onkeydown={(e) => e.stopPropagation()}
  >
    {#if plantId}
      <input type="hidden" name="id" value={plantId} />
    {/if}

    <header class="sticky top-0 bg-white p-6 border-b border-gray-100 flex items-center justify-between z-10 shrink-0">
      <h2 id="modal-title" class="text-3xl font-extrabold text-gray-800">
        {action === 'update' ? 'Edit Plant' : 'New Plant Details'}
      </h2>

      <button
        type="button"
        onclick={closeModal}
        class="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
        aria-label="Close modal"
      >
        <X class="w-6 h-6" />
      </button>
    </header>

    <div class="p-8 space-y-10 grow overflow-y-auto">
      <section class="space-y-6">
        <h3 class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100">
          <Leaf class="w-6 h-6 text-green-600" /> Basic info
        </h3>

        <div class="grid grid-cols-1 gap-4">
          <div class="flex flex-col">
            <label for="name" class="font-semibold text-gray-700 mb-1">
              Name <span class="text-red-500">*</span>
            </label>
            <input
              name="name"
              id="name"
              type="text"
              bind:value={localData.name}
              required
              placeholder="Apple tree"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <div class="flex flex-col">
            <label for="scientificName" class="font-semibold text-gray-700 mb-1">
              Scientific name
            </label>
            <input
              name="scientificName"
              id="scientificName"
              type="text"
              bind:value={localData.scientificName}
              placeholder="Malus domestica"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <div class="flex flex-col">
            <label for="description" class="font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Info class="w-4 h-4 text-green-600" /> Description
            </label>
            <textarea
              name="description"
              id="description"
              bind:value={localData.description}
              rows="4"
              placeholder="Short description / care notes"
              class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-none"
            ></textarea>
          </div>
        </div>
      </section>

      <section class="space-y-6">
        <h3 class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100">
          <Image class="w-6 h-6 text-green-600" /> Media
        </h3>

        <div class="flex flex-col">
          <label for="image" class="font-semibold text-gray-700 mb-1">Image URL</label>
          <input
            name="image"
            id="image"
            type="url"
            bind:value={localData.image}
            placeholder="https://..."
            class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
      </section>

      <section class="space-y-6">
        <h3 class="text-2xl font-bold text-gray-700 flex items-center gap-3 border-b pb-2 border-green-100">
          <Tag class="w-6 h-6 text-green-600" /> Type
        </h3>

        <div class="flex flex-col">
          <label for="plantTypeID" class="font-semibold text-gray-700 mb-1">
            Plant Type ID <span class="text-red-500">*</span>
          </label>
          <input
            name="plantTypeID"
            id="plantTypeID"
            type="number"
            min="1"
            bind:value={localData.plantTypeID}
            required
            class="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
          <p class="text-xs text-gray-500 mt-2">
            Later we can replace this with a dropdown from your PlantTypes endpoint.
          </p>
        </div>
      </section>
    </div>

    <div class="p-6 border-t border-gray-100 bg-white z-10 shrink-0">
      <button
        type="submit"
        class="w-full py-4 rounded-xl text-white font-extrabold text-xl bg-green-600 hover:bg-green-700 shadow-xl cursor-pointer transition-all active:scale-[0.98]"
      >
        {action === 'update' ? 'Save Changes' : 'Create Plant'}
      </button>
    </div>
  </div>
</div>
