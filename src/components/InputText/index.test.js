import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';

import InputText from './index';

describe('InputText', () => {
  beforeEach(() => {
    render(<InputText label="test" name="test" error="error" />);
  });

  test('There is an error', () => {
    const inputError = screen.getByTestId('testError');
    expect(inputError).toBeInTheDocument();
  });
});
