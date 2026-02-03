# Contributing to React AI Chat Widget

Thank you for your interest in contributing to React AI Chat Widget! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Development Setup

1. **Fork the repository**

   Click the "Fork" button on GitHub to create your own copy.

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/react-ai-chat-widget.git
   cd react-ai-chat-widget
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start development**

   ```bash
   npm run dev
   ```

   This starts Rollup in watch mode, rebuilding on file changes.

5. **Run tests**

   ```bash
   npm test
   ```

### Testing Your Changes Locally

To test the package in a local React project:

```bash
# In the chatbot directory
npm link

# In your test project
npm link react-ai-chat-widget
```

## Project Structure

```
src/
├── index.ts              # Main exports
├── Chatbot.tsx           # Main component
├── components/           # UI components
│   ├── ChatWindow.tsx
│   ├── ChatMessage.tsx
│   ├── ChatInput.tsx
│   ├── ChatToggle.tsx
│   └── LoadingIndicator.tsx
├── providers/            # AI provider implementations
│   ├── index.ts
│   ├── types.ts
│   ├── openai.ts
│   ├── anthropic.ts
│   └── mistral.ts
├── hooks/                # React hooks
│   ├── useChat.ts
│   └── useClickOutside.ts
├── styles/               # CSS and themes
│   ├── chatbot.css
│   └── themes.ts
├── types/                # TypeScript types
│   └── index.ts
└── utils/                # Utility functions
    └── markdown.ts
```

## Making Changes

### Branching

Create a feature branch from `main`:

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-gemini-provider`
- `fix/markdown-parsing-bug`
- `docs/update-readme`

### Code Style

- **TypeScript**: Use strict mode, avoid `any` types
- **Formatting**: Use Prettier defaults
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comments for complex logic, but prefer self-documenting code

### Writing Tests

All new features and bug fixes should include tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Test files should be placed in `__tests__/` mirroring the `src/` structure.

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add Google Gemini provider support

- Implement GeminiProvider class
- Add to provider factory
- Update types
```

Prefixes:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `test:` - Test additions/changes
- `refactor:` - Code refactoring
- `style:` - Formatting changes
- `chore:` - Maintenance tasks

## Pull Request Process

1. **Update documentation** if your changes affect the public API
2. **Add/update tests** for your changes
3. **Run the full test suite** and ensure it passes
4. **Update CHANGELOG.md** with your changes
5. **Create the pull request** with a clear description

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test these changes?

## Checklist
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] CHANGELOG updated
```

## Adding a New AI Provider

1. **Create the provider file** in `src/providers/`:

   ```typescript
   // src/providers/newprovider.ts
   import { AIConfig } from '../types';
   import { AIProviderInterface, ProviderMessage, DEFAULT_MAX_TOKENS } from './types';

   export class NewProvider implements AIProviderInterface {
     async sendMessage(messages: ProviderMessage[], config: AIConfig): Promise<string> {
       // Implementation
     }
   }
   ```

2. **Add to the provider factory** in `src/providers/index.ts`

3. **Update types** in `src/types/index.ts`:
   - Add to `AIProvider` union type
   - Add response interface if needed

4. **Add default model** in `src/providers/types.ts`

5. **Write tests** in `__tests__/providers/`

6. **Update documentation** in README.md

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser/Node version
- Package version

### Feature Requests

Include:
- Clear description of the feature
- Use case / motivation
- Possible implementation approach (optional)

## Questions?

Open a GitHub issue with the "question" label, or start a discussion.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Happy coding!
