'use client';

import { IFilterOptions } from '@/types/interfaces';
import { Dispatch, SetStateAction } from 'react';
import Dropdown from './dropdown';

const SORT_FIELD_OPTIONS = [
  {
    value: 'createdAt',
    label: 'Created At',
  },
  {
    value: 'title',
    label: 'Book Name',
  },
  {
    value: 'author',
    label: 'Author',
  },
];

const SORT_ORDER_OPTIONS = [
  {
    value: 'desc',
    label: 'Descending (Newest)',
  },
  {
    value: 'asc',
    label: 'Ascending (Oldest)',
  },
];

const PAGE_LIMIT_OPTIONS = [
  {
    value: '5',
    label: '5',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '50',
    label: '50',
  },
];

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

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-4 shadow">
      {/* Sort By */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-primary-950">Sort By:</span>

        <Dropdown
          value={filterOptions.field}
          onChange={(value) => handleFilterOptions('field', value)}
          width="w-40"
          options={SORT_FIELD_OPTIONS}
        />
      </div>

      {/* Order */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-primary-950">Order:</span>

        <Dropdown
          value={filterOptions.sort}
          onChange={(value) => handleFilterOptions('sort', value)}
          width="w-52"
          options={SORT_ORDER_OPTIONS}
        />
      </div>

      {/* Per Page */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-primary-950">
          Per Page:
        </span>

        <Dropdown
          value={String(filterOptions.limit)}
          onChange={(value) => handleFilterOptions('limit', value)}
          width="w-24"
          options={PAGE_LIMIT_OPTIONS}
        />
      </div>
    </div>
  );
};

export default FilterBar;
