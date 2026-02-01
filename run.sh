#!/bin/bash

echo "Compiling OneKart E-Commerce Application..."
echo "==========================================="

# Compile all Java files
javac *.java

if [ $? -eq 0 ]; then
    echo "✓ Compilation successful!"
    echo ""
    echo "Running the application..."
    echo "==========================================="
    java OneKartApp
else
    echo "✗ Compilation failed!"
    exit 1
fi
