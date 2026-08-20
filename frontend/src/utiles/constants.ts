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
