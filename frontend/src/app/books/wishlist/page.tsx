'use client';
import {
  Book,
  IBookPagination,
  IBooksApiResponse,
  IFilterOptions,
} from '@/types/interfaces';
import FilterBar from '@/ui/filterBar';
import Pagination from '@/ui/pagination';
import Table from '@/ui/table';
import { env } from '@/utiles/env';
import { useEffect, useState } from 'react';

export default function Wishlist() {
  const [wishListBooks, setWishListBooks] = useState<null | Book[]>(null);
  const [pagination, setPagination] = useState<null | IBookPagination>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [wishlistFilterOptions, setWishlistFilterOptions] =
    useState<IFilterOptions>({
      field: 'createdAt',
      sort: 'desc',
      limit: 10,
    });

  const getReadingBooks = async () => {
    const response = await fetch(
      `${env.backendURL}/books?category=reading&page=${pageNumber}&sort=${wishlistFilterOptions.sort}&field=${wishlistFilterOptions.field}&limit=${wishlistFilterOptions.limit}`,
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
  }, [pageNumber, wishlistFilterOptions]);

  if (!pagination || !wishListBooks) {
    return <p>Something went wrong on Wishlist page.</p>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPageNumber(newPage);
  };

  return (
    <div>
      <FilterBar
        filterOptions={wishlistFilterOptions}
        setFilterOptions={setWishlistFilterOptions}
        setPageNumber={setPageNumber}
      />
      <Table tag="Wishlist" book={wishListBooks} />
      <Pagination
        pagination={pagination}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
