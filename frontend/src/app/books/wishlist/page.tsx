'use client';
import { Book, IBookPagination, IBooksApiResponse } from '@/types/interfaces';
import Pagination from '@/ui/pagination';
import Table from '@/ui/table';
import { env } from '@/utiles/env';
import { useEffect, useState } from 'react';

export default function Wishlist() {
  const [wishListBooks, setWishListBooks] = useState<null | Book[]>(null);
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
    setWishListBooks(responseReading.data);
    setPagination(responseReading.pagination);
  };

  useEffect(() => {
    void getReadingBooks();
  }, [pageNumber]);

  if (!pagination || !wishListBooks) {
    return <p>Something went wrong on Wishlist page.</p>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPageNumber(newPage);
  };

  return (
    <div>
      <Table tag="Wishlist" book={wishListBooks} />
      <Pagination
        pagination={pagination}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
