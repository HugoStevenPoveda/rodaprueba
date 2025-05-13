import React from 'react';
import { Credit } from '../types';
import { formatCurrency, formatDate, getStatusColorClass } from '../utils/formatters';
import { Calendar, CreditCard as CreditCardIcon } from 'lucide-react';

interface CreditCardProps {
  credit: Credit;
  onClick: () => void;
}

const CreditCard: React.FC<CreditCardProps> = ({ credit, onClick }) => {
  const statusClass = getStatusColorClass(credit.estado_nombre);

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate max-w-[70%]">
          {credit.nombre_cliente}
        </h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
          {credit.estado_nombre}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-700">
          <CreditCardIcon className="h-5 w-5 mr-2 text-blue-600" />
          <span className="text-sm font-medium">ID:</span>
          <span className="ml-2 text-sm">{credit.credito_id}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          <span className="text-sm font-medium">Fecha de desembolso:</span>
          <span className="ml-2 text-sm">{formatDate(credit.fecha_desembolso)}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Deuda inicial</span>
            <span className="text-lg font-bold text-blue-700">{formatCurrency(credit.deuda_inicial)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;