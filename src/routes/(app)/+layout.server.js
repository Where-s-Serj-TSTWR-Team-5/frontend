import { getData } from "$lib/helpers/ajaxhelper.js";
import { PUBLIC_API_URL } from "$env/static/public";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ cookies, params, fetch }) => {
  const token = cookies.get('token');

  if (!token) {
    throw redirect(302, '/login');
  }

  try {
    const user = await getData(`${PUBLIC_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const events = await getData(`${PUBLIC_API_URL}/events/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const eventLabels = await getData(`${PUBLIC_API_URL}/events/labels`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return { user, events, token, eventLabels };
  } catch (err) {
    throw error(500, 'Failed to load dashboard data');
  }
};
