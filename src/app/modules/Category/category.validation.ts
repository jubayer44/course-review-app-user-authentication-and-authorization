import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'required',
      invalid_type_error: 'Name must be a string',
    }),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
};
