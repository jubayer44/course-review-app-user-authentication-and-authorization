import { Query } from 'mongoose';

const filterQuery = <T>(
  modelQuery: Query<T[], T>,
  query: Record<string, unknown>,
) => {
  const queryObj = { ...query };

  const excludeFields = [
    'page',
    'sort',
    'limit',
    'fields',
    'sortBy',
    'sortOrder',
    'minPrice',
    'maxPrice',
    'startDate',
    'endDate',
    'level',
    'tags',
  ];

  // Loop over excludeFields and delete them from queryObj
  excludeFields.forEach((el) => delete queryObj[el]);

  // Filter out courses based on query
  modelQuery = modelQuery.find(queryObj as Partial<T>);

  if (query?.startDate && query?.endDate) {
    modelQuery = modelQuery.find({
      $and: [
        { startDate: { $gte: query?.startDate } },
        { endDate: { $lte: query?.endDate } },
      ],
    });
  }

  if (query?.tags) {
    modelQuery = modelQuery.where('tags.name').in(query?.tags as string[]);
  }

  if (query?.level) {
    modelQuery = modelQuery.where('details.level').in(query?.level as string[]);
  }

  const minPrice = (query?.minPrice as number) || 0;
  const maxPrice = (query?.maxPrice as number) || Infinity;

  // Filtering min and max price
  if (query?.minPrice || query?.maxPrice) {
    modelQuery = modelQuery.where('price').gte(minPrice).lte(maxPrice);
  }

  return modelQuery;
};

export default filterQuery;
