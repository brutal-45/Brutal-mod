@echo off 
title BrutalMod - Quick Start
color 0A
echo.
echo  **********************************************************
echo  *                                                        *
echo  *         BrutalMod v1.0.0 - Ultimate Soundboard         *
echo  *                                                        *
echo  **********************************************************
echo.
echo  IMPORTANT: Do NOT double-click app.js directly!
echo.
echo  This is an Electron application. Use this script to run it. 
echo.
echo  Options:
echo  =========
echo.
echo  [1] Run BrutalMod (Recommended)
echo  [2] Build Windows EXE (For distribution)
echo  [3] View Instructions
echo  [4] Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto run
if "%choice%"=="2" goto build
if "%choice%"=="3" goto instructions
if "%choice%"=="4" goto end

:run
echo.
echo  Starting BrutalMod...
echo.
call RUN.bat
goto end

:build
echo.
echo  Building Windows EXE...
echo.
call BUILD.bat
goto end

:instructions
echo.
echo  ==========================================================
echo  HOW TO USE BRUTALMOD
echo  ==========================================================
echo.
echo  STEP 1: Install Node.js
echo          Download from: https://nodejs.org
echo          Choose the LTS version
echo.
echo  STEP 2: Run this START_HERE.bat file
echo          It will automatically install dependencies
echo.
echo  STEP 3: Add your sounds!
echo          - Drag and drop audio files
echo          - Set hotkeys for quick play
echo          - Configure VB-Cable for mic output
echo.
echo  ==========================================================
echo.
pause
goto end

:end
exit /b
