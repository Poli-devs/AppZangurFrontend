import React, { useState } from 'react';
import { useAuth } from '../../../../core/providers/AuthProvider';
import { useReferidos } from '../../../../shared/hooks/useReferidos';
import { useUsuarios } from '../../../../shared/hooks/useUsuarios';
import { Loader } from '../../../../shared/components/Loader';
import { Link } from 'react-router-dom';

export const AfiliadoDashboardScreen = () => {
  const { user, getRolNombre } = useAuth();
  const [activeTab, setActiveTab] = useState('resumen');
  
  // 👨‍🏫 EXPLICACIÓN: Usar hooks para obtener datos del afiliado
  const { getArbolCompleto, getHijosDirectos } = useReferidos();
  const { getPerfil } = useUsuarios();
  
  const { data: arbol, isLoading: loadingArbol } = getArbolCompleto(user?.id, 3);
  const { data: hijos, isLoading: loadingHijos } = getHijosDirectos(user?.id);
  const { data: perfil, isLoading: loadingPerfil } = getPerfil();

  if (loadingPerfil) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" texto="Cargando tu información..." />
      </div>
    );
  }

  // Calcular estadísticas para afiliado
  const totalHijos = hijos?.length || 0;
  const capacidadRestante = Math.max(0, 2 - totalHijos);
  const totalRed = arbol?.estadisticas?.totalDescendientes || 0;
  
  // Datos de ganancias (ejemplo - luego vendrá de API)
  const ganancias = [
    { generacion: 3, estado: 'pendiente', monto: 10, fecha: '2024-01-15' },
    { generacion: 5, estado: 'pagado', monto: 25, fecha: '2024-01-10' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-corporate-DEFAULT">
              👋 Bienvenido, {user?.nombres} {user?.primerApellido}
            </h1>
            <p className="text-gray-600 mt-2">
              {getRolNombre()} • Panel de crecimiento personal
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <div className="text-sm text-gray-500">ID Afiliado</div>
              <div className="font-bold text-corporate-DEFAULT">#{user?.id}</div>
            </div>
            <Link 
              to="/mi-red"
              className="bg-action-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-action-hover transition"
            >
              🌐 Ver Mi Red
            </Link>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('resumen')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resumen'
                  ? 'border-action-green text-action-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Resumen
            </button>
            <button
              onClick={() => setActiveTab('ganancias')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ganancias'
                  ? 'border-action-green text-action-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              💰 Mis Ganancias
            </button>
            <button
              onClick={() => setActiveTab('compras')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'compras'
                  ? 'border-action-green text-action-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🛒 Mis Compras
            </button>
            <button
              onClick={() => setActiveTab('referidos')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'referidos'
                  ? 'border-action-green text-action-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              👥 Mis Referidos
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido según pestaña activa */}
      {activeTab === 'resumen' && (
        <>
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Conexiones Directas</p>
                  <div className="text-3xl font-bold text-corporate-DEFAULT">{totalHijos}/2</div>
                </div>
                <div className="text-3xl text-action-green">🤝</div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  {capacidadRestante > 0 
                    ? `${capacidadRestante} espacio(s) disponible(s)`
                    : '✅ Cupo completo'
                  }
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-action-green h-2 rounded-full" 
                    style={{ width: `${(totalHijos / 2) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Red Total</p>
                  <div className="text-3xl font-bold text-corporate-DEFAULT">{totalRed}</div>
                </div>
                <div className="text-3xl text-corporate-light">🌐</div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Miembros en tu red completa
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Ganancias Totales</p>
                  <div className="text-3xl font-bold text-corporate-DEFAULT">$35</div>
                </div>
                <div className="text-3xl text-green-500">💰</div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                2 generaciones completadas
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Próxima Meta</p>
                  <div className="text-3xl font-bold text-corporate-DEFAULT">Gen 7</div>
                </div>
                <div className="text-3xl text-brand-red">🎯</div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                16 miembros necesarios
              </div>
            </div>
          </div>

          {/* Progreso de red */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">
              📈 Progreso de tu Red
            </h2>
            
            <div className="space-y-6">
              {[3, 5, 7, 9, 11].map((generacion) => {
                const miembrosNecesarios = Math.pow(2, generacion);
                const completado = totalRed >= miembrosNecesarios;
                
                return (
                  <div key={generacion} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-bold text-corporate-DEFAULT">
                          Generación {generacion}
                        </span>
                        <span className="ml-3 text-sm text-gray-500">
                          {miembrosNecesarios} miembros necesarios
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        completado
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {completado ? '✅ Completada' : '🔄 En progreso'}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          completado ? 'bg-green-500' : 'bg-action-green'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (totalRed / miembrosNecesarios) * 100)}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>{totalRed} / {miembrosNecesarios} miembros</span>
                      <span>
                        {completado ? '$25 listos' : `$${generacion === 3 ? '10' : '25'} al completar`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-action-green/10 to-emerald-100 rounded-xl p-6">
              <h3 className="font-bold text-corporate-DEFAULT mb-4">🚀 Acción Rápida</h3>
              <p className="text-gray-600 mb-4">
                Invita a más personas a unirse a tu red y acelera tu crecimiento.
              </p>
              <button className="w-full bg-action-green text-white py-3 rounded-lg font-semibold hover:bg-action-hover">
                + Invitar Referido
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-corporate-light/10 to-blue-100 rounded-xl p-6">
              <h3 className="font-bold text-corporate-DEFAULT mb-4">📱 Compartir Enlace</h3>
              <p className="text-gray-600 mb-4">
                Comparte tu enlace personalizado para que otros se registren.
              </p>
              <div className="flex">
                <input 
                  type="text" 
                  value={`https://zangur.com/registro?referido=${user?.id}`}
                  readOnly
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 text-sm"
                />
                <button className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-900">
                  Copiar
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-brand-red/10 to-red-100 rounded-xl p-6">
              <h3 className="font-bold text-corporate-DEFAULT mb-4">📞 Soporte</h3>
              <p className="text-gray-600 mb-4">
                ¿Tienes preguntas? Nuestro equipo está aquí para ayudarte.
              </p>
              <button className="w-full border-2 border-brand-red text-brand-red py-3 rounded-lg font-semibold hover:bg-brand-red/10">
                Contactar Soporte
              </button>
            </div>
          </div>
        </>
      )}

      {activeTab === 'ganancias' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">
            💰 Historial de Ganancias
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ganancias.map((ganancia, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold">G{ganancia.generacion}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Generación {ganancia.generacion}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.pow(2, ganancia.generacion)} miembros
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-green-600">
                        ${ganancia.monto}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ganancia.estado === 'pagado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ganancia.estado === 'pagado' ? '✅ Pagado' : '⏳ Pendiente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {ganancia.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ganancia.estado === 'pendiente' && (
                        <button className="text-action-green hover:text-action-hover font-medium">
                          Solicitar pago
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3">💡</div>
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Recordatorio:</strong> Las ganancias se generan automáticamente al completar 
                  generaciones impares (3, 5, 7, 9...). La primera ganancia (generación 3) es de $10, 
                  las siguientes son de $25 cada una.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compras' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">
            🛒 Mis Compras
          </h2>
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No hay compras registradas</h3>
            <p className="text-gray-500 mb-6">
              Aquí aparecerán tus compras de productos una vez que las realices.
            </p>
            <button className="bg-action-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-action-hover">
              Ver Productos Disponibles
            </button>
          </div>
        </div>
      )}

      {activeTab === 'referidos' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">
            👥 Mis Referidos Directos
          </h2>
          
          {loadingHijos ? (
            <div className="text-center py-12">
              <Loader texto="Cargando tus referidos..." />
            </div>
          ) : hijos && hijos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hijos.map((hijo) => (
                <div key={hijo.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                      hijo.posicion === 'izquierda' 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-br from-green-500 to-green-600'
                    }`}>
                      {hijo.usuarioHijo?.nombres?.charAt(0)}
                      {hijo.usuarioHijo?.primerApellido?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-corporate-DEFAULT">
                        {hijo.usuarioHijo?.nombres} {hijo.usuarioHijo?.primerApellido}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ID: {hijo.usuarioHijoId} • {hijo.usuarioHijo?.correo}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Posición</div>
                      <div className={`font-bold ${
                        hijo.posicion === 'izquierda' ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {hijo.posicion === 'izquierda' ? '👈 Izquierda' : '👉 Derecha'}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Fecha Ingreso</div>
                      <div className="font-bold text-corporate-DEFAULT">
                        {new Date(hijo.fechaRegistro).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <button className="w-full text-center text-action-green hover:text-action-hover font-medium">
                      Ver detalles completos →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No tienes referidos directos</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Comienza invitando personas a unirse a tu red. Cada referido te acerca a completar generaciones y ganar beneficios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-action-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-action-hover">
                  + Invitar Primer Referido
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50">
                  📋 Ver Tutorial
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Información adicional */}
      <div className="mt-8 bg-gradient-to-r from-corporate-light/10 to-action-green/10 rounded-xl p-6">
        <h3 className="font-bold text-corporate-DEFAULT mb-4 flex items-center">
          <span className="mr-3">🎓</span> ¿Cómo funciona el sistema?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 p-4 rounded-lg">
            <div className="text-2xl mb-2">1️⃣</div>
            <h4 className="font-semibold text-gray-800 mb-2">Comprar Producto</h4>
            <p className="text-sm text-gray-600">
              Adquiere el producto base ($25) para activar tu cuenta y poder invitar referidos.
            </p>
          </div>
          <div className="bg-white/80 p-4 rounded-lg">
            <div className="text-2xl mb-2">2️⃣</div>
            <h4 className="font-semibold text-gray-800 mb-2">Invitar 2 Personas</h4>
            <p className="text-sm text-gray-600">
              Invita a 2 personas (una en izquierda, otra en derecha) para comenzar tu red binaria.
            </p>
          </div>
          <div className="bg-white/80 p-4 rounded-lg">
            <div className="text-2xl mb-2">3️⃣</div>
            <h4 className="font-semibold text-gray-800 mb-2">Ganar por Generaciones</h4>
            <p className="text-sm text-gray-600">
              Gana $10 al completar generación 3 y $25 por cada generación impar posterior.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfiliadoDashboardScreen;