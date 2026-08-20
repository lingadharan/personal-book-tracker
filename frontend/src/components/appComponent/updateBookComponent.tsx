'use client';

import { useAuth } from '@/context/authContext';
import { Book, IUpdateApiResponse } from '@/types/interfaces';
import Loader from '@/ui/loader';
import { env } from '@/utiles/env';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, ChangeEvent, useEffect, Suspense } from 'react';
import { toast } from 'sonner';

function UpdateBookComponent() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const initialNewBookDetails: Book = {
    _id: '',
    title: '',
    author: '',
    totalPage: 0,
    currentPage: 0,
    durationToComplete: '0',
    suggestedBy: '',
    readStatus: 'completed',
    notes: '',
    category: 'reading',
  };
  const readStatusOptions = ['completed', 'in-progress', 'need-to-plan'];
  const searchParams = useSearchParams();
  const _id = searchParams.get('_id');
  const router = useRouter();
  const [updateBookDetails, setNewBookDetails] = useState<Book>(
    initialNewBookDetails
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user || !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, user, isAuthenticated, router]);

  useEffect(() => {
    if (isLoading || !isAuthenticated || !user || !_id) {
      return;
    }
    const getBook = async () => {
      const response = await fetch(`${env.backendURL}/get-book?_id=${_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = (await response.json()) as IUpdateApiResponse;
        setNewBookDetails(data.data);
      }
    };
    getBook();
  }, [_id, isLoading, isAuthenticated, user]);

  if (isLoading) {
    return <Loader />;
  }

  if (!_id) {
    return <p>Something went wrong on Update book page. Id not valid</p>;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const isPageField = name === 'currentPage' || name === 'totalPage';

    if (!isPageField) {
      setNewBookDetails((prev) => ({ ...prev, [name]: value }));
      return;
    }

    const pageNumber = Number(value);
    if (Number.isNaN(pageNumber)) return;

    setNewBookDetails((prev) => ({
      ...prev,
      [name]: Math.max(0, pageNumber),
    }));
  };

  const handleCategoryChange = (category: Book['category']) => {
    setNewBookDetails((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { author, title, notes, category, currentPage, totalPage } =
        updateBookDetails;

      const updateBookBody: Book = {
        _id,
        author,
        title,
        notes,
        category,
        currentPage,
        totalPage,
      };

      if (category === 'read') {
        updateBookBody.durationToComplete =
          updateBookDetails.durationToComplete;
      } else if (category === 'interest') {
        updateBookBody.suggestedBy = updateBookDetails.suggestedBy;
      } else if (category === 'favourite') {
        updateBookBody.readStatus = updateBookDetails.readStatus;
      } else if (category !== 'reading') {
        setNewBookDetails(initialNewBookDetails);
        router.push('/');
        throw new Error(
          'Something went wrong on update book submission: Invalid category.'
        );
      }

      const response = await fetch(`${env.backendURL}/update-book`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBookBody),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      setNewBookDetails(initialNewBookDetails);
      toast.success('Book updated successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setNewBookDetails(initialNewBookDetails);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-primary-100 px-4 py-8 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-primary-900">
          Update Book
        </h2>

        <div className="mb-6">
          <label className="mb-2 block font-semibold text-primary-900">
            Book Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="title"
            required
            minLength={3}
            value={updateBookDetails.title}
            onChange={handleInputChange}
            placeholder="Enter book name..."
            className="w-full rounded-lg border border-primary-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold text-primary-900">
            Author <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="author"
            required
            minLength={3}
            value={updateBookDetails.author}
            onChange={handleInputChange}
            placeholder="Enter author..."
            className="w-full rounded-lg border border-primary-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        <div className="mb-6">
          <label className="mb-4 block font-semibold text-primary-900">
            Category <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(['Reading', 'Read', 'Interest', 'Favourite'] as const).map(
              (cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 p-3 transition hover:bg-primary-100"
                >
                  <input
                    type="radio"
                    name="category"
                    required
                    checked={updateBookDetails.category === cat.toLowerCase()}
                    onChange={() =>
                      handleCategoryChange(
                        cat.toLowerCase() as Book['category']
                      )
                    }
                    className="accent-primary-600"
                  />
                  <span>{cat}</span>
                </label>
              )
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold text-primary-900">
            Total Page No
          </label>

          <input
            type="text"
            name="totalPage"
            value={updateBookDetails.totalPage}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-primary-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold text-primary-900">
            Current Page No
          </label>

          <input
            type="text"
            name="currentPage"
            value={updateBookDetails.currentPage}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-primary-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        {updateBookDetails.category === 'read' && (
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-primary-900">
              Duration to Complete
            </label>

            <input
              type="text"
              name="durationToComplete"
              value={updateBookDetails.durationToComplete}
              onChange={handleInputChange}
              placeholder="Example: 5 days"
              className="w-full rounded-lg border border-primary-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
        )}

        {updateBookDetails.category === 'interest' && (
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-primary-900">
              Suggested By
            </label>

            <input
              type="text"
              name="suggestedBy"
              minLength={3}
              value={updateBookDetails.suggestedBy}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-primary-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
        )}

        {updateBookDetails.category === 'favourite' && (
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-primary-900">
              Read Status
            </label>

            <select
              name="readStatus"
              value={updateBookDetails.readStatus}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-primary-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              {readStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-8">
          <label className="mb-2 block font-semibold text-primary-900">
            Notes
          </label>

          <textarea
            name="notes"
            rows={4}
            value={updateBookDetails.notes}
            onChange={handleInputChange}
            placeholder="Write your thoughts about this book..."
            className="w-full resize-none rounded-lg border border-primary-300 px-4 py-3 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-primary-400 px-6 py-3 font-semibold text-primary-900 transition hover:bg-primary-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition hover:bg-primary-700"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
                Saving...
              </span>
            ) : (
              'Update Book'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function UpdateBook() {
  return (
    <Suspense fallback={<Loader />}>
      <UpdateBookComponent />
    </Suspense>
  );
}
