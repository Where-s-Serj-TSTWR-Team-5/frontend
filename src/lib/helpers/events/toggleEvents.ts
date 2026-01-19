import { writable } from 'svelte/store';
import { PUBLIC_API_URL } from '$env/static/public';

export const events = writable([]);

export async function toggleRegistration(eventId, token) {
  if (!token) return;

  try {
    const res = await fetch(`${PUBLIC_API_URL}/events/toggleRegistration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId }),
    });

    if (!res.ok) throw new Error('Failed to toggle registration');

    return await res.json();
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please try again.');
  }
}