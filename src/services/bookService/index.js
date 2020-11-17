import api from '../../config/api';

export const getBooks = () => api.get('/books');

export const getBookDetail = id => api.get(`/books/${id}`);
