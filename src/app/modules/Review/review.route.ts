import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { ReviewValidations } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/',
  validationRequest(ReviewValidations.createReviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
