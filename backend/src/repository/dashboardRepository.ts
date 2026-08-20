import mongoose from 'mongoose';
import Book from '../models/book.js';

class DashboardRepository {
  async getDashboardDetails(userId: string) {
    const objectUserId = new mongoose.Types.ObjectId(userId);

    const [summary, readingBooks, recentlyRead, interestBooks, favouriteBooks] =
      await Promise.all([
        Book.aggregate([
          {
            $match: {
              userId: objectUserId,
            },
          },
          {
            $facet: {
              totalBooks: [{ $count: 'count' }],

              counts: [
                {
                  $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                  },
                },
              ],
            },
          },
        ]),

        Book.find({
          userId: objectUserId,
          category: 'reading',
        })
          .select('_id title author currentPage totalPage')
          .sort({ updatedAt: -1 })
          .limit(10)
          .lean(),

        Book.find({
          userId: objectUserId,
          category: 'read',
        })
          .select('_id title author')
          .sort({ updatedAt: -1 })
          .limit(5)
          .lean(),

        Book.find({
          userId: objectUserId,
          category: 'interest',
        })
          .select('_id title author')
          .sort({ updatedAt: -1 })
          .limit(5)
          .lean(),

        Book.find({
          userId: objectUserId,
          category: 'favourite',
        })
          .select('_id title author')
          .sort({ updatedAt: -1 })
          .limit(5)
          .lean(),
      ]);

    return {
      summary: summary[0],
      readingBooks,
      recentlyRead,
      interestBooks,
      favouriteBooks,
    };
  }
}

export default new DashboardRepository();
