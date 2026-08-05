'use client';

import { IBookPagination } from '@/types/interfaces';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  pagination: IBookPagination;
  pageNumber: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pagination,
  pageNumber,
  onPageChange,
}: PaginationProps) {
  const { totalPages, totalCount, hasPrevPage, hasNextPage, page, limit } =
    pagination;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg">
      <div className="text-sm text-gray-700">
        Showing <span className="font-semibold text-gray-900">{startItem}</span>{' '}
        to <span className="font-semibold text-gray-900">{endItem}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalCount}</span>{' '}
        results
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(1)}
          disabled={!hasPrevPage}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={!hasPrevPage}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 px-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  pageNum === pageNumber
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={!hasNextPage}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={!hasNextPage}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
