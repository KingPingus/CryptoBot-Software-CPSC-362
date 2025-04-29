#!/bin/bash
# filepath: /Users/drewby/Downloads/proj/CryptoBot-Software-CPSC-362/run.sh

# Run the backend
echo "Starting the backend..."
cd backend
uvicorn main:app --reload &
BACKEND_PID=$!

# Run the frontend
echo "Starting the frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Wait for user to terminate
echo "Frontend and Backend are running. Press [CTRL+C] to stop both."
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait