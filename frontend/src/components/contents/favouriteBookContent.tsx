import { SelectedTag } from '@/types/interfaces';
import Table from '@/ui/table';

export default function FavouriteBookContent({
  selectedTag,
}: {
  selectedTag: SelectedTag;
}) {
  return <Table selectedTag={selectedTag} />;
}
