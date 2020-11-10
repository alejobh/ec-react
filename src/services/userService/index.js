/* eslint-disable camelcase */
import { api } from '../../constants/api';

export const login = credentials =>
  api.post('/users/sessions', {
    session: {
      email: credentials.email,
      password: credentials.password
    }
  });

export const signUp = userData =>
  api.post('/users', {
    email: userData.email,
    password: userData.password,
    password_confirmation: userData.confirmPassword,
    first_name: userData.firstName,
    last_name: userData.lastName,
    locale: 'en'
  });
