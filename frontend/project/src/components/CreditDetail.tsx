import React from 'react';
import { Credit, CreditDetail as CreditDetailType } from '../types';
import { formatCurrency, formatDate, getStatusColorClass } from '../utils/formatters';
import PaymentSchedule from './PaymentSchedule';
import { ArrowLeft, Calendar, CreditCard as CreditCardIcon, DollarSign, User } from 'lucide-react';

interface CreditDetailProps {
  credit: Credit;
  creditDetail: CreditDetailType | null;
  isLoading: boolean;
  onBack: () => void;
}

const CreditDetail: React.FC<CreditDetailProps> = ({ 
  credit, 
  creditDetail, 
  isLoading,
  onBack
}) => {
  const statusClass = getStatusColorClass(credit.estado_nombre);

  return (
  <div className="space-y-6 bg-graydark-900 text-white p-6 rounded-lg shadow-md">
  <div className="flex items-center mb-6">
    <button 
      onClick={onBack}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-neon-yellow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-yellow"
    >
      <ArrowLeft className="h-5 w-5 mr-1" />
      Volver a la lista
    </button>
  </div>

  <div className="bg-graydark-900 rounded-lg shadow-md overflow-hidden border border-gray-700">
    <div className="p-6 border-b border-gray-700">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-white">Detalle de Crédito</h2>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
          {credit.estado_nombre}
        </span>
      </div>
    </div>

    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <User className="h-5 w-5 text-neon-yellow mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-300">Cliente</p>
              <p className="mt-1 text-lg font-semibold text-white">{credit.nombre_cliente}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CreditCardIcon className="h-5 w-5 text-neon-yellow mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-300">ID del Crédito</p>
              <p className="mt-1 text-lg font-semibold text-white">{credit.credito_id}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-neon-yellow mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-300">Fecha de Desembolso</p>
              <p className="mt-1 text-lg font-semibold text-white">{formatDate(credit.fecha_desembolso)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <DollarSign className="h-5 w-5 text-neon-yellow mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-300">Deuda Inicial</p>
              <p className="mt-1 text-lg font-semibold text-white">{formatCurrency(credit.deuda_inicial)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <PaymentSchedule 
          payments={creditDetail?.cronograma || []} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  </div>
</div>

  );
};

export default CreditDetail;