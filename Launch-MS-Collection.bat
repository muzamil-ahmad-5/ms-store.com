@echo off
title MS COLLECTION - Luxury Commerce Platform
color 0F
cls
echo =======================================================================
echo          MS COLLECTION — TIMELESS STYLE. EVERYDAY ESSENTIALS.
echo =======================================================================
echo.
echo [1/3] Starting Backend API Server (Port 5000)...
start "MS Collection - Backend API" cmd /k "cd /d "%~dp0backend" && npm run dev"

echo [2/3] Starting Frontend Storefront Server (Port 5173)...
start "MS Collection - Frontend Storefront" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo [3/3] Opening MS Collection Storefront in your browser...
timeout /t 4 /nobreak >nul
start http://localhost:5173

echo.
echo =======================================================================
echo   STATUS: LOCAL SERVERS LAUNCHED
echo =======================================================================
echo   * Customer Storefront:         http://localhost:5173
echo   * Admin Dashboard:             http://localhost:5173/admin
echo   * Backend REST API:            http://localhost:5000/api/health
echo.
echo   PUBLIC ONLINE ACCESS (Worldwide):
echo   * To enable temporary link:    Run 'Launch-Live-Tunnel.bat'
echo   * To deploy permanent link:    Run 'Deploy-To-Vercel.bat'
echo =======================================================================
echo.
pause
