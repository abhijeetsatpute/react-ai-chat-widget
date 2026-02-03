import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatbotProps, ThemeMode } from './types';
import { ChatToggle } from './components/ChatToggle';
import { ChatWindow } from './components/ChatWindow';
import { useChat } from './hooks/useChat';
import { useClickOutside } from './hooks/useClickOutside';
import { applyTheme, getSystemTheme, lightTheme, darkTheme } from './styles/themes';

// Default values
const DEFAULT_POSITION = 'bottom-right';
const DEFAULT_OFFSET_X = 24;
const DEFAULT_OFFSET_Y = 24;
const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = '70vh';
const DEFAULT_PLACEHOLDER = 'Type your message...';
const DEFAULT_LOADING_TEXT = 'Thinking...';

function getRandomItem<T>(items: T | T[]): T {
  if (Array.isArray(items)) {
    return items[Math.floor(Math.random() * items.length)];
  }
  return items;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  aiConfig,
  position = DEFAULT_POSITION,
  offsetX = DEFAULT_OFFSET_X,
  offsetY = DEFAULT_OFFSET_Y,
  chatWidth = DEFAULT_WIDTH,
  chatHeight = DEFAULT_HEIGHT,
  toggleIcon,
  toggleLabel,
  showToggleLabel = true,
  theme = 'light',
  themeConfig,
  welcomeMessage,
  placeholder = DEFAULT_PLACEHOLDER,
  closeOnClickOutside = true,
  persistMessages = false,
  loadingText = DEFAULT_LOADING_TEXT,
  onOpen,
  onClose,
  onMessageSent,
  onMessageReceived,
  onError,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    sendMessage,
    addMessage,
    clearMessages,
  } = useChat({
    aiConfig,
    onMessageSent,
    onMessageReceived,
    onError,
  });

  // Handle theme
  useEffect(() => {
    if (!containerRef.current) return;

    let effectiveTheme: ThemeMode = theme;
    if (theme === 'auto') {
      effectiveTheme = getSystemTheme();
    }

    containerRef.current.setAttribute(
      'data-chatbot-theme',
      effectiveTheme
    );

    // Apply custom theme config if provided
    if (themeConfig) {
      applyTheme(themeConfig, containerRef.current);
    } else {
      // Apply default theme
      const defaultTheme = effectiveTheme === 'dark' ? darkTheme : lightTheme;
      applyTheme(defaultTheme, containerRef.current);
    }
  }, [theme, themeConfig]);

  // Handle system theme changes for auto mode
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (containerRef.current) {
        const newTheme = getSystemTheme();
        containerRef.current.setAttribute('data-chatbot-theme', newTheme);
        const defaultTheme = newTheme === 'dark' ? darkTheme : lightTheme;
        applyTheme(themeConfig || defaultTheme, containerRef.current);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, themeConfig]);

  // Handle click outside
  useClickOutside(
    chatRef,
    useCallback(() => {
      if (isOpen && closeOnClickOutside) {
        handleClose();
      }
    }, [isOpen, closeOnClickOutside]),
    isOpen && closeOnClickOutside
  );

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    onOpen?.();

    // Show welcome message if configured and not shown yet
    if (welcomeMessage && !hasShownWelcome) {
      const message = getRandomItem(welcomeMessage);
      addMessage({ content: message, role: 'assistant' });
      setHasShownWelcome(true);
    }
  }, [welcomeMessage, hasShownWelcome, addMessage, onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();

    // Clear messages if not persisting
    if (!persistMessages) {
      clearMessages();
      setHasShownWelcome(false);
    }
  }, [persistMessages, clearMessages, onClose]);

  const toggleChat = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpen, handleOpen, handleClose]);

  return (
    <div ref={containerRef} className="chatbot-container">
      <ChatToggle
        onClick={toggleChat}
        icon={toggleIcon}
        label={toggleLabel}
        showLabel={showToggleLabel}
        position={position}
        offsetX={offsetX}
        offsetY={offsetY}
        isOpen={isOpen}
      />

      {isOpen && (
        <div ref={chatRef}>
          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            onSend={sendMessage}
            onClose={handleClose}
            position={position}
            offsetX={offsetX}
            offsetY={offsetY}
            width={chatWidth}
            height={chatHeight}
            placeholder={placeholder}
            loadingText={loadingText}
            headerIcon={toggleIcon}
            headerTitle={toggleLabel || 'Chat'}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
