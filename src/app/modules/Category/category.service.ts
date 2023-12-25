import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import { User } from '../User/user.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const createCategoryIntoDb = async (
  userData: JwtPayload,
  payload: TCategory,
) => {
  const { _id, email } = userData;

  const user = await User.findOne({ _id, email }).select('_id');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const category = await Category.create({ ...payload, createdBy: user._id });

  return category;
};

const getAllCategoriesFromDb = async () => {
  const category = await Category.find().populate('createdBy');

  return category;
};

export const CategoryServices = {
  createCategoryIntoDb,
  getAllCategoriesFromDb,
};
