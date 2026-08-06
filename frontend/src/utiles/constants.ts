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
