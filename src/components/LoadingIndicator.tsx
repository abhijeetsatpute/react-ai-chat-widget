import React from 'react';

interface LoadingIndicatorProps {
  text?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  text = 'Thinking...',
}) => {
  return (
    <div className="chatbot-loading">
      <div className="chatbot-loading-dots">
        <span className="chatbot-loading-dot" />
        <span className="chatbot-loading-dot" />
        <span className="chatbot-loading-dot" />
      </div>
      <span className="chatbot-loading-text">{text}</span>
    </div>
  );
};
