'use client';

import { useTheme } from 'next-themes';

const themes = [
  { value: 'amber', label: 'Amber' },
  { value: 'blue', label: 'Blue' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme ?? 'amber'}
      onChange={(e) => setTheme(e.target.value)}
      className="h-9 w-20 sm:w-32 rounded-lg border border-primary-200 bg-background px-2 text-xs sm:text-sm outline-none focus:border-primary-500"
    >
      {themes.map((theme) => (
        <option key={theme.value} value={theme.value}>
          {theme.label}
        </option>
      ))}
    </select>
  );
}
