@echo off 
echo ============================================
echo   BrutalMod - Build Script
echo ============================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [2/4] Building application...
call npm run build:win
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)

echo.
echo [3/4] Cleaning up...
echo.

echo [4/4] Build complete!
echo.
echo ============================================
echo   Build successful!
echo   Check the 'dist' folder for the exe file
echo ============================================
echo.

:: Open dist folder
start "" "%~dp0dist"

pause
