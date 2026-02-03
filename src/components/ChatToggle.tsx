import React, { ReactNode } from 'react';
import { ChatPosition } from '../types';

interface ChatToggleProps {
  onClick: () => void;
  icon?: ReactNode;
  label?: string;
  showLabel?: boolean;
  position: ChatPosition;
  offsetX: number;
  offsetY: number;
  isOpen: boolean;
}

const DefaultIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="chatbot-toggle-icon-svg"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const ChatToggle: React.FC<ChatToggleProps> = ({
  onClick,
  icon,
  label,
  showLabel = true,
  position,
  offsetX,
  offsetY,
  isOpen,
}) => {
  const positionStyles: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9998,
  };

  // Set position based on prop
  if (position.includes('bottom')) {
    positionStyles.bottom = offsetY;
  } else {
    positionStyles.top = offsetY;
  }

  if (position.includes('right')) {
    positionStyles.right = offsetX;
  } else {
    positionStyles.left = offsetX;
  }

  return (
    <button
      type="button"
      className={`chatbot-toggle ${isOpen ? 'chatbot-toggle-open' : ''}`}
      style={positionStyles}
      onClick={onClick}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      aria-expanded={isOpen}
    >
      <span className="chatbot-toggle-icon">
        {icon || <DefaultIcon />}
      </span>
      {showLabel && label && (
        <span className="chatbot-toggle-label">{label}</span>
      )}
    </button>
  );
};
