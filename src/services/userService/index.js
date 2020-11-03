/* eslint-disable camelcase */
import { create } from 'apisauce';

class UserService {
  constructor() {
    this.API = create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }

  login(credentials) {
    return this.API.post('/users/sessions', {
      session: {
        email: credentials.email,
        password: credentials.password
      }
    });
  }

  signUp(userData) {
    return this.API.post('/users', {
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.confirmPassword,
      first_name: userData.firstName,
      last_name: userData.lastName,
      locale: 'en'
    });
  }
}

export default UserService;
