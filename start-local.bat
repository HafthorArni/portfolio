@echo off
cd /d "%~dp0"

where py >nul 2>&1
if %errorlevel%==0 (
    py local-server.py
    goto :end
)

where python >nul 2>&1
if %errorlevel%==0 (
    python local-server.py
    goto :end
)

echo Python was not found.
echo Install Python from https://www.python.org/downloads/
echo and enable "Add Python to PATH" during installation.
pause

:end
