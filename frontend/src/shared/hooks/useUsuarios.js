import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../core/api/axiosConfig';
import { toast } from 'react-hot-toast';

// 👨‍🏫 EXPLICACIÓN: Query keys organizan el cache en React Query
// Cada array es una "key" única para identificar datos en cache
export const USUARIOS_QUERY_KEYS = {
  all: ['usuarios'],
  list: () => ['usuarios', 'list'],
  byId: (id) => ['usuarios', 'detail', id],
  perfil: ['usuarios', 'perfil'],
  afiliados: ['usuarios', 'afiliados'],
};

export const useUsuarios = () => {
  const queryClient = useQueryClient();

  // 👨‍🏫 EXPLICACIÓN: useQuery para obtener datos (GET)
  const getPerfil = () => {
    return useQuery({
      queryKey: USUARIOS_QUERY_KEYS.perfil,
      queryFn: async () => {
        try {
          const response = await api.get('/usuarios/perfil');
          return response.data.data;
        } catch (error) {
          console.error('Error al obtener perfil:', error);
          throw error;
        }
      },
      // staleTime: Infinity -> No se considera stale nunca
      staleTime: Infinity,
      retry: 1,
    });
  };

  const getUsuarios = (params = {}) => {
    return useQuery({
      queryKey: [...USUARIOS_QUERY_KEYS.list(), params],
      queryFn: async () => {
        try {
          const response = await api.get('/usuarios', { params });
          return response.data.data;
        } catch (error) {
          console.error('Error al obtener usuarios:', error);
          throw error;
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutos
    });
  };

  const getUsuarioById = (id) => {
    return useQuery({
      queryKey: USUARIOS_QUERY_KEYS.byId(id),
      queryFn: async () => {
        try {
          const response = await api.get(`/usuarios/${id}`);
          return response.data.data;
        } catch (error) {
          console.error(`Error al obtener usuario ${id}:`, error);
          throw error;
        }
      },
      enabled: !!id, // 👨‍🏫 Solo ejecuta si id existe
    });
  };

  const getUsuariosAfiliados = () => {
    return useQuery({
      queryKey: USUARIOS_QUERY_KEYS.afiliados,
      queryFn: async () => {
        try {
          const response = await api.get('/usuarios');
          // 👨‍🏫 Filtrar solo afiliados (rolId 4 según tu API)
          const usuarios = response.data.data || [];
          return usuarios.filter(user => user.rolId === 4);
        } catch (error) {
          console.error('Error al obtener afiliados:', error);
          throw error;
        }
      },
      staleTime: 2 * 60 * 1000, // 2 minutos
    });
  };

  // 👨‍🏫 EXPLICACIÓN: useMutation para modificar datos (POST, PUT, DELETE)
  const crearUsuario = useMutation({
    mutationFn: async (userData) => {
      try {
        const response = await api.post('/usuarios/registro', userData);
        return response.data.data;
      } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // 👨‍🏫 Invalidar cache para refrescar datos
      queryClient.invalidateQueries({ queryKey: USUARIOS_QUERY_KEYS.all });
      toast.success('Usuario creado exitosamente');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Error al crear usuario';
      toast.error(message);
    },
  });

  const actualizarUsuario = useMutation({
    mutationFn: async ({ id, data }) => {
      try {
        const response = await api.put(`/usuarios/${id}`, data);
        return response.data.data;
      } catch (error) {
        console.error(`Error al actualizar usuario ${id}:`, error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: USUARIOS_QUERY_KEYS.byId(variables.id) });
      queryClient.invalidateQueries({ queryKey: USUARIOS_QUERY_KEYS.perfil });
      toast.success('Usuario actualizado');
    },
  });

  const activarUsuario = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await api.patch(`/usuarios/${id}/activar`);
        return response.data.data;
      } catch (error) {
        console.error(`Error al activar usuario ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USUARIOS_QUERY_KEYS.all });
      toast.success('Usuario activado');
    },
  });

  const desactivarUsuario = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await api.patch(`/usuarios/${id}/desactivar`);
        return response.data.data;
      } catch (error) {
        console.error(`Error al desactivar usuario ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USUARIOS_QUERY_KEYS.all });
      toast.success('Usuario desactivado');
    },
  });

  return {
    // Queries (GET)
    getPerfil,
    getUsuarios,
    getUsuarioById,
    getUsuariosAfiliados,
    
    // Mutations (POST/PUT/DELETE)
    crearUsuario,
    actualizarUsuario,
    activarUsuario,
    desactivarUsuario,
  };
};