import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationInput from './LocationInput';

test('renders defaults without crashing', () => {
  render(<LocationInput />);
  const inputElement = screen.getByRole('searchbox', { name: /location/i });
  expect(inputElement).toBeInTheDocument();
});
