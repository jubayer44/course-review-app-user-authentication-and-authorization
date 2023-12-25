import express from 'express';
import { CategoryControllers } from './category.controller';
import validationRequest from '../../middlewares/validationRequest';
import { CategoryValidations } from './category.validation';
import checkAuth from '../../middlewares/checkAuth';

const router = express.Router();

router.post(
  '/',
  checkAuth('admin'),
  validationRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
