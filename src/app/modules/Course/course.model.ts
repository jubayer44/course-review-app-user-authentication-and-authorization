import { Schema, model } from 'mongoose';
import { TCourse, TTags } from './course.interface';

const tagSchema = new Schema<TTags>(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const detailsSchema = new Schema(
  {
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [tagSchema],
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
    },
    details: {
      type: detailsSchema,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      versionKey: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Course = model<TCourse>('Course', courseSchema);
