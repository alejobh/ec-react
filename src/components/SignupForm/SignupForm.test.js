import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';

import SignupForm from './index';

const statusErrorUnprocessableEntity = 422;

const server = setupServer();

const OLD_ENV = process.env;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
  process.env.REACT_APP_BASE_API_URL = 'http://api-test';
});

afterAll(() => {
  process.env = OLD_ENV;
  server.close();
});

const mockApiResponseError = {
  status: 'error',
  errors: {
    fullMessages: ['Password is too short (minimum is 6 characters)']
  }
};

describe('SignupForm', () => {
  beforeEach(() => {
    render(<SignupForm />);
  });

  test('The data is entered incorrectly', async () => {
    server.use(
      rest.post(`${process.env.REACT_APP_BASE_API_URL}/users`, (req, res, ctx) =>
        res(ctx.status(statusErrorUnprocessableEntity), ctx.json(mockApiResponseError))
      )
    );

    const inputName = screen.getByTestId('firstName');
    const inputLastName = screen.getByTestId('lastName');
    const inputEmail = screen.getByTestId('email');
    const inputPassword = screen.getByTestId('password');
    const inputConfirmPassword = screen.getByTestId('confirmPassword');
    const signUpButton = screen.getByTestId('signUpButton');

    fireEvent.change(inputName, { target: { value: 'First Name Example' } });
    fireEvent.change(inputLastName, { target: { value: 'Last Name Example' } });
    fireEvent.change(inputEmail, { target: { value: 'email@email.com' } });
    fireEvent.change(inputPassword, { target: { value: 'short' } });
    fireEvent.change(inputConfirmPassword, { target: { value: 'short' } });

    fireEvent.click(signUpButton);

    const error = await waitFor(() => screen.getByTestId('error'));
    expect(error).toBeInTheDocument();
  });
});
