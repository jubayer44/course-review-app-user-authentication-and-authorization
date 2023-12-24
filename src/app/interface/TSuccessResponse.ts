export type TSuccessResponse<T> = {
  success: true;
  statusCode: number;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
