export interface Credit {
  credito_id: number;
  nombre_cliente: string;
  deuda_inicial: number;
  fecha_desembolso: string;
  estado_nombre: string;
}

export interface PaymentScheduleItem {
  credito_id: number;
  valor_cuota_pactad: number;
  fecha_vencimiento: string;
  deuda_actua: number;
  cargos_moratorio: number;
  installment_id: number;
  estado_cuota: string;
  monto_pagado_cuota: number | null;
  fecha_ultimo_pago_cuota: string | null;
}

export interface CreditDetail {
  credito_id: number;
  cronograma: PaymentScheduleItem[];
}