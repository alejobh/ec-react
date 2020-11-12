import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitForElement, screen } from '@testing-library/react';
import 'mutationobserver-shim';

import '@testing-library/jest-dom/extend-expect';
import SignupForm from './index';

const statusServerError = 500;

const server = setupServer();

const OLD_ENV = process.env;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
  process.env.REACT_APP_BASE_API_URL = 'api-test';
});

afterAll(() => {
  process.env = OLD_ENV;
  server.close();
});

test('All fields are completed', async () => {
  server.use(rest.get('api-test/signup', (req, res, ctx) => res(ctx.status(statusServerError))));

  render(<SignupForm />);

  const inputName = screen.getByLabelText('signup.form.name.label');

  fireEvent.change(inputName, { target: { value: 'First Name Example' } });

  fireEvent.click(screen.getByRole('button', { name: 'button.signup' }));

  await waitForElement(() => screen.queryAllByText('required'));
  const inputsAmmount = 4;

  expect(screen.queryAllByText('required').length).toBe(inputsAmmount);
});

test('The email is invalid', async () => {
  render(<SignupForm />);

  const inputEmail = screen.getByLabelText('signup.form.email.label');

  fireEvent.change(inputEmail, { target: { value: 'Invalidmail@' } });

  fireEvent.click(screen.getByRole('button', { name: 'button.signup' }));

  await waitForElement(() => screen.queryAllByText('email inválido'));

  expect(screen.getByText('email inválido')).toHaveTextContent('email inválido');
});

test('Passwords do not match', async () => {
  render(<SignupForm />);

  const inputName = screen.getByLabelText('signup.form.name.label');
  const inputLastName = screen.getByLabelText('signup.form.lastName.label');
  const inputEmail = screen.getByLabelText('signup.form.email.label');
  const inputPassword = screen.getByLabelText('signup.form.password.label');
  const inputConfirmPassword = screen.getByLabelText('signup.form.confirmPassword.label');

  fireEvent.change(inputName, { target: { value: 'Name' } });
  fireEvent.change(inputLastName, { target: { value: 'Last Name' } });
  fireEvent.change(inputEmail, { target: { value: 'example@example.com' } });
  fireEvent.change(inputPassword, { target: { value: 'password1' } });
  fireEvent.change(inputConfirmPassword, { target: { value: 'password2' } });

  fireEvent.click(screen.getByRole('button', { name: 'button.signup' }));

  await waitForElement(() => screen.queryAllByText('signup.form.confirmPassword.error'));

  expect(screen.queryAllByText('signup.form.confirmPassword.error').length).toBe(1);
});
