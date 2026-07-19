import UpdateBook from '@/components/appComponent/updateBookComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Book',
  alternates: {
    canonical: '/update-book',
  },
};

export default function UpdateBookPage() {
  return <UpdateBook />;
}
