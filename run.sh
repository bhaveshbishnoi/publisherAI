#!/bin/bash
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "======================================================"
echo "      PublisherAI — Launching Full-Stack Services"
echo "======================================================"

# Trap SIGINT/SIGTERM to cleanly kill background processes when user exits
cleanup() {
    echo ""
    echo "Stopping services..."
    kill $(jobs -p) 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM

# 1. Start FastAPI Backend on port 8000
echo "-> Starting FastAPI Backend on http://localhost:8000 ..."
cd "$ROOT_DIR/backend"
if [ -d "venv" ]; then
    source venv/bin/activate
fi
PYTHONPATH="$ROOT_DIR/backend" python3 run.py &
BACKEND_PID=$!

# Give backend a moment to bind
sleep 2

# 2. Start Next.js Frontend on port 3000
echo "-> Starting Next.js Frontend on http://localhost:3000 ..."
cd "$ROOT_DIR/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "======================================================"
echo "✓ PublisherAI Full-Stack is running!"
echo "  - Frontend Studio: http://localhost:3000"
echo "  - FastAPI Docs:    http://localhost:8000/docs"
echo "  - API Health:      http://localhost:8000/api/health"
echo ""
echo "Press Ctrl+C to stop both servers."
echo "======================================================"

# Wait for background processes
wait $BACKEND_PID $FRONTEND_PID
