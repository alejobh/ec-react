import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import SignupForm from './index';

const statusServerError = 500;

const server = setupServer(
  rest.get('/signup', (req, res, ctx) => res(ctx.json({ greeting: 'hello there' })))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays greeting', async () => {
  render(<SignupForm url="/greeting" />);

  fireEvent.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('heading'));

  expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  expect(screen.getByRole('button')).toHaveAttribute('disabled');
});

test('handles server error', async () => {
  server.use(rest.get('/greeting', (req, res, ctx) => res(ctx.status(statusServerError))));

  render(<SignupForm url="/greeting" />);

  fireEvent.click(screen.getByText('Load Greeting'));

  await waitFor(() => screen.getByRole('alert'));

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
  expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
});
