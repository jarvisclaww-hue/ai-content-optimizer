import { render, screen, fireEvent } from '@testing-library/react';
import { ExampleComponent } from '@/components/shared/example-component';

describe('ExampleComponent', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with provided props', () => {
    render(
      <ExampleComponent
        title="Test Title"
        description="Test Description"
        buttonText="Test Button"
        onButtonClick={mockOnClick}
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('uses default button text when not provided', () => {
    render(
      <ExampleComponent
        title="Test Title"
        description="Test Description"
        onButtonClick={mockOnClick}
      />
    );

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onButtonClick when button is clicked', () => {
    render(
      <ExampleComponent
        title="Test Title"
        description="Test Description"
        onButtonClick={mockOnClick}
      />
    );

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
