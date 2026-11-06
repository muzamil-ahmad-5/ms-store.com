@echo off
title MS COLLECTION - Vercel Deployment Helper
color 0B
cls
echo ==============================================================================
echo                      MS COLLECTION — VERCEL DEPLOYMENT
echo ==============================================================================
echo.
echo Choose your preferred deployment method:
echo.
echo   [1] Fast Deploy with Vercel CLI (Recommended - No Git push required)
echo   [2] Deploy via Vercel Web Dashboard (Connect GitHub repository)
echo   [3] Build frontend bundle only
echo.
echo ==============================================================================
set /p choice="Enter choice [1, 2, or 3]: "

if "%choice%"=="1" goto deploy_cli
if "%choice%"=="2" goto open_web
if "%choice%"=="3" goto build_only
goto invalid_choice

:deploy_cli
echo.
echo [1/2] Building latest production storefront...
cd /d "%~dp0frontend"
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed. Please inspect errors above.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Launching Vercel deployment...
echo (If this is your first time, Vercel will ask you to log in via browser)
echo.
call npx --yes vercel --prod
echo.
echo ==============================================================================
echo If deployment finished, your luxury store is LIVE on your vercel.app domain!
echo ==============================================================================
pause
exit /b 0

:open_web
echo.
echo Opening Vercel New Project page in your default browser...
start https://vercel.com/new
echo.
echo ==============================================================================
echo HOW TO DEPLOY ON VERCEL WEB DASHBOARD:
echo ==============================================================================
echo 1. Click "Import" next to your MS-Collection repository.
echo 2. In Project Settings:
echo      - Framework Preset: Vite
echo      - Root Directory: frontend  (or leave ./ since vercel.json is configured)
echo      - Build Command: npm run build
echo      - Output Directory: dist
echo 3. (Optional) In Environment Variables, add:
echo      - VITE_API_BASE_URL: https://your-backend-api.com/api
echo 4. Click "Deploy"!
echo ==============================================================================
pause
exit /b 0

:build_only
echo.
echo Building frontend production bundle...
cd /d "%~dp0frontend"
call npm run build
echo Build completed. Files located in frontend\dist\
pause
exit /b 0

:invalid_choice
echo Invalid choice. Please run the script again and select 1, 2, or 3.
pause
exit /b 1

