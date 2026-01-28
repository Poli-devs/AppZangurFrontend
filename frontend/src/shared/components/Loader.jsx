import React from 'react';

export const Loader = ({ 
  size = 'md', 
  color = 'action-green',
  texto = 'Cargando...' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  const colorClasses = {
    'action-green': 'border-action-green border-t-transparent',
    'corporate-light': 'border-corporate-light border-t-transparent',
    'brand-red': 'border-brand-red border-t-transparent',
    'white': 'border-white border-t-transparent',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}></div>
      {texto && (
        <p className={`mt-4 text-sm ${
          color === 'white' ? 'text-white' : 'text-gray-600'
        }`}>
          {texto}
        </p>
      )}
    </div>
  );
};