from pydantic import BaseModel
from datetime import date

class LoanBase(BaseModel):
    cliente_id: int
    tipo_credito_id: int | None = None
    inversor_id: int | None = None # Asumiendo que inversor es una tabla
    deuda_inicia: float | None = None
    fecha_desembols: date | None = None
    estado_id: int | None = None

class LoanInDB(LoanBase):
    credito_id: int

    class Config:
        from_attributes = True