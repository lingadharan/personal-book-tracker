import type { IBook } from '../models/book.js';

export interface IFilterBookControllerRequestDTO {
  page?: string;
  limit?: string;
  sort?: string;
  field?: string;
  category?: string;
}

export interface IFilterBookRequestDTO {
  userId: string;
  page: number;
  limit: number;
  sort?: string;
  field?: string;
  category?: string;
}

export interface IFilterBookResponseDTO {
  data: IBook[];
  pagination: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
