export const TAG_CONSTANTS = [
  'Overview',
  'Currently Reading',
  'Completed Books',
  'Wishlist',
  'Favorite Books',
];

export const TAG_PATHS: Record<(typeof TAG_CONSTANTS)[number], string> = {
  Overview: '/',
  'Currently Reading': '/books/reading',
  'Completed Books': '/books/completed',
  Wishlist: '/books/wishlist',
  'Favorite Books': '/books/favourites',
};

export const READING_CONTENT_HEAD = [
  'No',
  'Book Name',
  'Author',
  'Page No',
  'Notes',
  'Actions',
];

export const READ_CONTENT_HEAD = [
  'No',
  'Book Name',
  'Author',
  'Duration to Complete',
  'Notes',
  'Actions',
];

export const INTEREST_BOOK_CONTENT_HEAD = [
  'No',
  'Book Name',
  'Author',
  'Suggested',
  'Notes',
  'Actions',
];

export const FAVOURITE_BOOK_CONTENT_HEAD = [
  'No',
  'Book Name',
  'Author',
  'Read Status',
  'Notes',
  'Actions',
];

export const SORT_FIELD_OPTIONS = [
  {
    value: 'createdAt',
    label: 'Created At',
  },
  {
    value: 'title',
    label: 'Book Name',
  },
  {
    value: 'author',
    label: 'Author',
  },
];

export const SORT_ORDER_OPTIONS = [
  {
    value: 'desc',
    label: 'Descending (Newest)',
  },
  {
    value: 'asc',
    label: 'Ascending (Oldest)',
  },
];

export const PAGE_LIMIT_OPTIONS = [
  {
    value: '5',
    label: '5',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '50',
    label: '50',
  },
];

export const THEMES = [
  { value: 'amber', label: 'Amber' },
  { value: 'blue', label: 'Blue' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
] as const;

export const DEFAULT_THEME = 'amber';

export const THEME_VALUES: Record<string, string> = {
  amber: 'amber',
  blue: 'blue',
  emerald: 'emerald',
  yellow: 'yellow',
  green: 'green',
};

export const BOOK_CATEGORIES = [
  'Reading',
  'Read',
  'Interest',
  'Favourite',
] as const;

export const READ_STATUS_OPTIONS = [
  'completed',
  'in-progress',
  'need-to-plan',
] as const;

export const INITIAL_BOOK_FORM_STATE = {
  title: '',
  author: '',
  totalPage: 0,
  currentPage: 0,
  durationToComplete: '0',
  suggestedBy: '',
  readStatus: 'completed' as const,
  notes: '',
  category: 'reading' as const,
};

export const DEFAULT_FILTER_OPTIONS = {
  field: 'createdAt',
  sort: 'desc' as const,
  limit: 10 as const,
};

export const API_ROUTES = {
  AUTH_GOOGLE: '/auth/google',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',
  DASHBOARD: '/dashboard',
  BOOKS: '/books',
  ADD_BOOK: '/add-book',
  UPDATE_BOOK: '/update-book',
  DELETE_BOOK: '/delete-book',
  GET_BOOK: '/get-book',
} as const;

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  NEW_BOOK: '/new-book',
  UPDATE_BOOK: '/update-book',
  READING: '/books/reading',
  COMPLETED: '/books/completed',
  WISHLIST: '/books/wishlist',
  FAVOURITES: '/books/favourites',
} as const;
