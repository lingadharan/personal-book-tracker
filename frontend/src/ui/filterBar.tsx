'use client';

import { IFilterOptions } from '@/types/interfaces';
import { Dispatch, SetStateAction } from 'react';

export const FilterBar = ({
  filterOptions,
  setFilterOptions,
  setPageNumber,
}: {
  filterOptions: IFilterOptions;
  setFilterOptions: Dispatch<SetStateAction<IFilterOptions>>;
  setPageNumber: Dispatch<SetStateAction<number>>;
}) => {
  const handleFilterOptions = (field: string, value: string) => {
    setPageNumber(1);

    setFilterOptions((prev) => ({
      ...prev,
      [field]: field === 'limit' ? Number(value) : value,
    }));
  };

  const selectClassName =
    'h-9 rounded-lg border border-primary-200 bg-white px-3 text-sm text-primary-950 outline-none transition-colors focus:border-primary-500';

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow">
      <div className="flex items-center gap-2">
        <label
          htmlFor="sort-field"
          className="text-sm font-semibold text-primary-950"
        >
          Sort By:
        </label>

        <select
          id="sort-field"
          value={filterOptions.field}
          onChange={(e) => handleFilterOptions('field', e.target.value)}
          className={`${selectClassName} w-40`}
        >
          <option value="createdAt">Created At</option>
          <option value="title">Book Name</option>
          <option value="author">Author</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="sort-order"
          className="text-sm font-semibold text-primary-950"
        >
          Order:
        </label>

        <select
          id="sort-order"
          value={filterOptions.sort}
          onChange={(e) => handleFilterOptions('sort', e.target.value)}
          className={`${selectClassName} w-52`}
        >
          <option value="desc">Descending (Newest)</option>
          <option value="asc">Ascending (Oldest)</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="page-limit"
          className="text-sm font-semibold text-primary-950"
        >
          Per Page:
        </label>

        <select
          id="page-limit"
          value={String(filterOptions.limit)}
          onChange={(e) => handleFilterOptions('limit', e.target.value)}
          className={`${selectClassName} w-24`}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
