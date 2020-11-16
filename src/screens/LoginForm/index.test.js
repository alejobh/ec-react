import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';
import { BrowserRouter as Router } from 'react-router-dom';

import LoginForm from './index';

const statusErrorUnprocessableEntity = 422;

const mockApiResponseError = {
  status: 'error',
  errors: ['Invalid login credentials']
};

const server = setupServer(
  rest.post(`${process.env.REACT_APP_BASE_API_URL}/users/sign_in`, (req, res, ctx) =>
    res(ctx.status(statusErrorUnprocessableEntity), ctx.json(mockApiResponseError))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());

beforeEach(() => {
  jest.resetModules();
});

afterAll(() => {
  server.close();
});

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );
  });

  test('Invalid credentals', async () => {
    const inputEmail = screen.getByTestId('email');
    const inputPassword = screen.getByTestId('password');
    const loginButton = screen.getByTestId('loginButton');

    fireEvent.change(inputEmail, { target: { value: 'email@email.com' } });
    fireEvent.change(inputPassword, { target: { value: 'invalid password' } });

    fireEvent.click(loginButton);

    const error = await waitFor(() => screen.getByTestId('error'));
    expect(error).toBeInTheDocument();
  });

  test('The email is incorrect', async () => {
    const inputEmail = screen.getByTestId('email');
    const loginButton = screen.getByTestId('loginButton');

    fireEvent.change(inputEmail, { target: { value: 'Invalid mail' } });
    fireEvent.click(loginButton);

    const error = await waitFor(() => screen.getByTestId('emailError'));
    expect(error).toBeInTheDocument();
  });

  test('If there is a wrong field cannot login', () => {
    const loginButton = screen.getByTestId('loginButton');

    fireEvent.click(loginButton);
    expect(loginButton).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).toBeNull();
  });
});
