import type { IFilterBookRequestDTO } from '../dto/filterBook.dto.js';
import type { IUpdateBookDetailsDTO } from '../dto/updateBookDetailsRequest.dto.js';
import Book, { type IBook } from '../models/book.js';

export default class BookRepository {
  async createBooks(books: IBook[]): Promise<IBook[]> {
    return await Book.insertMany(books);
  }

  async getBookById(id: string): Promise<IBook | null> {
    return await Book.findOne({ _id: id });
  }

  async getAllBooks(): Promise<IBook[] | null> {
    return await Book.find();
  }

  async updateBook(updateData: IUpdateBookDetailsDTO): Promise<IBook | null> {
    return await Book.findOneAndUpdate({ _id: updateData._id }, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteBook(_id: string): Promise<IBook | null> {
    return await Book.findOneAndDelete({ _id: _id });
  }

  async filterBookRepository(
    filter: Record<string, unknown>,
    sortOption: Record<string, 1 | -1>,
    skip: number,
    limit: number
  ): Promise<{ data: IBook[]; totalCount: number }> {
    const [data, totalCount] = await Promise.all([
      Book.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),

      Book.countDocuments(filter),
    ]);
    return { data, totalCount };
  }
}
