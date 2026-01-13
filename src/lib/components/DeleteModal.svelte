<script>
  import { createEventDispatcher } from "svelte";
  import { Trash2 } from "lucide-svelte";
  import { page } from "$app/stores";

  export let eventId; // ID of the event to delete
  export let eventTitle; // Title to display in confirmation
  export let closeModal; // Function to close modal

  const dispatch = createEventDispatcher();
  const token = $page.data?.token;
  async function deleteEvent() {
    if (!token) {
      alert("You must be logged in to delete events");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3011/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        closeModal();
        dispatch("deleted", { id: eventId });
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert("Failed to delete event: " + (errorData.message || res.status));
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting event.");
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
  onclick={closeModal}
>
  <div
    class="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
    onclick={(e) => e.stopPropagation()}
  >
    <h2 class="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
      <Trash2 class="w-5 h-5" /> Confirm Delete
    </h2>

    <p class="mb-6">
      Are you sure you want to delete <strong>{eventTitle}</strong>?
    </p>

    <div class="flex justify-end gap-4">
      <button
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        onclick={closeModal}
      >
        Cancel
      </button>

      <button
        class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        onclick={deleteEvent}
      >
        Delete
      </button>
    </div>
  </div>
</div>
