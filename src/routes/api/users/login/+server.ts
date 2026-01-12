import { json } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';

export async function POST({ request, cookies }) {
  const { email, password } = await request.json();

  const res = await fetch(`${PUBLIC_API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    return json({ message: data.message || 'Invalid credentials' }, { status: res.status });
  }

  cookies.set('token', data.token, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: import.meta.env.PROD,
    maxAge: 60 * 60 * 24
  });

  return json({ success: true });
}
