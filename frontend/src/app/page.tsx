import DashBoardContent from '@/components/contents/dashboardContent';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Personal Book Tracker',
  applicationCategory: 'Book Management',
  operatingSystem: 'Web',
  description:
    'Track your reading progress, organize books, and manage your personal library.',
  author: {
    '@type': 'Person',
    name: 'Lingadharan Jayakumar',
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="personal-book-tracker-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DashBoardContent />
    </>
  );
}
