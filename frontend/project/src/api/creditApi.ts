/**
 * API client for credit-related endpoints
 */

import { Credit, CreditDetail } from '../types';

const API_BASE_URL = 'http://127.0.0.1:8000'; 

/**
 * Fetch all credits
 */
export const fetchAllCredits = async (): Promise<Credit[]> => {
  try {
    // In a real implementation, you would replace this with your actual API endpoint
    const response = await fetch(`${API_BASE_URL}/loans`);
    console.log("RESPONSE CREDITSO "+ response.json)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching credits:', error);
    
    // For demo purposes, return mock data if API fails
    return getMockCredits();
  }
};

/**
 * Fetch credit details with payment schedule by ID
 */
export const fetchCreditDetail = async (creditId: number): Promise<CreditDetail> => {
  try {
    // In a real implementation, you would replace this with your actual API endpoint
    const response = await fetch(`${API_BASE_URL}/loans/${creditId}/payment-schedule`);
    console.log("datos ss "+ response.json)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching credit detail for ID ${creditId}:`, error);
    
    // For demo purposes, return mock data if API fails
    return getMockCreditDetail(creditId);
  }
};

// Mock data for development purposes
const getMockCredits = (): Credit[] => {
  return [
    {
      credito_id: 1,
      nombre_cliente: "Ana María López Rodríguez",
      deuda_inicial: 8569321.0,
      fecha_desembolso: "2025-01-15",
      estado_nombre: "ACTIVO"
    },
    {
      credito_id: 2,
      nombre_cliente: "Carlos Alberto Sánchez Martínez",
      deuda_inicial: 15320750.0,
      fecha_desembolso: "2025-02-10",
      estado_nombre: "ACTIVO"
    },
    {
      credito_id: 3,
      nombre_cliente: "Luisa Fernanda Ramírez Torres",
      deuda_inicial: 6789500.0,
      fecha_desembolso: "2025-02-20",
      estado_nombre: "EN MORA"
    },
    {
      credito_id: 4,
      nombre_cliente: "Nestor Enrique González Cumaco",
      deuda_inicial: 12768976.0,
      fecha_desembolso: "2025-01-31",
      estado_nombre: "EN PROCESO"
    },
    {
      credito_id: 5,
      nombre_cliente: "Patricia Elena Mendoza Vargas",
      deuda_inicial: 9876543.0,
      fecha_desembolso: "2025-03-05",
      estado_nombre: "ACTIVO"
    }
  ];
};

const getMockCreditDetail = (creditId: number): CreditDetail => {
  return {
    credito_id: creditId,
    cronograma: [
      {
        credito_id: creditId,
        valor_cuota_pactad: 193017.5,
        fecha_vencimiento: "2025-03-21",
        deuda_actua: 10229927.5,
        cargos_moratorio: 0,
        installment_id: 1,
        estado_cuota: "Pagada",
        monto_pagado_cuota: 193017.5,
        fecha_ultimo_pago_cuota: "2025-03-20"
      },
      {
        credito_id: creditId,
        valor_cuota_pactad: 193017.5,
        fecha_vencimiento: "2025-04-21",
        deuda_actua: 10036910,
        cargos_moratorio: 0,
        installment_id: 2,
        estado_cuota: "Vencida",
        monto_pagado_cuota: null,
        fecha_ultimo_pago_cuota: null
      },
      {
        credito_id: creditId,
        valor_cuota_pactad: 193017.5,
        fecha_vencimiento: "2025-05-21",
        deuda_actua: 9843892.5,
        cargos_moratorio: 0,
        installment_id: 3,
        estado_cuota: "Pendiente",
        monto_pagado_cuota: null,
        fecha_ultimo_pago_cuota: null
      },
      {
        credito_id: creditId,
        valor_cuota_pactad: 193017.5,
        fecha_vencimiento: "2025-06-21",
        deuda_actua: 9650875,
        cargos_moratorio: 0,
        installment_id: 4,
        estado_cuota: "Pendiente",
        monto_pagado_cuota: null,
        fecha_ultimo_pago_cuota: null
      },
      {
        credito_id: creditId,
        valor_cuota_pactad: 193017.5,
        fecha_vencimiento: "2025-07-21",
        deuda_actua: 9457857.5,
        cargos_moratorio: 0,
        installment_id: 5,
        estado_cuota: "Pendiente",
        monto_pagado_cuota: null,
        fecha_ultimo_pago_cuota: null
      },
      {
        credito_id: creditId,
        valor_cuota_pactad: 193017.5,
        fecha_vencimiento: "2025-08-21",
        deuda_actua: 9264840,
        cargos_moratorio: 0,
        installment_id: 6,
        estado_cuota: "Pendiente",
        monto_pagado_cuota: null,
        fecha_ultimo_pago_cuota: null
      }
    ]
  };
};