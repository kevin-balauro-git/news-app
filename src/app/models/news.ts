import { Data } from './data';
import { Pagination } from './pagination';

export interface News {
  pagination: Pagination;
  data: Data[];
}
