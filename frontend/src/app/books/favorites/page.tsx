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

export default function Favorites() {
  const [completedBooks, setCompletedBooks] = useState<null | Book[]>(null);
  const [pagination, setPagination] = useState<null | IBookPagination>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [favouriteFilterOptions, setFavouriteFilterOptions] =
    useState<IFilterOptions>({
      field: 'createdAt',
      sort: 'desc',
      limit: 10,
    });

  const getReadingBooks = async () => {
    const response = await fetch(
      `${env.backendURL}/books?category=reading&page=${pageNumber}&sort=${favouriteFilterOptions.sort}&field=${favouriteFilterOptions.field}&limit=${favouriteFilterOptions.limit}`,
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
  }, [pageNumber, favouriteFilterOptions]);

  if (!pagination || !completedBooks) {
    return <p>Something went wrong on Reading page.</p>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPageNumber(newPage);
  };

  return (
    <div>
      <FilterBar
        filterOptions={favouriteFilterOptions}
        setFilterOptions={setFavouriteFilterOptions}
        setPageNumber={setPageNumber}
      />
      <Table tag="Completed Books" book={completedBooks} />
      <Pagination
        pagination={pagination}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
