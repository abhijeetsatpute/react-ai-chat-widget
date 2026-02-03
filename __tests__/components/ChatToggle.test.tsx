import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatToggle } from '../../src/components/ChatToggle';

describe('ChatToggle', () => {
  const defaultProps = {
    onClick: vi.fn(),
    position: 'bottom-right' as const,
    offsetX: 24,
    offsetY: 24,
    isOpen: false,
  };

  it('renders the toggle button', () => {
    render(<ChatToggle {...defaultProps} />);
    const button = screen.getByRole('button', { name: /open chat/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<ChatToggle {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with custom label', () => {
    render(<ChatToggle {...defaultProps} label="Ask AI" showLabel={true} />);
    expect(screen.getByText('Ask AI')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<ChatToggle {...defaultProps} label="Ask AI" showLabel={false} />);
    expect(screen.queryByText('Ask AI')).not.toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(
      <ChatToggle
        {...defaultProps}
        icon={<span data-testid="custom-icon">🤖</span>}
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('has correct aria-expanded attribute', () => {
    const { rerender } = render(<ChatToggle {...defaultProps} isOpen={false} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');

    rerender(<ChatToggle {...defaultProps} isOpen={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies position styles correctly for bottom-right', () => {
    render(<ChatToggle {...defaultProps} position="bottom-right" />);
    const button = screen.getByRole('button');
    expect(button.style.bottom).toBe('24px');
    expect(button.style.right).toBe('24px');
  });

  it('applies position styles correctly for top-left', () => {
    render(<ChatToggle {...defaultProps} position="top-left" />);
    const button = screen.getByRole('button');
    expect(button.style.top).toBe('24px');
    expect(button.style.left).toBe('24px');
  });
});
