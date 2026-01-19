// src/routes/plants/[id]/+page.server.js
import { getData } from '$lib/helpers/ajaxhelper.js';
import { PUBLIC_API_URL } from '$env/static/public';
import { error, redirect, fail } from '@sveltejs/kit';

export const load = async ({ cookies, params }) => {
  const token = cookies.get('token');
  const plantId = params.id;

  if (!token) throw redirect(302, '/login');

  try {
    const user = await getData(`${PUBLIC_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const rawPlant = await getData(`${PUBLIC_API_URL}/plants/${plantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const plant = rawPlant?.data ?? rawPlant;

    const rawOwnerHistory = await getData(`${PUBLIC_API_URL}/plants/${plantId}/owner-history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const ownerHistory = rawOwnerHistory?.data ?? rawOwnerHistory;

    return { user, plant, ownerHistory, token };
  } catch (err) {
    console.error('❌ Plant page load failed:', err);
    throw error(500, err?.message ?? 'Failed to load plant data');
  }
};

export const actions = {
  delete: async ({ cookies, params, fetch }) => {
    const token = cookies.get('token');
    if (!token) throw redirect(302, '/login');

    const res = await fetch(`${PUBLIC_API_URL}/plants/${params.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.status === 204) {
      throw redirect(303, '/plants?deleted=1');
    }

    return fail(res.status, { message: 'Delete failed' });
  },

  // ✅ NEW: watered today
  wateredToday: async ({ cookies, params, fetch }) => {
    const token = cookies.get('token');
    if (!token) throw redirect(302, '/login');

    const res = await fetch(`${PUBLIC_API_URL}/plants/${params.id}/watered-today`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      return fail(res.status, { message: 'Watering failed' });
    }

    // reload same page so waterLevel updates in UI
    throw redirect(303, `/plants/${params.id}?watered=1`);
  }
};
