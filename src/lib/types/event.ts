export const EVENT_CATEGORIES = {
  SUSTAINABILITY: "SUSTAINABILITY",
  GARDENING: "GARDENING",
  WORKSHOP: "WORKSHOP",
  CLEAN_UP: "CLEAN_UP",
} as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[keyof typeof EVENT_CATEGORIES];

export function categoryName(category) {
  switch (category) {
    case "SUSTAINABILITY": return "🌱Sustainability";
    case "GARDENING": return "🌹Gardening";
    case "WORKSHOP": return "🔨Workshops";
    case "CLEAN_UP": return "🗑️Clean-up";
  }
  return 'All';
}
