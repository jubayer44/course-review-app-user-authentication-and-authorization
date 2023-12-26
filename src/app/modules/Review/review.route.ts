import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { ReviewValidations } from './review.validation';
import { ReviewControllers } from './review.controller';
import checkAuth from '../../middlewares/checkAuth';

const router = express.Router();

router.post(
  '/reviews',
  checkAuth('user'),
  validationRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
