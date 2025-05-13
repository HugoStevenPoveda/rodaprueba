import React from 'react';
import { PaymentScheduleItem } from '../types';
import { formatCurrency, formatDate, getStatusColorClass, getStatusIconName } from '../utils/formatters';
import { AlertCircle, Calendar, CheckCircle, Clock, DollarSign, Loader } from 'lucide-react';

interface PaymentScheduleRowProps {
  payment: PaymentScheduleItem;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const PaymentScheduleRow: React.FC<PaymentScheduleRowProps> = ({ 
  payment, 
  isExpanded,
  toggleExpand
}) => {
  const statusClass = getStatusColorClass(payment.estado_cuota);
  const statusIconName = getStatusIconName(payment.estado_cuota);
  
  // Render the appropriate icon based on status
  const StatusIcon = () => {
    switch(statusIconName) {
      case 'check-circle':
        return <CheckCircle className="h-5 w-5" />;
      case 'alert-circle':
        return <AlertCircle className="h-5 w-5" />;
      case 'clock':
        return <Clock className="h-5 w-5" />;
      case 'loader':
        return <Loader className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <>
      <tr 
        className={`border-b transition-colors hover:bg-gray-50 cursor-pointer ${isExpanded ? 'bg-blue-50' : ''}`}
        onClick={toggleExpand}
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {payment.installment_id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(payment.fecha_vencimiento)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {formatCurrency(payment.valor_cuota_pactad)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
            <StatusIcon />
            <span className="ml-1">{payment.estado_cuota}</span>
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {payment.monto_pagado_cuota ? formatCurrency(payment.monto_pagado_cuota) : '-'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button className="text-blue-600 hover:text-blue-900">
            {isExpanded ? 'Ocultar' : 'Ver más'}
          </button>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={6} className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Fecha último pago:</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {payment.fecha_ultimo_pago_cuota ? formatDate(payment.fecha_ultimo_pago_cuota) : 'No registrado'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Deuda actual:</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {formatCurrency(payment.deuda_actua)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Cargos moratorios:</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {formatCurrency(payment.cargos_moratorio)}
                  </span>
                </div>
                
                {/* Add more details here if needed */}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default PaymentScheduleRow;