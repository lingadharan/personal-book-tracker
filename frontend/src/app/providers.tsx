'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { DEFAULT_THEME, THEME_VALUES } from '@/utiles/constants';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={DEFAULT_THEME}
      enableSystem={false}
      value={THEME_VALUES}
    >
      {children}
    </NextThemesProvider>
  );
}
