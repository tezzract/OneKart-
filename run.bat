@echo off
echo Compiling OneKart E-Commerce Application...
echo ===========================================

javac *.java

if %errorlevel% equ 0 (
    echo.
    echo Compilation successful!
    echo.
    echo Running the application...
    echo ===========================================
    java OneKartApp
) else (
    echo.
    echo Compilation failed!
    pause
    exit /b 1
)
