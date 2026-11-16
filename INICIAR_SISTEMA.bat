@echo off
chcp 65001 >nul
title Sistema de Laboratorio Magistral - Servidor Central
color 0B

echo ======================================================================
echo    INICIANDO SISTEMA DE GESTION Y ADMINISTRACION DE LABORATORIO
echo ======================================================================
echo.

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

if exist "%ROOT_DIR%\runtime\node\node.exe" (
    echo [1/5] Entorno de ejecucion: Node.js Portable detectado.
) else (
    where node >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] No se encontro ejecutable de Node.js ni en runtime\node ni en el sistema.
        pause
        exit /b 1
    )
    echo [1/5] Entorno de ejecucion: Node.js del sistema detectado.
)
echo.

echo [2/5] Configurando motor de Base de Datos...
set DB_PORT=3306

netstat -ano | findstr /R /C:":3306 .*LISTENING" >nul
if %ERRORLEVEL% EQU 0 (
    echo [*] Puerto 3306 ocupado en el host. Asignando puerto 3307...
    set DB_PORT=3307
)

if exist "%ROOT_DIR%\runtime\mariadb\bin\mariadbd.exe" (
    echo [*] Levantando motor MariaDB portable en puerto %DB_PORT%...
    start "Laboratorio Magistral - Motor DB [%DB_PORT%]" /D "%ROOT_DIR%\runtime\mariadb" /min "%ROOT_DIR%\runtime\mariadb\bin\mariadbd.exe" --port=%DB_PORT% --console
    ping -n 4 127.0.0.1 >nul
    echo [OK] Motor de Base de Datos iniciado en puerto %DB_PORT%.
) else (
    echo [AVISO] No se encontro runtime\mariadb. Conectando a servicio en puerto %DB_PORT%...
)
echo.

echo [3/5] Detectando direccion IP de la red local...
for /f "usebackq tokens=*" %%a in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi*','Ethernet*','Ethernet','Wi-Fi' -ErrorAction SilentlyContinue | Where-Object { $_.IPAddress -notlike '169.254*' } | Select-Object -ExpandProperty IPAddress -First 1)"`) do set "LOCAL_IP=%%a"

if "%LOCAL_IP%"=="" (
    for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4" ^| findstr /v "127.0.0.1"') do (
        if not defined LOCAL_IP set "LOCAL_IP=%%i"
    )
)
if defined LOCAL_IP set "LOCAL_IP=%LOCAL_IP: =%"
if "%LOCAL_IP%"=="" set "LOCAL_IP=localhost"

echo [OK] IP de red detectada: %LOCAL_IP%
echo.

echo [4/5] Levantando Servidor Backend (API REST en puerto 4000)...
start "Laboratorio Magistral - Backend [4000]" /D "%ROOT_DIR%\backend" cmd /k "set DB_PORT=%DB_PORT%&& ..\runtime\node\node.exe src/server.js"
ping -n 4 127.0.0.1 >nul
echo [OK] Proceso de Backend iniciado.
echo.

echo [5/5] Levantando Servidor Frontend (Vite + React en puerto 3000)...
start "Laboratorio Magistral - Frontend [3000]" /D "%ROOT_DIR%\frontend" cmd /k "..\runtime\node\node.exe node_modules\vite\bin\vite.js --host 0.0.0.0 --port 3000"
ping -n 4 127.0.0.1 >nul
echo [OK] Proceso de Frontend iniciado.
echo.

cls
echo ======================================================================
echo    SISTEMA DE LABORATORIO MAGISTRAL EN EJECUCION EXITOSA
echo ======================================================================
echo.
echo  [ACCESO DESDE ESTA COMPUTADORA]:
echo    * Aplicacion Web:   http://localhost:3000
echo    * Backend REST API: http://localhost:4000/api
echo    * Documentacion:    http://localhost:4000/api-docs
echo    * Base de Datos:    Puerto %DB_PORT%
echo.
echo  ------------------------------------------------------------------
echo  [ACCESO DESDE OTRAS COMPUTADORAS / NOTEBOOKS EN LA MISMA RED WIFI]:
echo.
echo    Abra el navegador web en cualquier otro dispositivo e ingrese:
echo.
echo       http://%LOCAL_IP%:3000
echo.
echo  ------------------------------------------------------------------
echo  * Para apagar el sistema por completo, ejecute DETENER_SISTEMA.bat
echo ======================================================================
echo.
echo Abriendo navegador en la aplicacion...
ping -n 3 127.0.0.1 >nul
start http://localhost:3000

pause
