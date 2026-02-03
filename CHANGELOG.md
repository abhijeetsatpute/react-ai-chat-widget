# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-02-03

### Fixed

- Added markdown header support (h1-h6) in AI responses
- Headers like `### Title` now render properly as `<h3>` tags

---

## [1.0.0] - 2026-02-03

### Added

- Initial release
- Support for OpenAI, Anthropic, and Mistral AI providers
- Configurable chat position (all 4 corners)
- Light, dark, and auto theme modes
- Custom theming via CSS variables and ThemeConfig
- Custom toggle icon and label support
- Welcome message support (single or random from array)
- Markdown rendering in AI responses
- Click outside to close functionality
- Message persistence option
- Event callbacks (onOpen, onClose, onMessageSent, onMessageReceived, onError)
- TypeScript support with exported types
- Responsive design for mobile and desktop
- Unit tests with Vitest and React Testing Library
- Comprehensive documentation

### Components

- `Chatbot` - Main component
- `ChatWindow` - Chat window container
- `ChatMessage` - Individual message bubble
- `ChatInput` - Input field with send button
- `ChatToggle` - Floating toggle button
- `LoadingIndicator` - Typing animation

### Hooks

- `useChat` - Chat state management and AI integration
- `useClickOutside` - Click outside detection

### Utilities

- `parseMarkdown` - Simple markdown to HTML converter
- `sanitizeHtml` - XSS prevention
- Theme utilities for applying custom themes
