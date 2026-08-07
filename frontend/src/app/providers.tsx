'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="amber"
      enableSystem={false}
      value={{
        amber: 'amber',
        blue: 'blue',
        emerald: 'emerald',
        yellow: 'yellow',
        green: 'green',
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
