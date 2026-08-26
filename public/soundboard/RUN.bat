@echo off 
title BrutalMod - Running..
color 0A
cls
echo.
echo  ================================================================
echo  *                                                              *
echo  *                BrutalMod v1.0.0 - Soundboard                 *
echo  *                                                              *
echo  ================================================================
echo.
echo  NOTE: This is an Electron app - it requires Node.js to run. 
echo        Do NOT double-click app.js directly!
echo.
echo  ================================================================
echo.

:: Check if Node.js is installed
echo [CHECK] Verifying Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo  ================================================================
    echo   ERROR: Node.js is NOT installed!
    echo  ================================================================
    echo.
    echo   BrutalMod requires Node.js to run.
    echo.
    echo   Please follow these steps:
    echo   1. Go to https://nodejs.org
    echo   2. Download the LTS version (recommended)
    echo   3. Install Node.js
    echo   4. Run this script again
    echo.
    echo  ================================================================
    pause
    exit /b 1
)

:: Check Node version
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% detected.
echo.

:: Check if npm is available
where npm >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] npm is not available! Please reinstall Node.js.
    pause
    exit /b 1
)

:: Check if dependencies are installed
if not exist "node_modules" (
    echo [INFO] First run detected. Installing dependencies...
    echo [INFO] This may take a few minutes...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [ERROR] Failed to install dependencies!
        echo [INFO] Try running: npm install
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies installed successfully!
    echo.
)

echo [START] Launching BrutalMod...
echo [INFO] The app window will open shortly...
echo.
echo ================================================================
echo  BrutalMod is running! Close this window to exit.
echo ================================================================
echo.

call npm start

:: If npm start fails
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Failed to start BrutalMod!
    echo.
    echo Troubleshooting:
    echo  1. Make sure Node.js is installed correctly
    echo  2. Try: npm install
    echo  3. Try: npm start
    echo.
    pause
)
