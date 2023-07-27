import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app name', () => {
  render(<App />);
  const nameElement = screen.getByText(/SUNDROP/i);
  expect(nameElement).toBeInTheDocument();
});

test.todo('prompt user for location access', () => {

});

test.todo('load previous location upon returning', () => {

});
