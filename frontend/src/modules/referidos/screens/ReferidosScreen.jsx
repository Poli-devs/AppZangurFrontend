import React, { useState } from 'react';
import { useAuth } from '../../../core/providers/AuthProvider';
import { useReferidos } from '../../../shared/hooks/useReferidos';
import { useUsuarios } from '../../../shared/hooks/useUsuarios';
import { Loader } from '../../../shared/components/Loader';

// Componente simple de nodo
const NodoSimple = ({ usuario, nivel, posicion, esActual }) => {
  return (
    <div className="flex flex-col items-center">
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
        ${esActual ? 'bg-action-green' : 'bg-corporate-light'}
        ${posicion === 'izquierda' ? 'border-2 border-blue-500' : ''}
        ${posicion === 'derecha' ? 'border-2 border-green-500' : ''}
      `}>
        {usuario?.nombres?.charAt(0)}
        {usuario?.primerApellido?.charAt(0)}
      </div>
      <div className="mt-2 text-center">
        <p className="text-xs font-medium text-gray-700">
          {usuario?.nombres?.split(' ')[0]}
        </p>
        <p className="text-xs text-gray-500">Nivel {nivel}</p>
      </div>
    </div>
  );
};

// Componente para renderizar árbol
const RenderizarArbol = ({ nodo, nivel = 0, posicion, userId }) => {
  if (!nodo || !nodo.usuario) return null;

  const tieneHijos = nodo.hijos && nodo.hijos.length > 0;
  const esActual = nodo.usuario.id === userId;

  return (
    <div className="flex flex-col items-center">
      <NodoSimple 
        usuario={nodo.usuario} 
        nivel={nivel} 
        posicion={posicion}
        esActual={esActual}
      />
      
      {tieneHijos && (
        <div className="flex justify-center mt-4">
          {nodo.hijos.map((hijo, index) => (
            <div key={index} className="mx-4">
              <RenderizarArbol
                nodo={hijo}
                nivel={nivel + 1}
                posicion={index === 0 ? 'izquierda' : 'derecha'}
                userId={userId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ReferidosScreen = () => {
  const { user } = useAuth();
  const [maxGeneracion, setMaxGeneracion] = useState(4);
  
  const { getArbolCompleto, getHijosDirectos } = useReferidos();
  const { getUsuariosAfiliados } = useUsuarios();
  
  const { 
    data: arbol, 
    isLoading: loadingArbol, 
    error: errorArbol 
  } = getArbolCompleto(user?.id, maxGeneracion);
  
  const { 
    data: hijos, 
    isLoading: loadingHijos 
  } = getHijosDirectos(user?.id);
  
  const { 
    data: afiliados 
  } = getUsuariosAfiliados();

  if (loadingArbol) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader texto="Cargando tu red..." />
      </div>
    );
  }

  if (errorArbol) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-red-700 font-bold mb-2">Error al cargar la red</h3>
        <p className="text-red-600">
          {errorArbol.response?.data?.message || 'No se pudo cargar tu estructura'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const totalHijos = hijos?.length || 0;
  const capacidadRestante = Math.max(0, 2 - totalHijos);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-corporate-DEFAULT">
          🌐 Mi Red de Crecimiento
        </h1>
        <p className="text-gray-600 mt-2">
          Visualiza y gestiona tu estructura binaria
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-2">Conexiones Directas</p>
              <div className="text-3xl font-bold text-corporate-DEFAULT">{totalHijos}</div>
            </div>
            <div className="text-3xl text-action-green">👥</div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-500">Cupo: {capacidadRestante}/2 disponible</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-2">Red Total</p>
              <div className="text-3xl font-bold text-corporate-DEFAULT">
                {arbol?.estadisticas?.totalDescendientes || 0}
              </div>
            </div>
            <div className="text-3xl text-corporate-light">🌳</div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Miembros en tu red completa
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-2">Afiliados</p>
              <div className="text-3xl font-bold text-corporate-DEFAULT">
                {afiliados?.length || 0}
              </div>
            </div>
            <div className="text-3xl text-brand-red">📋</div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Disponibles para conectar
          </div>
        </div>
      </div>

      {/* Árbol binario */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-corporate-DEFAULT">
              Estructura de tu Red
            </h2>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Niveles:</label>
              <select 
                value={maxGeneracion}
                onChange={(e) => setMaxGeneracion(Number(e.target.value))}
                className="border rounded px-3 py-1 text-sm"
              >
                {[2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {arbol && arbol.usuario ? (
          <div className="overflow-x-auto">
            <div className="min-w-max p-4">
              <RenderizarArbol 
                nodo={arbol} 
                userId={user?.id} 
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🌳</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">Red vacía</h3>
            <p className="text-gray-500 mb-6">
              Comienza construyendo tu red de crecimiento
            </p>
            <button className="bg-action-green text-white px-6 py-2 rounded-lg hover:bg-action-hover">
              + Agregar Primera Conexión
            </button>
          </div>
        )}

        {/* Leyenda */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-action-green rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Tú</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-corporate-light rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Miembros</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-blue-500 rounded-full mr-2 bg-white"></div>
              <span className="text-sm text-gray-600">Izquierda</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-green-500 rounded-full mr-2 bg-white"></div>
              <span className="text-sm text-gray-600">Derecha</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de conexiones directas */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">
          👥 Conexiones Directas
        </h2>
        
        {loadingHijos ? (
          <div className="text-center py-8">
            <Loader size="sm" texto="Cargando conexiones..." />
          </div>
        ) : hijos && hijos.length > 0 ? (
          <div className="space-y-4">
            {hijos.map((hijo) => (
              <div key={hijo.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                      hijo.posicion === 'izquierda' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {hijo.usuarioHijo?.nombres?.charAt(0)}
                      {hijo.usuarioHijo?.primerApellido?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-corporate-DEFAULT">
                        {hijo.usuarioHijo?.nombres} {hijo.usuarioHijo?.primerApellido}
                      </h4>
                      <p className="text-sm text-gray-600">ID: {hijo.usuarioHijoId}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    hijo.posicion === 'izquierda' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {hijo.posicion === 'izquierda' ? 'Izquierda' : 'Derecha'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No tienes conexiones directas aún</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferidosScreen;