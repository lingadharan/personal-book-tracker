'use client';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashBoardContent() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user || !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, user, isAuthenticated, router]);

  if (isLoading) {
    return <p>Loading... Dashboard!!!</p>;
  }

  return (
    <div className=" grid grid-cols-1 gap-4 rounded-2xl bg-primary-100 p-4 sm:grid-cols-2 xl:grid-cols-2">
      <div className="flex h-72 flex-col rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 border-b pb-2 text-lg font-bold text-primary-900">
          Reading
        </h3>

        <ol className="flex-1 list-inside list-decimal space-y-2 overflow-y-auto">
          {/* {readingBooksName.map((book) => (
            <li key={book._id} className="text-sm text-gray-700">
              {book.title}
            </li>
          ))} */}
        </ol>
      </div>

      <div className="flex h-72 flex-col rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 border-b pb-2 text-lg font-bold text-primary-900">
          Read
        </h3>

        <ol className="flex-1 list-inside list-decimal space-y-2 overflow-y-auto">
          {/* {readBooksName.map((book) => (
            <li key={book._id} className="text-sm text-gray-700">
              {book.title}
            </li>
          ))} */}
        </ol>
      </div>

      <div className="flex h-72 flex-col rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 border-b pb-2 text-lg font-bold text-primary-900">
          Interesting Books
        </h3>

        <ol className="flex-1 list-inside list-decimal space-y-2 overflow-y-auto">
          {/* {interestBookName.map((book) => (
            <li key={book._id} className="text-sm text-gray-700">
              {book.title}
            </li>
          ))} */}
        </ol>
      </div>

      <div className="flex h-72 flex-col rounded-xl bg-white p-4 shadow">
        <h3 className="mb-3 border-b pb-2 text-lg font-bold text-primary-900">
          Favourite Books
        </h3>

        <ol className="flex-1 list-inside list-decimal space-y-2 overflow-y-auto">
          {/* {favouriteBookName.map((book) => (
            <li key={book._id} className="text-sm text-gray-700">
              {book.title}
            </li>
          ))} */}
        </ol>
      </div>
    </div>
  );
}
