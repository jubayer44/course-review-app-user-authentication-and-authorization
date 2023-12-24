import { Query } from 'mongoose';

const sortQuery = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
) => {
  // Sorting
  let sortBy = 'title';
  const sortOrder = query?.sortOrder;

  if (query.sortBy as string) {
    if (sortOrder === 'asc') {
      sortBy = query.sortBy as string;
    } else if (sortOrder === 'desc') {
      sortBy = `-${query.sortBy as string}`;
    } else {
      sortBy = query.sortBy as string;
    }
  }

  modelQuery = modelQuery.sort(sortBy);

  return modelQuery;
};

export default sortQuery;
