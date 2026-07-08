"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

export interface IBook {
  title: string;
  author: string;
  currentPage?: number;
  durationToComplete?: string;
  suggestedBy?: string;
  readStatus?: "completed" | "need-to-plan" | "in-progress";
  notes?: string;
  category: "reading" | "read" | "interest" | "favourite";
}

export default function UpdateBookComponent() {
  const searchParams = useSearchParams();
  const _id = searchParams.get("_id");
  if (!_id) {
    return <p>Something went wrong on Update book page. Id not valid</p>
  }



  const router = useRouter();
  const readStatusOptions = ["completed", "in-progress", "need-to-plan"];
  const initialNewBookDetails: IBook = {
    title: "",
    author: "",
    currentPage: 0,
    durationToComplete: "0",
    suggestedBy: "",
    readStatus: "completed",
    notes: "",
    category: "reading"
  }

  const [updateBookDetails, setNewBookDetails] = useState<IBook>(initialNewBookDetails)

  useEffect(() => {
    const getBookById = async () => {
      const response = await fetch(`http://localhost:5000/api?_id=${_id}`)
      const result = await response.json();
      if (result.data) {
        setNewBookDetails(result.data)
      }
    }
    getBookById();
  }, [])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBookDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (
    category: IBook["category"]
  ) => {
    setNewBookDetails((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const { author, title, notes, category, currentPage } = updateBookDetails;

      // 1. Build the base object using shorthand property names
      const updateBookBody: Record<string, any> = {
        _id,
        author,
        title,
        notes,
        category,
        currentPage,
      };

      // 2. Conditionally add specific fields based on category
      if (category === 'read') {
        updateBookBody.durationToComplete = updateBookDetails.durationToComplete;
      } else if (category === 'interest') {
        updateBookBody.suggestedBy = updateBookDetails.suggestedBy;
      } else if (category === 'favourite') {
        updateBookBody.readStatus = updateBookDetails.readStatus;
      } else if (category !== 'reading') {
        // If it's none of the expected categories, reset, navigate, and exit early
        setNewBookDetails(initialNewBookDetails);
        router.push("/");
        throw new Error("Something went wrong on update book submission: Invalid category.");
      }

      const response = await fetch('http://localhost:5000/api/update-book', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBookBody),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // 4. Success cleanup
      setNewBookDetails(initialNewBookDetails);
      router.push("/");

    } catch (error) {
      console.error("Error submitting book:", error);
    }
  };

  const handleCancel = () => {
    setNewBookDetails(initialNewBookDetails);
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-dashed border-gray-700 p-6 space-y-6"
      >
        {/* Book Name */}
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

        {/* Author */}
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

        {/* Category (Radio-style selection to match the mockup UI) */}
        <div className="space-y-2">
          <label className="block text-sm font-bold">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2 pl-2">
            {(["Reading", "Read", "Interest", "Favourite"] as const).map((cat) => (
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
                    handleCategoryChange(cat.toLowerCase() as IBook["category"])
                  }
                  className="accent-white h-4 w-4 bg-black border border-white"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Page No */}
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

        {/* Duration - Only visible if Category is 'Read' */}
        {updateBookDetails.category === "read" && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">Duration (only Read)</label>
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

        {/* Suggested By - Only visible if Category is 'Interest' */}
        {updateBookDetails.category === "interest" && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">Suggested By (Interest)</label>
            <input
              type="text"
              name="suggestedBy"
              value={updateBookDetails.suggestedBy}
              onChange={handleInputChange}
              className="w-full bg-black border-b border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
            />
          </div>
        )}

        {/* Read Status Dropdown - Only visible if Category is 'Favourite' */}
        {updateBookDetails.category === "favourite" && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">Read Status (Favourite)</label>
            <select
              name="readStatus"
              value={updateBookDetails.readStatus}
              onChange={handleInputChange}
              className="w-48 bg-black border border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white cursor-pointer"
            >
              {readStatusOptions.map((status) => (
                <option key={status} value={status} className="bg-black text-white">
                  [{status}]
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Notes */}
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

        {/* Form Action Buttons */}
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