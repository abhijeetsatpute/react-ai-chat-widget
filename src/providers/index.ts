import { AIConfig, AIProvider } from '../types';
import { AIProviderInterface } from './types';
import { OpenAIProvider } from './openai';
import { AnthropicProvider } from './anthropic';
import { MistralProvider } from './mistral';

const providers: Record<AIProvider, AIProviderInterface> = {
  openai: new OpenAIProvider(),
  anthropic: new AnthropicProvider(),
  mistral: new MistralProvider(),
};

export function getProvider(config: AIConfig): AIProviderInterface {
  const provider = providers[config.provider];

  if (!provider) {
    throw new Error(`Unknown AI provider: ${config.provider}`);
  }

  return provider;
}

export { OpenAIProvider, AnthropicProvider, MistralProvider };
export type { AIProviderInterface, ProviderMessage } from './types';
