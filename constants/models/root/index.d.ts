export {};

declare global {
  type RootRequest = {
    index: number;
    size: number;
    keyword: string;
  };

  type ListPagination = {
    limit: number;
    lastId: number;
  };

  type RootResponse<T> = {
    value: T;
    isSuccess: boolean;
    message: string;
  };

  type Size = 'sm' | 'md' | 'lg' | 'xl';

  type Pagination<T> = {
    items: T[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    hasNext: boolean;
  };
}
