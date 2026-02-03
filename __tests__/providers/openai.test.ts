import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpenAIProvider } from '../../src/providers/openai';
import { AIConfig } from '../../src/types';

describe('OpenAIProvider', () => {
  const provider = new OpenAIProvider();
  const mockConfig: AIConfig = {
    provider: 'openai',
    apiKey: 'test-api-key',
    model: 'gpt-4',
    maxTokens: 500,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends request with correct format', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Hello!' } }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await provider.sendMessage(
      [{ role: 'user', content: 'Hi' }],
      mockConfig
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-api-key',
        }),
      })
    );
  });

  it('includes system prompt when provided', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Hello!' } }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const configWithSystem: AIConfig = {
      ...mockConfig,
      systemPrompt: 'You are a helpful assistant',
    };

    await provider.sendMessage(
      [{ role: 'user', content: 'Hi' }],
      configWithSystem
    );

    const fetchCall = vi.mocked(fetch).mock.calls[0];
    const body = JSON.parse(fetchCall[1]?.body as string);

    expect(body.messages[0]).toEqual({
      role: 'system',
      content: 'You are a helpful assistant',
    });
  });

  it('returns response content', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Hello, I am GPT!' } }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await provider.sendMessage(
      [{ role: 'user', content: 'Hi' }],
      mockConfig
    );

    expect(result).toBe('Hello, I am GPT!');
  });

  it('throws error on API failure', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: { message: 'Invalid API key' } }),
    });

    await expect(
      provider.sendMessage([{ role: 'user', content: 'Hi' }], mockConfig)
    ).rejects.toThrow('Invalid API key');
  });

  it('throws error when no content in response', async () => {
    const mockResponse = {
      choices: [],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await expect(
      provider.sendMessage([{ role: 'user', content: 'Hi' }], mockConfig)
    ).rejects.toThrow('No content in OpenAI response');
  });

  it('uses default model when not specified', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Hello!' } }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const configWithoutModel: AIConfig = {
      provider: 'openai',
      apiKey: 'test-key',
    };

    await provider.sendMessage(
      [{ role: 'user', content: 'Hi' }],
      configWithoutModel
    );

    const fetchCall = vi.mocked(fetch).mock.calls[0];
    const body = JSON.parse(fetchCall[1]?.body as string);

    expect(body.model).toBe('gpt-3.5-turbo');
  });
});
