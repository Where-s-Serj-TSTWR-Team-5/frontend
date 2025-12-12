import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const res = await fetch('http://localhost:3020/plants');
        if (!res.ok) {
             return json([], { status: res.status });
        }

        const data = await res.json();
        const plants = data.data;
        return json(plants);
    } catch (err) {
        console.error(err);
        return json([], { status: 500 });
    }
};