import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from  '../../../core/providers/AuthProvider';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: '👥', label: 'Afiliados', path: '/admin/afiliados' },
    { icon: '🛒', label: 'Productos', path: '/admin/productos' },
    { icon: '💰', label: 'Compras', path: '/admin/compras' },
    { icon: '🌳', label: 'Red de Referidos', path: '/admin/red' },
    { icon: '💳', label: 'Pagos', path: '/admin/pagos' },
    { icon: '📈', label: 'Reportes', path: '/admin/reportes' },
  ];

  const adminItems = user?.rolId === 1 ? [
    { icon: '⚙️', label: 'Configuración', path: '/admin/config' },
    { icon: '🛡️', label: 'Auditoría', path: '/admin/auditoria' },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold">Z</span>
                </div>
                <span className="text-xl font-bold text-gray-800">ZANGUR</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {user?.rolId === 1 ? 'Admin' : 'Operador'}
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right hidden md:block">
                <p className="font-medium text-gray-800">{user?.nombres} {user?.primerApellido}</p>
                <p className="text-sm text-gray-500">{user?.correo}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-73px)] hidden lg:block">
          <nav className="p-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {adminItems.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-8 mb-4">
                  Administración
                </h3>
                <div className="space-y-2">
                  {adminItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;