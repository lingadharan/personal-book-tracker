import { SelectedTag } from '@/types/interfaces';
import Table from '@/ui/table';

export default function ReadContent({
  selectedTag,
}: {
  selectedTag: SelectedTag;
}) {
  return (
    <div>
      <Table />
    </div>
  );
}
