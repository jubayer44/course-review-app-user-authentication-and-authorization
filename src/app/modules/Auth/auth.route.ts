import express from 'express';
import { AuthControllers } from './auth.controller';
import validationRequest from '../../middlewares/validationRequest';
import { AuthValidations } from './auth.validation';
import checkAuth from '../../middlewares/checkAuth';

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

router.post(
  '/change-password',
  checkAuth('admin', 'user'),
  validationRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
