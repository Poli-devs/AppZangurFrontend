import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../core/providers/AuthProvider';
import { api } from '../../../../core/api/axiosConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('admin@zangur.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/usuarios/login', {
        correo: email,
        contrasenia: password,
      });

      const { token, usuario } = response.data.data;
      login(usuario, token);
      
      // Redirección según rol usando switch para mejor claridad
      switch (usuario.rolId) {
        case 1: // Administrador
          navigate('/admin/dashboard');
          break;
        case 2: // Auditor (Gerente en API)
          navigate('/admin/dashboard'); // Mismo dashboard que admin
          break;
        case 3: // Operador (Empleado en API)
          navigate('/admin/dashboard');
          break;
        case 4: // Afiliado (Cliente en API)
          navigate('/afiliado/dashboard');
          break;
        default:
          // Redirigir a una página por defecto para roles no especificados
          navigate('/dashboard');
          console.warn(`Rol no reconocido (${usuario.rolId}), redirigiendo a dashboard general`);
      }
      
    } catch (err) {
      // Manejo de errores más robusto
      let errorMessage = 'Error de conexión. Por favor, intenta nuevamente.';
      
      if (err.response) {
        // Error del servidor (4xx, 5xx)
        errorMessage = err.response.data?.message || 
                      err.response.data?.error || 
                      `Error ${err.response.status}: ${err.response.statusText}`;
        
        // Manejo específico para errores comunes
        if (err.response.status === 401) {
          errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
        } else if (err.response.status === 403) {
          errorMessage = 'Acceso denegado. Tu cuenta no tiene permisos para acceder.';
        } else if (err.response.status === 404) {
          errorMessage = 'Servicio no disponible en este momento.';
        } else if (err.response.status >= 500) {
          errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
        }
      } else if (err.request) {
        // Error de red (no se recibió respuesta)
        errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
      } else {
        // Error en la configuración de la petición
        errorMessage = 'Error en la configuración de la solicitud.';
      }
      
      setError(errorMessage);
      
      // Log para debugging (solo en desarrollo)
      if (process.env.NODE_ENV === 'development') {
        console.error('Error en login:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar credenciales de prueba
  const loadTestCredentials = (role = 'admin') => {
    const credentials = {
      admin: {
        email: 'admin@zangur.com',
        password: 'password123'
      },
      auditor: {
        email: 'auditor@zangur.com',
        password: 'password123'
      },
      operador: {
        email: 'operador@zangur.com',
        password: 'password123'
      },
      afiliado: {
        email: 'afiliado@zangur.com',
        password: 'password123'
      }
    };

    const selected = credentials[role] || credentials.admin;
    setEmail(selected.email);
    setPassword(selected.password);
  };

  // Función para login rápido con credenciales de prueba
  const quickLogin = async (role = 'admin') => {
    setLoading(true);
    setError('');
    
    loadTestCredentials(role);
    
    // Esperar un momento para que se actualicen los estados
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-corporate-DEFAULT flex items-center justify-center p-4">
      <div className="absolute top-8 left-8 flex items-center space-x-3">
        <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">Z</span>
        </div>
        <span className="text-2xl font-bold text-white">ZANGUR</span>
      </div>

      <div className="max-w-md w-full bg-bg-card rounded-2xl shadow-xl p-8 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-action-green/10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-corporate-light/10 rounded-full"></div>

        <div className="relative z-10">
          {/* Logo central */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-brand-red rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl font-bold">Z</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-corporate-DEFAULT text-center mb-2">
            Inicio de Sesión
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Sistema de Gestión Zangur • Plataforma Profesional
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fadeIn">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-600 font-bold">!</span>
                </div>
                <div className="flex-1">
                  <p className="text-red-700 font-medium">Error de autenticación</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
                <button 
                  onClick={() => setError('')}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-corporate-DEFAULT font-medium mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">📧</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action-green focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="usuario@zangur.com"
                  disabled={loading}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-corporate-DEFAULT font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">🔒</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action-green focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                  disabled={loading}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-action-green bg-gray-100 border-gray-300 rounded focus:ring-action-green disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Recordar sesión
                </label>
              </div>
              <button
                type="button"
                onClick={() => setError('Función de recuperación de contraseña no implementada.')}
                className="text-sm text-action-green hover:text-action-hover font-medium disabled:opacity-50"
                disabled={loading}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-action-green text-white py-4 rounded-lg font-semibold hover:bg-action-hover transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Iniciando sesión...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Acceso rápido para pruebas</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => quickLogin('admin')}
                className="border-2 border-gray-300 text-corporate-DEFAULT py-3 rounded-lg font-medium hover:border-action-green transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2">👑</span>
                  Admin
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => quickLogin('auditor')}
                className="border-2 border-gray-300 text-corporate-DEFAULT py-3 rounded-lg font-medium hover:border-action-green transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2">📊</span>
                  Auditor
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => quickLogin('operador')}
                className="border-2 border-gray-300 text-corporate-DEFAULT py-3 rounded-lg font-medium hover:border-action-green transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2">🛠️</span>
                  Operador
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => quickLogin('afiliado')}
                className="border-2 border-gray-300 text-corporate-DEFAULT py-3 rounded-lg font-medium hover:border-action-green transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <div className="flex items-center justify-center">
                  <span className="mr-2">👤</span>
                  Afiliado
                </div>
              </button>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4">
              <p>Usa estos botones para probar diferentes roles en el sistema</p>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                ¿No tienes una cuenta?
              </p>
              <button
                type="button"
                onClick={() => setError('Solicitud de acceso: contacta al administrador del sistema.')}
                className="text-action-green hover:text-action-hover font-medium"
              >
                Solicita acceso
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Al iniciar sesión, aceptas nuestros{' '}
            <button 
              type="button" 
              onClick={() => setError('Términos de servicio: en proceso de implementación.')}
              className="text-action-green hover:text-action-hover"
            >
              Términos
            </button>{' '}
            y{' '}
            <button 
              type="button" 
              onClick={() => setError('Política de privacidad: en proceso de implementación.')}
              className="text-action-green hover:text-action-hover"
            >
              Privacidad
            </button>
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Zangur. Sistema de Gestión Profesional.</p>
        <p className="mt-1">Versión 1.0.0 • Seguridad Empresarial</p>
      </div>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;