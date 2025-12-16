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

        // Extract and combine date/time fields into ISO strings
        const startDate = data.get('startDate');
        const startTime = data.get('startTime');
        const endTime = data.get('endTime');

        const startAt =
            startDate && startTime
                ? `${startDate}T${startTime}:00Z`
                : null;
        const endAt =
            startDate && endTime
                ? `${startDate}T${endTime}:00Z`
                : null;

        // Construct the final payload based on the component's formData structure and API expectation (guessed from old code)
        const eventData = {
            title: data.get('title'),
            description: data.get('description'),
            thumbnail: data.get('thumbnailUrl'), // Renamed from thumbnailUrl
            banner: data.get('bannerUrl'), // Renamed from bannerUrl
            location: data.get('location'),
            startAt: startAt, // Combined date and time
            endAt: endAt, // Combined date and time
            studyPoints: Number(data.get('studyPoints')),
            points: Number(data.get('points')), // Renamed from xp
            maxParticipants: Number(data.get('maxParticipants')),
        };

        const response = await fetch(`${PUBLIC_API_URL}/events/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData),
        });

        if (response.ok) {
            return { success: true };
        }

        // You might want to extract error details from the response body for better debugging/feedback
        return { error: 'API request failed.' };
    },
};