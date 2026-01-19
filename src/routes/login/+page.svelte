<script lang="ts">
 import { goto } from '$app/navigation';
 import '../../app.css';
  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleLogin() {
    loading = true;
    error = '';

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.message || 'Login failed';
        return;
      }

    await goto('/'); 

    } catch {
      error = 'Something went wrong';
    } finally {
      loading = false;
    }
  }
</script>

<section class="bg-stone-100 min-h-screen min-w-screen">
  <div class="max-w-3xl mx-auto w-full min-h-screen flex items-center justify-center bg-stone-100 px-6">
    <form
      on:submit|preventDefault={handleLogin}
      class="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6 border border-stone-200"
    >
      <h1 class="font-serif text-4xl italic font-bold text-stone-900 text-center">
        Welcome Back
      </h1>
      <p class="text-stone-500 text-center">
        Sign in to continue to the Food Forest
      </p>

      <div class="flex flex-col space-y-2">
        <label class="font-serif font-semibold text-stone-700" for="email">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          placeholder="you@example.com"
          required
          class="p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="font-serif font-semibold text-stone-700" for="password">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="********"
          required
          class="p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {#if error}
        <p class="text-red-500 text-sm text-center">{error}</p>
      {/if}

      <button
        type="submit"
        class="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Login'}
      </button>

      <p class="text-sm text-center text-stone-500">
        Don't have an account?
        <a href="/register" class="text-green-600 hover:underline">Sign up</a>
      </p>
    </form>
  </div>
</section>
