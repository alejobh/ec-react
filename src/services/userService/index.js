/* eslint-disable camelcase */
import { create } from 'apisauce';

const API = create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export const login = credentials =>
  API.post('/users/sign_in', {
    email: credentials.email,
    password: credentials.password
  });

export const signUp = userData =>
  API.post('/users', {
    email: userData.email,
    password: userData.password,
    password_confirmation: userData.confirmPassword,
    first_name: userData.firstName,
    last_name: userData.lastName,
    locale: 'en'
  });
