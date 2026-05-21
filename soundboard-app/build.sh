#!/bin/bash

echo "============================================"
echo "  BrutalMod - Build Script" 
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed!"
    exit 1
fi

echo "[1/4] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install dependencies!"
    exit 1
fi

echo ""
echo "[2/4] Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "[ERROR] Build failed!"
    exit 1
fi

echo ""
echo "[3/4] Cleaning up..."
echo ""

echo "[4/4] Build complete!"
echo ""
echo "============================================"
echo "  Build successful!"
echo "  Check the 'dist' folder for the exe file"
echo "============================================"
echo ""

# Open dist folder (macOS)
if command -v open &> /dev/null; then
    open dist
fi
