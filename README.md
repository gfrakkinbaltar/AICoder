# AICoder - AI-Powered Coding Assistant

AICoder is a modern, AI-powered coding assistant designed for developers and enterprises. It offers real-time, context-aware code suggestions, inline natural language editing, and multi-step task automation with a sleek, intuitive IDE interface.

## Features

### 🚀 Core Features
- **Supercomplete Autocompletion**: Advanced code and docstring completion powered by AI
- **Inline AI Editing**: Real-time refactoring, debugging, and code enhancement
- **Cascade Flows**: Automate multi-step coding tasks with user approval
- **Image-to-Code**: Convert screenshots to HTML/CSS/JS code
- **Multi-language Support**: Support for multiple programming languages and frameworks
- **Version Control Integration**: Seamless integration with Git and other VCS tools

### 🔒 Enterprise Features
- **Strong Privacy Controls**: Zero training on non-permissive data
- **Zero-day Retention**: Optional data retention policies
- **Enterprise-grade Security**: Advanced security and customization options
- **Context-aware Suggestions**: Maintains developer flow and minimizes context switching

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aicoder.git
   cd aicoder
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend API on http://localhost:3001

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Basic Usage

1. **Open AICoder** in your browser at http://localhost:3000
2. **Create a new file** using the sidebar or open an existing file
3. **Start coding** - AI will provide real-time suggestions
4. **Use AI Assistant** panel for advanced features

### AI Features

#### Code Completion
- Type code and get AI-powered completions
- Press `Ctrl+Space` for manual completion triggers

#### Inline AI Editing
- Select code and press `Ctrl+I` for inline refactoring
- Press `Ctrl+K` for debugging and improvement suggestions

#### Cascade Flows
- Create multi-step coding workflows
- Execute complex tasks with AI assistance
- Get approval for each step

#### Image-to-Code
- Upload screenshots or images
- Get HTML/CSS/JavaScript code generated
- Perfect for UI implementation

### Keyboard Shortcuts

- `Ctrl+I`: Inline AI refactoring
- `Ctrl+K`: Debug and improve code
- `Ctrl+Space`: Manual code completion
- `Ctrl+Shift+A`: Open AI Assistant panel

## Architecture

### Frontend (React + TypeScript)
- **Monaco Editor**: Code editing with syntax highlighting
- **React Context**: State management for files and AI
- **Tailwind CSS**: Modern, responsive UI
- **Vite**: Fast development and building

### Backend (Node.js + Express)
- **OpenAI API**: AI-powered code generation and analysis
- **Image Processing**: Sharp for image optimization
- **OCR**: Tesseract.js for text extraction
- **Security**: Helmet for security headers

### Key Components

```
client/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # State management
│   └── App.tsx         # Main application
server/
├── src/
│   ├── routes/         # API endpoints
│   ├── utils/          # Utilities
│   └── index.ts        # Server entry point
```

## API Endpoints

### AI Endpoints
- `POST /api/ai/request` - General AI requests
- `POST /api/ai/completion` - Code completion
- `POST /api/ai/cascade` - Cascade flow execution

### Image Endpoints
- `POST /api/image/to-code` - Convert image to code
- `POST /api/image/ocr` - Extract text from image
- `POST /api/image/analyze` - Analyze code in image

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | Required |
| `PORT` | Server port | 3001 |
| `CLIENT_URL` | Frontend URL | http://localhost:3000 |
| `LOG_LEVEL` | Logging level | info |

### Customization

AICoder is highly customizable:

- **Themes**: Modify `client/tailwind.config.js` for custom themes
- **Languages**: Add new language support in Monaco Editor configuration
- **AI Models**: Switch between different OpenAI models in server configuration
- **Security**: Configure additional security measures in server setup

## Development

### Project Structure
```
aicoder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── contexts/       # State management
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities
│   │   └── index.ts
│   └── package.json
├── package.json            # Root package.json
└── README.md
```

### Adding New Features

1. **Frontend**: Add components in `client/src/components/`
2. **Backend**: Add routes in `server/src/routes/`
3. **AI Integration**: Extend AI context in `client/src/contexts/AIContext.tsx`

### Testing

```bash
# Run frontend tests
cd client && npm test

# Run backend tests
cd server && npm test
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security

AICoder implements enterprise-grade security:

- **Data Privacy**: No training on user code
- **Encryption**: All data encrypted in transit
- **Access Control**: Configurable user permissions
- **Audit Logging**: Complete activity tracking

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Documentation**: [Wiki](https://github.com/your-username/aicoder/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/aicoder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/aicoder/discussions)

## Roadmap

- [ ] Plugin system for custom AI models
- [ ] Team collaboration features
- [ ] Advanced debugging tools
- [ ] Performance monitoring
- [ ] Mobile app support
- [ ] VS Code extension

## Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
- [OpenAI](https://openai.com/) for AI capabilities
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**AICoder** - Empowering developers with AI-driven coding assistance.
# AICoder
