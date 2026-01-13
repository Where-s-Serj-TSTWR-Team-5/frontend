import { getData } from '$lib/helpers/ajaxhelper.js';
import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load = async ({ params, parent, fetch }) => {
  // Get logged-in user from layout
  const { user: loggedInUser, token } = await parent();

  const { id } = params;

  try {
    const profileUser = await getData(`${PUBLIC_API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` } // pass token from layout
    });

    return { loggedInUser, profileUser };
  } catch (err) {
    throw error(500, 'Failed to load profile user');
  }
};
