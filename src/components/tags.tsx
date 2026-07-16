import { SetSelectedTagInterface } from '@/types/interfaces';
import { TAG_CONSTANTS } from '@/utiles/constants';

export default function Tags({
  setSelectedTag,
  selectedTag,
}: SetSelectedTagInterface) {
  return (
    <div className="flex flex-wrap justify-center gap-2 pt-6 sm:gap-3 lg:gap-4">
      {TAG_CONSTANTS.map((val, ind) => (
        <button
          key={ind}
          type="button"
          onClick={() => setSelectedTag(val)}
          className={`
        rounded-[15px]
        px-3
        py-2
        text-sm
        font-medium
        transition-all
        duration-200
        hover:bg-gray-200
        hover:text-gray-700

        sm:text-base
        lg:text-lg

        ${
          selectedTag === val
            ? 'bg-amber-200 font-semibold text-amber-900'
            : 'bg-gray-100 text-gray-600'
        }
      `}
        >
          {val}
        </button>
      ))}
    </div>
  );
}
