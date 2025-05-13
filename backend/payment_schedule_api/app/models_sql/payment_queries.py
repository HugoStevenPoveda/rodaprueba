# app/models_sql/payment_queries.py
from asyncpg import Connection
from typing import List, Dict, Any

async def fetch_payment_schedule_by_loan_id(conn: Connection, loan_id: int) -> List[Dict[str, Any]]:
    # Esta consulta es un ejemplo, ajústala a los nombres exactos de tus columnas y lógica de estado.
    # El estado de la cuota y los pagos asociados se calcularán en la capa de servicio
    # o podrías hacer una consulta más compleja aquí.
    # Por simplicidad, empezamos obteniendo los datos base del cronograma.
    query = """
     SELECT
        ps.installment_id,
        ps.credito_id,
        ps.valor_cuota_pactada,
        ps.installment_due,  -- Fecha de vencimiento de la cuota
        ps.deuda_actual,
        ps.cargos_moratorios,
        -- Información de pagos para esta cuota (installment_id)
        (SELECT SUM(p.monto) FROM payment p WHERE p.installment_id = ps.installment_id) AS monto_total_pagado,
        (SELECT MAX(p.fecha_pago) FROM payment p WHERE p.installment_id = ps.installment_id) AS ultima_fecha_pago
    FROM payment_schedule ps
    WHERE ps.credito_id = $1
    ORDER BY ps.installment_due;
    """
    try:
        rows = await conn.fetch(query, loan_id)
        return [dict(row) for row in rows]
    except Exception as e:
        print(f"Error en fetch_payment_schedule_by_loan_id: {e}")
        # Considera relanzar o manejar el error apropiadamente
        raise

async def fetch_loan_details_by_id(conn: Connection, loan_id: int) -> Dict[str, Any] | None:
    query = """
      SELECT
        l.credito_id, l.cliente_id, l.tipo_credito, l.deuda_inicial, l.fecha_desembolso, l.estado,
        c.nombre_completo AS nombre_cliente,
        tc.nombre AS tipo_credito_nombre,
        e.nombre AS estado_nombre
    FROM loan l
    LEFT JOIN customer c ON l.cliente_id = c.cliente_id
    LEFT JOIN tipo_credito tc ON l.tipo_credito = tc.tipo_credito_id
    LEFT JOIN estado e ON l.estado = e.estado_id
    WHERE l.credito_id =$1;
    """
    try:
        row = await conn.fetchrow(query, loan_id)
        return dict(row) if row else None
    except Exception as e:
        print(f"Error en fetch_loan_details_by_id: {e}")
        raise

async def fetch_all_loans_summary(conn: Connection) -> List[Dict[str, Any]]:
    query = """
  SELECT
        l.credito_id,
        c.nombre_completo AS nombre_cliente,
        l.deuda_inicial,
        l.fecha_desembolso,
        e.nombre AS estado_nombre
    FROM loan l
    JOIN customer c ON l.cliente_id = c.cliente_id
    JOIN estado e ON l.estado = e.estado_id
    ORDER BY l.fecha_desembolso ;
    """
    try:
        rows = await conn.fetch(query)
        return [dict(row) for row in rows]
    except Exception as e:
        print(f"Error en fetch_all_loans_summary: {e}")
        raise