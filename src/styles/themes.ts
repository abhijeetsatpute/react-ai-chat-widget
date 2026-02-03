import { ThemeConfig } from '../types';

export const lightTheme: ThemeConfig = {
  primaryColor: '#6366f1',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  userBubbleColor: '#6366f1',
  userTextColor: '#ffffff',
  assistantBubbleColor: '#f3f4f6',
  assistantTextColor: '#1f2937',
  borderRadius: 12,
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export const darkTheme: ThemeConfig = {
  primaryColor: '#818cf8',
  backgroundColor: '#1f2937',
  textColor: '#f9fafb',
  userBubbleColor: '#6366f1',
  userTextColor: '#ffffff',
  assistantBubbleColor: '#374151',
  assistantTextColor: '#f9fafb',
  borderRadius: 12,
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

/**
 * Apply theme config as CSS variables
 */
export function applyTheme(config: ThemeConfig, element: HTMLElement): void {
  if (config.primaryColor) {
    element.style.setProperty('--chatbot-primary', config.primaryColor);
  }
  if (config.backgroundColor) {
    element.style.setProperty('--chatbot-bg', config.backgroundColor);
  }
  if (config.textColor) {
    element.style.setProperty('--chatbot-text', config.textColor);
  }
  if (config.userBubbleColor) {
    element.style.setProperty('--chatbot-user-bubble', config.userBubbleColor);
  }
  if (config.userTextColor) {
    element.style.setProperty('--chatbot-user-text', config.userTextColor);
  }
  if (config.assistantBubbleColor) {
    element.style.setProperty('--chatbot-assistant-bubble', config.assistantBubbleColor);
  }
  if (config.assistantTextColor) {
    element.style.setProperty('--chatbot-assistant-text', config.assistantTextColor);
  }
  if (config.borderRadius !== undefined) {
    element.style.setProperty('--chatbot-border-radius', `${config.borderRadius}px`);
  }
  if (config.fontFamily) {
    element.style.setProperty('--chatbot-font-family', config.fontFamily);
  }
}

/**
 * Get system theme preference
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
