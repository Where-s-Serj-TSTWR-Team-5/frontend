import { getData } from "$lib/helpers/ajaxhelper.js";
import { PUBLIC_API_URL } from "$env/static/public";

/**
 * Function to load appointments
 * @returns 
 */
export const load = async ({ params, fetch }) => {
    const { id } = params;

    const event = await getData(`${PUBLIC_API_URL}/events/${id}`, fetch);

    return { event };
};