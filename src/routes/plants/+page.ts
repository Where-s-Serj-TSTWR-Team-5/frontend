// src/routes/plants/page.ts
import type { PageLoad } from './$types';
import type { Plant } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/plants');
  if (!res.ok) return { plants: [] };

  const plants: Plant[] = await res.json();
  return { plants };
};