// src/routes/plants/[id]/+page.server.ts
import { getData } from '$lib/helpers/ajaxhelper.js';
import { PUBLIC_API_URL } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ cookies, params }) => {
  const token = cookies.get('token');
  const plantId = params.id;

  if (!token) {
    throw redirect(302, '/login');
  }

  try {
    const user = await getData(`${PUBLIC_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Plant detail
    const plant = await getData(`${PUBLIC_API_URL}/plants/${plantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    /**
     * Optional:
     * If you have a PlantedPlants endpoint, fetch it here so we can check ownerID.
     * Example (change to your real endpoint):
     *
     * const plantedPlant = await getData(`${PUBLIC_API_URL}/plantedplants/by-plant/${plantId}`, {
     *   headers: { Authorization: `Bearer ${token}` }
     * });
     */

    return { user, plant, token };
  } catch (err) {
    throw error(500, 'Failed to load plant data');
  }
};
