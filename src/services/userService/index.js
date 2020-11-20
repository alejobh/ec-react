import api from '../../config/api';

export const login = credentials => api.post('/users/sign_in', credentials);

export const signUp = userData => api.post('/users', userData);

export const persistSession = response => {
  if (response.headers && response.headers.accessToken && response.headers.client && response.headers.uid) {
    localStorage.setItem('accessToken', response.headers.accessToken);
    localStorage.setItem('client', response.headers.client);
    localStorage.setItem('uid', response.headers.uid);

    api.setHeaders({ 'access-token': response.headers.accessToken });
    api.setHeaders({ uid: response.headers.uid });
    api.setHeaders({ client: response.headers.client });
    return true;
  }
  return false;
};

export const clearSession = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('client');
  localStorage.removeItem('uid');

  delete api.headers['access-token'];
  delete api.headers.client;
  delete api.headers.uid;
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('accessToken');
  return token && token.length;
};

export const getAuthData = () => ({
  accessToken: localStorage.getItem('accessToken'),
  client: localStorage.getItem('client'),
  uid: localStorage.getItem('uid')
});
