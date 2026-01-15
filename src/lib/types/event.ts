export const EVENT_CATEGORIES = {
  SUSTAINABILITY: "SUSTAINABILITY",
  GARDENING: "GARDENING",
  WORKSHOP: "WORKSHOP",
  CLEAN_UP: "CLEAN_UP",
} as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[keyof typeof EVENT_CATEGORIES];

export const EVENT_FILTERS = [
  "All",
  ...Object.values(EVENT_CATEGORIES).map((category) => {
    switch (category) {
      case "SUSTAINABILITY": return "Sustainability";
      case "GARDENING": return "Gardening";
      case "WORKSHOP": return "Workshops";
      case "CLEAN_UP": return "Clean-up";
    }
  })
] as const;

export type EventFilter = typeof EVENT_FILTERS[number];