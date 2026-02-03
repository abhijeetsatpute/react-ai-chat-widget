import { AIConfig, MessageRole } from '../types';

export interface ProviderMessage {
  role: MessageRole;
  content: string;
}

export interface AIProviderInterface {
  sendMessage(messages: ProviderMessage[], config: AIConfig): Promise<string>;
}

export const DEFAULT_MODELS: Record<string, string> = {
  openai: 'gpt-3.5-turbo',
  anthropic: 'claude-3-haiku-20240307',
  mistral: 'mistral-small-latest',
};

export const DEFAULT_MAX_TOKENS = 1024;
export const DEFAULT_TEMPERATURE = 0.7;
