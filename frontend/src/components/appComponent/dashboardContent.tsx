'use client';

import { useAuth } from '@/context/authContext';
import { BookDashboardResponse } from '@/types/interfaces';
import { env } from '@/utiles/env';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashBoardContent() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  const [dashboardDetails, setDashboardDetails] =
    useState<BookDashboardResponse | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (!user || !isAuthenticated) {
      router.replace('/login');
      return;
    }

    const getDashboardDetails = async () => {
      try {
        const response = await fetch(`${env.backendURL}/dashboard`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard details');
        }

        const data: BookDashboardResponse = await response.json();

        setDashboardDetails(data);
      } catch (error) {
        console.error('Dashboard error:', error);
      }
    };

    getDashboardDetails();
  }, [isLoading, user, isAuthenticated, router]);

  if (isLoading || !dashboardDetails) {
    return <p>Loading... Dashboard!!!</p>;
  }

  const { summary, readingBooks, recentlyRead, interestBooks, favouriteBooks } =
    dashboardDetails.data;

  const totalBooks = summary.totalBooks[0]?.count ?? 0;

  const counts = {
    reading: summary.counts.find((item) => item._id === 'reading')?.count ?? 0,
    read: summary.counts.find((item) => item._id === 'read')?.count ?? 0,
    interest:
      summary.counts.find((item) => item._id === 'interest')?.count ?? 0,
    favourite:
      summary.counts.find((item) => item._id === 'favourite')?.count ?? 0,
  };

  const categoryCards = [
    {
      title: 'Reading',
      books: readingBooks,
      count: counts.reading,
      emptyMessage: 'No reading books.',
    },
    {
      title: 'Read',
      books: recentlyRead,
      count: counts.read,
      emptyMessage: 'No completed books.',
    },
    {
      title: 'Interesting Books',
      books: interestBooks,
      count: counts.interest,
      emptyMessage: 'No interesting books.',
    },
    {
      title: 'Favourite Books',
      books: favouriteBooks,
      count: counts.favourite,
      emptyMessage: 'No favourite books.',
    },
  ];

  return (
    <div className="space-y-4 rounded-2xl bg-primary-100 p-3 sm:p-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-primary-950">
              Book Dashboard
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your personal reading overview
            </p>
          </div>

          <div className="rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-800">
            Total Books: <span className="font-bold">{totalBooks}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex h-80 flex-col rounded-xl bg-white p-4 shadow xl:col-span-2">
          <div className="mb-4 flex shrink-0 items-center justify-between border-b pb-2">
            <div>
              <h3 className="text-lg font-bold text-primary-900">
                Reading Progress
              </h3>

              <p className="text-xs text-gray-500">
                Your currently reading books
              </p>
            </div>

            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-800">
              {counts.reading} Reading
            </span>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto pr-1">
            {readingBooks.length > 0 ? (
              readingBooks.slice(0, 5).map((book) => {
                const progress =
                  book.totalPage && book.currentPage
                    ? Math.min(
                        Math.round((book.currentPage / book.totalPage) * 100),
                        100
                      )
                    : 0;

                return (
                  <div key={book._id}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {book.title}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {book.author}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs font-semibold text-primary-700">
                        {book.currentPage ?? 0} / {book.totalPage ?? 0}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-primary-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="mt-1 text-right text-xs text-gray-400">
                      {progress}%
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-gray-400">
                  No books currently reading.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex h-80 flex-col rounded-xl bg-white p-4 shadow">
          <div className="mb-4 shrink-0 border-b pb-2">
            <h3 className="text-lg font-bold text-primary-900">
              Books Overview
            </h3>

            <p className="text-xs text-gray-500">Books in each category</p>
          </div>

          <div className="flex flex-1 items-end justify-around gap-3 px-2">
            {summary.counts.map((category) => {
              const height =
                totalBooks > 0
                  ? Math.max(
                      Math.round((category.count / totalBooks) * 100),
                      category.count > 0 ? 8 : 0
                    )
                  : 0;

              const label =
                category._id === 'interest'
                  ? 'Interest'
                  : category._id.charAt(0).toUpperCase() +
                    category._id.slice(1);

              return (
                <div
                  key={category._id}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-sm font-bold text-primary-800">
                    {category.count}
                  </span>

                  <div className="flex h-40 w-full items-end rounded-md bg-primary-50">
                    <div
                      className="w-full rounded-md bg-primary-500 transition-all"
                      style={{ height: `${height}%` }}
                    />
                  </div>

                  <span className="text-center text-xs font-medium text-gray-500">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categoryCards.map((category) => (
          <div
            key={category.title}
            className="flex h-64 flex-col rounded-xl bg-white p-4 shadow"
          >
            <div className="mb-3 flex shrink-0 items-center justify-between border-b pb-2">
              <h3 className="text-lg font-bold text-primary-900">
                {category.title}
              </h3>

              <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-700">
                {category.count}
              </span>
            </div>

            {category.books.length > 0 ? (
              <ol className="flex-1 space-y-3 overflow-y-auto pr-1">
                {category.books.slice(0, 5).map((book, index) => (
                  <li
                    key={book._id}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate">{book.title}</p>

                      <p className="truncate text-xs text-gray-400">
                        {book.author}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-gray-400">{category.emptyMessage}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: 'Total Books',
            value: totalBooks,
          },
          {
            label: 'Reading',
            value: counts.reading,
          },
          {
            label: 'Completed',
            value: counts.read,
          },
          {
            label: 'Favourites',
            value: counts.favourite,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl bg-white p-4 text-center shadow"
          >
            <p className="text-xs font-medium text-gray-500">{item.label}</p>

            <p className="mt-1 text-2xl font-bold text-primary-700">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
