import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import checkAuth from '../../middlewares/checkAuth';

const router = express.Router();

router.post(
  '/courses',
  checkAuth('admin'),
  validationRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/courses/:courseId/reviews', CourseControllers.getCourseReviews);

router.get('/courses', CourseControllers.getAllCourse);

router.get('/course/best', CourseControllers.getBestCourseReviews);

router.put(
  '/courses/:courseId',
  checkAuth('admin'),
  validationRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const CourseRoutes = router;
