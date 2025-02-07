export {};

declare global {
  type RootRequest = {
    index: number;
    size: number;
  };

  type RootResponse<T> = {
    value: T;
    isSuccess: boolean;
    message: string;
  };

  type Size = 'sm' | 'md' | 'lg' | 'xl';
}
