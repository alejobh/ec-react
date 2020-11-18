import api from '../../config/api';

export const login = credentials => api.post('/users/sign_in', credentials);

export const signUp = userData => api.post('/users', userData);

export const persistSession = accessToken => {
  localStorage.setItem('accessToken', accessToken);
};

export const clearSession = () => {
  localStorage.removeItem('accessToken');
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('accessToken');
  return token && token.length;
};
