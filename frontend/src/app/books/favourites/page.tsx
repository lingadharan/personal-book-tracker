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
import { API_ROUTES, DEFAULT_FILTER_OPTIONS } from '@/utiles/constants';
import { useEffect, useState } from 'react';

export default function Favorites() {
  const [favouriteBooks, setFavouriteBooks] = useState<null | Book[]>(null);
  const [pagination, setPagination] = useState<null | IBookPagination>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [favouriteFilterOptions, setFavouriteFilterOptions] =
    useState<IFilterOptions>(DEFAULT_FILTER_OPTIONS);

  useEffect(() => {
    const getReadingBooks = async () => {
      const response = await fetch(
        `${env.backendURL}${API_ROUTES.BOOKS}?category=favourite&page=${pageNumber}&sort=${favouriteFilterOptions.sort}&field=${favouriteFilterOptions.field}&limit=${favouriteFilterOptions.limit}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseReading: IBooksApiResponse = await response.json();
      if (!responseReading.success) return;
      setFavouriteBooks(responseReading.data);
      setPagination(responseReading.pagination);
    };
    void getReadingBooks();
  }, [pageNumber, favouriteFilterOptions]);

  if (!pagination || !favouriteBooks) {
    return <p>Something went wrong on Favourite page.</p>;
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
      <Table tag="Favorite Books" book={favouriteBooks} />
      <Pagination
        pagination={pagination}
        pageNumber={pageNumber}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
