import { PUBLIC_API_URL } from "$env/static/public";
import { fail } from "@sveltejs/kit";

export const actions = {
    create: async ({ request, fetch }) => {
        const data = await request.formData();
        const eventData = mapFormDataToPayload(data);

        const response = await fetch(`${PUBLIC_API_URL}/events/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData),
        });

        if (response.ok) return { success: true };
        return fail(response.status, { error: 'Failed to create event' });
    },

    // NEW UPDATE ACTION
    update: async ({ request, fetch }) => {
        const data = await request.formData();
        const id = data.get('id'); // Ensure your form has <input type="hidden" name="id" value={event.id} />

        if (!id) return fail(400, { error: 'Missing event ID' });

        const eventData = mapFormDataToPayload(data);

        const response = await fetch(`${PUBLIC_API_URL}/events/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData),
        });

        if (response.ok) {
            return { success: true };
        }

        const errorData = await response.json().catch(() => ({}));
        return fail(response.status, { error: errorData.message || 'Update failed' });
    },
};

/**
 * Helper to avoid repeating the date/payload logic
 */
function mapFormDataToPayload(data) {
    const date = data.get('date');
    const startAtData = data.get('startAt');
    const endAtData = data.get('endAt');

    const startAt = date && startAtData ? `${date}T${startAtData}:00Z` : null;
    const endAt = date && endAtData ? `${date}T${endAtData}:00Z` : null;

    return {
        title: data.get('title'),
        description: data.get('description'),
        thumbnail: data.get('thumbnailUrl'),
        banner: data.get('bannerUrl'),
        location: data.get('location'),
        date: data.get('date'),
        startAt: startAt,
        endAt: endAt,
        studyPoints: Number(data.get('studyPoints')),
        points: Number(data.get('points')),
        maxParticipants: Number(data.get('maxParticipants')),
    };
}