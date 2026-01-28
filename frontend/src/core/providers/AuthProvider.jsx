import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear contexto para autenticación
const AuthContext = createContext();

// Hook personalizado para usar autenticación con funciones de roles
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  // Funciones helper para verificar roles
  const isAdmin = context.user?.rolId === 1;
  const isAuditor = context.user?.rolId === 2; // Gerente = Auditor
  const isOperador = context.user?.rolId === 3; // Empleado = Operador
  const isAfiliado = context.user?.rolId === 4; // Cliente = Afiliado
  
  // Función para obtener el nombre del rol
  const getRolNombre = () => {
    switch (context.user?.rolId) {
      case 1: return 'Administrador';
      case 2: return 'Auditor';
      case 3: return 'Operador';
      case 4: return 'Afiliado';
      default: return 'Usuario';
    }
  };
  
  // Función para verificar si tiene permiso para una acción específica
  const hasPermission = (requiredRolId) => {
    if (!context.user) return false;
    
    // Admin tiene acceso a todo
    if (isAdmin) return true;
    
    // Verificar rol específico
    return context.user.rolId === requiredRolId;
  };

  // Función para verificar si tiene uno de varios roles permitidos
  const hasAnyRole = (allowedRoles = []) => {
    if (!context.user) return false;
    
    // Admin siempre tiene acceso
    if (isAdmin) return true;
    
    // Verificar si el rol del usuario está en la lista permitida
    return allowedRoles.includes(context.user.rolId);
  };

  return {
    ...context,
    isAdmin,
    isAuditor,
    isOperador,
    isAfiliado,
    getRolNombre,
    hasPermission,
    hasAnyRole,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al iniciar, verificar si hay usuario guardado
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem('zangur_user');
        const savedToken = localStorage.getItem('zangur_token');
        
        if (savedUser && savedToken) {
          const parsedUser = JSON.parse(savedUser);
          
          // Opcional: Validar token con backend
          // const isValid = await validateToken(savedToken);
          // if (isValid) {
          setUser(parsedUser);
          // } else {
          //   clearLocalStorage();
          // }
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        clearLocalStorage();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Función para limpiar almacenamiento local
  const clearLocalStorage = () => {
    localStorage.removeItem('zangur_user');
    localStorage.removeItem('zangur_token');
  };

  // Función para login
  const login = (userData, token) => {
    localStorage.setItem('zangur_user', JSON.stringify(userData));
    localStorage.setItem('zangur_token', token);
    setUser(userData);
  };

  // Función para logout
  const logout = () => {
    clearLocalStorage();
    setUser(null);
    // Redirigir al login
    window.location.href = '/login';
  };

  // Función para actualizar datos del usuario
  const updateUser = (updatedData) => {
    const currentUser = JSON.parse(localStorage.getItem('zangur_user')) || {};
    const newUserData = { ...currentUser, ...updatedData };
    
    localStorage.setItem('zangur_user', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  // Función para refrescar token (ejemplo)
  const refreshToken = async () => {
    try {
      const currentToken = localStorage.getItem('zangur_token');
      if (!currentToken) return null;
      
      // Aquí iría la llamada al backend para refrescar el token
      // const response = await api.refreshToken(currentToken);
      // const newToken = response.token;
      // localStorage.setItem('zangur_token', newToken);
      // return newToken;
      
      return currentToken;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      logout();
      return null;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    refreshToken,
    isAuthenticated: !!user,
    // Nota: Las funciones isAdmin, isAuditor, etc. ahora están en useAuth()
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Componente para proteger rutas por rol
export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login',
  fallback = null 
}) => {
  const { isAuthenticated, hasAnyRole, loading } = useAuth();

  if (loading) {
    return fallback || <div>Cargando autenticación...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = redirectTo;
    return null;
  }

  if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    // Redirigir a una página de acceso denegado o al dashboard
    window.location.href = '/acceso-denegado';
    return null;
  }

  return children;
};

// Componente para mostrar contenido condicional por rol
export const WithRole = ({ 
  children, 
  allowedRoles = [],
  fallback = null 
}) => {
  const { hasAnyRole, loading } = useAuth();

  if (loading) {
    return fallback || <div>Cargando...</div>;
  }

  if (!hasAnyRole(allowedRoles)) {
    return fallback;
  }

  return children;
};