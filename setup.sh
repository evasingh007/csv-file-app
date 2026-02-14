#!/bin/bash

echo "🚀 CSV File Manager - Quick Start Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed!"
    exit 1
fi
echo "✅ Backend dependencies installed!"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed!"
    exit 1
fi
echo "✅ Frontend dependencies installed!"
echo ""

# Create uploads directory
echo "📁 Creating uploads directory..."
cd ../server
mkdir -p uploads
echo "✅ Uploads directory created!"
echo ""

echo "✅ Setup complete!"
echo ""
echo "To run the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd server"
echo "  npm start"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd client"
echo "  npm start"
echo ""
echo "Then open http://localhost:3001 in your browser"
echo ""
echo "Happy CSV managing! 📊"
