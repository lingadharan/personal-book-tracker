import type { Metadata } from 'next';
import './globals.css';
import { GlobalBookContextProvider } from '@/context/bookContext';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Personal Book Tracker',
    template: '%s | Personal Book Tracker',
  },
  description:
    'Track your reading progress, organize your books, and manage your personal reading journey.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Personal Book Tracker',
    description:
      'Track your reading progress, organize your books, and manage your personal reading journey.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Book Tracker',
    description:
      'Track your reading progress, organize your books, and manage your personal reading journey.',
  },
  keywords: [
    'book tracker',
    'reading tracker',
    'personal library',
    'reading progress',
    'book management',
    'reading journal',
  ],
  authors: [
    { name: 'Lingadharan Jayakumar', url: 'https://github.com/lingadharan' },
  ],
  metadataBase: new URL('http://localhost:3000/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body>
        <GlobalBookContextProvider>{children}</GlobalBookContextProvider>
        <Toaster position="top-right" richColors duration={3000} />
      </body>
    </html>
  );
}
