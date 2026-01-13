import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function GET() {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/rewards`);
    if (!res.ok) throw new Error('Failed to fetch rewards');

    const data = await res.json();

    return json(
      data.map((r: any) => ({
        id: String(r.id),
        title: r.title,
        description: r.description,
        thumbnail: r.thumbnail,
        requiredPoints: r.requiredPoints,
      }))
    );
  } catch (err) {
    console.error('Frontend rewards fetch failed:', err);
    return json({ message: 'Internal Error' }, { status: 500 });
  }
}
