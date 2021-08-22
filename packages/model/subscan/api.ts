// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SResponse<T = any> {
  code: number;
  message: string;
  data?: T;
  generated_at: number; // timestamp
}
