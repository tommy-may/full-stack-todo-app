import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const dateToString = (date: Date = new Date()) =>
  date.toLocaleDateString('en-Gb', { weekday: 'long', day: '2-digit', month: 'long' });
