from fastapi import APIRouter, Depends, HTTPException
from asyncpg import Connection
from app.db.database import get_db_conn_dependency
from app.services import payment_service
from app.schemas.payment_schedule import PaymentScheduleResponse

router = APIRouter(
    prefix="/loans/{loan_id}/payment-schedule",
    tags=["Payment Schedule"],
)

@router.get("", response_model=PaymentScheduleResponse)
async def read_payment_schedule(
    loan_id: int,
    db: Connection = Depends(get_db_conn_dependency)
):
    """
    Obtiene el cronograma de pagos detallado para un préstamo específico.
    Incluye el estado calculado de cada cuota.
    """
    try:
        schedule = await payment_service.get_payment_schedule_details(db, loan_id)
        return schedule
    except ValueError as ve: # Error específico del servicio si el préstamo no existe
         raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        # Loggear el error `e`
        raise HTTPException(status_code=500, detail=f"Ocurrió un error al procesar el cronograma: {str(e)}")