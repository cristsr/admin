export interface Pageable<T> {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  lastPage: boolean;
  data: T[];
}

export interface PaginableQuery {
  page: number;
  perPage: number;
}
