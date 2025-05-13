import asyncpg
from app.core.config import settings
from fastapi import HTTPException
from contextlib import asynccontextmanager

# Pool de conexiones global
db_pool = None

async def connect_to_db():
    global db_pool
    try:
        print("bd-url",settings.DATABASE_URL)
        db_pool = await asyncpg.create_pool(settings.DATABASE_URL, min_size=5, max_size=20)
        print("Conexión a la base de datos establecida exitosamente.")
    except Exception as e:
        print(f"Error al conectar con la base de datos: {e}")
        # Podrías decidir levantar una excepción aquí o manejarlo de otra forma
        # para que la aplicación no inicie si no hay BD.
        raise

async def close_db_connection():
    global db_pool
    if db_pool:
        await db_pool.close()
        print("Conexión a la base de datos cerrada.")

@asynccontextmanager
async def get_db_connection():
    """
    Provee una conexión del pool.
    Uso: async with get_db_connection() as conn:
            # usar conn
    """
    if not db_pool:
        await connect_to_db() # Asegurarse de que el pool esté inicializado

    conn = None
    try:
        conn = await db_pool.acquire()
        yield conn
    except Exception as e:
        # Puedes loggear el error aquí
        raise HTTPException(status_code=503, detail=f"Error de base de datos: {str(e)}")
    finally:
        if conn:
            await db_pool.release(conn)

# También puedes tener una función de dependencia para FastAPI
async def get_db_conn_dependency():
    async with get_db_connection() as conn:
        yield conn