from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.api.routers import schedule_router, loan_router # Asegúrate de importar loan_router si lo usas
from app.db.database import connect_to_db, close_db_connection
from app.core.config import settings # Para verificar si se carga la config
import re


app = FastAPI(
    title="API de Cronograma de Pagos",
    description="API para visualizar cronogramas de pagos de préstamos.",
    version="1.0.0"
)
origins = []
# Puedes generar rangos de puertos si lo deseas
for port in range(1024, 65535):  # puedes limitar este rango si deseas
    origins.append(f"http://localhost:{port}")
    origins.append(f"http://127.0.0.1:{port}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Incluir routers
app.include_router(schedule_router.router)
app.include_router(loan_router.router) # Añade el router de préstamos

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Bienvenido a la API de Cronograma de Pagos."}

# Para ejecutar (desde la raíz del proyecto `payment_schedule_api/`):
# uvicorn app.main:app --reload