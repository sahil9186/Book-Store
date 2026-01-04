
export interface Book {
  id?: number;
  title: string;
  author: string;
  price: number;
  available: boolean;
  createdAt?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
