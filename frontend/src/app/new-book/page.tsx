import NewBookComponent from '@/components/appComponent/newBookComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Book',
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewBook() {
  return <NewBookComponent />;
}
