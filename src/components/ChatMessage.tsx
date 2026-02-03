import React from 'react';
import { Message } from '../types';
import { parseMarkdown, sanitizeHtml } from '../utils/markdown';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const renderContent = () => {
    if (isUser) {
      return <span>{message.content}</span>;
    }

    // Parse markdown for assistant messages
    const html = sanitizeHtml(parseMarkdown(message.content));
    return (
      <div
        className="chatbot-message-markdown"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div
      className={`chatbot-message chatbot-message-${message.role}`}
      data-role={message.role}
    >
      <div className="chatbot-message-bubble">{renderContent()}</div>
    </div>
  );
};
