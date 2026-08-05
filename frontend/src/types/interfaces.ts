import { TAG_CONSTANTS } from '@/utiles/constants';

export interface Book {
  _id: string;
  title: string;
  author: string;
  currentPage?: number;
  durationToComplete?: string;
  suggestedBy?: string;
  readStatus?: 'completed' | 'plan to read' | 'in Progress';
  notes?: string;
  category: 'reading' | 'read' | 'interest' | 'favourite';
}

export type SelectedTag = (typeof TAG_CONSTANTS)[number];
