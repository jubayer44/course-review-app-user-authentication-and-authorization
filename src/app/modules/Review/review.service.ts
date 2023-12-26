import { TReview } from './review.interface';
import { Review } from './review.model';
import { JwtPayload } from 'jsonwebtoken';

const createReviewIntoDb = async (userData: JwtPayload, payload: TReview) => {
  const { _id } = userData;
  const result = await (
    await Review.create({ ...payload, createdBy: _id })
  ).populate('createdBy');
  return result;
};

export const ReviewServices = {
  createReviewIntoDb,
};
