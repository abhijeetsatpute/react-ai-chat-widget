import { ReactNode } from 'react';

/**
 * Supported AI providers
 */
export type AIProvider = 'openai' | 'anthropic' | 'mistral';

/**
 * Chat message role
 */
export type MessageRole = 'user' | 'assistant';

/**
 * Position of the chatbot on screen
 */
export type ChatPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

/**
 * Theme options
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Individual chat message
 */
export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

/**
 * AI configuration for the chatbot
 */
export interface AIConfig {
  /** AI provider to use */
  provider: AIProvider;
  /** API key for the provider */
  apiKey: string;
  /** Model to use (e.g., 'gpt-4', 'claude-3-opus-20240229', 'mistral-large-latest') */
  model?: string;
  /** System prompt to set context for the AI */
  systemPrompt?: string;
  /** Maximum tokens in the response */
  maxTokens?: number;
  /** Temperature for response randomness (0-1) */
  temperature?: number;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /** Primary accent color */
  primaryColor?: string;
  /** Background color of the chat window */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** User message bubble color */
  userBubbleColor?: string;
  /** User message text color */
  userTextColor?: string;
  /** Assistant message bubble color */
  assistantBubbleColor?: string;
  /** Assistant message text color */
  assistantTextColor?: string;
  /** Border radius for bubbles and buttons */
  borderRadius?: number;
  /** Font family */
  fontFamily?: string;
}

/**
 * Main chatbot component props
 */
export interface ChatbotProps {
  // Required
  /** AI configuration including provider, API key, and model settings */
  aiConfig: AIConfig;

  // Position & Layout
  /** Position of the chat toggle button on screen */
  position?: ChatPosition;
  /** Horizontal offset from the edge (in pixels) */
  offsetX?: number;
  /** Vertical offset from the edge (in pixels) */
  offsetY?: number;
  /** Width of the chat window */
  chatWidth?: number | string;
  /** Height of the chat window */
  chatHeight?: number | string;

  // Icon & Toggle
  /** Custom icon for the toggle button */
  toggleIcon?: ReactNode;
  /** Label text next to the toggle icon */
  toggleLabel?: string;
  /** Whether to show the toggle label */
  showToggleLabel?: boolean;

  // Theme
  /** Color theme mode */
  theme?: ThemeMode;
  /** Custom theme configuration */
  themeConfig?: ThemeConfig;

  // Behavior
  /** Welcome message(s) shown when chat opens. If array, one is picked randomly */
  welcomeMessage?: string | string[];
  /** Placeholder text for the input field */
  placeholder?: string;
  /** Close chat when clicking outside */
  closeOnClickOutside?: boolean;
  /** Keep messages when chat is closed */
  persistMessages?: boolean;
  /** Text shown while AI is thinking */
  loadingText?: string;

  // Callbacks
  /** Called when chat is opened */
  onOpen?: () => void;
  /** Called when chat is closed */
  onClose?: () => void;
  /** Called when user sends a message */
  onMessageSent?: (message: string) => void;
  /** Called when AI responds */
  onMessageReceived?: (message: string) => void;
  /** Called when an error occurs */
  onError?: (error: Error) => void;
}

/**
 * Chat state for the useChat hook
 */
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Provider interface for AI integrations
 */
export interface AIProviderInterface {
  sendMessage(
    messages: Array<{ role: MessageRole; content: string }>,
    config: AIConfig
  ): Promise<string>;
}

/**
 * API response from OpenAI
 */
export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

/**
 * API response from Anthropic
 */
export interface AnthropicResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

/**
 * API response from Mistral
 */
export interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}
