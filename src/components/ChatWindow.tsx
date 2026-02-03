import React, { useRef, useEffect, ReactNode } from 'react';
import { Message, ChatPosition } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onSend: (message: string) => void;
  onClose: () => void;
  position: ChatPosition;
  offsetX: number;
  offsetY: number;
  width: number | string;
  height: number | string;
  placeholder?: string;
  loadingText?: string;
  headerIcon?: ReactNode;
  headerTitle?: string;
}

const CloseIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onSend,
  onClose,
  position,
  offsetX,
  offsetY,
  width,
  height,
  placeholder,
  loadingText,
  headerIcon,
  headerTitle = 'Chat',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const windowStyles: React.CSSProperties = {
    position: 'fixed',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    zIndex: 9999,
  };

  // Position the window
  if (position.includes('bottom')) {
    windowStyles.bottom = 0;
  } else {
    windowStyles.top = offsetY;
  }

  if (position.includes('right')) {
    windowStyles.right = offsetX;
  } else {
    windowStyles.left = offsetX;
  }

  return (
    <div
      className="chatbot-window"
      style={windowStyles}
      role="dialog"
      aria-label="Chat window"
    >
      <div className="chatbot-header">
        <div className="chatbot-header-title">
          {headerIcon && <span className="chatbot-header-icon">{headerIcon}</span>}
          <span>{headerTitle}</span>
        </div>
        <button
          type="button"
          className="chatbot-close-button"
          onClick={onClose}
          aria-label="Close chat"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <LoadingIndicator text={loadingText} />}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-footer">
        <ChatInput
          onSend={onSend}
          placeholder={placeholder}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
