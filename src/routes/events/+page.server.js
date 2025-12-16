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

export const actions = {
    create: async ({ request, fetch }) => {
        const data = await request.formData();

        const eventData = {
            title: data.get('title'),
            subtitle: data.get('subtitle'),
            description: data.get('description'),
            category: data.get('category'),
            date: data.get('date'),
            time: data.get('time'),
            location: data.get('location'),
            xp: Number(data.get('xp')),
            studyPoints: Number(data.get('studyPoints')),
            imageUrl: data.get('imageUrl'),
        };

        const response = await fetch(`${PUBLIC_API_URL}/events/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData),
        });

        if (response.ok) {
            return { success: true };
        }
        
        return { error: 'API request failed.' };
    },
};