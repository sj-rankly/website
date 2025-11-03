#!/bin/bash

# Start the Limitless template on port 3001
echo "Starting Limitless template on port 3001..."
echo "Access it at: http://localhost:3001/limitless"
echo "Press Ctrl+C to stop the server"

# Copy the package file and start the server
cp package-limitless.json package.json
npm run dev
