import { TAG_CONSTANTS } from '@/utiles/constants';

export type BookCategory = 'reading' | 'read' | 'interest' | 'favourite';
export type ReadStatus = 'completed' | 'need-to-plan' | 'in-progress';

export interface Book {
  _id: string;
  title: string;
  author: string;
  totalPage: number;
  currentPage?: number;
  durationToComplete?: string;
  suggestedBy?: string;
  readStatus?: ReadStatus;
  notes?: string;
  category: BookCategory;
}

export type BookFormData = Omit<Book, '_id'> & { _id?: string };

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
  footer?: React.ReactNode;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  width?: string;
}

export interface IUser {
  _id: string;
  email: string;
  name?: string;
  avatar?: string;
  provider: string;
}

export interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface IAuthResponse {
  isAuthenticated: boolean;
  user: IUser;
}

export interface DashboardBook {
  _id: string;
  title: string;
  author: string;
  totalPage?: number;
  currentPage?: number;
}

export interface BookCategoryCount {
  _id: 'reading' | 'read' | 'interest' | 'favourite';
  count: number;
}

export interface BookSummary {
  totalBooks: Array<{ count: number }>;
  counts: BookCategoryCount[];
}

export interface BookDashboardData {
  summary: BookSummary;
  readingBooks: DashboardBook[];
  recentlyRead: DashboardBook[];
  interestBooks: DashboardBook[];
  favouriteBooks: DashboardBook[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type BookDashboardResponse = ApiResponse<BookDashboardData>;
