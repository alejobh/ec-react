/* eslint-disable camelcase */
import api from '../../config/api';

export const login = credentials => api.post('/users/sessions', credentials);

export const signUp = userData => api.post('/users', userData);
