import { SelectedTag } from "@/types/interfaces";
import Table from "@/ui/table";

export default function InterestBookContent({selectedTag}: {selectedTag: SelectedTag}) {
  return (
    <Table selectedTag={selectedTag}/>
  )
}