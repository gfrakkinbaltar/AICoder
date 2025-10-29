# AICoder Windows Setup Script
# Run this script in PowerShell as Administrator

Write-Host "🚀 Setting up AICoder on Windows..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please install npm" -ForegroundColor Red
    exit 1
}

# Create logs directory
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs"
    Write-Host "✅ Created logs directory" -ForegroundColor Green
}

# Create server logs directory
if (!(Test-Path "server/logs")) {
    New-Item -ItemType Directory -Path "server/logs"
    Write-Host "✅ Created server logs directory" -ForegroundColor Green
}

# Install root dependencies
Write-Host "📦 Installing root dependencies..." -ForegroundColor Yellow
npm install

# Install client dependencies
Write-Host "📦 Installing client dependencies..." -ForegroundColor Yellow
Set-Location client
npm install
Set-Location ..

# Install server dependencies
Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
Set-Location server
npm install
Set-Location ..

# Create .env file if it doesn't exist
if (!(Test-Path ".env")) {
    Copy-Item "env.example" ".env"
    Write-Host "✅ Created .env file from template" -ForegroundColor Green
    Write-Host "⚠️  Please edit .env file and add your OpenAI API key" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Check if Git is available
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "⚠️  Git not found. Version control features will be limited" -ForegroundColor Yellow
}

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 AICoder setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file and add your OpenAI API key" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start the development servers" -ForegroundColor White
Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "For production deployment:" -ForegroundColor Cyan
Write-Host "1. Run 'npm run build' to build the project" -ForegroundColor White
Write-Host "2. Run 'npm start' to start the production server" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
