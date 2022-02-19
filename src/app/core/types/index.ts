export interface Paginable<T> {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  data: T[];
}

export interface PaginableParams {
  page: number;
  perPage: number;
}
