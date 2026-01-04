
import api from './api';
import { Book } from '../types';

export const bookService = {
  getAllBooks: async (): Promise<Book[]> => {
    const response = await api.get('/books');
    return response.data;
  },

  getBookById: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  createBook: async (book: Book): Promise<Book> => {
    const response = await api.post('/books', book);
    return response.data;
  },

  updateBook: async (id: number, book: Book): Promise<Book> => {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },

  deleteBook: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },
};
