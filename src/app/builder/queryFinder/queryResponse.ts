import { Query } from 'mongoose';
import { Course } from '../../modules/Course/course.model';
import { TQueryResponse } from '../../interface/TQueryResponseType';

const paginateQuery = async <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
): Promise<TQueryResponse<T>> => {
  // Paginate

  let page = 1;
  let limit = 10;
  let skip = 0;

  if (query?.page) {
    page = Number(query.page);
  }

  if (query?.limit) {
    limit = Number(query.limit);
    skip = (page - 1) * limit;
  }

  modelQuery = modelQuery.skip(skip).limit(limit);

  const total = await Course.countDocuments();

  const meta = {
    page,
    limit,
    total,
  };

  const modelQueryResult = await modelQuery.exec();

  return { modelQuery: modelQueryResult, meta };
};

export default paginateQuery;
