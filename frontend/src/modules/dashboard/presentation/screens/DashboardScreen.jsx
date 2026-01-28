import React from 'react';
import { useAuth } from '../../../../core/providers/AuthProvider';

export const DashboardScreen = () => {
  const { user } = useAuth();

  // Datos de ejemplo (luego vendrán de API)
  const stats = [
    { label: 'Usuarios Activos', value: '1,248', change: '+12%', icon: '👥', color: 'corporate' },
    { label: 'Pirámides Activas', value: '24', change: '+3', icon: '🔺', color: 'action' },
    { label: 'Compras Hoy', value: '156', change: '+8%', icon: '💰', color: 'corporate' },
    { label: 'Ganancias Totales', value: '$25,840', change: '+15%', icon: '📈', color: 'action' },
  ];

  const recentActivities = [
    { user: 'Juan Pérez', action: 'Registró nuevo afiliado', time: 'Hace 5 min', type: 'user' },
    { user: 'María García', action: 'Completó generación 3', time: 'Hace 15 min', type: 'pyramid' },
    { user: 'Carlos López', action: 'Compra producto premium', time: 'Hace 30 min', type: 'purchase' },
    { user: 'Ana Martínez', action: 'Asignado a pirámide 1', time: 'Hace 1 hora', type: 'referral' },
  ];

  return (
    <div className="min-h-screen bg-bg-app p-6">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-corporate-DEFAULT">
          👋 Bienvenido, {user?.nombres} {user?.primerApellido}
        </h1>
        <p className="text-gray-600 mt-2">
          Panel de control del sistema Zangur • {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-bg-card rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200 border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">{stat.label}</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-corporate-DEFAULT">{stat.value}</span>
                  <span className={`ml-2 text-sm font-medium ${
                    stat.color === 'action' ? 'text-action-green' : 'text-corporate-light'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`text-2xl p-3 rounded-lg ${
                stat.color === 'action' ? 'bg-action-green/20 text-action-green' : 'bg-corporate-light/20 text-corporate-light'
              }`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Actividad reciente */}
        <div className="lg:col-span-2">
          <div className="bg-bg-card rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-corporate-DEFAULT">📋 Actividad Reciente</h2>
              <a href="#" className="text-action-green hover:text-action-hover text-sm font-medium">
                Ver todo →
              </a>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                    activity.type === 'user' ? 'bg-corporate-light/20' :
                    activity.type === 'pyramid' ? 'bg-action-green/20' :
                    activity.type === 'purchase' ? 'bg-corporate-light/20' : 'bg-action-green/20'
                  }`}>
                    <span className={`text-lg ${
                      activity.type === 'user' ? 'text-corporate-light' :
                      activity.type === 'pyramid' ? 'text-action-green' :
                      activity.type === 'purchase' ? 'text-corporate-light' : 'text-action-green'
                    }`}>
                      {activity.type === 'user' ? '👥' :
                       activity.type === 'pyramid' ? '🔺' :
                       activity.type === 'purchase' ? '💰' : '🌳'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-corporate-DEFAULT">{activity.user}</p>
                    <p className="text-gray-600 text-sm">{activity.action}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Quick actions */}
        <div>
          <div className="bg-bg-card rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">🚀 Acciones Rápidas</h2>
            <div className="space-y-4">
              <a 
                href="/usuarios/nuevo" 
                className="flex items-center p-4 bg-action-green/5 hover:bg-action-green/10 rounded-lg transition-colors duration-200 border border-action-green/20"
              >
                <div className="w-12 h-12 bg-action-green/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl text-action-green">👥</span>
                </div>
                <div>
                  <p className="font-medium text-corporate-DEFAULT">Registrar Afiliado</p>
                  <p className="text-gray-600 text-sm">Nuevo usuario en sistema</p>
                </div>
              </a>
              
              <a 
                href="/compras/nueva" 
                className="flex items-center p-4 bg-action-green/5 hover:bg-action-green/10 rounded-lg transition-colors duration-200 border border-action-green/20"
              >
                <div className="w-12 h-12 bg-action-green/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl text-action-green">💰</span>
                </div>
                <div>
                  <p className="font-medium text-corporate-DEFAULT">Registrar Compra</p>
                  <p className="text-gray-600 text-sm">Nueva venta de producto</p>
                </div>
              </a>
              
              <a 
                href="/arbol" 
                className="flex items-center p-4 bg-action-green/5 hover:bg-action-green/10 rounded-lg transition-colors duration-200 border border-action-green/20"
              >
                <div className="w-12 h-12 bg-action-green/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-xl text-action-green">🌳</span>
                </div>
                <div>
                  <p className="font-medium text-corporate-DEFAULT">Ver Árbol Binario</p>
                  <p className="text-gray-600 text-sm">Visualizar red completa</p>
                </div>
              </a>
            </div>
          </div>

          {/* API Status */}
          <div className="bg-corporate-light rounded-xl shadow-sm p-6 border border-corporate-DEFAULT/10">
            <h2 className="text-xl font-bold text-white mb-4">🔌 Estado del Sistema</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">API Zangur</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-action-green rounded-full mr-2"></div>
                  <span className="text-sm text-gray-300">Conectado</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Base de datos</span>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-action-green rounded-full mr-2"></div>
                  <span className="text-sm text-gray-300">En línea</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Usuarios en línea</span>
                <span className="font-bold text-white">24</span>
              </div>
              <div className="pt-3 border-t border-gray-700 mt-3">
                <p className="text-gray-400 text-sm">
                  Última actualización: {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional stats section */}
      <div className="mt-8">
        <div className="bg-bg-card rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-corporate-DEFAULT mb-6">📈 Rendimiento del Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-gray-500 text-sm mb-1">Tiempo de actividad</p>
              <p className="text-2xl font-bold text-corporate-DEFAULT">99.8%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-action-green h-2 rounded-full" style={{ width: '99.8%' }}></div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-gray-500 text-sm mb-1">Solicitudes hoy</p>
              <p className="text-2xl font-bold text-corporate-DEFAULT">1,842</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-action-green h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-gray-500 text-sm mb-1">Satisfacción usuarios</p>
              <p className="text-2xl font-bold text-corporate-DEFAULT">4.8/5</p>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-action-green text-lg">
                    {star <= 4 ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};