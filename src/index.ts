// Main component
export { Chatbot, Chatbot as default } from './Chatbot';

// Types
export type {
  AIProvider,
  AIConfig,
  ChatbotProps,
  ChatPosition,
  ThemeMode,
  ThemeConfig,
  Message,
  MessageRole,
} from './types';

// Hooks (for advanced usage)
export { useChat } from './hooks/useChat';
export { useClickOutside } from './hooks/useClickOutside';

// Themes
export { lightTheme, darkTheme, applyTheme, getSystemTheme } from './styles/themes';

// Providers (for advanced usage)
export { getProvider, OpenAIProvider, AnthropicProvider, MistralProvider } from './providers';
export type { AIProviderInterface, ProviderMessage } from './providers';

// Utilities
export { parseMarkdown, sanitizeHtml } from './utils/markdown';
