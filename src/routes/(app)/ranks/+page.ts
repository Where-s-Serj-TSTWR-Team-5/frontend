import { PUBLIC_API_URL } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    try {
        const response = await fetch(`${PUBLIC_API_URL}/users`);
        
        if (response.ok) {
            const result = await response.json();
            // We need 'result.data' because that's where the users are!
            // We also sort them so the person with most points is #1
            const sortedUsers = result.data.sort((a, b) => b.points - a.points);
            
            return {
                leaders: sortedUsers.map((user, index) => ({
                    rank: index + 1,
                    name: user.userName,
                    points: user.points,
                    initial: user.userName.charAt(0).toUpperCase()
                }))
            };
        }
    } catch (error) {
        console.error("Backend error:", error);
    }
    return { leaders: null };
}