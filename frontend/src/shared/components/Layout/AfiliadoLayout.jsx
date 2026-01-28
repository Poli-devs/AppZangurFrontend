import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../core/providers/AuthProvider';

const AfiliadoLayout = ({ children }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: '📊', label: 'Mi Dashboard', path: '/afiliado/dashboard' },
    { icon: '🌳', label: 'Mi Red', path: '/afiliado/mi-red' },
    { icon: '💰', label: 'Mis Ganancias', path: '/afiliado/ganancias' },
    { icon: '🛒', label: 'Comprar Producto', path: '/afiliado/comprar' },
    { icon: '📱', label: 'Invitar Amigos', path: '/afiliado/invitar' },
    { icon: '📄', label: 'Mis Datos', path: '/afiliado/perfil' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header simple para afiliado */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/afiliado/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">Mi ZANGUR</p>
                <p className="text-xs text-gray-500">Área de Afiliado</p>
              </div>
            </Link>

            <div className="flex items-center space-x-6">
              <div className="hidden md:block">
                <p className="font-medium text-gray-800">Hola, {user?.nombres}</p>
                <p className="text-sm text-gray-500">Afiliado</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar móvil/desktop */}
          <aside className="lg:w-64">
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Mi Cuenta</h3>
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
            </div>

            {/* Tarjeta de estado */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl shadow p-6">
              <h4 className="font-bold mb-3">💎 Tu Estado</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Nivel:</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Referidos:</span>
                  <span className="font-bold">2/2</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm">Siguiente nivel en: 0 días</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>

      {/* Footer simple */}
      <footer className="mt-12 border-t pt-8 text-center text-gray-500 text-sm">
        <p>ZANGUR Afiliados • © {new Date().getFullYear()}</p>
        <p className="mt-2">Soporte: soporte@zangur.com</p>
      </footer>
    </div>
  );
};

export default AfiliadoLayout;