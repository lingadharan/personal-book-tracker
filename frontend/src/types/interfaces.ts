import { TAG_CONSTANTS } from '@/utiles/constants';

export interface Book {
  _id: string;
  title: string;
  author: string;
  totalPage: number;
  currentPage?: number;
  durationToComplete?: string;
  suggestedBy?: string;
  readStatus?: 'completed' | 'plan to read' | 'in Progress';
  notes?: string;
  category: 'reading' | 'read' | 'interest' | 'favourite';
}

export type SelectedTag = (typeof TAG_CONSTANTS)[number];

export interface IBookPagination {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IBooksApiResponse {
  success: boolean;
  data: Book[];
  pagination: IBookPagination;
}

export interface IUpdateApiResponse {
  success: boolean;
  data: Book;
}

export interface IFilterOptions {
  field: string;
  sort: 'desc' | 'asc';
  limit: 5 | 10 | 20 | 50;
}

export interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}
