#!/bin/bash
set -e

echo "======================================================"
echo "    PublisherAI Platform — Full-Stack Setup Script"
echo "======================================================"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Setup Python FastAPI Backend
echo ""
echo "-> [1/2] Setting up FastAPI Backend in /backend..."
cd "$ROOT_DIR/backend"

if [ ! -d "venv" ]; then
    echo "Creating Python 3 virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment and installing requirements..."
source venv/bin/activate
pip install --upgrade pip -q
pip install -r requirements.txt

# 2. Setup Next.js Frontend
echo ""
echo "-> [2/2] Setting up Next.js 15 Frontend in /frontend..."
cd "$ROOT_DIR/frontend"
npm install

echo ""
echo "======================================================"
echo "✓ Setup completed successfully!"
echo "  Run './run.sh' to start both FastAPI & Next.js."
echo "======================================================"
