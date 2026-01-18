import { PUBLIC_API_URL } from '$env/static/public';
import { fail } from '@sveltejs/kit';
import { getData } from '$lib/helpers/ajaxhelper.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
  const token = cookies.get('token');
  if (!token) throw redirect(302, '/login');

  try {
    const rawPlants = await getData(`${PUBLIC_API_URL}/plants`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // normalize: support either { data: [...] } or [...]
    const plants = rawPlants?.data ?? rawPlants ?? [];

    return { plants };
  } catch (err) {
    console.error('❌ Failed to load plants:', err);
    throw error(500, err?.message ?? 'Failed to load plants');
  }
};

export const actions = {
  create: async ({ request, fetch, cookies }) => {
    const token = cookies.get('token');
    if (!token) return fail(401, { error: 'Not authenticated' });

    const data = await request.formData();
    const plantData = mapFormDataToPayload(data);

    const response = await fetch(`${PUBLIC_API_URL}/plants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(plantData)
    });

    if (response.ok) return { success: true };

    const errorData = await response.json().catch(() => ({}));
    return fail(response.status, { error: errorData.message || 'Failed to create plant' });
  },

  update: async ({ request, fetch, cookies }) => {
    const token = cookies.get('token');
    if (!token) return fail(401, { error: 'Not authenticated' });

    const data = await request.formData();
    const id = data.get('id');
    if (!id) return fail(400, { error: 'Missing plant ID' });

    const plantData = mapFormDataToPayload(data);

    const response = await fetch(`${PUBLIC_API_URL}/plants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(plantData)
    });

    if (response.ok) return { success: true };

    const errorData = await response.json().catch(() => ({}));
    return fail(response.status, { error: errorData.message || 'Update failed' });
  }
};

function mapFormDataToPayload(data) {
  return {
    name: data.get('name'),
    scientificName: data.get('scientificName'),
    description: data.get('description'),
    image: data.get('image'),
    plantTypeID: Number(data.get('plantTypeID'))
  };
}
