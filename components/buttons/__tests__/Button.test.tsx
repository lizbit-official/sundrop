import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('<Button />', () => {
  test('should render the provided label', () => {
    render(<Button label="Submit" />);

    const btnEl = screen.getByRole('button', { name: /Submit/i });
    expect(btnEl).toBeInTheDocument();
  });
});
