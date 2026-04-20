# Contributing to CalcFlow

Thank you for your interest in contributing to CalcFlow! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions with other contributors and maintainers.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/calcflow-calculator.git
   cd calcflow-calculator/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow existing code style
   - Keep commits focused and descriptive
   - Test your changes locally

5. **Run linting and type checking**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Wait for review

## Development Workflow

### Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── App.tsx            # Root component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Use camelCase for variables and functions
- Use PascalCase for components
- Keep functions small and focused

### Component Guidelines

1. **Functional Components**: Use function components with hooks
2. **Props**: Define TypeScript interfaces for props
3. **Memoization**: Use `React.memo()` for optimized re-renders
4. **Exports**: Use named exports, default export for main component

### Testing

While formal tests aren't yet in place, manually test:

- All calculator operations
- Edge cases (division by zero, overflow)
- Keyboard shortcuts
- Theme toggle
- History functionality
- Memory operations

## Performance Guidelines

- Minimize component re-renders using `React.memo()`
- Use `useCallback()` for stable function references
- Avoid inline object/array literals in JSX
- Lazy load heavy dependencies when possible

## Documentation

- Update README.md for significant feature changes
- Add comments for complex logic
- Keep DEPLOYMENT.md updated for deployment changes

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

Example:
```
feat: add scientific mode toggle animation

Improve UX with smooth animations when switching modes
```

## Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Changes build without errors
- [ ] Lint passes (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Changes are documented
- [ ] No unnecessary console logs left
- [ ] Tested locally

## Reporting Bugs

When reporting bugs, include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

## Feature Requests

Feature requests should include:

- Clear description of desired functionality
- Use case and motivation
- Suggested implementation approach (optional)
- Mockups/examples if applicable

## Questions?

- Check existing issues and discussions
- Review documentation in README.md and DEPLOYMENT.md
- Ask in GitHub Discussions (if available)

---

**Thank you for contributing to CalcFlow!** 🎉

Built with ❤️ by Huncho.Dev
