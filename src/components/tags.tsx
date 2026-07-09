import { SetSelectedTagInterface } from '@/types/interfaces';
import { TAG_CONSTANTS } from '@/utiles/constants';

export default function Tags({
  setSelectedTag,
  selectedTag,
}: SetSelectedTagInterface) {
  return (
    <div className="pt-6">
      {TAG_CONSTANTS.map((val, ind: number) => (
        <span
          key={ind}
          onClick={() => setSelectedTag(val)}
          className={`p-2 text-2xl hover:text-gray-600 ${selectedTag === val && 'font-bold '}`}
        >
          {val}
        </span>
      ))}
    </div>
  );
}
