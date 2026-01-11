import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function GET({ cookies }) {
  const token = cookies.get('token');
  if (!token) return json({ error: 'Not authenticated' }, { status: 401 });

  const res = await fetch(`${PUBLIC_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  if (!res.ok) {
    return json(
      { error: data.message || 'Failed to fetch user' },
      { status: res.status }
    );
  }

  return json({
    points: data.points,
    purchasedRewards: data.purchasedRewards || [],
  });
}

export async function POST({ request, cookies }) {
  const token = cookies.get('token');
  if (!token) return json({ error: 'Not authenticated' }, { status: 401 });

  const { rewardId } = await request.json();

  const res = await fetch(`${PUBLIC_API_URL}/users/purchase`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rewardId }),
  });

  const data = await res.json();

  if (!res.ok) {
    return json(
      { error: data.message || 'Purchase failed' },
      { status: res.status }
    );
  }

  return json({
    points: data.points,
    purchasedRewards: data.purchasedRewards || [],
  });
}
