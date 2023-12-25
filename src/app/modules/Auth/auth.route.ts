import express from 'express';
import { AuthControllers } from './auth.controller';
import validationRequest from '../../middlewares/validationRequest';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validationRequest(AuthValidations.userRegisterValidationSchema),
  AuthControllers.register,
);

router.post(
  '/login',
  validationRequest(AuthValidations.userLoginValidationSchema),
  AuthControllers.login,
);

export const AuthRoutes = router;
