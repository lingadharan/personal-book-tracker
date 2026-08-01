'use client';

import { useAuth } from '@/context/authContext';
import { useBookContext } from '@/context/bookContext';
import { env } from '@/utiles/env';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { toast } from 'sonner';

export interface IBook {
  title: string;
  author: string;
  currentPage?: number;
  durationToComplete?: string;
  suggestedBy?: string;
  readStatus?: 'completed' | 'need-to-plan' | 'in-progress';
  notes?: string;
  category: 'reading' | 'read' | 'interest' | 'favourite';
}

export default function NewBookComponent() {
  const { setSelectedTag } = useBookContext();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const readStatusOptions = ['completed', 'in-progress', 'need-to-plan'];
  const initialNewBookDetails: IBook = {
    title: '',
    author: '',
    currentPage: 0,
    durationToComplete: '0',
    suggestedBy: '',
    readStatus: 'completed',
    notes: '',
    category: 'reading',
  };

  const [newBookDetails, setNewBookDetails] = useState<IBook>(
    initialNewBookDetails
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBookDetails((prev) => ({
      ...prev,
      [name]: name === 'currentPage' ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (category: IBook['category']) => {
    setNewBookDetails((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const { author, title, notes, category, currentPage } = newBookDetails;
      const newBookBody: Record<string, string | number | undefined> = {
        author,
        title,
        notes,
        category,
        currentPage,
      };

      if (category === 'read') {
        newBookBody.durationToComplete = newBookDetails.durationToComplete;
      } else if (category === 'interest') {
        newBookBody.suggestedBy = newBookDetails.suggestedBy;
      } else if (category === 'favourite') {
        newBookBody.readStatus = newBookDetails.readStatus;
      } else if (category !== 'reading') {
        setNewBookDetails(initialNewBookDetails);
        router.push('/');
        throw new Error(
          'Something went wrong on new book submission: Invalid category.'
        );
      }

      const finalBookBody = {
        books: [newBookBody],
      };

      const response = await fetch(`${env.backendURL}/add-book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalBookBody),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      setNewBookDetails(initialNewBookDetails);
      toast.success('Book added successfully!');
      setSelectedTag('dashboard');
      router.push('/');
    } catch (error) {
      console.error('Error submitting book:', error);
    }
  };

  const handleCancel = () => {
    setNewBookDetails(initialNewBookDetails);
    router.push('/');
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user || !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, user, isAuthenticated, router]);

  if (isLoading) {
    return <p>Loading... New Book Page!!!</p>;
  }

  return (
    <div className="min-h-screen bg-amber-100 px-4 py-8 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      >
        <h2 className="mb-8 text-center text-3xl font-bold text-amber-900">
          Add New Book
        </h2>

        {/* Book Name */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-amber-900">
            Book Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="title"
            required
            value={newBookDetails.title}
            onChange={handleInputChange}
            placeholder="Enter book name..."
            className="w-full rounded-lg border border-amber-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Author */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-amber-900">
            Author <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="author"
            required
            value={newBookDetails.author}
            onChange={handleInputChange}
            placeholder="Enter author..."
            className="w-full rounded-lg border border-amber-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="mb-4 block font-semibold text-amber-900">
            Category <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(['Reading', 'Read', 'Interest', 'Favourite'] as const).map(
              (cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 transition hover:bg-amber-100"
                >
                  <input
                    type="radio"
                    name="category"
                    required
                    checked={newBookDetails.category === cat.toLowerCase()}
                    onChange={() =>
                      handleCategoryChange(
                        cat.toLowerCase() as IBook['category']
                      )
                    }
                    className="accent-amber-600"
                  />
                  <span>{cat}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Current Page */}
        <div className="mb-6">
          <label className="mb-2 block font-semibold text-amber-900">
            Page No
          </label>

          <input
            type="number"
            name="currentPage"
            value={newBookDetails.currentPage}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-amber-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Read */}
        {newBookDetails.category === 'read' && (
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-amber-900">
              Duration to Complete
            </label>

            <input
              type="text"
              name="durationToComplete"
              value={newBookDetails.durationToComplete}
              onChange={handleInputChange}
              placeholder="Example: 5 days"
              className="w-full rounded-lg border border-amber-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>
        )}

        {/* Interest */}
        {newBookDetails.category === 'interest' && (
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-amber-900">
              Suggested By
            </label>

            <input
              type="text"
              name="suggestedBy"
              value={newBookDetails.suggestedBy}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-amber-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>
        )}

        {/* Favourite */}
        {newBookDetails.category === 'favourite' && (
          <div className="mb-6">
            <label className="mb-2 block font-semibold text-amber-900">
              Read Status
            </label>

            <select
              name="readStatus"
              value={newBookDetails.readStatus}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-amber-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {readStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Notes */}
        <div className="mb-8">
          <label className="mb-2 block font-semibold text-amber-900">
            Notes
          </label>

          <textarea
            name="notes"
            rows={4}
            value={newBookDetails.notes}
            onChange={handleInputChange}
            placeholder="Write your thoughts about this book..."
            className="w-full resize-none rounded-lg border border-amber-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg border border-amber-400 px-6 py-3 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
          >
            Save Book
          </button>
        </div>
      </form>
    </div>
  );
}
