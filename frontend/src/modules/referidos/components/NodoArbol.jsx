import React from 'react';

export const NodoArbol = ({ usuario, nivel, posicion, tieneHijos, esUsuarioActual }) => {
  // 👨‍🏫 EXPLICACIÓN: Función para determinar color basado en nivel
  const getColorPorNivel = (nivel) => {
    const colores = [
      'bg-gradient-to-br from-action-green to-emerald-600', // Nivel 0
      'bg-gradient-to-br from-corporate-light to-blue-600',  // Nivel 1
      'bg-gradient-to-br from-brand-red to-red-600',        // Nivel 2
      'bg-gradient-to-br from-blue-500 to-indigo-600',      // Nivel 3
      'bg-gradient-to-br from-purple-500 to-purple-600',    // Nivel 4
    ];
    return colores[nivel] || 'bg-gradient-to-br from-gray-500 to-gray-600';
  };

  const getIniciales = () => {
    if (!usuario?.nombres || !usuario?.primerApellido) return '?';
    return `${usuario.nombres.charAt(0)}${usuario.primerApellido.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Línea conectora superior */}
      {nivel > 0 && (
        <div className="w-0.5 h-6 bg-gray-300"></div>
      )}
      
      {/* Contenedor principal del nodo */}
      <div className={`
        relative p-4 rounded-full 
        ${getColorPorNivel(nivel)}
        text-white font-bold
        shadow-lg
        ${posicion ? 'border-4 border-white' : ''}
        ${esUsuarioActual ? 'ring-4 ring-action-green ring-opacity-50' : ''}
      `}>
        {/* Indicador de nivel */}
        {nivel > 0 && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded">
              N{nivel}
            </div>
          </div>
        )}
        
        {/* Indicador de posición */}
        {posicion && (
          <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 ${
            posicion === 'izquierda' ? 'border-blue-500' : 'border-green-500'
          } flex items-center justify-center`}>
            <span className={`text-xs font-bold ${
              posicion === 'izquierda' ? 'text-blue-500' : 'text-green-500'
            }`}>
              {posicion === 'izquierda' ? 'I' : 'D'}
            </span>
          </div>
        )}
        
        {/* Iniciales */}
        <div className="w-12 h-12 flex items-center justify-center text-lg">
          {getIniciales()}
        </div>
        
        {/* Tooltip en hover */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-sm rounded py-2 px-3 whitespace-nowrap">
            <div className="font-semibold">{usuario?.nombres} {usuario?.primerApellido}</div>
            <div className="text-gray-300 text-xs">ID: {usuario?.id}</div>
          </div>
        </div>
      </div>
      
      {/* Nombre */}
      <div className="mt-2 text-center max-w-[100px]">
        <p className="text-sm font-medium text-gray-700 truncate">
          {usuario?.nombres?.split(' ')[0]}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {usuario?.primerApellido}
        </p>
      </div>
      
      {/* Línea conectora inferior */}
      {tieneHijos && (
        <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
      )}
    </div>
  );
};