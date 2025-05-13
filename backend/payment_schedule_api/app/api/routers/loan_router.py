from fastapi import APIRouter, Depends, HTTPException, Query
from asyncpg import Connection
from typing import List
from app.db.database import get_db_conn_dependency
from app.services import payment_service
# Define un esquema Pydantic para la respuesta de la lista de préstamos si es necesario
# from app.schemas.loan import LoanSummary # Ejemplo

router = APIRouter(
    prefix="/loans",
    tags=["Loans"],
)

# Asumiendo que tienes un schema LoanSummary en app.schemas.loan
# class LoanSummary(BaseModel):
#     credito_id: int
#     nombre_cliente: str
#     deuda_inicia: float
#     fecha_desembols: date
#     estado_nombre: str

@router.get("", response_model=List[dict])
async def list_loans(
    db: Connection = Depends(get_db_conn_dependency)
):
    """
    Lista los préstamos con información básica.
    Útil para que el frontend pueda seleccionar un préstamo y luego pedir su cronograma.
    """
    try:
        loans = await payment_service.get_all_loans(db)
        if not loans:
            return [] # O HTTPException(status_code=404, detail="No se encontraron préstamos")
        return loans
    except Exception as e:
        # Loggear el error `e`
        raise HTTPException(status_code=500, detail=f"Ocurrió un error al listar los préstamos: {str(e)}")