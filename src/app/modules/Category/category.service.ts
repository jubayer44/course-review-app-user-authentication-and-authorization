import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDb = async (
  userData: JwtPayload,
  payload: TCategory,
) => {
  const { _id } = userData;

  const category = await Category.create({ ...payload, createdBy: _id });

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
