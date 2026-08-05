import type { Metadata } from 'next';
import './globals.css';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import { AuthContextProvider } from '@/context/authContext';
import Header from '@/components/header';
import Tags from '@/components/tags';

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
  metadataBase: new URL('https://personal-book-tracker-henna.vercel.app/'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body>
        <AuthContextProvider>
          <div className="min-h-full flex flex-col bg-amber-100">
            <header>
              <Header />
            </header>
            <Tags />
            {children}
          </div>
        </AuthContextProvider>
        <Toaster position="top-right" richColors duration={3000} />
      </body>
    </html>
  );
}
