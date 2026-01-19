<svelte:head>
  <title>Food Forest</title>
</svelte:head>

<script lang="ts">
  import '../../app.css';

  import { page } from '$app/stores'; 
  import { 
    House,
    Trophy, 
    Calendar, 
    ShoppingBag,
    Leaf 
  } from 'lucide-svelte';

  // Define navigation items
  const navItems = [
    { href: '/', icon: House, label: 'Home' },
    { href: '/plants', icon: Leaf, label: 'Plants' },
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/ranks', icon: Trophy, label: 'Ranks' },
    { href: '/shop', icon: ShoppingBag, label: 'Shop' },
  ];

  interface Props {
    children?: import('svelte').Snippet;
  }
  const { children }: Props = $props();

  function isActive(href: string) {
    return $page.url.pathname === href;
  }

  const currentUser = $page.data?.user;
</script>

<nav class="sticky top-0 z-50 bg-white shadow-md border-b border-stone-100 hidden md:block">
  <div class="max-w-7xl mx-auto flex items-center h-16 px-6">
    
    <div class="flex items-center space-x-2">
      <Leaf class="w-7 h-7 text-green-700 fill-green-500" />
      <span class="text-xl font-extrabold text-stone-900 hidden lg:block">Fruit Forest</span>
    </div>

    <div class="flex space-x-1 lg:space-x-2 ms-auto mr-8">
      {#each navItems as item}
        <a 
          href={item.href}
          class="flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors 
                {isActive(item.href) ? 'bg-green-100 text-green-700' : 'text-stone-600 hover:bg-stone-100'}"
        >
          {#if item.icon}
            <item.icon class="w-5 h-5 mr-1" />
          {/if}
          {item.label}
        </a>
      {/each}
    </div>

    {#if currentUser}
      <a
        href={`/users/${currentUser.id}`}
        class="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm border-2 border-green-700 hover:bg-green-500 transition"
        title={currentUser.userName}
      >
        {currentUser.userName.charAt(0).toUpperCase()}
      </a>
    {/if}

    </div>
  </nav>

<div class="max-w-7xl mx-auto w-full">
  {@render children?.()}
</div>

<nav class="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-stone-200 shadow-xl flex justify-around items-center z-50 md:hidden">
  {#each navItems as item}
    <a 
      href={item.href}
      class="flex flex-col items-center justify-center p-1 w-full h-full transition-colors 
             {isActive(item.href) ? 'text-green-700' : 'text-stone-500 hover:text-stone-700'}"
    >
      {#if item.icon}
        <item.icon class="w-6 h-6" />
      {/if}
      <span class="text-[10px] font-medium mt-0.5">{item.label}</span>
    </a>
  {/each}
</nav>
