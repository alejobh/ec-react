import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';

import SignupForm from './index';

const statusErrorUnprocessableEntity = 422;

const mockApiResponseError = {
  status: 'error',
  errors: {
    fullMessages: ['Password is too short (minimum is 6 characters)']
  }
};

const server = setupServer(
  rest.post(`${process.env.REACT_APP_BASE_API_URL}/users`, (req, res, ctx) =>
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

describe('SignupForm', () => {
  beforeEach(() => {
    render(<SignupForm />);
  });

  test('The data is entered incorrectly', async () => {
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

  test('The email is incorrect', async () => {
    const inputEmail = screen.getByTestId('email');
    const signUpButton = screen.getByTestId('signUpButton');

    fireEvent.change(inputEmail, { target: { value: 'Invalid mail' } });
    fireEvent.click(signUpButton);

    const error = await waitFor(() => screen.getByTestId('emailError'));
    expect(error).toBeInTheDocument();
  });

  test('The password is incorrect', async () => {
    const inputPassword = screen.getByTestId('password');
    const inputConfirmPassword = screen.getByTestId('confirmPassword');
    const signUpButton = screen.getByTestId('signUpButton');

    fireEvent.change(inputPassword, { target: { value: '123' } });
    fireEvent.change(inputConfirmPassword, { target: { value: '321' } });
    fireEvent.click(signUpButton);

    const error = await waitFor(() => screen.getByTestId('confirmPasswordError'));
    expect(error).toBeInTheDocument();
  });

  test('If there is a wrong field cannot submit the form', () => {
    const signUpButton = screen.getByTestId('signUpButton');

    fireEvent.click(signUpButton);
    expect(signUpButton).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).toBeNull();
  });
});
