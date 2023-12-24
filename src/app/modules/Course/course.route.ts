import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/course',
  validationRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/courses/:courseId/reviews', CourseControllers.getCourseReviews);

router.get('/courses', CourseControllers.getAllCourse);

router.get('/course/best', CourseControllers.getBestCourseReviews);

router.put(
  '/courses/:courseId',
  validationRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const CourseRoutes = router;
