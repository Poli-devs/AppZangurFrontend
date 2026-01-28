import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import LandingScreen from '../../modules/landing/presentation/screens/LandingScreen';
import LoginScreen from '../../modules/auth/presentation/screens/LoginScreen';
import AdminDashboardScreen from '../../modules/admin/presentation/screens/AdminDashboardScreen';
import AfiliadoDashboardScreen from '../../modules/afiliado/presentation/screens/AfiliadoDashboardScreen';
import AdminLayout from '../../shared/components/Layout/AdminLayout';
import AfiliadoLayout from '../../shared/components/Layout/AfiliadoLayout';

// 👨‍🏫 EXPLICACIÓN: Lazy loading para Referidos (mejor performance)
const ReferidosScreen = React.lazy(() => 
  import('../../modules/referidos/screens/ReferidosScreen').then(module => ({
    default: module.ReferidosScreen || module.default
  }))
);

// Componente de carga
const LoadingSpinner = ({ message = 'Cargando...' }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action-green mx-auto"></div>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  </div>
);

// Componente de redirección dinámica según rol
const DashboardRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const redirectTimer = setTimeout(() => {
        switch (user.rolId) {
          case 1: // Admin
          case 2: // Auditor
          case 3: // Operador
            navigate('/admin/dashboard');
            break;
          case 4: // Afiliado
            navigate('/afiliado/dashboard');
            break;
          default:
            navigate('/');
        }
      }, 500); // Pequeño delay para mejor UX

      return () => clearTimeout(redirectTimer);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action-green mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirigiendo a tu dashboard...</p>
      </div>
    </div>
  );
};

// 👨‍🏫 EXPLICACIÓN: Lógica de redirección automática post-login
const AutoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndRedirect = () => {
      const token = localStorage.getItem('zangur_token');
      const user = localStorage.getItem('zangur_user');
      
      if (token && user) {
        try {
          const userData = JSON.parse(user);
          
          // Redirigir según rol
          switch (userData.rolId) {
            case 1: // Admin
            case 2: // Auditor (Gerente)
            case 3: // Operador (Empleado)
              navigate('/admin/dashboard');
              break;
            case 4: // Afiliado (Cliente)
              navigate('/afiliado/dashboard');
              break;
            default:
              navigate('/');
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('zangur_token');
          localStorage.removeItem('zangur_user');
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    checkAuthAndRedirect();
  }, [navigate]);

  return <LoadingSpinner message="Verificando autenticación..." />;
};

// Layout para admin/operador/auditor
const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Solo admin (1), auditor (2) y operador (3) pueden acceder
  const allowedRoles = [1, 2, 3];
  if (!allowedRoles.includes(user?.rolId)) {
    return <Navigate to="/" />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

// Layout para afiliado
const AfiliadoRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Solo afiliado (4) puede acceder
  if (user?.rolId !== 4) {
    return <Navigate to="/" />;
  }

  return <AfiliadoLayout>{children}</AfiliadoLayout>;
};

// 👨‍🏫 EXPLICACIÓN: Ruta común para ambos roles
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Verificar si el rol tiene acceso (si se especificaron roles)
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.rolId)) {
    return <Navigate to="/" />;
  }

  // Determinar layout según rol
  if (user?.rolId === 4) {
    return <AfiliadoLayout>{children}</AfiliadoLayout>;
  } else {
    return <AdminLayout>{children}</AdminLayout>;
  }
};

