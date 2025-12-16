import { getData } from "$lib/helpers/ajaxhelper.js";
import { PUBLIC_API_URL } from "$env/static/public";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
  const token = cookies.get('token');
  console.log('Layout load function called. Token:', token);

  if (!token) {
    throw redirect(302, '/login'); // redirect if not logged in
  }

  try {
    const user = await getData(`${PUBLIC_API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const events = await getData(`${PUBLIC_API_URL}/events/`, {
      headers: { Authorization: `Bearer ${token}` } // if needed
    });

    return { user, events };
  } catch (err) {
    throw error(500, 'Failed to load dashboard data');
  }
};
