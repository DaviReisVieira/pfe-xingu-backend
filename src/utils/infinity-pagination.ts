import { IPaginationOptions } from './types/pagination-options';

export const infinityPagination = (data: any, options: IPaginationOptions) => {
  return {
    data,
    count: data.length,
    nextPageExists: data.length === options.limit,
  };
};
