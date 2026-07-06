import { SelectedTag } from "@/types/interfaces";
import Table from "@/ui/table";

export default function ReadingContent({selectedTag} : {selectedTag: SelectedTag}) {
  return (
    <div>
      <Table selectedTag={selectedTag}/>
    </div>
  )
}