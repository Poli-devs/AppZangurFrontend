import React from 'react';
import { useAuth } from '../../../core/providers/AuthProvider';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-lg z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-xl">Z</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">ZANGUR</h1>
            <p className="text-xs text-gray-400">Sistema de Pirámides</p>
          </div>
        </div>

        {/* Menú central */}
        <nav className="hidden md:flex space-x-8">
          <a href="/dashboard" className="hover:text-blue-400 transition">Dashboard</a>
          <a href="/usuarios" className="hover:text-blue-400 transition">Usuarios</a>
          <a href="/piramides" className="hover:text-blue-400 transition">Pirámides</a>
          <a href="/productos" className="hover:text-blue-400 transition">Productos</a>
          <a href="/reportes" className="hover:text-blue-400 transition">Reportes</a>
        </nav>

        {/* Perfil usuario */}
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <p className="font-medium">{user.nombres} {user.primerApellido}</p>
                <p className="text-xs text-gray-400">
                  {user.rolId === 1 ? 'Administrador' : 
                   user.rolId === 2 ? 'Gerente' : 
                   user.rolId === 3 ? 'Empleado' : 'Cliente'}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="font-bold">{user.nombres.charAt(0)}</span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};