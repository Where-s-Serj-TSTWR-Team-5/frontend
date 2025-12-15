import { getData } from "$lib/helpers/ajaxhelper.js";
import { PUBLIC_API_URL } from "$env/static/public";
import { error } from "@sveltejs/kit";

/**
 * Function to load appointments
 * @returns 
 */
export const load = async () => {
    try {
        const events = await getData(`${PUBLIC_API_URL}/events/`);
        return { events };
    } catch (err) {
        throw error(500, 'Failed to load events');
    }
};