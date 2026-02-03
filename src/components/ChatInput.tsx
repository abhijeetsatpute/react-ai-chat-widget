import React, { useState, useCallback, KeyboardEvent, FormEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  sendButtonText?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder = 'Type your message...',
  disabled = false,
  sendButtonText = 'Send',
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !disabled) {
        onSend(trimmed);
        setInput('');
      }
    },
    [input, disabled, onSend]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
        e.preventDefault();
        handleSubmit(e as unknown as FormEvent);
      }
    },
    [input, handleSubmit]
  );

  return (
    <form className="chatbot-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chatbot-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Chat message input"
      />
      <button
        type="submit"
        className="chatbot-send-button"
        disabled={!input.trim() || disabled}
        aria-label="Send message"
      >
        {disabled ? '...' : sendButtonText}
      </button>
    </form>
  );
};
