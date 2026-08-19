'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import useClickOutside from '@/hooks/useClickOutside';
import DropdownArrowIcon from '@/utiles/svg/dropDownArrowIcon';

const themes = [
  { value: 'amber', label: 'Amber' },
  { value: 'blue', label: 'Blue' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const selectedTheme =
    themes.find((item) => item.value === theme) ?? themes[0];

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className="h-9 w-20 sm:w-32 rounded-lg border border-primary-200 bg-background px-3 flex items-center text-xs sm:text-sm">
        Amber
      </div>
    );
  }
  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex h-9 items-center justify-center rounded-lg border border-transparent bg-primary-600 px-3 py-2 text-xs font-medium leading-5 text-white shadow-sm outline-none hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 sm:px-4 sm:text-sm"
      >
        {selectedTheme.label}

        <DropdownArrowIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-primary-200 bg-background shadow-lg">
          <ul
            className="p-2 text-sm font-medium text-foreground"
            role="listbox"
            aria-label="Select theme"
          >
            {themes.map((item) => (
              <li key={item.value}>
                <button
                  type="button"
                  onClick={() => handleThemeChange(item.value)}
                  role="option"
                  aria-selected={theme === item.value}
                  className={`inline-flex w-full items-center rounded-md p-2 text-left hover:bg-primary-100 hover:text-primary-700 ${
                    theme === item.value
                      ? 'bg-primary-100 text-primary-700'
                      : ''
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
