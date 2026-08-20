import mongoose, { Schema, type Document } from 'mongoose';

export interface IBook {
  userId: mongoose.Types.ObjectId;
  title: string;
  author: string;
  totalPage: number;
  currentPage?: number;
  durationToComplete?: string;
  suggestedBy?: string;
  readStatus?: 'completed' | 'need-to-plan' | 'in-progress';
  notes?: string;
  category: 'reading' | 'read' | 'interest' | 'favourite';
}

const bookSchema = new Schema<IBook>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    totalPage: {
      type: Number,
      required: true,
      trim: true,
    },

    currentPage: {
      type: Number,
      default: null,
    },

    durationToComplete: {
      type: String,
      trim: true,
      default: null,
    },

    suggestedBy: {
      type: String,
      trim: true,
      default: null,
    },

    readStatus: {
      type: String,
      enum: ['completed', 'need-to-plan', 'in-progress'],
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: null,
    },

    category: {
      type: String,
      required: true,
      enum: ['reading', 'read', 'interest', 'favourite'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
