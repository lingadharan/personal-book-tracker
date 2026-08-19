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

export default function Completed() {
  const [completedBooks, setCompletedBooks] = useState<null | Book[]>(null);
  const [pagination, setPagination] = useState<null | IBookPagination>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [completedFilterOptions, setCompletedFilterOptions] =
    useState<IFilterOptions>({
      field: 'createdAt',
      sort: 'desc',
      limit: 10,
    });

  useEffect(() => {
    const getReadingBooks = async () => {
      const response = await fetch(
        `${env.backendURL}/books?category=reading&page=${pageNumber}&sort=${completedFilterOptions.sort}&field=${completedFilterOptions.field}&limit=${completedFilterOptions.limit}`,
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
    void getReadingBooks();
  }, [pageNumber, completedFilterOptions]);

  if (!pagination || !completedBooks) {
    return <p>Something went wrong on Completed page.</p>;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPageNumber(newPage);
  };

  return (
    <div>
      <FilterBar
        filterOptions={completedFilterOptions}
        setFilterOptions={setCompletedFilterOptions}
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
