<script>
  export let data;
  const { user } = data;

  import LogoutModal from '$lib/components/LogoutModal.svelte';

  let showLogoutConfirm = false;

  function logout() {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/users/logout';
    document.body.appendChild(form);
    form.submit();
  }
</script>

{#if user?.success}
  <div class="max-w-4xl mx-auto w-full px-6 pt-10 pb-12">
    <!-- Header -->
    <header class="pb-6 md:pb-10 text-center">
      <h1 class="font-serif text-4xl md:text-5xl italic font-bold text-stone-900">
        Profile
      </h1>
      <p class="text-stone-500 hidden md:block mt-2">
        Overview of your account details.
      </p>
    </header>

    <!-- Profile Card -->
    <main class="flex justify-center">
      <div
        class="bg-stone-200 rounded-2xl shadow-lg border border-stone-200 p-6 md:p-8 max-w-xl w-full"
      >
        <!-- Avatar -->
        <div
          class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-800 text-2xl font-serif font-bold text-stone-100"
        >
          {user.user.userName?.charAt(0).toUpperCase()}
        </div>

        <h2 class="text-center font-serif text-2xl italic font-bold text-stone-900">
          {user.user.userName}
        </h2>

        <p class="mt-1 text-center text-sm text-stone-500">
          {user.user.email}
        </p>

        <div class="mt-6 space-y-3">
          <div class="flex justify-between rounded-lg bg-stone-100 px-4 py-2">
            <span class="text-stone-500 text-sm">User ID</span>
            <span class="font-medium text-stone-800 text-sm">
              {user.user.id}
            </span>
          </div>

          <div class="flex justify-between rounded-lg bg-stone-100 px-4 py-2">
            <span class="text-stone-500 text-sm">Points</span>
            <span class="font-medium text-stone-800 text-sm">
              {user.user.points}
            </span>
          </div>
        </div>

        <div class="mt-6 flex gap-3">
          <a
            href="/users"
            class="flex-1 rounded-full bg-stone-300 py-2 text-center text-sm font-bold text-stone-700 hover:bg-stone-400"
          >
            Back
          </a>

          <button
            class="flex-1 rounded-full bg-green-700 py-2 text-sm font-bold text-white hover:bg-green-600"
          >
            Edit profile
          </button>

          <button
            class="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
            on:click={() => (showLogoutConfirm = true)}
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  </div>
  <LogoutModal
    open={showLogoutConfirm}
    title="Log out?"
    message="Are you sure you want to log out?"
    confirmText="Log out"
    cancelText="Cancel"
    onConfirm={() => {
      showLogoutConfirm = false;
      logout();
    }}
    onCancel={() => (showLogoutConfirm = false)}
  />
{:else}
  <div class="flex min-h-screen items-center justify-center text-stone-400">
    Loading user profile…
  </div>
{/if}
