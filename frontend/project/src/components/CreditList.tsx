import React from 'react';
import { Credit } from '../types';
import CreditCard from './CreditCard';
import { Search } from 'lucide-react';

interface CreditListProps {
  credits: Credit[];
  isLoading: boolean;
  onSelectCredit: (creditId: number) => void;
}
const CreditList: React.FC<CreditListProps> = ({ credits, isLoading, onSelectCredit }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCredits = credits.filter(credit => 
    credit.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    credit.credito_id.toString().includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#28242c]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e0fc04]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#28242c] min-h-screen p-4 text-white">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o ID..."
          className="pl-10 pr-4 py-2 border border-gray-600 rounded-lg w-full bg-[#1f1b22] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e0fc04] focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCredits.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">No se encontraron créditos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCredits.map(credit => (
            <CreditCard 
              key={credit.credito_id} 
              credit={credit}
              onClick={() => onSelectCredit(credit.credito_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreditList;