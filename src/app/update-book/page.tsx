'use client';

import { useBookContext } from '@/context/bookContext';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, ChangeEvent, useEffect, Suspense } from 'react';

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

function UpdateBookComponent() {
  const { setSelectedTag } = useBookContext();
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
  const searchParams = useSearchParams();
  const _id = searchParams.get('_id');
  const router = useRouter();
  const [updateBookDetails, setNewBookDetails] = useState<IBook>(
    initialNewBookDetails
  );
  useEffect(() => {
    if (!_id) return;
    const getBookById = async () => {
      const response = await fetch(`http://localhost:5000/api?_id=${_id}`);
      const result = await response.json();
      if (result.data) {
        setNewBookDetails(result.data);
      }
    };
    getBookById();
  }, [_id]);

  if (!_id) {
    return <p>Something went wrong on Update book page. Id not valid</p>;
  }

  const readStatusOptions = ['completed', 'in-progress', 'need-to-plan'];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBookDetails((prev) => ({
      ...prev,
      [name]: value,
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
      const { author, title, notes, category, currentPage } = updateBookDetails;

      const updateBookBody: IBook = {
        author,
        title,
        notes,
        category,
        currentPage,
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

      const response = await fetch('http://localhost:5000/api/update-book', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updateBookBody, _id }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      setNewBookDetails(initialNewBookDetails);
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

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-dashed border-gray-700 p-6 space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-bold">
            Book Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            value={updateBookDetails.title}
            onChange={handleInputChange}
            className="w-full bg-black border-b border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
            placeholder="Enter book name..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            required
            value={updateBookDetails.author}
            onChange={handleInputChange}
            className="w-full bg-black border-b border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
            placeholder="Enter author..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2 pl-2">
            {(['Reading', 'Read', 'Interest', 'Favourite'] as const).map(
              (cat) => (
                <label
                  key={cat}
                  className="flex items-center space-x-3 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="category"
                    required
                    checked={updateBookDetails.category === cat.toLowerCase()}
                    onChange={() =>
                      handleCategoryChange(
                        cat.toLowerCase() as IBook['category']
                      )
                    }
                    className="accent-white h-4 w-4 bg-black border border-white"
                  />
                  <span>{cat}</span>
                </label>
              )
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold">Page No</label>
          <input
            type="number"
            name="currentPage"
            value={updateBookDetails.currentPage}
            onChange={handleInputChange}
            className="w-32 bg-black border border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
          />
        </div>

        {updateBookDetails.category === 'read' && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">
              Duration (only Read)
            </label>
            <input
              type="text"
              name="durationToComplete"
              value={updateBookDetails.durationToComplete}
              onChange={handleInputChange}
              className="w-32 bg-black border border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
              placeholder="e.g. 5 days"
            />
          </div>
        )}

        {updateBookDetails.category === 'interest' && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">
              Suggested By (Interest)
            </label>
            <input
              type="text"
              name="suggestedBy"
              value={updateBookDetails.suggestedBy}
              onChange={handleInputChange}
              className="w-full bg-black border-b border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
            />
          </div>
        )}

        {updateBookDetails.category === 'favourite' && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">
              Read Status (Favourite)
            </label>
            <select
              name="readStatus"
              value={updateBookDetails.readStatus}
              onChange={handleInputChange}
              className="w-48 bg-black border border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white cursor-pointer"
            >
              {readStatusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                  className="bg-black text-white"
                >
                  [{status}]
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-bold">Notes</label>
          <textarea
            name="notes"
            value={updateBookDetails.notes}
            onChange={handleInputChange}
            rows={3}
            className="w-full bg-black border-b border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white resize-none"
            placeholder="Add notes..."
          />
        </div>

        <div className="flex justify-center space-x-12 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 hover:bg-white hover:text-black border border-transparent hover:border-white transition-colors duration-150 font-bold"
          >
            Cancel
          </button>
          <button
            onSubmit={handleSubmit}
            className="px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors duration-150 font-bold"
          >
            Save Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default function UpdateBookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white p-6 font-mono flex justify-center items-center">
          Loading book details...
        </div>
      }
    >
      <UpdateBookComponent />
    </Suspense>
  );
}
