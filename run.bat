@echo off
set _count=0
:loop
call npm run babel
CHOICE /T 5 /C YN /D Y
set _e=%ERRORLEVEL%
if %_e%==1 echo Y&set /a _count=%_count% + 1&goto:loop
if %_e%==2 echo N&goto:end

:end
echo Teste rodado %_count% vezes