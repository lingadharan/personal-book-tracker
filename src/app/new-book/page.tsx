"use client";

import { useRouter } from "next/navigation";
import { title } from "process";
import React, { useState, ChangeEvent, FormEvent } from "react";

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

export default function NewBookComponent() {
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

  const [newBookDetails, setNewBookDetails] = useState<IBook>(initialNewBookDetails)

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
      const { author, title, notes, category, currentPage } = newBookDetails;

      // 1. Build the base object using shorthand property names
      const newBookBody: Record<string, any> = {
        author,
        title,
        notes,
        category,
        currentPage,
      };

      // 2. Conditionally add specific fields based on category
      if (category === 'read') {
        newBookBody.durationToComplete = newBookDetails.durationToComplete;
      } else if (category === 'interest') {
        newBookBody.suggestedBy = newBookDetails.suggestedBy;
      } else if (category === 'favourite') {
        newBookBody.readStatus = newBookDetails.readStatus;
      } else if (category !== 'reading') {
        // If it's none of the expected categories, reset, navigate, and exit early
        setNewBookDetails(initialNewBookDetails);
        router.push("/");
        throw new Error("Something went wrong on new book submission: Invalid category.");
      }

      const finalBookBody = {
        books: [newBookBody]
      }

      const response = await fetch('http://localhost:5000/api/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalBookBody),
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
            value={newBookDetails.title}
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
            value={newBookDetails.author}
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
                  checked={newBookDetails.category === cat.toLowerCase()}
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
            value={newBookDetails.currentPage}
            onChange={handleInputChange}
            className="w-32 bg-black border border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
          />
        </div>

        {/* Duration - Only visible if Category is 'Read' */}
        {newBookDetails.category === "read" && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">Duration (only Read)</label>
            <input
              type="text"
              name="durationToComplete"
              value={newBookDetails.durationToComplete}
              onChange={handleInputChange}
              className="w-32 bg-black border border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
              placeholder="e.g. 5 days"
            />
          </div>
        )}

        {/* Suggested By - Only visible if Category is 'Interest' */}
        {newBookDetails.category === "interest" && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">Suggested By (Interest)</label>
            <input
              type="text"
              name="suggestedBy"
              value={newBookDetails.suggestedBy}
              onChange={handleInputChange}
              className="w-full bg-black border-b border-white focus:outline-none focus:border-gray-400 py-1 px-2 text-white"
            />
          </div>
        )}

        {/* Read Status Dropdown - Only visible if Category is 'Favourite' */}
        {newBookDetails.category === "favourite" && (
          <div className="space-y-2 transition-all duration-200">
            <label className="block text-sm font-bold">Read Status (Favourite)</label>
            <select
              name="readStatus"
              value={newBookDetails.readStatus}
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
            value={newBookDetails.notes}
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