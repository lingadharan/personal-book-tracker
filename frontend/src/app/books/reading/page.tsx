'use client';
import { Book, IBookPagination, IBooksApiResponse } from '@/types/interfaces';
import Pagination from '@/ui/pagination';
import Table from '@/ui/table';
import { env } from '@/utiles/env';
import { useEffect, useState } from 'react';

export default function Reading() {
  const [readingBooks, setReadingBooks] = useState<null | Book[]>(null);
  const [pagination, setPagination] = useState<null | IBookPagination>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const getReadingBooks = async () => {
    const response = await fetch(
      `${env.backendURL}/books?category=reading&page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const responseReading: IBooksApiResponse = await response.json();
    if (!responseReading.success) return;
    setReadingBooks(responseReading.data);
    setPagination(responseReading.pagination);
  };

  useEffect(() => {
    void getReadingBooks();
  }, [pageNumber]);

  if (!pagination || !readingBooks) {
    return <p>Something went wrong on Reading page.</p>;
  }

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <div>
      <Table tag="Currently Reading" book={readingBooks} />
      <Pagination
        pagination={pagination}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
