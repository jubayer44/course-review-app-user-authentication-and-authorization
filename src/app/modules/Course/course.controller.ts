import { Request, Response } from 'express';
import catchAsyncFunction from '../../utils/catchAsyncFunction';
import { successResponse } from '../../utils/successResponse';
import { CourseServices } from './course.service';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourse = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDb(req.body);

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: result,
  });
});

const getCourseReviews = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await CourseServices.getCourseReviewsFromDb(
      req.params.courseId,
    );

    if (result?.length < 1) {
      throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }

    const { reviews, ...remainingData } = result[0];
    const newResult = {
      course: remainingData,
      reviews,
    };

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course and Reviews retrieved successfully',
      data: newResult,
    });
  },
);

const getAllCourse = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCoursesFromDb(req.query);

  if (result?.result?.length < 1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: result?.meta,
    data: result?.result,
  });
});

const getBestCourseReviews = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await CourseServices.getBestCourseReviewsFromDb();

    if (result?.length < 1) {
      throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }

    const { reviewCount, averageRating, ...remainingData } = result[0];

    const avgRating = averageRating?.toFixed(1);
    const newResult = {
      course: remainingData,
      averageRating: avgRating,
      reviewCount,
    };

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Best course retrieved successfully',
      data: newResult,
    });
  },
);

const updateCourse = catchAsyncFunction(async (req: Request, res: Response) => {
  const { courseId } = req.params;

  const result = await CourseServices.updateCourseIntoDb(courseId, req.body);

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getCourseReviews,
  getAllCourse,
  getBestCourseReviews,
  updateCourse,
};
