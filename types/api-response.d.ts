export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: {
    T: T;
  };
}
