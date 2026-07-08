import { TAG_CONSTANTS } from "@/utiles/constants";

export interface SetSelectedTagInterface {
  setSelectedTag: (tag: SelectedTag) => void,
  selectedTag: SelectedTag
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  currentPage?: number;
  durationToComplete?: string;
  suggestedBy?: string;
  readStatus?: "Completed" | "Plan to Read" | "In Progress";
  notes?: string;
  category: "reading" | "read" | "interest" | "favourite";
}

export type SelectedTag = typeof TAG_CONSTANTS[number];

