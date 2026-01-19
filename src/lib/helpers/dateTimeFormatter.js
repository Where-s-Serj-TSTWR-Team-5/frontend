/**
 * @fileoverview Reusable date and time formatting utilities.
 */

/**
 * Validates if the input can be successfully converted to a Date object.
 * @param {string | Date | number | null | undefined} dateInput The date-time value.
 * @returns {boolean} True if the date is valid.
 */
function isValidDate(dateInput) {
  if (!dateInput) return false;
  const date = new Date(dateInput);
  // Check for NaN resulting from invalid date string, and ensure it's not 'Invalid Date' object.
  // @ts-ignore
  return date instanceof Date && !isNaN(date);
}

/**
 * Formats a date for HTML <input type="date"> (YYYY-MM-DD).
 */
export function formatForDateInput(dateInput) {
  if (!isValidDate(dateInput)) return '';
  const d = new Date(dateInput);
  return d.toISOString().split('T')[0];
}

/**
 * Formats a time for HTML <input type="time"> (HH:MM).
 */
export function formatForTimeInput(dateInput) {
  if (!isValidDate(dateInput)) return '';
  const d = new Date(dateInput);
  return d.toISOString().split('T')[1].substring(0, 5);
}

/**
 * Formats a date for a compact card display (e.g., "Dec 16").
 * @param {string | Date | number | null | undefined} dateInput The date-time value (date, startAt, etc.).
 * @param {string} fallback The string to return if the date is invalid or missing.
 * @returns {string} The formatted date string.
 */
export function formatCardDate(dateInput, fallback = 'Date TBD') {
  if (!isValidDate(dateInput)) return fallback;

  try {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
    }).format(new Date(dateInput));
  } catch (e) {
    console.error('formatCardDate error:', e);
    return 'Invalid Date';
  }
}

/**
 * Formats a date for a full display (e.g., "Tuesday, December 16, 2025").
 * @param {string | Date | number | null | undefined} dateInput The date-time value.
 * @param {string} fallback The string to return if the date is invalid or missing.
 * @returns {string} The formatted date string.
 */
export function formatFullDate(dateInput, fallback = 'Date TBD') {
  if (!isValidDate(dateInput)) return fallback;

  try {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateInput));
  } catch (e) {
    console.error('formatFullDate error:', e);
    return 'Invalid Date';
  }
}

/**
 * Formats a time (e.g., "5:11 PM" or "17:11").
 * Note: Assumes dateInput is a full ISO datetime string or similar, but
 * the options only extract the time component.
 * @param {string | Date | number | null | undefined} dateInput The date-time value.
 * @param {string} fallback The string to return if the time is invalid or missing.
 * @returns {string} The formatted time string.
 */
export function formatTime(dateInput, fallback = 'Time TBD') {
  if (!isValidDate(dateInput)) return fallback;

  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // Use 12-hour clock (e.g., 5:11 PM)
    }).format(new Date(dateInput));
  } catch (e) {
    console.error('formatTime error:', e);
    return 'Invalid Time';
  }
}

/**
 * Formats a date and time together (e.g., "Dec 16, 2025, 5:11 PM").
 * @param {string | Date | number | null | undefined} dateInput The date-time value.
 * @param {string} fallback The string to return if the value is invalid or missing.
 * @returns {string} The formatted date-time string.
 */
export function formatDateTime(dateInput, fallback = 'Date/Time TBD') {
  if (!isValidDate(dateInput)) return fallback;

  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(dateInput));
  } catch (e) {
    console.error('formatDateTime error:', e);
    return 'Invalid Date/Time';
  }
}