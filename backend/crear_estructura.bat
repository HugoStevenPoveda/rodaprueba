@echo off
setlocal

REM Crear carpetas principales
mkdir payment_schedule_api
cd payment_schedule_api
mkdir app
mkdir app\core
mkdir app\db
mkdir app\models_sql
mkdir app\schemas
mkdir app\services
mkdir app\api
mkdir app\api\routers

REM Crear archivos __init__.py vacíos
type nul > app\__init__.py
type nul > app\core\__init__.py
type nul > app\db\__init__.py
type nul > app\models_sql\__init__.py
type nul > app\schemas\__init__.py
type nul > app\services\__init__.py
type nul > app\api\__init__.py
type nul > app\api\routers\__init__.py

REM Crear archivos Python principales
type nul > app\main.py
type nul > app\core\config.py
type nul > app\db\database.py
type nul > app\models_sql\payment_queries.py
type nul > app\schemas\common.py
type nul > app\schemas\customer.py
type nul > app\schemas\loan.py
type nul > app\schemas\payment_schedule.py
type nul > app\services\payment_service.py
type nul > app\api\routers\schedule_router.py
type nul > app\api\routers\loan_router.py

REM Crear archivos de entorno y dependencias
type nul > requirements.txt
type nul > .env

echo Estructura creada correctamente.
pause
