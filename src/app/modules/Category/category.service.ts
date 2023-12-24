import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDb = async (payload: TCategory) => {
  const category = await Category.create(payload);

  return category;
};

const getAllCategoriesFromDb = async () => {
  const category = await Category.find();

  return category;
};

export const CategoryServices = {
  createCategoryIntoDb,
  getAllCategoriesFromDb,
};
