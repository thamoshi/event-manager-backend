export interface PaginatedResult<T> {
  data: T[];
  perPage: number;
  totalPages: number;
  currentPage: number;
  prev: number;
  next: number;
}
