# AICoder Windows Setup Guide

This guide will help you set up AICoder on Windows 10/11.

## Prerequisites

### 1. Node.js (Required)
- Download and install Node.js 18+ from [https://nodejs.org/](https://nodejs.org/)
- Choose the LTS (Long Term Support) version
- During installation, make sure to check "Add to PATH"

### 2. Git (Optional but Recommended)
- Download and install Git from [https://git-scm.com/download/win](https://git-scm.com/download/win)
- Choose the default options during installation

### 3. OpenAI API Key (Required)
- Sign up at [https://platform.openai.com/](https://platform.openai.com/)
- Create an API key in your account settings
- Keep this key secure - you'll need it later

## Quick Setup (Automated)

### Option 1: PowerShell Script (Recommended)
1. Open PowerShell as Administrator
2. Navigate to the AICoder directory
3. Run the setup script:
   ```powershell
   .\setup-windows.ps1
   ```

### Option 2: Batch File
1. Double-click `setup-windows.bat`
2. Follow the on-screen instructions

## Manual Setup

If you prefer to set up manually or the automated scripts don't work:

### 1. Install Dependencies

Open Command Prompt or PowerShell in the AICoder directory and run:

```cmd
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

### 2. Create Environment File

```cmd
copy env.example .env
```

### 3. Configure Environment

Edit the `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Create Logs Directory

```cmd
mkdir logs
mkdir server\logs
```

### 5. Build the Project

```cmd
npm run build
```

## Running AICoder

### Development Mode

```cmd
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:3001

### Production Mode

```cmd
npm run build
npm start
```

## Troubleshooting

### Common Issues

#### 1. Node.js Not Found
**Error**: `'node' is not recognized as an internal or external command`

**Solution**: 
- Reinstall Node.js and make sure to check "Add to PATH"
- Restart your command prompt/PowerShell
- Verify installation: `node --version`

#### 2. npm Not Found
**Error**: `'npm' is not recognized as an internal or external command`

**Solution**:
- Node.js includes npm, so reinstall Node.js
- Or install npm separately: `npm install -g npm`

#### 3. Permission Denied
**Error**: `EACCES: permission denied`

**Solution**:
- Run Command Prompt as Administrator
- Or use PowerShell with elevated privileges

#### 4. Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
- Close other applications using port 3000/3001
- Or change ports in the configuration files

#### 5. Build Failures
**Error**: Build process fails

**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folders and reinstall
- Check Node.js version (must be 18+)

### PowerShell Execution Policy

If you get execution policy errors:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Firewall Issues

Windows Firewall might block the application:

1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Add Node.js and your browser to the allowed list

## File Structure

After setup, your directory should look like:

```
aicoder/
├── client/                 # React frontend
│   ├── node_modules/      # Client dependencies
│   ├── src/              # Source code
│   └── package.json
├── server/                # Node.js backend
│   ├── node_modules/      # Server dependencies
│   ├── src/              # Source code
│   └── package.json
├── logs/                  # Application logs
├── .env                   # Environment variables
├── package.json           # Root package.json
└── README.md
```

## Performance Tips

### 1. SSD Storage
- Install AICoder on an SSD for better performance
- Node.js applications benefit from faster storage

### 2. Memory
- Ensure you have at least 4GB RAM available
- Close unnecessary applications while running AICoder

### 3. Antivirus
- Add AICoder directory to antivirus exclusions
- Some antivirus software may slow down Node.js

## Security Considerations

### 1. API Key Security
- Never commit your `.env` file to version control
- Use environment variables in production
- Rotate your OpenAI API key regularly

### 2. Network Security
- AICoder runs on localhost by default
- For production, configure proper firewall rules
- Use HTTPS in production environments

### 3. Data Privacy
- AICoder implements zero-day retention by default
- No user code is stored permanently
- All AI requests are processed securely

## Updating AICoder

To update to the latest version:

```cmd
git pull origin main
npm run install:all
npm run build
```

## Uninstalling AICoder

To completely remove AICoder:

1. Stop all running processes
2. Delete the AICoder directory
3. Remove any environment variables you added
4. Clean up any remaining files

## Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/your-username/aicoder/issues)
2. Review the [Documentation](README.md)
3. Join our [Discord Community](https://discord.gg/aicoder)
4. Create a new issue with:
   - Windows version
   - Node.js version
   - Error messages
   - Steps to reproduce

## System Requirements

- **OS**: Windows 10 (version 1903+) or Windows 11
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Node.js**: Version 18 or higher
- **Internet**: Required for AI features

---

**Happy coding with AICoder on Windows!** 🚀
