import { AIConfig, MistralResponse } from '../types';
import { AIProviderInterface, ProviderMessage, DEFAULT_MODELS, DEFAULT_MAX_TOKENS, DEFAULT_TEMPERATURE } from './types';

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

export class MistralProvider implements AIProviderInterface {
  async sendMessage(messages: ProviderMessage[], config: AIConfig): Promise<string> {
    const model = config.model || DEFAULT_MODELS.mistral;
    const maxTokens = config.maxTokens || DEFAULT_MAX_TOKENS;
    const temperature = config.temperature ?? DEFAULT_TEMPERATURE;

    const formattedMessages = config.systemPrompt
      ? [{ role: 'system' as const, content: config.systemPrompt }, ...messages]
      : messages;

    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Mistral API error: ${response.status}`
      );
    }

    const data: MistralResponse = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in Mistral response');
    }

    return content;
  }
}
