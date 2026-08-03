'use client';
import { useRouter } from 'next/navigation';

import { useBookContext } from '@/context/bookContext';
import { Book, SelectedTag } from '@/types/interfaces';

import {
  FAVOURITE_BOOK_CONTENT_HEAD,
  INTEREST_BOOK_CONTENT_HEAD,
  READ_CONTENT_HEAD,
  READING_CONTENT_HEAD,
} from '@/utiles/constants';

import handleDeleteButton from '@/utiles/deleteBookDetails';
import { toast } from 'sonner';

type TableConfig = {
  headers: string[];
  extraColumn: (book: Book) => string | number;
};

const TABLE_CONFIG: Record<Exclude<SelectedTag, 'Overview'>, TableConfig> = {
  'Currently Reading': {
    headers: READING_CONTENT_HEAD,
    extraColumn: (book) => book.currentPage ?? 0,
  },
  'Completed Books': {
    headers: READ_CONTENT_HEAD,
    extraColumn: (book) => book.durationToComplete ?? 'N/A',
  },
  Wishlist: {
    headers: INTEREST_BOOK_CONTENT_HEAD,
    extraColumn: (book) => book.suggestedBy ?? 'Unknown',
  },
  'Favorite Books': {
    headers: FAVOURITE_BOOK_CONTENT_HEAD,
    extraColumn: (book) => book.readStatus ?? 'Plan to Read',
  },
};

const CATEGORY_MAP: Record<Exclude<SelectedTag, 'Overview'>, string> = {
  'Currently Reading': 'reading',
  'Completed Books': 'read',
  Wishlist: 'interest',
  'Favorite Books': 'favourite',
};

export default function Table() {
  const router = useRouter();
  const { allBookDetails, setSelectedTag, selectedTag } = useBookContext();

  if (selectedTag === 'Overview') return null;

  const config = TABLE_CONFIG[selectedTag];

  const books = allBookDetails.filter(
    (book) => CATEGORY_MAP[selectedTag] === book.category
  );

  console.log('selectedTag: ', selectedTag);

  return (
    <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-amber-100">
          <tr>
            {config.headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-center text-sm font-semibold text-amber-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {books.length === 0 ? (
            <tr>
              <td
                colSpan={config.headers.length}
                className="py-8 text-center text-gray-500"
              >
                No books found.
              </td>
            </tr>
          ) : (
            books.map((book, index) => (
              <tr
                key={book._id}
                className="border-b hover:bg-amber-50 transition-colors"
              >
                <td className="px-4 py-3 text-center">{index + 1}</td>

                <td className="px-4 py-3 text-center">{book.title}</td>

                <td className="px-4 py-3 text-center">{book.author}</td>

                <td className="px-4 py-3 text-center">
                  {config.extraColumn(book)}
                </td>

                <td className="px-4 py-3">{book.notes ?? ''}</td>

                <td className="px-4 py-3 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() =>
                        router.push(`/update-book?_id=${book._id}`)
                      }
                      className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-600"
                    >
                      Update
                    </button>

                    <button
                      onClick={async () => {
                        await handleDeleteButton(book._id);
                        setSelectedTag('Overview');
                        toast.error(
                          `Book ${book.title} was deleted successfully!`
                        );
                      }}
                      className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
