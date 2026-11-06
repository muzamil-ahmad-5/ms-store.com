@echo off
title MS COLLECTION - Fixed Worldwide Public Sharing
color 0A
cls
echo =======================================================================
echo          MS COLLECTION — WORLDWIDE PUBLIC LINK (PERSISTENT)
echo =======================================================================
echo.
echo Connecting fixed public URL: https://ms-collection-luxury.loca.lt ...
echo.
echo [!] NOTE: KEEP THIS WINDOW OPEN while sharing.
echo If localtunnel asks for "Tunnel Password" on first visit, enter your IP:
echo   110.38.179.10
echo.
echo =======================================================================
call npx -y localtunnel --port 5173 --subdomain ms-collection-luxury
pause
