<script>
  export let data;
  const { user } = data;
</script>

{#if user?.success}
  <div class="max-w-4xl mx-auto w-full px-6 pb-12">
    <!-- Header -->
    <header class="pt-8 pb-6 md:pb-10">
      <h1 class="font-serif text-4xl md:text-5xl italic font-bold text-stone-900">
        Profile
      </h1>
      <p class="text-stone-500 hidden md:block mt-2">
        Overview of your account details.
      </p>
    </header>

    <!-- Profile Card -->
    <main>
      <div
        class="bg-stone-200 rounded-2xl shadow-lg border border-stone-200 p-6 md:p-8 max-w-xl"
      >
        <!-- Avatar -->
        <div
          class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-800 text-2xl font-serif font-bold text-stone-100"
        >
          {user.user.userName?.charAt(0).toUpperCase()}
        </div>

        <!-- Name -->
        <h2
          class="text-center font-serif text-2xl italic font-bold text-stone-900"
        >
          {user.user.userName}
        </h2>

        <!-- Email -->
        <p class="mt-1 text-center text-sm text-stone-500">
          {user.user.email}
        </p>

        <!-- Info -->
        <div class="mt-6 space-y-3">
          <div
            class="flex justify-between rounded-lg bg-stone-100 px-4 py-2"
          >
            <span class="text-stone-500 text-sm">User ID</span>
            <span class="font-medium text-stone-800 text-sm">
              {user.user.id}
            </span>
          </div>

          <div
            class="flex justify-between rounded-lg bg-stone-100 px-4 py-2"
          >
            <span class="text-stone-500 text-sm">Points</span>
            <span class="font-medium text-stone-800 text-sm">
              {user.user.points}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex gap-3">
          <a
            href="/users"
            class="flex-1 rounded-full bg-stone-300 py-2 text-center text-sm font-bold text-stone-700 transition hover:bg-stone-400"
          >
            Back
          </a>

          <button
            class="flex-1 rounded-full bg-green-700 py-2 text-sm font-bold text-white transition hover:bg-green-600"
          >
            Edit profile
          </button>
        </div>
      </div>
    </main>
  </div>
{:else}
  <div class="flex min-h-screen items-center justify-center text-stone-400">
    Loading user profile…
  </div>
{/if}
