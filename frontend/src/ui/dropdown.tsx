'use client';

import useClickOutside from '@/hooks/useClickOutside';
import DropdownArrowIcon from '@/utiles/svg/dropDownArrowIcon';
import { useRef, useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  width?: string;
}

export default function Dropdown({
  value,
  options,
  onChange,
  width = 'w-40',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${width}`}>
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex h-9 w-full items-center justify-between rounded-lg border border-transparent bg-primary-500 px-3 py-2 text-sm font-medium leading-5 text-white shadow-sm outline-none transition-colors hover:bg-primary-700 focus:ring-4 focus:ring-primary-200"
      >
        <span className="truncate">{selectedOption?.label ?? 'Select'}</span>

        <DropdownArrowIcon isOpen={isOpen} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-lg border border-primary-200 bg-background shadow-lg">
          <ul
            className="p-2 text-sm font-medium text-foreground"
            role="listbox"
          >
            {options.map((option) => {
              const active = option.value === value;

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => handleSelect(option.value)}
                    className={`inline-flex w-full items-center rounded-md p-2 text-left transition-colors hover:bg-primary-100 hover:text-primary-700 ${
                      active
                        ? 'bg-primary-100 font-semibold text-primary-700'
                        : ''
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
