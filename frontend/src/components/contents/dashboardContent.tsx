import { GlobalBookContext } from '@/context/bookContext';
import { useContext } from 'react';

export default function DashBoardContent() {
  const context = useContext(GlobalBookContext);
  if (!context) {
    return (
      <p>
        Error: GlobalBookContext must be used within a GlobalBookContextProvider
      </p>
    );
  }

  const readBooksName = context.allBookDetails.filter(
    (book) => book.category === 'read'
  );
  const readingBooksName = context.allBookDetails.filter(
    (book) => book.category === 'reading'
  );
  const interestBookName = context.allBookDetails.filter(
    (book) => book.category === 'interest'
  );
  const favouriteBookName = context.allBookDetails.filter(
    (book) => book.category === 'favourite'
  );

  return (
    <div className=" grid grid-cols-1 gap-4 rounded-2xl bg-amber-100 p-4 sm:grid-cols-2 xl:grid-cols-2">
      <div className="flex h-72 flex-col rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 border-b pb-2 text-lg font-bold text-amber-900">
          Reading
        </h3>

        <ol className="flex-1 list-inside list-decimal space-y-2 overflow-y-auto">
          {readingBooksName.map((book) => (
            <li key={book._id} className="text-sm text-gray-700">
              {book.title}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex h-72 flex-col rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 border-b pb-2 text-lg font-bold text-amber-900">
          Read
        </h3>

        <ol className="flex-1 list-inside list-decimal space-y-2 overflow-y-auto">
          {readBooksName.map((book) => (
            <li key={book._id} className="text-sm text-gray-700">
              {book.title}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex h-72 flex-col rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 border-b pb-2 text-lg font-bold text-amber-900">
          Interesting Books
        </h3>

        <ol className="flex-1 list-inside list-decimal space-y-2 overflow-y-auto">
          {interestBookName.map((book) => (
            <li key={book._id} className="text-sm text-gray-700">
              {book.title}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex h-72 flex-col rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 border-b pb-2 text-lg font-bold text-amber-900">
          Favourite Books
        </h3>

        <ol className="flex-1 list-inside list-decimal space-y-2 overflow-y-auto">
          {favouriteBookName.map((book) => (
            <li key={book._id} className="text-sm text-gray-700">
              {book.title}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
