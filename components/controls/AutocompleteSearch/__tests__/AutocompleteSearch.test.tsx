import { render, fireEvent, screen } from '@testing-library/react';
import AutocompleteSearch from '@/components/controls/AutocompleteSearch/AutocompleteSearch';

describe('AutocompleteSearch', () => {
  const mockOptions = ['New York', 'Chicago', 'San Francisco'];
  const mockLabel = 'City Search';
  const mockRenderOption = jest.fn();
  const mockOnSelected = jest.fn();
  const mockOnSearch = jest.fn();

  const renderComponentWithMockFns = () => render(
    <AutocompleteSearch
      label={mockLabel}
      options={mockOptions}
      renderOption={mockRenderOption}
      onSelected={mockOnSelected}
      onSearch={mockOnSearch}
    />
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    renderComponentWithMockFns();

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  it('calls onSearch when input changes', () => {
    renderComponentWithMockFns();

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'New York' } });

    expect(mockOnSearch).toHaveBeenCalledWith('New York');
  });

  it('calls renderOption with correct parameters', () => {
    renderComponentWithMockFns();

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Option' } });

    mockOptions.forEach((option, idx) => {
      expect(mockRenderOption).toHaveBeenCalledWith(option, idx, expect.anything(), expect.any(Function));
    });
  });

  it('clears the input when onReset is called', () => {
    renderComponentWithMockFns();

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'San Francisco' } });
    fireEvent.reset(screen.getByRole('searchbox'));
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });
});