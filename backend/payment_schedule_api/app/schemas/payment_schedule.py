from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class InstallmentBase(BaseModel):
    credito_id: int
    valor_cuota_pactad: float
    installment_du: date = Field(..., alias="fecha_vencimiento") # `installment_du` es la fecha de vencimiento
    deuda_actua: float
    cargos_moratorio: Optional[float] = 0.0

class InstallmentInDB(InstallmentBase):
    installment_id: int

    class Config:
        from_attributes = True
        populate_by_name = True # Permite usar alias en la salida

class InstallmentDetail(InstallmentInDB):
    estado_cuota: str # "Pendiente", "Pagada", "Vencida", "Pagada Parcialmente"
    monto_pagado_cuota: Optional[float] = 0.0
    fecha_ultimo_pago_cuota: Optional[date] = None

class PaymentScheduleResponse(BaseModel):
    credito_id: int
    # Puedes agregar aquí más información del préstamo o cliente si es necesario
    # loan_info: Optional[LoanInDB] = None
    # customer_info: Optional[CustomerInDB] = None
    cronograma: list[InstallmentDetail]