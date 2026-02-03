import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Chatbot } from '../src/Chatbot';
import { AIConfig } from '../src/types';
import * as providers from '../src/providers';

// Mock the providers module
vi.mock('../src/providers', () => ({
  getProvider: vi.fn(),
}));

describe('Chatbot', () => {
  const mockConfig: AIConfig = {
    provider: 'openai',
    apiKey: 'test-key',
  };

  const mockSendMessage = vi.fn().mockResolvedValue('AI response');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(providers.getProvider).mockReturnValue({
      sendMessage: mockSendMessage,
    });
  });

  it('renders toggle button', () => {
    render(<Chatbot aiConfig={mockConfig} />);
    expect(screen.getByRole('button', { name: /open chat/i })).toBeInTheDocument();
  });

  it('opens chat window when toggle is clicked', () => {
    render(<Chatbot aiConfig={mockConfig} />);
    const toggleButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(toggleButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes chat window when close button is clicked', () => {
    const { container } = render(<Chatbot aiConfig={mockConfig} />);

    // Open chat
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Close chat using the header close button (more specific selector)
    const closeButton = container.querySelector('.chatbot-close-button');
    fireEvent.click(closeButton!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onOpen callback when chat opens', () => {
    const onOpen = vi.fn();
    render(<Chatbot aiConfig={mockConfig} onOpen={onOpen} />);

    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    expect(onOpen).toHaveBeenCalled();
  });

  it('calls onClose callback when chat closes', () => {
    const onClose = vi.fn();
    const { container } = render(<Chatbot aiConfig={mockConfig} onClose={onClose} />);

    // Open then close
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    const closeButton = container.querySelector('.chatbot-close-button');
    fireEvent.click(closeButton!);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders with custom toggle label', () => {
    render(<Chatbot aiConfig={mockConfig} toggleLabel="Ask AI" />);
    expect(screen.getByText('Ask AI')).toBeInTheDocument();
  });

  it('renders welcome message when chat opens', () => {
    render(
      <Chatbot
        aiConfig={mockConfig}
        welcomeMessage="Welcome! How can I help?"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    expect(screen.getByText('Welcome! How can I help?')).toBeInTheDocument();
  });

  it('renders random welcome message from array', () => {
    const welcomeMessages = ['Hello!', 'Hi there!', 'Welcome!'];
    render(
      <Chatbot
        aiConfig={mockConfig}
        welcomeMessage={welcomeMessages}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));

    // One of the welcome messages should be displayed
    const hasWelcomeMessage = welcomeMessages.some((msg) =>
      screen.queryByText(msg)
    );
    expect(hasWelcomeMessage).toBe(true);
  });

  it('sends message and receives response', async () => {
    render(<Chatbot aiConfig={mockConfig} />);

    // Open chat
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));

    // Type and send message
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.submit(input.closest('form')!);

    // User message should appear
    expect(screen.getByText('Hello')).toBeInTheDocument();

    // Wait for AI response
    await waitFor(() => {
      expect(screen.getByText('AI response')).toBeInTheDocument();
    });
  });

  it('persists messages when persistMessages is true', () => {
    const { container } = render(<Chatbot aiConfig={mockConfig} persistMessages={true} />);

    // Open chat and add welcome message
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));

    // Type and send message
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.submit(input.closest('form')!);

    // Close chat using header close button
    const closeButton = container.querySelector('.chatbot-close-button');
    fireEvent.click(closeButton!);

    // Reopen chat
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));

    // Message should still be there
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('clears messages when persistMessages is false', async () => {
    const { container } = render(
      <Chatbot
        aiConfig={mockConfig}
        persistMessages={false}
        welcomeMessage="Welcome!"
      />
    );

    // Open chat
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    expect(screen.getByText('Welcome!')).toBeInTheDocument();

    // Close chat using header close button
    const closeButton = container.querySelector('.chatbot-close-button');
    fireEvent.click(closeButton!);

    // Reopen chat - welcome message should appear again (fresh state)
    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));

    // Should have welcome message (new session)
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  it('uses custom placeholder', () => {
    render(<Chatbot aiConfig={mockConfig} placeholder="Ask me anything..." />);

    fireEvent.click(screen.getByRole('button', { name: /open chat/i }));
    expect(screen.getByPlaceholderText('Ask me anything...')).toBeInTheDocument();
  });
});
