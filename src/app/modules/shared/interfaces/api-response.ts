export interface ApiResponse<T = any> {
  data: T;
  errors: boolean;
}
