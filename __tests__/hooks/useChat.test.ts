import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useChat } from '../../src/hooks/useChat';
import { AIConfig } from '../../src/types';
import * as providers from '../../src/providers';

// Mock the providers module
vi.mock('../../src/providers', () => ({
  getProvider: vi.fn(),
}));

describe('useChat', () => {
  const mockConfig: AIConfig = {
    provider: 'openai',
    apiKey: 'test-key',
  };

  const mockSendMessage = vi.fn().mockResolvedValue('AI response');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(providers.getProvider).mockReturnValue({
      sendMessage: mockSendMessage,
    });
  });

  it('initializes with empty messages', () => {
    const { result } = renderHook(() => useChat({ aiConfig: mockConfig }));
    expect(result.current.messages).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('adds message with addMessage', () => {
    const { result } = renderHook(() => useChat({ aiConfig: mockConfig }));

    act(() => {
      result.current.addMessage({ content: 'Hello', role: 'user' });
    });

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].content).toBe('Hello');
    expect(result.current.messages[0].role).toBe('user');
    expect(result.current.messages[0].id).toBeDefined();
    expect(result.current.messages[0].timestamp).toBeInstanceOf(Date);
  });

  it('clears messages with clearMessages', () => {
    const { result } = renderHook(() => useChat({ aiConfig: mockConfig }));

    act(() => {
      result.current.addMessage({ content: 'Hello', role: 'user' });
      result.current.addMessage({ content: 'Hi', role: 'assistant' });
    });

    expect(result.current.messages).toHaveLength(2);

    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.messages).toHaveLength(0);
  });

  it('calls onMessageSent callback', async () => {
    const onMessageSent = vi.fn();
    const { result } = renderHook(() =>
      useChat({ aiConfig: mockConfig, onMessageSent })
    );

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(onMessageSent).toHaveBeenCalledWith('Hello');
  });

  it('calls onMessageReceived callback', async () => {
    const onMessageReceived = vi.fn();
    const { result } = renderHook(() =>
      useChat({ aiConfig: mockConfig, onMessageReceived })
    );

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    await waitFor(() => {
      expect(onMessageReceived).toHaveBeenCalledWith('AI response');
    });
  });

  it('adds user and assistant messages after sendMessage', async () => {
    const { result } = renderHook(() => useChat({ aiConfig: mockConfig }));

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].role).toBe('user');
    expect(result.current.messages[0].content).toBe('Hello');
    expect(result.current.messages[1].role).toBe('assistant');
    expect(result.current.messages[1].content).toBe('AI response');
  });

  it('does not send empty messages', async () => {
    const onMessageSent = vi.fn();
    const { result } = renderHook(() =>
      useChat({ aiConfig: mockConfig, onMessageSent })
    );

    await act(async () => {
      await result.current.sendMessage('   ');
    });

    expect(onMessageSent).not.toHaveBeenCalled();
    expect(result.current.messages).toHaveLength(0);
  });

  it('handles API errors', async () => {
    mockSendMessage.mockRejectedValueOnce(new Error('API Error'));

    const onError = vi.fn();
    const { result } = renderHook(() =>
      useChat({ aiConfig: mockConfig, onError })
    );

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.error).not.toBe(null);
    expect(onError).toHaveBeenCalled();
  });

  it('clears error with clearError', async () => {
    mockSendMessage.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useChat({ aiConfig: mockConfig }));

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.error).not.toBe(null);

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe(null);
  });
});
