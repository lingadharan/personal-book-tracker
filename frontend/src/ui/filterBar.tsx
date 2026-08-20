'use client';

import { IFilterOptions } from '@/types/interfaces';
import { Dispatch, SetStateAction } from 'react';
import Dropdown from './dropdown';
import {
  PAGE_LIMIT_OPTIONS,
  SORT_FIELD_OPTIONS,
  SORT_ORDER_OPTIONS,
} from '@/utiles/constants';

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
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-primary-950">Sort By:</span>

        <Dropdown
          value={filterOptions.field}
          onChange={(value) => handleFilterOptions('field', value)}
          width="w-40"
          options={SORT_FIELD_OPTIONS}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-primary-950">Order:</span>

        <Dropdown
          value={filterOptions.sort}
          onChange={(value) => handleFilterOptions('sort', value)}
          width="w-52"
          options={SORT_ORDER_OPTIONS}
        />
      </div>

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
