'use client';

import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={(val) => setTheme(val!)}>
      <SelectTrigger className="w-20 sm:w-32 h-9 text-xs sm:text-sm border-primary-200 bg-background">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="amber">Amber</SelectItem>
        <SelectItem value="blue">Blue</SelectItem>
        <SelectItem value="emerald">Emerald</SelectItem>
        <SelectItem value="yellow">Yellow</SelectItem>
        <SelectItem value="green">Green</SelectItem>
      </SelectContent>
    </Select>
  );
}
