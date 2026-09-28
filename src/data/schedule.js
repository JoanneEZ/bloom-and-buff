// ─────────────────────────────────────────────
// Bloom & Buff — schedule helpers
// Work week: Mon–Fri, 9 AM – 2 PM
// ─────────────────────────────────────────────

// Time slots (hourly, last appointment at 1 PM so we close at 2 PM)
export const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
];

// Get Monday–Friday of the current week
export function getCurrentWeekDays() {
  const today = new Date();
  const dow = today.getDay(); // 0 = Sun, 1 = Mon, ... 6 = Sat

  // Offset to this week's Monday
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const days = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}

// "Mon", "Tue", …
export function formatDayShort(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

// "14"
export function formatDayNumber(date) {
  return date.getDate();
}

// "Monday, September 22, 2026"
export function formatFullDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// True if the date is before today
export function isPast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d < today;
}

// True if the date is today
export function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}