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
    <div className="space-y-4 rounded-2xl bg-primary-100 p-3 sm:p-4">
      {/* Header / Summary */}
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-primary-950">Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">
              Your personal reading overview
            </p>
          </div>

          <div className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-800">
            Total Books: <span className="font-bold">42</span>
          </div>
        </div>
      </div>

      {/* Reading Progress */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Currently Reading */}
        <div className="rounded-xl bg-white p-4 shadow xl:col-span-2">
          <div className="mb-4 flex items-center justify-between border-b pb-2">
            <div>
              <h3 className="text-lg font-bold text-primary-900">
                Reading Progress
              </h3>
              <p className="text-xs text-gray-500">
                Current books and page progress
              </p>
            </div>

            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
              3 Reading
            </span>
          </div>

          <div className="space-y-5">
            {/* Book 1 */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    Atomic Habits
                  </p>
                  <p className="text-xs text-gray-500">James Clear</p>
                </div>

                <span className="shrink-0 text-xs font-semibold text-primary-700">
                  180 / 320
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[56%] rounded-full bg-primary-600" />
              </div>

              <p className="mt-1 text-right text-xs text-gray-400">56%</p>
            </div>

            {/* Book 2 */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    Deep Work
                  </p>
                  <p className="text-xs text-gray-500">Cal Newport</p>
                </div>

                <span className="shrink-0 text-xs font-semibold text-primary-700">
                  95 / 280
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[34%] rounded-full bg-primary-600" />
              </div>

              <p className="mt-1 text-right text-xs text-gray-400">34%</p>
            </div>

            {/* Book 3 */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    The Psychology of Money
                  </p>
                  <p className="text-xs text-gray-500">Morgan Housel</p>
                </div>

                <span className="shrink-0 text-xs font-semibold text-primary-700">
                  210 / 250
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-[84%] rounded-full bg-primary-600" />
              </div>

              <p className="mt-1 text-right text-xs text-gray-400">84%</p>
            </div>
          </div>
        </div>

        {/* Simple Reading Chart */}
        <div className="rounded-xl bg-white p-4 shadow">
          <div className="mb-4 border-b pb-2">
            <h3 className="text-lg font-bold text-primary-900">
              Books Overview
            </h3>
            <p className="text-xs text-gray-500">Books in each category</p>
          </div>

          <div className="flex h-48 items-end justify-around gap-3 px-2">
            {/* Reading */}
            <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-sm font-bold text-primary-800">5</span>
              <div className="flex h-32 w-full items-end rounded-md bg-primary-50">
                <div className="h-[62%] w-full rounded-md bg-primary-500" />
              </div>
              <span className="text-xs font-medium text-gray-500">Reading</span>
            </div>

            {/* Read */}
            <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-sm font-bold text-primary-800">18</span>
              <div className="flex h-32 w-full items-end rounded-md bg-primary-50">
                <div className="h-[92%] w-full rounded-md bg-primary-600" />
              </div>
              <span className="text-xs font-medium text-gray-500">Read</span>
            </div>

            {/* Interest */}
            <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-sm font-bold text-primary-800">13</span>
              <div className="flex h-32 w-full items-end rounded-md bg-primary-50">
                <div className="h-[75%] w-full rounded-md bg-primary-400" />
              </div>
              <span className="text-xs font-medium text-gray-500">
                Interest
              </span>
            </div>

            {/* Favourite */}
            <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-sm font-bold text-primary-800">6</span>
              <div className="flex h-32 w-full items-end rounded-md bg-primary-50">
                <div className="h-[45%] w-full rounded-md bg-primary-300" />
              </div>
              <span className="text-xs font-medium text-gray-500">
                Favourite
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Four Book Categories */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Reading */}
        <div className="flex min-h-64 flex-col rounded-xl bg-white p-4 shadow">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-bold text-primary-900">Reading</h3>
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-800">
              5
            </span>
          </div>

          <ol className="flex-1 space-y-3 overflow-y-auto">
            {[
              'Atomic Habits',
              'Deep Work',
              'The Psychology of Money',
              'Clean Code',
              'The Pragmatic Programmer',
            ].map((book, index) => (
              <li
                key={book}
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                  {index + 1}
                </span>

                <span className="truncate">{book}</span>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="mt-3 border-t pt-3 text-left text-xs font-semibold text-primary-700 hover:text-primary-900"
          >
            View all reading books →
          </button>
        </div>

        {/* Read */}
        <div className="flex min-h-64 flex-col rounded-xl bg-white p-4 shadow">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-bold text-primary-900">Read</h3>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
              18
            </span>
          </div>

          <ol className="flex-1 space-y-3 overflow-y-auto">
            {[
              'The Alchemist',
              'Rich Dad Poor Dad',
              'Ikigai',
              'Make Time',
              'Start With Why',
            ].map((book, index) => (
              <li
                key={book}
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-700">
                  {index + 1}
                </span>

                <span className="truncate">{book}</span>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="mt-3 border-t pt-3 text-left text-xs font-semibold text-primary-700 hover:text-primary-900"
          >
            View all read books →
          </button>
        </div>

        {/* Interest */}
        <div className="flex min-h-64 flex-col rounded-xl bg-white p-4 shadow">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-bold text-primary-900">
              Interesting Books
            </h3>
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
              13
            </span>
          </div>

          <ol className="flex-1 space-y-3 overflow-y-auto">
            {[
              'The 7 Habits of Highly Effective People',
              'Thinking, Fast and Slow',
              'Zero to One',
              'Essentialism',
              'The Lean Startup',
            ].map((book, index) => (
              <li
                key={book}
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-700">
                  {index + 1}
                </span>

                <span className="truncate">{book}</span>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="mt-3 border-t pt-3 text-left text-xs font-semibold text-primary-700 hover:text-primary-900"
          >
            View all interesting books →
          </button>
        </div>

        {/* Favourite */}
        <div className="flex min-h-64 flex-col rounded-xl bg-white p-4 shadow">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <h3 className="text-lg font-bold text-primary-900">
              Favourite Books
            </h3>
            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
              6
            </span>
          </div>

          <ol className="flex-1 space-y-3 overflow-y-auto">
            {[
              'Atomic Habits',
              'The Alchemist',
              'Deep Work',
              'Sapiens',
              'The Psychology of Money',
            ].map((book, index) => (
              <li
                key={book}
                className="flex items-center gap-3 text-sm text-gray-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-700">
                  {index + 1}
                </span>

                <span className="truncate">{book}</span>
              </li>
            ))}
          </ol>

          <button
            type="button"
            className="mt-3 border-t pt-3 text-left text-xs font-semibold text-primary-700 hover:text-primary-900"
          >
            View all favourite books →
          </button>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-4 text-center shadow">
          <p className="text-xs font-medium text-gray-500">Total Books</p>
          <p className="mt-1 text-2xl font-bold text-primary-900">42</p>
        </div>

        <div className="rounded-xl bg-white p-4 text-center shadow">
          <p className="text-xs font-medium text-gray-500">Reading</p>
          <p className="mt-1 text-2xl font-bold text-primary-700">5</p>
        </div>

        <div className="rounded-xl bg-white p-4 text-center shadow">
          <p className="text-xs font-medium text-gray-500">Completed</p>
          <p className="mt-1 text-2xl font-bold text-green-600">18</p>
        </div>

        <div className="rounded-xl bg-white p-4 text-center shadow">
          <p className="text-xs font-medium text-gray-500">Favourites</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">6</p>
        </div>
      </div>
    </div>
  );
}
