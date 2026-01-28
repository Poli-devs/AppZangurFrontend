import React from 'react';
import { NodoArbol } from './NodoArbol';

// 👨‍🏫 EXPLICACIÓN: Componente recursivo que renderiza el árbol binario completo
const RenderizarArbol = ({ nodo, nivel = 0, posicion, userId }) => {
  if (!nodo || !nodo.usuario) return null;

  const tieneHijos = nodo.hijos && nodo.hijos.length > 0;
  const esUsuarioActual = nodo.usuario.id === userId;

  return (
    <div className="flex flex-col items-center">
      {/* Nodo actual */}
      <div className="group">
        <NodoArbol
          usuario={nodo.usuario}
          nivel={nivel}
          posicion={posicion}
          tieneHijos={tieneHijos}
          esUsuarioActual={esUsuarioActual}
        />
      </div>

      {/* Contenedor de hijos */}
      {tieneHijos && (
        <div className="flex justify-center mt-8">
          {nodo.hijos.map((hijo, index) => {
            const esIzquierda = index === 0;
            
            return (
              <div 
                key={hijo.usuario?.id || index}
                className={`relative ${esIzquierda ? 'mr-16' : 'ml-16'}`}
              >
                {/* Línea diagonal */}
                <div className={`
                  absolute top-0 h-8 w-0.5 bg-gray-300
                  ${esIzquierda ? 'left-1/2 -rotate-45' : 'right-1/2 rotate-45'}
                  origin-top
                `}></div>
                
                {/* Renderizar hijo recursivamente */}
                <div className="pt-8">
                  <RenderizarArbol
                    nodo={hijo}
                    nivel={nivel + 1}
                    posicion={esIzquierda ? 'izquierda' : 'derecha'}
                    userId={userId}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ArbolBinario = ({ arbol, userId, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-action-green"></div>
          <p className="mt-2 text-gray-600">Cargando estructura...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl">
        <div className="text-red-600 text-xl mb-4">⚠️ Error al cargar el árbol</div>
        <p className="text-gray-600 mb-6">
          {error.response?.data?.message || 'Error de conexión'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-action-green text-white px-6 py-2 rounded-lg hover:bg-action-hover"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!arbol || !arbol.usuario) {
    return (
      <div className="text-center p-12 bg-gray-50 rounded-xl">
        <div className="text-gray-400 text-6xl mb-4">🌳</div>
        <h3 className="text-xl font-bold text-gray-600 mb-2">Árbol vacío</h3>
        <p className="text-gray-500 mb-6">
          Comienza construyendo tu red de referidos
        </p>
        <button className="bg-action-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-action-hover">
          + Agregar Primer Referido
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-corporate-DEFAULT flex items-center">
          <span className="mr-3">🌳</span> 
          Red Binaria
        </h2>
        {arbol.estadisticas && (
          <p className="text-gray-600">
            {arbol.estadisticas.totalDescendientes} miembros en total
          </p>
        )}
      </div>

      {/* Contenedor del árbol */}
      <div className="overflow-x-auto py-4">
        <div className="min-w-max px-4">
          <RenderizarArbol nodo={arbol} userId={userId} />
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-action-green rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Tú (Nivel 0)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-corporate-light rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Generación 1</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-blue-500 rounded-full mr-2 bg-white"></div>
            <span className="text-sm text-gray-600">Posición Izquierda</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-green-500 rounded-full mr-2 bg-white"></div>
            <span className="text-sm text-gray-600">Posición Derecha</span>
          </div>
        </div>
      </div>
    </div>
  );
};