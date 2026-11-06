@echo off
title MS COLLECTION - Luxury Commerce Platform
color 0F
cls
echo =======================================================================
echo          MS COLLECTION — TIMELESS STYLE. EVERYDAY ESSENTIALS.
echo =======================================================================
echo.
echo [1/3] Starting Backend API Server (Port 5000)...
start "MS Collection - Backend API" cmd /k "cd backend && npm run dev"

echo [2/3] Starting Frontend Storefront Server (Port 5173)...
start "MS Collection - Frontend Storefront" cmd /k "cd frontend && npm run dev"

echo [3/3] Opening MS Collection Storefront in your browser...
timeout /t 3 /nobreak >nul
start http://localhost:5173

echo.
echo =======================================================================
echo   STATUS: SERVERS ACTIVE
echo =======================================================================
echo   * Customer Storefront:         http://localhost:5173
echo   * Worldwide Link (Any Wi-Fi):  https://ms-collection-luxury.loca.lt
echo   * Same Wi-Fi Link (Local IP):  http://192.168.100.7:5173
echo   * Mobile Simulator & QR:       https://ms-collection-luxury.loca.lt/mobile
echo   * Admin Dashboard:             http://localhost:5173/admin
echo   * Admin Credentials:           admin@mscollection.com  /  Admin@MS2026
echo   * Backend REST API:            http://localhost:5000/api/health
echo =======================================================================
echo.
pause
