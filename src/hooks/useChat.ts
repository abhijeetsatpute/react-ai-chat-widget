import { useState, useCallback } from 'react';
import { Message, AIConfig, ChatState } from '../types';
import { getProvider } from '../providers';

interface UseChatOptions {
  aiConfig: AIConfig;
  onMessageSent?: (message: string) => void;
  onMessageReceived?: (message: string) => void;
  onError?: (error: Error) => void;
}

interface UseChatReturn extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  clearError: () => void;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Hook for managing chat state and AI interactions
 */
export function useChat({
  aiConfig,
  onMessageSent,
  onMessageReceived,
  onError,
}: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addMessage = useCallback(
    (message: Omit<Message, 'id' | 'timestamp'>) => {
      const newMessage: Message = {
        ...message,
        id: generateId(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      return newMessage;
    },
    []
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Add user message
      const userMessage = addMessage({ content, role: 'user' });
      onMessageSent?.(content);

      setIsLoading(true);
      setError(null);

      try {
        const provider = getProvider(aiConfig);

        // Prepare messages for the API (excluding the welcome message if it exists)
        const apiMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await provider.sendMessage(apiMessages, aiConfig);

        addMessage({ content: response, role: 'assistant' });
        onMessageReceived?.(response);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        onError?.(error);

        // Add error message to chat
        addMessage({
          content: `Error: ${error.message}`,
          role: 'assistant',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [aiConfig, messages, isLoading, addMessage, onMessageSent, onMessageReceived, onError]
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    addMessage,
    clearMessages,
    clearError,
  };
}
