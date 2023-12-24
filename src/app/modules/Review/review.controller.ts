import { Request, Response } from 'express';
import catchAsyncFunction from '../../utils/catchAsyncFunction';
import { ReviewServices } from './review.service';
import { successResponse } from '../../utils/successResponse';

const createReview = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await ReviewServices.createReviewIntoDb(req.body);

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
};
