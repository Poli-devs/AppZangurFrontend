import React, { useState } from 'react';
import { useAuth } from '../../../../core/providers/AuthProvider';
import { useUsuarios } from '../../../../shared/hooks/useUsuarios';
import { useReferidos } from '../../../../shared/hooks/useReferidos';
import { Link } from 'react-router-dom';
import { Loader } from '../../../../shared/components/Loader';

export const AdminDashboardScreen = () => {
  const { user, getRolNombre } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  
  // 👨‍🏫 EXPLICACIÓN: Datos para admin/operador
  const { getUsuarios } = useUsuarios();
  const { getArbolCompleto } = useReferidos();
  
  // Usar el primer usuario como root si es admin, o el propio usuario si es operador
  const rootUserId = user?.rolId === 1 ? 1 : user?.id;
  
  const { data: usuarios, isLoading: loadingUsuarios } = getUsuarios({});
  const { data: arbolPrincipal, isLoading: loadingArbol } = getArbolCompleto(rootUserId, 3);

  if (loadingUsuarios) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" texto="Cargando datos del sistema..." />
      </div>
    );
  }

  // Calcular estadísticas
  const totalUsuarios = usuarios?.length || 0;
  const totalAfiliados = usuarios?.filter(u => u.rolId === 4).length || 0;
  const totalOperadores = usuarios?.filter(u => u.rolId === 3).length || 0;
  const totalAdmins = usuarios?.filter(u => u.rolId === 1).length || 0;
  
  // Datos de ejemplo para actividad reciente
  const actividadReciente = [
    { usuario: 'Juan Pérez', accion: 'Nuevo afiliado registrado', tiempo: 'Hace 5 min', tipo: 'registro' },
    { usuario: 'María García', accion: 'Compra de producto premium', tiempo: 'Hace 15 min', tipo: 'compra' },
    { usuario: 'Carlos López', accion: 'Generación 3 completada', tiempo: 'Hace 30 min', tipo: 'ganancia' },
    { usuario: 'Ana Martínez', accion: 'Asignado a red principal', tiempo: 'Hace 1 hora', tipo: 'referido' },
    { usuario: 'Roberto Sánchez', accion: 'Pago procesado', tiempo: 'Hace 2 horas', tipo: 'pago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-corporate-DEFAULT">
              🛠️ Panel de {getRolNombre()}
            </h1>
            <p className="text-gray-600 mt-2">
              Gestión completa del sistema Zangur • {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <div className="text-sm text-gray-500">Estado Sistema</div>
              <div className="font-bold text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                En línea
              </div>
            </div>
            <Link 
              to="/mi-red"
              className="bg-action-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-action-hover transition"
            >
              🌐 Ver Red Global
            </Link>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'general'
                  ? 'border-action-green text-action-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 General
            </button>
            <button
              onClick={() => setActiveTab('usuarios')}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'usuarios'
                  ? 'border-action-green text-action-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              👥 Usuarios
            </button>
            <button
              onClick={() => setActiveTab('ventas')}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'ventas'
                  ? 'border-action-green text-action-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              💰 Ventas
            </button>
            <button
              onClick={() => setActiveTab('red')}
              className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'red'
                  ? 'border-action-green text-action-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🌐 Red Global
            </button>
            {user?.rolId === 1 && (
              <button
                onClick={() => setActiveTab('config')}
                className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'config'
                    ? 'border-action-green text-action-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ⚙️ Configuración
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Contenido General */}
      {activeTab === 'general' && (
        <>
          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Total Usuarios</p>
                  <div className="text-3xl font-bold text-corporate-DEFAULT">{totalUsuarios}</div>
                </div>
                <div className="text-3xl text-action-green">👥</div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500">
                  <div>Afiliados: {totalAfiliados}</div>
                  <div>Operadores: {totalOperadores}</div>
                  {user?.rolId === 1 && <div>Admins: {totalAdmins}</div>}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Red Principal</p>
                  <div className="text-3xl font-bold text-corporate-DEFAULT">
                    {loadingArbol ? '...' : arbolPrincipal?.estadisticas?.totalDescendientes || 0}
                  </div>
                </div>
                <div className="text-3xl text-corporate-light">🌳</div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Miembros en red principal
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Ventas Hoy</p>
                  <div className="text-3xl font-bold text-corporate-DEFAULT">$1,250</div>
                </div>
                <div className="text-3xl text-green-500">💰</div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                50 productos vendidos
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Ganancias Pagadas</p>
                  <div className="text-3xl font-bold text-corporate-DEFAULT">$3,580</div>
                </div>
                <div className="text-3xl text-brand-red">💵</div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                143 pagos procesados
              </div>
            </div>
          </div>

          {/* Dos columnas: Actividad y Acciones rápidas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Actividad reciente */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-corporate-DEFAULT">
                    📋 Actividad Reciente
                  </h2>
                  <button className="text-action-green hover:text-action-hover text-sm font-medium">
                    Ver todo →
                  </button>
                </div>
                
                <div className="space-y-4">
                  {actividadReciente.map((actividad, index) => (
                    <div key={index} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        actividad.tipo === 'registro' ? 'bg-blue-100 text-blue-600' :
                        actividad.tipo === 'compra' ? 'bg-green-100 text-green-600' :
                        actividad.tipo === 'ganancia' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {actividad.tipo === 'registro' ? '👥' :
                         actividad.tipo === 'compra' ? '💰' :
                         actividad.tipo === 'ganancia' ? '🎯' : '🌐'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-corporate-DEFAULT">{actividad.usuario}</p>
                        <p className="text-gray-600 text-sm">{actividad.accion}</p>
                      </div>
                      <span className="text-gray-400 text-sm">{actividad.tiempo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Acciones rápidas */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">
                  ⚡ Acciones Rápidas
                </h2>
                
                <div className="space-y-4">
                  <Link 
                    to="/usuarios/nuevo"
                    className="flex items-center p-4 bg-action-green/5 hover:bg-action-green/10 rounded-lg transition border border-action-green/20"
                  >
                    <div className="w-12 h-12 bg-action-green/10 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl text-action-green">👤</span>
                    </div>
                    <div>
                      <p className="font-medium text-corporate-DEFAULT">Registrar Afiliado</p>
                      <p className="text-gray-600 text-sm">Nuevo usuario en sistema</p>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/compras/nueva"
                    className="flex items-center p-4 bg-action-green/5 hover:bg-action-green/10 rounded-lg transition border border-action-green/20"
                  >
                    <div className="w-12 h-12 bg-action-green/10 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl text-action-green">💰</span>
                    </div>
                    <div>
                      <p className="font-medium text-corporate-DEFAULT">Registrar Compra</p>
                      <p className="text-gray-600 text-sm">Nueva venta de producto</p>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/referidos/asignar"
                    className="flex items-center p-4 bg-action-green/5 hover:bg-action-green/10 rounded-lg transition border border-action-green/20"
                  >
                    <div className="w-12 h-12 bg-action-green/10 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl text-action-green">🌐</span>
                    </div>
                    <div>
                      <p className="font-medium text-corporate-DEFAULT">Asignar a Red</p>
                      <p className="text-gray-600 text-sm">Posicionar en árbol binario</p>
                    </div>
                  </Link>
                  
                  {user?.rolId === 1 && (
                    <Link 
                      to="/configuracion"
                      className="flex items-center p-4 bg-action-green/5 hover:bg-action-green/10 rounded-lg transition border border-action-green/20"
                    >
                      <div className="w-12 h-12 bg-action-green/10 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-xl text-action-green">⚙️</span>
                      </div>
                      <div>
                        <p className="font-medium text-corporate-DEFAULT">Configuración</p>
                        <p className="text-gray-600 text-sm">Parámetros del sistema</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>

              {/* Estado del sistema */}
              <div className="bg-gradient-to-br from-corporate-light to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-4">🔌 Estado del Sistema</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">API Zangur</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-sm">Conectado</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">Base de datos</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-sm">En línea</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">Usuarios activos</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200">Peticiones/hora</span>
                    <span className="font-bold">1,842</span>
                  </div>
                  <div className="pt-3 border-t border-blue-500 mt-3">
                    <p className="text-blue-200 text-sm">
                      Última actualización: {new Date().toLocaleTimeString('es-ES')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Otras pestañas - contenido básico por ahora */}
      {activeTab !== 'general' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">
            {activeTab === 'usuarios' && '👥 Gestión de Usuarios'}
            {activeTab === 'ventas' && '💰 Gestión de Ventas'}
            {activeTab === 'red' && '🌐 Red Global'}
            {activeTab === 'config' && '⚙️ Configuración del Sistema'}
          </h2>
          
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">
              {activeTab === 'usuarios' && '👥'}
              {activeTab === 'ventas' && '💰'}
              {activeTab === 'red' && '🌐'}
              {activeTab === 'config' && '⚙️'}
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              Módulo en desarrollo
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Esta funcionalidad estará disponible próximamente. Estamos trabajando para ofrecerte la mejor experiencia.
            </p>
            <button 
              onClick={() => setActiveTab('general')}
              className="bg-action-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-action-hover"
            >
              Volver al Panel General
            </button>
          </div>
        </div>
      )}

      {/* Información del sistema */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Sistema Zangur v1.0</h3>
            <p className="text-gray-300">
              Plataforma profesional de gestión de redes de crecimiento binario
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalUsuarios}</div>
              <div className="text-sm text-gray-300">Usuarios totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalAfiliados}</div>
              <div className="text-sm text-gray-300">Afiliados activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">99.8%</div>
              <div className="text-sm text-gray-300">Tiempo actividad</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;