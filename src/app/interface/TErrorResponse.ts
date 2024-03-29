/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: string;
  errorDetails?: any;
  stack?: string | null;
};
