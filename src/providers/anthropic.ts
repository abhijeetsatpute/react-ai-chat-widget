import { AIConfig, AnthropicResponse } from '../types';
import { AIProviderInterface, ProviderMessage, DEFAULT_MODELS, DEFAULT_MAX_TOKENS } from './types';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export class AnthropicProvider implements AIProviderInterface {
  async sendMessage(messages: ProviderMessage[], config: AIConfig): Promise<string> {
    const model = config.model || DEFAULT_MODELS.anthropic;
    const maxTokens = config.maxTokens || DEFAULT_MAX_TOKENS;

    // Anthropic uses a different message format - system is separate
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system: config.systemPrompt || 'You are a helpful assistant.',
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Anthropic API error: ${response.status}`
      );
    }

    const data: AnthropicResponse = await response.json();
    const textContent = data.content?.find((c) => c.type === 'text');

    if (!textContent?.text) {
      throw new Error('No text content in Anthropic response');
    }

    return textContent.text;
  }
}
