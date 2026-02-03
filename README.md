# React AI Chat Widget

A plug-and-play React chatbot component supporting multiple AI providers (OpenAI, Anthropic, Mistral). Zero UI framework dependencies, fully typed with TypeScript, and highly customizable.

[![npm version](https://img.shields.io/npm/v/react-ai-chat-widget.svg)](https://www.npmjs.com/package/react-ai-chat-widget)
[![license](https://img.shields.io/npm/l/react-ai-chat-widget.svg)](https://github.com/abhijeetsatpute/react-ai-chat-widget/blob/main/LICENSE)

![React AI Chat Widget Demo]()

## Features

- **Multiple AI Providers**: OpenAI, Anthropic (Claude), and Mistral out of the box
- **Zero UI Dependencies**: Pure CSS with CSS variables for easy theming
- **TypeScript Support**: Fully typed with exported types
- **Customizable Position**: Place the chatbot in any corner of the screen
- **Theming**: Light/dark/auto themes with custom color support
- **Markdown Support**: Renders markdown in AI responses
- **Responsive**: Works on mobile and desktop
- **Callbacks**: Hooks for message events and errors

## Installation

```bash
npm install react-ai-chat-widget
```

## Quick Start

```tsx
import { Chatbot } from 'react-ai-chat-widget';
import 'react-ai-chat-widget/styles';

function App() {
  return (
    <Chatbot
      aiConfig={{
        provider: 'openai',
        apiKey: 'your-api-key',
        model: 'gpt-4',
        systemPrompt: 'You are a helpful assistant.',
      }}
    />
  );
}
```

## Configuration

### AI Configuration

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `provider` | `'openai' \| 'anthropic' \| 'mistral'` | Yes | AI provider to use |
| `apiKey` | `string` | Yes | API key for the provider |
| `model` | `string` | No | Model to use (defaults vary by provider) |
| `systemPrompt` | `string` | No | System prompt for context |
| `maxTokens` | `number` | No | Maximum tokens in response (default: 1024) |
| `temperature` | `number` | No | Response randomness 0-1 (default: 0.7) |

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Position on screen |
| `offsetX` | `number` | `24` | Horizontal offset in pixels |
| `offsetY` | `number` | `24` | Vertical offset in pixels |
| `chatWidth` | `number \| string` | `400` | Chat window width |
| `chatHeight` | `number \| string` | `'70vh'` | Chat window height |
| `toggleIcon` | `ReactNode` | Chat bubble icon | Custom toggle button icon |
| `toggleLabel` | `string` | - | Text label for toggle button |
| `showToggleLabel` | `boolean` | `true` | Show/hide toggle label |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'light'` | Color theme |
| `themeConfig` | `ThemeConfig` | - | Custom theme colors |
| `welcomeMessage` | `string \| string[]` | - | Welcome message (random if array) |
| `placeholder` | `string` | `'Type your message...'` | Input placeholder |
| `closeOnClickOutside` | `boolean` | `true` | Close when clicking outside |
| `persistMessages` | `boolean` | `false` | Keep messages on close |
| `loadingText` | `string` | `'Thinking...'` | Loading indicator text |
| `onOpen` | `() => void` | - | Called when chat opens |
| `onClose` | `() => void` | - | Called when chat closes |
| `onMessageSent` | `(message: string) => void` | - | Called when user sends message |
| `onMessageReceived` | `(message: string) => void` | - | Called when AI responds |
| `onError` | `(error: Error) => void` | - | Called on error |

## AI Provider Examples

### OpenAI

```tsx
<Chatbot
  aiConfig={{
    provider: 'openai',
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    model: 'gpt-4', // or 'gpt-3.5-turbo'
  }}
/>
```

### Anthropic (Claude)

```tsx
<Chatbot
  aiConfig={{
    provider: 'anthropic',
    apiKey: process.env.REACT_APP_ANTHROPIC_KEY,
    model: 'claude-3-opus-20240229', // or 'claude-3-sonnet', 'claude-3-haiku'
  }}
/>
```

> **Note**: Anthropic API requires CORS headers. For browser usage, you may need a proxy server or use their official SDK with server-side calls.

### Mistral

```tsx
<Chatbot
  aiConfig={{
    provider: 'mistral',
    apiKey: process.env.REACT_APP_MISTRAL_KEY,
    model: 'mistral-large-latest', // or 'mistral-small-latest'
  }}
/>
```

## Theming

### CSS Variables

Customize the appearance using CSS variables:

```css
:root {
  --chatbot-primary: #6366f1;
  --chatbot-bg: #ffffff;
  --chatbot-text: #1f2937;
  --chatbot-user-bubble: #6366f1;
  --chatbot-user-text: #ffffff;
  --chatbot-assistant-bubble: #f3f4f6;
  --chatbot-assistant-text: #1f2937;
  --chatbot-border-radius: 12px;
  --chatbot-font-family: system-ui, sans-serif;
}
```

### Custom Theme Object

```tsx
<Chatbot
  aiConfig={config}
  themeConfig={{
    primaryColor: '#10b981',
    backgroundColor: '#f0fdf4',
    userBubbleColor: '#10b981',
    assistantBubbleColor: '#d1fae5',
    borderRadius: 16,
  }}
/>
```

### Dark Theme

```tsx
<Chatbot
  aiConfig={config}
  theme="dark"
/>
```

### Auto Theme (System Preference)

```tsx
<Chatbot
  aiConfig={config}
  theme="auto"
/>
```

## Customizing Size

Control the chat window dimensions with `chatWidth` and `chatHeight`:

```tsx
<Chatbot
  aiConfig={config}
  chatWidth={380}      // pixels
  chatHeight={500}     // pixels
/>
```

You can also use string values for responsive sizing:

```tsx
<Chatbot
  aiConfig={config}
  chatWidth="90vw"     // viewport width
  chatHeight="80vh"    // viewport height
/>
```

## Custom Toggle Button

### With Icon Library (react-icons)

```tsx
import { Chatbot } from 'react-ai-chat-widget';
import { FaRobot } from 'react-icons/fa';

<Chatbot
  aiConfig={config}
  toggleIcon={<FaRobot size={24} />}
  toggleLabel="Ask AI"
/>
```

### With Custom SVG Icon

```tsx
<Chatbot
  aiConfig={config}
  toggleLabel="Ask Me"
  toggleIcon={
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
    </svg>
  }
/>
```

### With Emoji

```tsx
<Chatbot
  aiConfig={config}
  toggleIcon={<span style={{ fontSize: '24px' }}>🤖</span>}
  toggleLabel="Chat"
/>
```

### Label Only (No Custom Icon)

```tsx
<Chatbot
  aiConfig={config}
  toggleLabel="Need Help?"
/>
```

## Welcome Messages

### Single Message

```tsx
<Chatbot
  aiConfig={config}
  welcomeMessage="Hi! How can I help you today?"
/>
```

### Random from Array

```tsx
<Chatbot
  aiConfig={config}
  welcomeMessage={[
    "Hi! How can I help?",
    "Hello! What can I do for you?",
    "Hey there! Ask me anything!",
  ]}
/>
```

## Event Callbacks

```tsx
<Chatbot
  aiConfig={config}
  onOpen={() => console.log('Chat opened')}
  onClose={() => console.log('Chat closed')}
  onMessageSent={(msg) => console.log('User:', msg)}
  onMessageReceived={(msg) => console.log('AI:', msg)}
  onError={(err) => console.error('Error:', err)}
/>
```

## TypeScript

All types are exported for use in your application:

```tsx
import type {
  ChatbotProps,
  AIConfig,
  AIProvider,
  ThemeConfig,
  Message,
} from 'react-ai-chat-widget';
```

## Advanced Usage

### Using Hooks Directly

For custom implementations, you can use the hooks directly:

```tsx
import { useChat } from 'react-ai-chat-widget';

function CustomChat() {
  const { messages, isLoading, sendMessage, addMessage } = useChat({
    aiConfig: {
      provider: 'openai',
      apiKey: 'your-key',
    },
  });

  // Build your own UI
}
```

### Using Providers Directly

```tsx
import { getProvider } from 'react-ai-chat-widget';

const provider = getProvider({ provider: 'openai', apiKey: 'your-key' });
const response = await provider.sendMessage(
  [{ role: 'user', content: 'Hello' }],
  config
);
```

## Real-World Example: Portfolio Assistant

Here's a complete example of using the chat widget as a portfolio assistant that answers questions about your skills and experience:

```tsx
"use client"; // For Next.js App Router

import { Chatbot } from "react-ai-chat-widget";
import "react-ai-chat-widget/styles";

// Import your portfolio data
import { experience, skills, technologies, socialLinks } from "@/lib/data";

// Build dynamic system prompt from your data
const systemPrompt = `You are a helpful AI assistant on my portfolio website.

## About Me
Full Stack Developer with 5+ years of experience specializing in Node.js, React, and cloud technologies.

## Work Experience
${experience.map((exp) => `- ${exp.company}: ${exp.designation}`).join("\n")}

## Technologies
${technologies.map((t) => t.name).join(", ")}

## Services
${skills.map((s) => `- ${s.service}`).join("\n")}

## Contact
- Email: ${socialLinks.email}
- LinkedIn: ${socialLinks.linkedin}

Be friendly, professional, and encourage visitors to reach out for collaboration.`;

export function PortfolioChat() {
  return (
    <Chatbot
      aiConfig={{
        provider: "mistral",
        apiKey: process.env.NEXT_PUBLIC_MISTRAL_API_KEY || "",
        model: "mistral-small-latest",
        systemPrompt,
      }}
      position="bottom-right"
      theme="dark"
      chatWidth={380}
      chatHeight={500}
      welcomeMessage="Hi! I'm here to help you learn more about my work and skills. What would you like to know?"
      placeholder="Ask me anything..."
      themeConfig={{ primaryColor: "#8b5cf6" }}
      toggleLabel="askMe"
      toggleIcon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        </svg>
      }
    />
  );
}
```

Then add it to your layout:

```tsx
// app/layout.tsx
import { PortfolioChat } from "@/components/portfolio-chat";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <PortfolioChat />
      </body>
    </html>
  );
}
```

This approach keeps your chatbot's knowledge in sync with your portfolio data automatically!

## Why This Package?

| Feature | react-ai-chat-widget | Most Alternatives |
|---------|---------------------|-------------------|
| **AI Providers** | Built-in OpenAI, Anthropic, Mistral | Usually require custom integration |
| **Dependencies** | Zero UI framework deps (pure CSS) | Often require MUI, styled-components |
| **Setup** | Single component, pass API key & go | Often need backend setup |
| **Styling** | CSS variables for easy theming | Many use CSS-in-JS |
| **Bundle Size** | Lightweight (~25KB) | Often larger due to dependencies |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

---

Happy coding!
