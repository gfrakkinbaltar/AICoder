# Contributing to AICoder

Thank you for your interest in contributing to AICoder! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- OpenAI API key (for testing)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/aicoder.git
   cd aicoder
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment**
   ```bash
   cp env.example .env
   # Edit .env with your OpenAI API key
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## Contribution Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive, camelCase variable names
- **Comments**: Add JSDoc comments for public APIs

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

Examples:
- `feat(editor): add syntax highlighting for Python`
- `fix(ai): resolve completion timeout issue`
- `docs(readme): update installation instructions`

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run build
   npm test
   ```

4. **Submit a pull request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

### Testing

#### Frontend Testing
```bash
cd client
npm test
```

#### Backend Testing
```bash
cd server
npm test
```

#### Integration Testing
```bash
npm run test:integration
```

## Project Structure

### Frontend (`client/`)
```
src/
├── components/          # React components
│   ├── Editor.tsx      # Main code editor
│   ├── Sidebar.tsx     # File explorer
│   └── AIAssistant.tsx # AI features panel
├── contexts/           # React contexts
│   ├── FileContext.tsx # File management
│   └── AIContext.tsx   # AI state management
└── App.tsx            # Main application
```

### Backend (`server/`)
```
src/
├── routes/            # API routes
│   ├── ai.ts         # AI endpoints
│   └── image.ts      # Image processing
├── utils/            # Utilities
│   └── logger.ts     # Logging configuration
└── index.ts          # Server entry point
```

## Areas for Contribution

### High Priority
- [ ] Additional language support
- [ ] Performance optimizations
- [ ] Error handling improvements
- [ ] Unit test coverage
- [ ] Documentation improvements

### Medium Priority
- [ ] Plugin system
- [ ] Custom themes
- [ ] Advanced debugging tools
- [ ] Team collaboration features
- [ ] Mobile responsiveness

### Low Priority
- [ ] Additional AI models
- [ ] Advanced analytics
- [ ] Custom workflows
- [ ] Integration with more tools

## Bug Reports

When reporting bugs, please include:

1. **Environment details**
   - OS and version
   - Node.js version
   - Browser and version

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior

3. **Additional context**
   - Screenshots if applicable
   - Error messages
   - Console logs

## Feature Requests

When requesting features, please include:

1. **Use case description**
   - What problem does it solve?
   - How would you use it?

2. **Proposed solution**
   - How should it work?
   - Any design considerations?

3. **Alternatives considered**
   - What other approaches did you consider?

## Code Review Process

### For Contributors
- Address all review comments
- Keep PRs focused and small
- Test thoroughly before requesting review
- Be responsive to feedback

### For Reviewers
- Be constructive and helpful
- Focus on code quality and correctness
- Consider the broader impact
- Approve when ready

## Release Process

1. **Version bumping**
   - Update version in `package.json` files
   - Update `CHANGELOG.md`

2. **Testing**
   - Run full test suite
   - Test on multiple platforms
   - Verify all features work

3. **Documentation**
   - Update README if needed
   - Update API documentation
   - Create release notes

## Community Guidelines

### Be Respectful
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully

### Be Collaborative
- Help others when possible
- Share knowledge and resources
- Work together towards common goals

### Be Professional
- Keep discussions focused and relevant
- Avoid spam or off-topic content
- Follow the project's code of conduct

## Getting Help

- **Documentation**: Check the [Wiki](https://github.com/your-username/aicoder/wiki)
- **Issues**: Search [existing issues](https://github.com/your-username/aicoder/issues)
- **Discussions**: Use [GitHub Discussions](https://github.com/your-username/aicoder/discussions)
- **Discord**: Join our [Discord server](https://discord.gg/aicoder)

## License

By contributing to AICoder, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AICoder! 🚀
