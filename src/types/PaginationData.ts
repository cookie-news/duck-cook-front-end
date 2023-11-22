export interface PaginationData<T> {
  next: number;
  previous: number;
  currentPage: number;
  totalPage: number;
  items: Array<T>;
}
