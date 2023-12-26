import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { Course } from '../Course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { JwtPayload } from 'jsonwebtoken';

const createReviewIntoDb = async (userData: JwtPayload, payload: TReview) => {
  const { _id } = userData;

  const isCourseExists = await Course.findById(payload?.courseId);

  // check course exists or not
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const result = await (
    await Review.create({ ...payload, createdBy: _id })
  ).populate('createdBy');
  return result;
};

export const ReviewServices = {
  createReviewIntoDb,
};
