/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from 'mongoose';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { calculateCourseDuration } from './course.utils';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import filterQuery from '../../builder/queryFinder/filterQuery';
import sortQuery from '../../builder/queryFinder/sortQuery';
import paginateQuery from '../../builder/queryFinder/queryResponse';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';

const createCourseIntoDb = async (userData: JwtPayload, payload: TCourse) => {
  const { _id, email } = userData;

  const user = await User.findOne({ _id, email }).select('_id');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const timeDifference =
    new Date(payload.endDate).getTime() - new Date(payload.startDate).getTime();

  const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

  const weeksDifference = Math.ceil(dayDifference / 7);

  payload.durationInWeeks = weeksDifference;

  const course = await Course.create({ ...payload, createdBy: user._id });
  return course;
};

const getCourseReviewsFromDb = async (courseId: string) => {
  const result = await Course.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(courseId),
      },
    },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
  ]);

  return result;
};

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const filter = filterQuery(Course.find(), query).populate('createdBy');

  const sorting = sortQuery(filter, query);

  const result = await paginateQuery(sorting, query);

  return { result: result.modelQuery, meta: result?.meta };
};

const getBestCourseReviewsFromDb = async () => {
  const result = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: {
          $avg: '$reviews.rating',
        },
        reviewCount: {
          $size: '$reviews',
        },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $project: {
        reviews: 0,
      },
    },
    {
      $limit: 1,
    },
  ]);

  return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingData } = payload;

  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingCourse = await Course.findById(id).session(session);

    if (!existingCourse) {
      throw new Error('Course not found');
    }

    // calculate course duration
    calculateCourseDuration(modifiedData, existingCourse);

    if (details && Object.keys(details).length > 0) {
      for (const [key, value] of Object.entries(details)) {
        modifiedData[`details.${key}`] = value;
      }
    }

    const updateData = await Course.findByIdAndUpdate(id, modifiedData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updateData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course updating failed');
    }

    if (tags && tags.length > 0) {
      const deletedTags = tags
        .filter((tag) => tag.name && tag.isDeleted)
        .map((el) => el.name);
      const deletedCourseTags = await Course.findByIdAndUpdate(
        id,
        { $pull: { tags: { name: { $in: deletedTags } } } },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedCourseTags) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course updating failed');
      }

      const newTags = tags.filter((tag) => tag.name && !tag.isDeleted);

      const newCourseTags = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            tags: { $each: newTags },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newCourseTags) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Course updating failed');
      }
    }

    const result = await Course.findById(id).session(session);

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }
};

export const CourseServices = {
  createCourseIntoDb,
  getCourseReviewsFromDb,
  getBestCourseReviewsFromDb,
  updateCourseIntoDb,
  getAllCoursesFromDb,
};
