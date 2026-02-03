import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatInput } from '../../src/components/ChatInput';

describe('ChatInput', () => {
  const defaultProps = {
    onSend: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input field and send button', () => {
    render(<ChatInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(<ChatInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input).toHaveValue('Hello');
  });

  it('calls onSend when form is submitted', () => {
    render(<ChatInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.submit(input.closest('form')!);
    expect(defaultProps.onSend).toHaveBeenCalledWith('Hello');
  });

  it('calls onSend when Enter is pressed', () => {
    render(<ChatInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(defaultProps.onSend).toHaveBeenCalledWith('Hello');
  });

  it('clears input after sending', () => {
    render(<ChatInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.submit(input.closest('form')!);
    expect(input).toHaveValue('');
  });

  it('does not send empty messages', () => {
    render(<ChatInput {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(input.closest('form')!);
    expect(defaultProps.onSend).not.toHaveBeenCalled();
  });

  it('disables input and button when disabled prop is true', () => {
    render(<ChatInput {...defaultProps} disabled={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('uses custom placeholder', () => {
    render(<ChatInput {...defaultProps} placeholder="Ask me anything..." />);
    expect(screen.getByPlaceholderText('Ask me anything...')).toBeInTheDocument();
  });

  it('uses custom send button text', () => {
    render(<ChatInput {...defaultProps} sendButtonText="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
