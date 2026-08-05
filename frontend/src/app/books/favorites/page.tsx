'use client';
import { Book, IBookPagination, IBooksApiResponse } from '@/types/interfaces';
import Pagination from '@/ui/pagination';
import Table from '@/ui/table';
import { env } from '@/utiles/env';
import { useEffect, useState } from 'react';

export default function Favorites() {
  const [completedBooks, setCompletedBooks] = useState<null | Book[]>(null);
  const [pagination, setPagination] = useState<null | IBookPagination>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const getReadingBooks = async () => {
    const response = await fetch(
      `${env.backendURL}/books?category=favourite&page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const responseReading: IBooksApiResponse = await response.json();
    if (!responseReading.success) return;
    setCompletedBooks(responseReading.data);
    setPagination(responseReading.pagination);
  };

  useEffect(() => {
    void getReadingBooks();
  }, [pageNumber]);

  if (!pagination || !completedBooks) {
    return <p>Something went wrong on Reading page.</p>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPageNumber(newPage);
  };

  return (
    <div>
      <Table tag="Completed Books" book={completedBooks} />
      <Pagination
        pagination={pagination}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
