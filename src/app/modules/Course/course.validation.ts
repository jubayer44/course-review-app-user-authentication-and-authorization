import { z } from 'zod';

const createTagsValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const createDetailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, { message: 'Title must be at least 3 characters' })
      .max(50, { message: 'Title must be at most 30 characters' }),
    instructor: z
      .string()
      .min(3, { message: 'Instructor name must be at least 3 characters' })
      .max(50, { message: 'Instructor name must be at most 30 characters' }),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(createTagsValidationSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: createDetailsValidationSchema,
  }),
});

const updateTagsValidationSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updateDetailsValidationSchema = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, { message: 'Title must be at least 3 characters' })
      .max(50, { message: 'Title must be at most 30 characters' })
      .optional(),
    instructor: z
      .string()
      .min(3, { message: 'Instructor name must be at least 3 characters' })
      .max(50, { message: 'Instructor name must be at most 30 characters' })
      .optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(updateTagsValidationSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateDetailsValidationSchema.optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
