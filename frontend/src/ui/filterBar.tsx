'use client';
import { IFilterOptions } from '@/types/interfaces';
import { Dispatch, SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

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
    setFilterOptions({
      ...filterOptions,
      [field]: field === 'limit' ? Number(value) : value,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-lg border border-amber-200/60 bg-[#FFFDF0] p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-amber-950">
            Sort By:
          </label>
          <Select
            value={filterOptions.field}
            onValueChange={(value) =>
              handleFilterOptions('field', value || 'createdAt')
            }
          >
            <SelectTrigger className="w-[170px] border-amber-200 bg-white">
              <SelectValue>
                {(value) => {
                  switch (value) {
                    case 'createdAt':
                      return 'Created At';
                    case 'title':
                      return 'Book Name';
                    case 'author':
                      return 'Author';
                    default:
                      return 'Select...';
                  }
                }}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="createdAt">Created At</SelectItem>
              <SelectItem value="title">Book Name</SelectItem>
              <SelectItem value="author">Author</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-amber-950">Order:</label>

          <Select
            value={filterOptions.sort}
            onValueChange={(value) =>
              handleFilterOptions('sort', value || 'desc')
            }
          >
            <SelectTrigger className="w-[220px] border-amber-200 bg-white">
              <SelectValue>
                {(value) => {
                  switch (value) {
                    case 'desc':
                      return 'Descending (Newest)';
                    case 'asc':
                      return 'Ascending (Oldest)';
                    default:
                      return 'Select Order';
                  }
                }}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="desc">Descending (Newest)</SelectItem>

              <SelectItem value="asc">Ascending (Oldest)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-amber-950">
            Per Page:
          </label>

          <Select
            value={String(filterOptions.limit)}
            onValueChange={(value) =>
              handleFilterOptions('limit', value || '10')
            }
          >
            <SelectTrigger className="w-[100px] border-amber-200 bg-white">
              <SelectValue>{(value) => value}</SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
