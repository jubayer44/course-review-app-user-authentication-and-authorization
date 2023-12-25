import { Request, Response } from 'express';
import { CategoryServices } from './category.service';
import catchAsyncFunction from '../../utils/catchAsyncFunction';
import { successResponse } from '../../utils/successResponse';
import httpStatus from 'http-status';

const createCategory = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const userData = req.user;

    const result = await CategoryServices.createCategoryIntoDb(
      userData,
      req.body,
    );

    successResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Category created successfully',
      data: result,
    });
  },
);

const getAllCategories = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.getAllCategoriesFromDb();

    successResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Categories retrieved successfully',
      data: { categories: result },
    });
  },
);

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};
