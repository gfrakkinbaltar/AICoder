@echo off
echo 🚀 Setting up AICoder on Windows...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm
    pause
    exit /b 1
)

echo ✅ Node.js and npm found

REM Create logs directory
if not exist "logs" mkdir logs
echo ✅ Created logs directory

REM Create server logs directory
if not exist "server\logs" mkdir server\logs
echo ✅ Created server logs directory

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    pause
    exit /b 1
)
cd ..

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)
cd ..

REM Create .env file if it doesn't exist
if not exist ".env" (
    copy "env.example" ".env"
    echo ✅ Created .env file from template
    echo ⚠️  Please edit .env file and add your OpenAI API key
) else (
    echo ✅ .env file already exists
)

REM Check if Git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Git not found. Version control features will be limited
) else (
    echo ✅ Git found
)

REM Build the project
echo 🔨 Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

echo.
echo 🎉 AICoder setup completed successfully!
echo.
echo Next steps:
echo 1. Edit .env file and add your OpenAI API key
echo 2. Run 'npm run dev' to start the development servers
echo 3. Open http://localhost:3000 in your browser
echo.
echo For production deployment:
echo 1. Run 'npm run build' to build the project
echo 2. Run 'npm start' to start the production server
echo.
echo Happy coding! 🚀
pause
