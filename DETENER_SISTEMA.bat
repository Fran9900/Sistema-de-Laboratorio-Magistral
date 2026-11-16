@echo off
chcp 65001 >nul
title Sistema de Laboratorio Magistral - Detencion de Procesos
color 0C

echo ======================================================================
echo    DETENIENDO SISTEMA DE LABORATORIO MAGISTRAL
echo ======================================================================
echo.

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

echo [1/3] Deteniendo motor de base de datos portable...
if exist "%ROOT_DIR%\runtime\mariadb\bin\mariadb-admin.exe" (
    "%ROOT_DIR%\runtime\mariadb\bin\mariadb-admin.exe" -u root -pmofl2102 -P 3306 -h 127.0.0.1 shutdown >nul 2>&1
    "%ROOT_DIR%\runtime\mariadb\bin\mariadb-admin.exe" -u root -pmofl2102 -P 3307 -h 127.0.0.1 shutdown >nul 2>&1
)
taskkill /f /im mariadbd.exe >nul 2>&1
echo [OK] Base de datos detenida.
echo.

echo [2/3] Liberando puerto 4000 (Backend API)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":4000" ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)
echo [OK] Backend detenido.
echo.

echo [3/3] Liberando puerto 3000 (Frontend Web)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)
echo [OK] Frontend detenido.
echo.

echo ======================================================================
echo    TODOS LOS PROCESOS DEL SISTEMA HAN SIDO DETENIDOS
echo ======================================================================
echo.
ping -n 3 127.0.0.1 >nul
