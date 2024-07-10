import { type ClassValue, clsx } from "clsx";
import { eachDayOfInterval, endOfMonth, startOfMonth, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get all dates in a given month and year.
 *
 * @param {number} month - The month for which to get the dates (0-indexed, January is 0).
 * @param {number} year - The year for which to get the dates.
 * @returns {Date[]} An array of Date objects for each day in the specified month and year.
 */

export const getDatesInMonth = (month: number, year: number): Date[] => {
  const startDate = startOfMonth(new Date(year, month));
  const endDate = endOfMonth(startDate);
  return eachDayOfInterval({ start: startDate, end: endDate });
};

/**
 * Get the day of the week as a string.
 *
 * @param {Date} date - The date object from which to get the day of the week.
 * @returns {string} The day of the week (e.g., 'Monday').
 */

export const getDayOfWeek = (date: Date): string => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
};

/**
 *
 * @returns {string[]} An array of date strings
 */
export const getLastSevenDays = (): string[] => {
  const today = new Date();

  // Get the date 7 days ago
  const startDate = subDays(today, 6);

  // Get the last 7 dates
  const last7Dates = eachDayOfInterval({ start: startDate, end: today });

  // Format the dates as needed
  const formattedDates = last7Dates.map((date) => date.toDateString());

  return formattedDates;
};
