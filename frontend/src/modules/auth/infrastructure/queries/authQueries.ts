import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../../core/api/axiosConfig';

// Tipos basados en tu documentación
interface LoginRequest {
  correo: string;
  contrasenia: string;
}

interface LoginResponse {
  token: string;
  usuario: {
    id: string;
    cedula: string;
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    telefono: string;
    correo: string;
    direccion: string;
    rolId: number;
    isActive: boolean;
    createdAt: string;
  };
}

interface RegisterRequest {
  cedula: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  correo: string;
  direccion: string;
  contrasenia: string;
  rolId: number; // 1: ADMIN, 2: GERENTE, 3: EMPLEADO, 4: CLIENTE
}

// Hook para login
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (credentials) => {
      const response = await api.post<LoginResponse>('/usuarios/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Guardar token y usuario
      localStorage.setItem('zangur_token', data.token);
      localStorage.setItem('zangur_user', JSON.stringify(data.usuario));
      
      // Invalidar queries de usuario
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// Hook para registro
export const useRegister = () => {
  return useMutation<LoginResponse, Error, RegisterRequest>({
    mutationFn: async (userData) => {
      const response = await api.post<LoginResponse>('/usuarios/registro', userData);
      return response.data;
    },
  });
};

// Hook para obtener perfil
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await api.get('/usuarios/perfil');
      return response.data;
    },
    enabled: !!localStorage.getItem('zangur_token'), // Solo ejecutar si hay token
  });
};

// Hook para listar usuarios (solo admin/gerente)
export const useUsers = (filters?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      
      const response = await api.get(`/usuarios?${params.toString()}`);
      return response.data;
    },
  });
};