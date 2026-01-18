import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function POST({ params, fetch, cookies }) {
  const token = cookies.get('token');
  if (!token) throw error(401, 'Not authenticated');

  const res = await fetch(`${PUBLIC_API_URL}/plants/${params.id}/watered-today`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  // If your backend ever returns 204, pass it through cleanly
  if (res.status === 204) {
    return new Response(null, { status: 204 });
  }

  const body = await res.text(); // forward whatever backend returns
  return new Response(body, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' }
  });
}
