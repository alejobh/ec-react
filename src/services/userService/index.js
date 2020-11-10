// eslint-disable-next-line
import { api } from '../../config';

export const login = credentials => api.post('/users/sessions', credentials);

export const signUp = userData => api.post('/users', userData);
