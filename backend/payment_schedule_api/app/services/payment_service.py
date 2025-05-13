# app/services/payment_service.py
from asyncpg import Connection
from datetime import date, datetime
from typing import List
from app.models_sql import payment_queries
from app.schemas.payment_schedule import InstallmentDetail, PaymentScheduleResponse

def calculate_installment_status(
    due_date: date,
    actual_debt: float,
    agreed_installment_value: float,
    total_paid_for_installment: float | None
) -> str:
    """Calcula el estado de una cuota."""
    today = datetime.now().date()
    paid_amount = total_paid_for_installment if total_paid_for_installment is not None else 0.0

    if actual_debt == 0 or paid_amount >= agreed_installment_value:
        return "Pagada"
    elif paid_amount > 0 and paid_amount < agreed_installment_value:
        if due_date < today:
            return "Vencida (Parcial)"
        return "Pagada Parcialmente"
    elif due_date < today:
        return "Vencida"
    else:
        return "Pendiente"


async def get_payment_schedule_details(conn: Connection, loan_id: int) -> PaymentScheduleResponse:
    # Primero, verifica si el préstamo existe
    loan_info = await payment_queries.fetch_loan_details_by_id(conn, loan_id)
    
    if not loan_info:
        raise ValueError(f"Préstamo con ID {loan_id} no encontrado.") # Se manejará como 404 en el router

    raw_installments = await payment_queries.fetch_payment_schedule_by_loan_id(conn, loan_id)
    detailed_installments: List[InstallmentDetail] = []

    for raw_installment in raw_installments:
        estado_cuota = calculate_installment_status(
            due_date=raw_installment['installment_due'],
            actual_debt=raw_installment['deuda_actual'],
            agreed_installment_value=raw_installment['valor_cuota_pactada'],
            total_paid_for_installment=raw_installment.get('monto_total_pagado')
        )
        detailed_installments.append(
            InstallmentDetail(
                installment_id=raw_installment['installment_id'],
                credito_id=raw_installment['credito_id'],
                valor_cuota_pactad=raw_installment['valor_cuota_pactada'],
                fecha_vencimiento=raw_installment['installment_due'], # alias se encarga del nombre
                deuda_actua=raw_installment['deuda_actual'],
                cargos_moratorio=raw_installment.get('cargos_moratorio', 0.0),
                estado_cuota=estado_cuota,
                monto_pagado_cuota=raw_installment.get('monto_total_pagado'),
                fecha_ultimo_pago_cuota=raw_installment.get('ultima_fecha_pago')
            )
        )

    return PaymentScheduleResponse(
        credito_id=loan_id,
        # loan_info=loan_info # Podrías incluir info del préstamo aquí
        cronograma=detailed_installments
    )

async def get_all_loans(conn: Connection):
    loans = await payment_queries.fetch_all_loans_summary(conn)
    # Aquí podrías transformar los datos a esquemas Pydantic si es necesario
    return loans