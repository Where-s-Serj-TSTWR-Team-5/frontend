import { writable } from "svelte/store";
import { PUBLIC_API_URL } from "$env/static/public";

export const events = writable([]);

export function setEvents(initialEvents) {
  events.set(initialEvents);
}

export async function toggleRegistration(eventId, token) {
  if (!token) return;

  try {
    const res = await fetch(`${PUBLIC_API_URL}/events/toggleRegistration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId }),
    });

    if (!res.ok) throw new Error("Failed to toggle registration");

    const result = await res.json();

    events.update(evts =>
      evts.map(e => {
        if (e.id === eventId) {
          return {
            ...e,
            currentParticipants: e.currentParticipants + (result.registered ? 1 : -1),
            isRegistered: result.registered,
          };
        }
        return e;
      })
    );
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
  }
}