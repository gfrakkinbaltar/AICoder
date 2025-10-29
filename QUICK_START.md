# AICoder Quick Start Guide

Get up and running with AICoder in minutes!

## 🚀 Quick Setup

### 1. Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- OpenAI API key ([Get one here](https://platform.openai.com/))

### 2. Installation

**Windows (Automated):**
```powershell
# Run as Administrator
.\setup-windows.ps1
```

**Windows (Manual):**
```cmd
# Clone and setup
git clone https://github.com/your-username/aicoder.git
cd aicoder
npm run install:all

# Configure environment
copy env.example .env
# Edit .env and add your OpenAI API key

# Build
npm run build
```

**Linux/macOS:**
```bash
# Clone and setup
git clone https://github.com/your-username/aicoder.git
cd aicoder
npm run install:all

# Configure environment
cp env.example .env
# Edit .env and add your OpenAI API key

# Build
npm run build
```

### 3. Run AICoder

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Open http://localhost:3000 in your browser.

## 🎯 Key Features

### Code Editor
- **Monaco Editor**: Full-featured code editor with syntax highlighting
- **Multi-language Support**: JavaScript, TypeScript, Python, Java, C++, HTML, CSS, and more
- **Real-time AI Suggestions**: Get intelligent code completions as you type

### AI Assistant
- **Inline Editing**: Select code and press `Ctrl+I` for AI refactoring
- **Debug Help**: Press `Ctrl+K` for debugging and improvement suggestions
- **Code Generation**: Ask AI to generate functions, classes, or entire modules
- **Code Explanation**: Get detailed explanations of complex code

### Cascade Flows
- **Multi-step Automation**: Create workflows for complex coding tasks
- **Step-by-step Execution**: AI guides you through each step
- **Approval System**: Review and approve each step before execution

### Image-to-Code
- **Screenshot Analysis**: Upload images and get HTML/CSS/JS code
- **UI Implementation**: Perfect for converting designs to code
- **OCR Support**: Extract text from images

### Version Control
- **Git Integration**: Built-in Git status, staging, and committing
- **Visual Diff**: See changes before committing
- **Branch Management**: Switch branches and manage merges

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+I` | Inline AI refactoring |
| `Ctrl+K` | Debug and improve code |
| `Ctrl+Space` | Manual code completion |
| `Ctrl+Shift+A` | Open AI Assistant panel |

## 🔧 Configuration

### Environment Variables
```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional
PORT=3001
CLIENT_URL=http://localhost:3000
LOG_LEVEL=info
```

### Customization
- **Themes**: Modify `client/tailwind.config.js`
- **Languages**: Add support in Monaco Editor configuration
- **AI Models**: Change models in server configuration

## 🛠️ Development

### Project Structure
```
aicoder/
├── client/          # React frontend
├── server/          # Node.js backend
├── package.json     # Root configuration
└── README.md        # Full documentation
```

### Adding Features
1. **Frontend**: Add components in `client/src/components/`
2. **Backend**: Add routes in `server/src/routes/`
3. **AI Integration**: Extend contexts in `client/src/contexts/`

### Building
```bash
# Development build
npm run build

# Production build
npm run build && npm start
```

## 🔒 Security & Privacy

- **Zero Data Retention**: No user code is stored permanently
- **Encrypted Communication**: All data encrypted in transit
- **Privacy Controls**: Configurable data retention policies
- **Rate Limiting**: Built-in protection against abuse

## 🆘 Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm run install:all
```

**Port Already in Use:**
```bash
# Kill process using port 3000/3001
npx kill-port 3000 3001
```

**OpenAI API Errors:**
- Check your API key in `.env`
- Verify you have credits in your OpenAI account
- Check rate limits

### Getting Help
- [GitHub Issues](https://github.com/your-username/aicoder/issues)
- [Documentation](README.md)
- [Discord Community](https://discord.gg/aicoder)

## 🎉 What's Next?

1. **Create your first file** in the editor
2. **Try AI suggestions** by typing some code
3. **Upload an image** to test image-to-code conversion
4. **Create a Cascade Flow** for a complex task
5. **Explore the AI Assistant** panel for advanced features

---

**Happy coding with AICoder!** 🚀

For detailed documentation, see [README.md](README.md) and [WINDOWS_SETUP.md](WINDOWS_SETUP.md).
