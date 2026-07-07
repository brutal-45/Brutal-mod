@echo off 
echo ========================================
echo   BrutalMod v1.0.0 - Build Script
echo ========================================
echo.
echo This script will build the Windows EXE for BrutalMod.
echo.
echo Prerequisites:
echo   - Node.js 16+ (https://nodejs.org)
echo   - npm (comes with Node.js)
echo.
echo ========================================
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
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [1/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)
echo [OK] Dependencies installed.
echo.

echo [2/3] Building Windows EXE...
call npm run build:win
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build EXE!
    pause
    exit /b 1
)
echo.

echo [3/3] Build complete!
echo.
echo ========================================
echo   Build successful!
echo ========================================
echo.
echo The EXE file is in the 'dist' folder:
echo   - BrutalMod Portable.exe
echo   - BrutalMod-1.0.0-win.zip
echo.
echo You can now:
echo   1. Run BrutalMod Portable.exe directly
echo   2. Share the zip file with others
echo.
pause
