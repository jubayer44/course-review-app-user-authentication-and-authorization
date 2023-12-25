import { z } from 'zod';

const userRegisterRoleValidationSchema = z.enum(['user', 'admin'], {
  required_error: 'Role is required',
  invalid_type_error: 'Role must be a string',
});

const userRegisterValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must be at least 6 characters long')
      .max(30, 'Password must be at most 30 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one digit')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character',
      ),
    role: userRegisterRoleValidationSchema,
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'Current password is required',
      invalid_type_error: 'Current password must be a string',
    }),
    newPassword: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must be at least 6 characters long')
      .max(30, 'Password must be at most 30 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one digit')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character',
      ),
  }),
});

export const AuthValidations = {
  userRegisterValidationSchema,
  userLoginValidationSchema,
  changePasswordValidationSchema,
};
