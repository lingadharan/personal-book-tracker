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
  console.log('Filter: ', filterOptions);
  const selectClassName =
    "cursor-pointer appearance-none rounded-md border border-amber-200 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-800 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 accent-amber-600 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2378350F%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:9px_9px] bg-[right_10px_center] bg-no-repeat";

  const optionClassName = 'bg-white text-gray-800 py-1 hover:bg-amber-50';

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
          <select
            value={filterOptions.field}
            name="field"
            onChange={(e) => handleFilterOptions(e.target.name, e.target.value)}
            className={selectClassName}
          >
            <option value="createdAt" className={optionClassName}>
              Created At
            </option>
            <option value="title" className={optionClassName}>
              Book Name
            </option>
            <option value="author" className={optionClassName}>
              Author
            </option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-amber-950">Order:</label>
          <select
            value={filterOptions.sort}
            name="sort"
            onChange={(e) => handleFilterOptions(e.target.name, e.target.value)}
            className={selectClassName}
          >
            <option value="desc" className={optionClassName}>
              Descending (Newest)
            </option>
            <option value="asc" className={optionClassName}>
              Ascending (Oldest)
            </option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-amber-950">
            Per Page:
          </label>
          <select
            value={filterOptions.limit}
            onChange={(e) => handleFilterOptions(e.target.name, e.target.value)}
            name="limit"
            className={selectClassName}
          >
            <option value={5} className={optionClassName}>
              5
            </option>
            <option value={10} className={optionClassName}>
              10
            </option>
            <option value={20} className={optionClassName}>
              20
            </option>
            <option value={50} className={optionClassName}>
              50
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
