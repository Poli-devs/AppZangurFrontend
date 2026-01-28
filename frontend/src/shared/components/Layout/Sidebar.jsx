import React from 'react';
import { useAuth } from '../../../core/providers/AuthProvider';

export const Sidebar = () => {
  const { isAdmin } = useAuth();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '👥', label: 'Usuarios', path: '/usuarios' },
    { icon: '🔺', label: 'Pirámides', path: '/piramides' },
    { icon: '🛒', label: 'Productos', path: '/productos' },
    { icon: '💰', label: 'Compras', path: '/compras' },
    { icon: '🌳', label: 'Árbol Binario', path: '/arbol' },
    { icon: '📈', label: 'Reportes', path: '/reportes' },
  ];

  const adminItems = isAdmin ? [
    { icon: '⚙️', label: 'Configuración', path: '/config' },
    { icon: '🛡️', label: 'Auditoría', path: '/auditoria' },
  ] : [];

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">Navegación</h2>
        
        {/* Menú principal */}
        <nav className="space-y-2 mb-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Menú admin (solo visible para admin) */}
        {adminItems.length > 0 && (
          <>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Administración
            </h3>
            <nav className="space-y-2">
              {adminItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </>
        )}

        {/* Estado API */}
        <div className="mt-12 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="font-medium text-green-700">API Conectada</span>
          </div>
          <p className="text-sm text-green-600">
            Sistema Zangur • Binario • MLM
          </p>
        </div>
      </div>
    </aside>
  );
};