@echo off
chcp 65001 >nul
title Restablecer Base de Datos - Laboratorio Magistral
color 0E

echo ======================================================================
echo    RESTABLECER BASE DE DATOS AL ESTADO INICIAL DE DEFENSA
echo ======================================================================
echo.
echo Esta accion reestablecera la base de datos labowork_db con los datos
echo limpios preparados para la presentacion final.
echo.
set /p CONFIRMAR="Desea continuar? (S/N): "
if /i not "%CONFIRMAR%"=="S" (
    echo Operacion cancelada.
    pause
    exit /b 0
)

set "ROOT_DIR=%~dp0"
if "%ROOT_DIR:~-1%"=="\" set "ROOT_DIR=%ROOT_DIR:~0,-1%"

set DB_PORT=3306
netstat -ano | findstr /R /C:":3307 .*LISTENING" >nul
if %ERRORLEVEL% EQU 0 set DB_PORT=3307

echo Restableciendo datos en puerto %DB_PORT%...
"%ROOT_DIR%\runtime\mariadb\bin\mariadb.exe" -u root -pmofl2102 -P %DB_PORT% -h 127.0.0.1 < "%ROOT_DIR%\database\backup_labowork_db_mariadb.sql"
if %ERRORLEVEL% EQU 0 (
    echo [OK] Base de datos restablecida exitosamente.
) else (
    echo [AVISO] Asegurese de que el sistema este iniciado antes de restablecer los datos.
)
echo.
pause
