import React from 'react';
import { Bike } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-headerwhite shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bike className="h-8 w-8 text-neon-yellow" />
            <h1 className="ml-2 text-xl font-bold text-neon-yellow">
              Gestión de Créditos RODA
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Versión 1.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
