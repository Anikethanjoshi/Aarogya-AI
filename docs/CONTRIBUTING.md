# Contributing to Aarogya AI

Thank you for your interest in contributing to Aarogya AI! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Check Existing Issues**: Search existing issues to avoid duplicates
2. **Use Issue Templates**: Follow the provided templates for bug reports and feature requests
3. **Provide Details**: Include steps to reproduce, expected behavior, and screenshots if applicable

### Submitting Pull Requests

1. **Fork the Repository**: Create your own fork of the project
2. **Create a Branch**: Use a descriptive branch name (e.g., `feature/tavus-integration`, `fix/auth-bug`)
3. **Make Changes**: Follow our coding standards and guidelines
4. **Test Your Changes**: Ensure all tests pass and add new tests if needed
5. **Submit PR**: Create a pull request with a clear description

## 🛠 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/your-username/aarogya-ai.git
cd aarogya-ai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

```env
VITE_TAVUS_API_KEY=your_tavus_api_key
VITE_REVENUECAT_API_KEY=your_revenuecat_api_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📝 Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// Bad
const userData: any = {};
```

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop types and interfaces
- Implement error boundaries where appropriate

```typescript
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use semantic color names

```css
/* Good */
.card {
  @apply bg-white rounded-lg shadow-md p-6;
}

/* Bad */
.card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for API calls
- Write component tests for React components
- Aim for at least 80% code coverage

```typescript
// Example test
import { validateEmail } from '../utils/validation';

describe('validateEmail', () => {
  it('should return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('should return false for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
```

## 📚 Documentation

### Code Documentation

- Use JSDoc comments for functions and classes
- Document complex algorithms and business logic
- Keep README files up to date
- Include examples in documentation

```typescript
/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns True if email is valid, false otherwise
 * @example
 * ```typescript
 * const isValid = validateEmail('user@example.com'); // true
 * ```
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error codes and messages
- Keep API documentation in sync with implementation

## 🔄 Git Workflow

### Commit Messages

Follow the Conventional Commits specification:

```
type(scope): description

feat(auth): add OAuth integration
fix(ui): resolve button alignment issue
docs(api): update endpoint documentation
test(utils): add validation tests
```

### Branch Naming

Use descriptive branch names:

```
feature/tavus-video-integration
fix/subscription-payment-bug
docs/api-reference-update
refactor/component-structure
```

### Pull Request Process

1. **Update Documentation**: Ensure all documentation is updated
2. **Add Tests**: Include tests for new features
3. **Check CI**: Ensure all CI checks pass
4. **Request Review**: Request review from maintainers
5. **Address Feedback**: Respond to review comments

## 🎯 Feature Development

### Adding New Features

1. **Create Issue**: Discuss the feature in an issue first
2. **Design Document**: For large features, create a design document
3. **Implementation**: Follow the coding standards
4. **Testing**: Add comprehensive tests
5. **Documentation**: Update relevant documentation

### Tavus AI Integration

When working with Tavus AI features:

- Follow the Tavus API documentation
- Handle errors gracefully
- Implement proper loading states
- Add analytics tracking
- Test with mock data during development

### RevenueCat Integration

When working with subscription features:

- Use RevenueCat SDK properly
- Handle subscription states correctly
- Implement proper error handling
- Test with sandbox environment
- Document subscription flows

## 🐛 Bug Fixes

### Bug Report Process

1. **Reproduce the Bug**: Confirm the issue exists
2. **Identify Root Cause**: Debug and find the source
3. **Create Fix**: Implement the minimal fix needed
4. **Add Tests**: Prevent regression with tests
5. **Verify Fix**: Ensure the bug is resolved

### Security Issues

For security vulnerabilities:

1. **Do Not** create public issues
2. **Email**: akhilajoshi0609@gmail.com
3. **Include**: Detailed description and steps to reproduce
4. **Wait**: For acknowledgment before public disclosure

## 📋 Code Review Guidelines

### For Authors

- Keep PRs small and focused
- Write clear PR descriptions
- Respond to feedback promptly
- Test your changes thoroughly

### For Reviewers

- Be constructive and respectful
- Focus on code quality and maintainability
- Check for security issues
- Verify tests are adequate

## 🏷 Release Process

### Version Numbering

We follow Semantic Versioning (SemVer):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] Update version number
- [ ] Update CHANGELOG.md
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Create release notes
- [ ] Tag release in Git

## 🌟 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation
- Annual contributor highlights

## 📞 Getting Help

### Community Support

- **GitHub Discussions**: For general questions
- **Issues**: For bug reports and feature requests
- **Email**: akhilajoshi0609@gmail.com for direct contact

### Development Help

- **Documentation**: Check existing documentation first
- **Code Examples**: Look at existing implementations
- **Ask Questions**: Don't hesitate to ask for clarification

## 📄 License

By contributing to Aarogya AI, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Aarogya AI! Your efforts help make healthcare more accessible through AI technology.