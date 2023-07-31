import { render, screen, fireEvent } from '@testing-library/react';
import ErrorComponent from '@/app/error';

describe('<Error /> Component', () => {
  const location_reload = window.location.reload;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: jest.fn(),
    });

    Object.defineProperty(window.location, 'reload', {
      writable: true,
      value: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    window.location.reload = location_reload;
  });

  it('should display error message', () => {
    render(<ErrorComponent error={new Error('Something bad happened')} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Something bad happened')).toBeInTheDocument();
  });

  it('should display reset button and call reset function when clicked and reset is provided', () => {
    const reset = jest.fn();
    render(<ErrorComponent error={new Error('Something bad happened')} reset={reset} />);

    fireEvent.click(screen.getByText('Try again'));

    expect(reset).toHaveBeenCalled();
    expect(window.location.reload).not.toHaveBeenCalled();
  });
});
