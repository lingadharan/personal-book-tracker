import { Book } from "@/types/interfaces"

export const TAG_CONSTANTS = ['dashboard', 'reading', 'read', 'interest', 'favourite'] as const;

export const READING_CONTENT_HEAD = ['No', 'Book Name', 'Author', 'Page No', 'Actions'];

export const READ_CONTENT_HEAD = ['No', 'Book Name', 'Author', 'Duration to Complete', 'Notes', 'Actions'];

export const INTEREST_BOOK_CONTENT_HEAD = ['No', 'Book Name', 'Author', 'Suggested', 'Notes', 'Actions'];

export const FAVOURITE_BOOK_CONTENT_HEAD = ['No', 'Book Name', 'Author', 'Read Status', 'Notes', 'Actions'];