import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatMessage } from '../../src/components/ChatMessage';
import { Message } from '../../src/types';

describe('ChatMessage', () => {
  it('renders user message correctly', () => {
    const message: Message = {
      id: '1',
      content: 'Hello, bot!',
      role: 'user',
      timestamp: new Date(),
    };
    render(<ChatMessage message={message} />);
    expect(screen.getByText('Hello, bot!')).toBeInTheDocument();
  });

  it('renders assistant message correctly', () => {
    const message: Message = {
      id: '2',
      content: 'Hello, human!',
      role: 'assistant',
      timestamp: new Date(),
    };
    render(<ChatMessage message={message} />);
    expect(screen.getByText('Hello, human!')).toBeInTheDocument();
  });

  it('applies correct class for user message', () => {
    const message: Message = {
      id: '1',
      content: 'Test',
      role: 'user',
      timestamp: new Date(),
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('.chatbot-message-user')).toBeInTheDocument();
  });

  it('applies correct class for assistant message', () => {
    const message: Message = {
      id: '2',
      content: 'Test',
      role: 'assistant',
      timestamp: new Date(),
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('.chatbot-message-assistant')).toBeInTheDocument();
  });

  it('renders markdown in assistant messages', () => {
    const message: Message = {
      id: '2',
      content: '**Bold text**',
      role: 'assistant',
      timestamp: new Date(),
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('strong')).toBeInTheDocument();
  });

  it('renders links in assistant messages', () => {
    const message: Message = {
      id: '2',
      content: 'Check [this link](https://example.com)',
      role: 'assistant',
      timestamp: new Date(),
    };
    render(<ChatMessage message={message} />);
    const link = screen.getByRole('link', { name: /this link/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('does not render markdown in user messages', () => {
    const message: Message = {
      id: '1',
      content: '**Bold text**',
      role: 'user',
      timestamp: new Date(),
    };
    const { container } = render(<ChatMessage message={message} />);
    expect(container.querySelector('strong')).not.toBeInTheDocument();
    expect(screen.getByText('**Bold text**')).toBeInTheDocument();
  });
});
