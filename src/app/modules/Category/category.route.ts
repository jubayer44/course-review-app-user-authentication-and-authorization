import express from 'express';
import { CategoryControllers } from './category.controller';
import validationRequest from '../../middlewares/validationRequest';
import { CategoryValidations } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
