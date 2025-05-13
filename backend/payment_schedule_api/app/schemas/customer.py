from pydantic import BaseModel
from datetime import date

class CustomerBase(BaseModel):
    nombre_completo: str | None = None
    fecha_nacimiento: date | None = None

class CustomerInDB(CustomerBase):
    cliente_id: int

    class Config:
        from_attributes = True # Anteriormente orm_mode