// Ruta pública que redirige si está autenticado
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  // Si ya está autenticado, redirigir según su rol
  if (isAuthenticated && user) {
    switch (user.rolId) {
      case 1:
      case 2:
      case 3:
        return <Navigate to="/admin/dashboard" />;
      case 4:
        return <Navigate to="/afiliado/dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }
  
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas con redirección automática si está autenticado */}
      <Route path="/" element={
        <PublicRoute>
          <LandingScreen />
        </PublicRoute>
      } />
      
      <Route path="/login" element={
        <PublicRoute>
          <LoginScreen />
        </PublicRoute>
      } />
      
      {/* 👨‍🏫 EXPLICACIÓN: Ruta para redirección automática post-login */}
      <Route path="/login/redirect" element={<AutoRedirect />} />
      
      {/* 👨‍🏫 EXPLICACIÓN: Ruta de dashboard dinámico */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardRedirect />
        </ProtectedRoute>
      } />
      
      {/* Rutas protegidas - Admin/Operador/Auditor */}
      <Route 
        path="/admin/dashboard" 
        element={
          <AdminRoute>
            <AdminDashboardScreen />
          </AdminRoute>
        } 
      />
      
      {/* 👨‍🏫 EXPLICACIÓN: Alias para admin dashboard */}
      <Route 
        path="/administracion" 
        element={
          <AdminRoute>
            <AdminDashboardScreen />
          </AdminRoute>
        } 
      />
      
      {/* Rutas protegidas - Afiliado */}
      <Route 
        path="/afiliado/dashboard" 
        element={
          <AfiliadoRoute>
            <AfiliadoDashboardScreen />
          </AfiliadoRoute>
        } 
      />
      
      {/* 👨‍🏫 EXPLICACIÓN: Alias para afiliado dashboard */}
      <Route 
        path="/mi-cuenta" 
        element={
          <AfiliadoRoute>
            <AfiliadoDashboardScreen />
          </AfiliadoRoute>
        } 
      />
      
      {/* 👨‍🏫 EXPLICACIÓN: Módulo de Referidos - Accesible para ambos roles */}
      <Route 
        path="/referidos" 
        element={
          <ProtectedRoute allowedRoles={[1, 2, 3, 4]}>
            <React.Suspense fallback={<LoadingSpinner message="Cargando referidos..." />}>
              <ReferidosScreen />
            </React.Suspense>
          </ProtectedRoute>
        } 
      />
      
      {/* 👨‍🏫 EXPLICACIÓN: Alias para Referidos (tu superior dijo usar alternativa a "pirámides") */}
      <Route 
        path="/mi-red" 
        element={
          <ProtectedRoute allowedRoles={[1, 2, 3, 4]}>
            <React.Suspense fallback={<LoadingSpinner message="Cargando tu red..." />}>
              <ReferidosScreen />
            </React.Suspense>
          </ProtectedRoute>
        } 
      />
      
      {/* 👨‍🏫 NOTA: Las siguientes rutas están comentadas porque los módulos no existen aún
      {/* Página de perfil (comentada hasta crear el módulo)
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute allowedRoles={[1, 2, 3, 4]}>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-corporate-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👤</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Perfil del Usuario</h1>
                <p className="text-gray-600">Módulo en desarrollo. Próximamente disponible.</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      
      {/* Configuración solo para administradores (comentada hasta crear el módulo)
      <Route 
        path="/configuracion" 
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚙️</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuración del Sistema</h1>
                <p className="text-gray-600">Módulo en desarrollo. Próximamente disponible.</p>
              </div>
            </div>
          </ProtectedRoute>
        } 
      />
      */}
      
      {/* 👨‍🏫 EXPLICACIÓN: Página de acceso denegado */}
      <Route 
        path="/acceso-denegado" 
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">⛔</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
              <p className="text-gray-600 mb-8">No tienes permisos para acceder a esta página.</p>
              <a 
                href="/" 
                className="bg-action-green text-white px-6 py-3 rounded-lg font-medium hover:bg-action-hover transition-colors"
              >
                Volver al Inicio
              </a>
            </div>
          </div>
        } 
      />
      
      {/* 👨‍🏫 EXPLICACIÓN: Página 404 personalizada */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-corporate-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
              <p className="text-gray-600 mb-8">La página que buscas no existe o ha sido movida.</p>
              <div className="space-x-4">
                <a 
                  href="/" 
                  className="bg-corporate-DEFAULT text-white px-6 py-3 rounded-lg font-medium hover:bg-corporate-dark transition-colors"
                >
                  Volver al Inicio
                </a>
                <a 
                  href="/dashboard" 
                  className="bg-action-green text-white px-6 py-3 rounded-lg font-medium hover:bg-action-hover transition-colors"
                >
                  Ir al Dashboard
                </a>
              </div>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

// 👨‍🏫 EXPLICACIÓN: Componente principal de la aplicación con redirección automática
export const AppWithAutoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkInitialAuth = () => {
      const token = localStorage.getItem('zangur_token');
      const user = localStorage.getItem('zangur_user');
      
      if (token && user) {
        try {
          const userData = JSON.parse(user);
          
          // Si estamos en la página de login o landing y ya estamos autenticados, redirigir
          const currentPath = window.location.pathname;
          const publicPaths = ['/', '/login', '/login/redirect'];
          
          if (publicPaths.includes(currentPath)) {
            switch (userData.rolId) {
              case 1:
              case 2:
              case 3:
                navigate('/admin/dashboard');
                break;
              case 4:
                navigate('/afiliado/dashboard');
                break;
              default:
                navigate('/');
            }
          }
        } catch (error) {
          console.error('Error parsing user data on app init:', error);
        }
      }
    };

    checkInitialAuth();
  }, [navigate]);

  return <AppRoutes />;
};