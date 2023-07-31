import { render, screen } from '@testing-library/react';
import Stat, { StatProps } from '@/components/weather/Stat/Stat';

describe('<Stat />', () => {
  const mockProps = {
    label: 'Temperature',
    value: 75,
    unit: '°',
    size: 'lg' as StatProps['size'],
  };

  it('renders correctly with provided props', () => {
    render(<Stat {...mockProps} />);

    expect(screen.getByText(mockProps.label)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.value}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.unit}`)).toBeInTheDocument();
  });

  it('renders correctly without label', () => {
    const { label, ...restMockProps } = mockProps;
    render(<Stat {...restMockProps} />);

    expect(screen.queryByText(mockProps.label)).not.toBeInTheDocument();
  });

  it('renders correctly without unit', () => {
    const { unit, ...restMockProps } = mockProps;
    render(<Stat {...restMockProps} />);

    expect(screen.queryByText(mockProps.unit)).not.toBeInTheDocument();
  });

  it('renders correctly with sm size', () => {
    const { container } = render(<Stat {...mockProps} size='sm' />);

    // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
    expect(container.querySelector('.size-sm')).toBeInTheDocument();
  });

  it('renders correctly with lg size', () => {
    const { container } = render(<Stat {...mockProps} size='lg' />);

    // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
    expect(container.querySelector('.size-lg')).toBeInTheDocument();
  });
});
